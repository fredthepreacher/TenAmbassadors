"""Homepage hero film: Geo's own cut (Geo meeting revision, 2026-10-04).

Geo chose the hero sequence himself: reel seconds 16-20, then 24-39, spliced together (20-24 is
left out on purpose). This script cuts exactly those ranges from the recap reel and frames every
shot for the site's full-subject rule:

  * one 4:5 window (608x760) per shot, taken pixel-for-pixel from the sharp vertical column of the
    horizontal 1080p export (x 655-1263): no upscaling, no generative fill, no face manipulation;
  * the window's vertical position is chosen per shot from YuNet face boxes, giving the highest
    head about 10% headroom where the source allows it, and staying above burned-in captions;
  * real-time playback (no slow motion, no synthetic frames); Geo's own hard cuts are kept;
  * one soft dissolve at the 20 -> 24 splice and a closing dissolve into the exact first frame, so
    the loop never visibly resets.

Drinks rule (Geo meeting, item 18): the reel's first 0.4 s at 16.0 s is a close-up of a hand holding
a drink, so the cut starts at the next shot (16.4 s). Elsewhere drinks only appear below the 4:5
window and are not shown.

The site shows the result with `object-fit: contain`, so the browser never crops it (see
components/home/HeroFilm.tsx and docs/GEO_MEETING_REVISION_REPORT.md).

Usage:
  python3 render_geo.py SOURCE.mp4 OFFSET OUTDIR
    SOURCE  the reel (or an extract of it), horizontal 1920x1080 with the vertical footage centred
    OFFSET  reel time of the source's first frame (0 for the full reel; 16 for the 16-35 extract)
"""
import json
import math
import os
import subprocess
import sys

import cv2
import numpy as np

SRC, OFFSET, OUT = sys.argv[1], float(sys.argv[2]), sys.argv[3]
X0, CW, FPS = 655, 608, 30
W, H = 608, 760
SEGMENTS = [(16.0, 20.0), (24.0, 39.0)]  # Geo's ranges, in reel seconds
SKIP = [(16.0, 16.4)]                    # drink close-up (see docstring); trimmed at the next cut
SPLICE_DISSOLVE, LOOP_DISSOLVE, DIP = 0.35, 0.5, 0.18
CAPTION_TOP = 825                        # burned-in captions start about here in the column
HEADROOM = 0.10
NAME = "ta-hero-film-geo"

# YuNet face detector (OpenCV Zoo, face_detection_yunet_2023mar.onnx); set YUNET to its path.
det = cv2.FaceDetectorYN.create(os.environ.get("YUNET", "/tmp/vr/yunet.onnx"), "", (CW, 1080), 0.6, 0.3, 50)


def decode():
    p = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", SRC, "-vf", f"crop={CW}:1080:{X0}:0",
                        "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], capture_output=True).stdout
    return np.frombuffer(p, np.uint8).reshape(-1, 1080, CW, 3)


def has_caption(frames):
    band = np.stack([f[780:900, 100:508] for f in frames[:: max(1, len(frames) // 6)]])
    return ((band.min(axis=3) > 235).sum(axis=2) >= 15).mean() > 0.02


def main():
    fr = decode()
    n_src = len(fr)
    reel_end = OFFSET + n_src / FPS
    # shot boundaries (frame-difference cuts)
    cuts, prev = [0], None
    for i, im in enumerate(fr):
        g = cv2.cvtColor(cv2.resize(im, (76, 135)), cv2.COLOR_BGR2GRAY).astype(float)
        if prev is not None and np.abs(g - prev).mean() > 25:
            cuts.append(i)
        prev = g
    cuts.append(n_src)
    # frame ranges to use (source frame indices), honouring SEGMENTS and SKIP
    def idx(t):
        return int(round((t - OFFSET) * FPS))
    ranges = []
    for a, b in SEGMENTS:
        for sa, sb in SKIP:
            if sa <= a < sb:
                a = sb
        a_i, b_i = max(0, idx(a)), min(n_src, idx(b))
        if b_i > a_i:
            ranges.append((a_i, b_i))
    plan = []
    for seg, (a_i, b_i) in enumerate(ranges):
        bounds = sorted({a_i, b_i, *[c for c in cuts if a_i < c < b_i]})
        for s0, s1 in zip(bounds[:-1], bounds[1:]):
            boxes = []
            for i in range(s0, s1, 3):
                _, f = det.detect(fr[i])
                boxes += [x[:4] for x in (f if f is not None else []) if x[-1] >= 0.75 and x[2] >= 50]
            cap = has_caption(fr[s0:s1])
            y_max = (CAPTION_TOP - H) if cap else (1080 - H)
            if boxes:
                crown = min(y - 0.45 * h for x, y, w, h in boxes)
                y0 = int(round(min(max(0, crown - HEADROOM * H), y_max)))
            else:
                y0 = 0
            plan.append(dict(seg=seg, f0=s0, f1=s1, y0=y0, caption=bool(cap), faces=len(boxes),
                             reel=[round(OFFSET + s0 / FPS, 2), round(OFFSET + s1 / FPS, 2)]))
    # timeline: segments back to back, a dissolve at the splice, a closing dissolve into frame 0
    seq = []  # (src_frame, y0, seg)
    for p in plan:
        seq += [(i, p["y0"], p["seg"]) for i in range(p["f0"], p["f1"])]
    seg_start = {}
    for k, (_, _, s) in enumerate(seq):
        seg_start.setdefault(s, k)
    D = int(round(SPLICE_DISSOLVE * FPS))
    L = int(round(LOOP_DISSOLVE * FPS))
    # overlap the splice: the last D frames of segment 0 blend into the first D of segment 1
    if 1 in seg_start:
        k1 = seg_start[1]
        a_tail = seq[k1 - D:k1]
        b_head = seq[k1:k1 + D]
        timeline = [[x] for x in seq[:k1 - D]] + [[a, b] for a, b in zip(a_tail, b_head)] + [[x] for x in seq[k1 + D:]]
    else:
        timeline = [[x] for x in seq]
    N = len(timeline)
    os.makedirs(OUT, exist_ok=True)
    mp4 = f"{OUT}/{NAME}.mp4"
    ff = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-vf", "hqdn3d=1.5:1.2:4:4,unsharp=5:5:0.35",
                           "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-tune", "film", "-profile:v", "high",
                           "-level", "4.0", "-pix_fmt", "yuv420p", "-color_range", "tv", "-colorspace", "bt709",
                           "-color_primaries", "bt709", "-color_trc", "bt709", "-g", str(FPS * 2),
                           "-movflags", "+faststart", "-an", mp4], stdin=subprocess.PIPE)

    def crop(i, y0):
        return fr[i, y0:y0 + H, :W].astype(np.float32)

    first = crop(seq[0][0], seq[0][1])
    for t, layers in enumerate(timeline):
        if len(layers) == 1:
            out = crop(layers[0][0], layers[0][1]); dip = 0.0
        else:
            k = t - (seg_start[1] - D)
            a = (k + 0.5) / D; a = a * a * (3 - 2 * a)
            out = crop(*layers[0][:2]) * (1 - a) + crop(*layers[1][:2]) * a; dip = math.sin(math.pi * a)
        if t >= N - L:  # closing dissolve into the held first frame
            a = (t - (N - L) + 0.5) / L; a = a * a * (3 - 2 * a)
            out = out * (1 - a) + first * a; dip = max(dip, math.sin(math.pi * a))
        px = np.clip(out * (1 - DIP * dip) + 0.5, 0, 255).astype(np.uint8)
        ff.stdin.write(px.tobytes())
        if t == 0:
            cv2.imwrite(f"{OUT}/{NAME}-poster.jpg", px, [cv2.IMWRITE_JPEG_QUALITY, 88, cv2.IMWRITE_JPEG_PROGRESSIVE, 1, cv2.IMWRITE_JPEG_OPTIMIZE, 1])
            small = cv2.GaussianBlur(cv2.resize(px, (24, 30), interpolation=cv2.INTER_AREA), (0, 0), 2.2)
            cv2.imwrite(f"{OUT}/{NAME}-backdrop.jpg", np.clip(small.astype(np.float32) * 0.55, 0, 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 80])
    ff.stdin.close(); ff.wait()
    info = dict(source=os.path.basename(SRC), offset=OFFSET, reel_end=round(reel_end, 2), frames=N, seconds=round(N / FPS, 2),
                segments_requested=SEGMENTS, segments_used=[[round(OFFSET + a / FPS, 2), round(OFFSET + b / FPS, 2)] for a, b in ranges], shots=plan)
    json.dump(info, open(f"{OUT}/{NAME}.plan.json", "w"), indent=1)
    print(json.dumps({k: v for k, v in info.items() if k != "shots"}))
    for p in plan:
        print(p)


main()
