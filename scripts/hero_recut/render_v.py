"""Hero film recut from the client's recap/sizzle footage (TenAmbassadors_Recap_16-35).

Full-subject framing pass (2026-10-04). One 4:5 cut, taken pixel-for-pixel from the
sharp vertical column (x 655-1263, 608 px wide): no upscaling, no generative fill, no
face manipulation. Each shot's crop window (y0..y0+760) keeps every head inside the
frame with the most headroom the source allows, and stays above the burned-in
captions (they start at about y 825 in the speaker and listener shots).

The site shows this film with `object-fit: contain`, so the browser never crops it:
  - portrait phones: the hero frame is 4:5, so the film fills it exactly;
  - portrait tablets and desktop: the film sits inside the panel over a softened,
    darkened backdrop made from its own first frame (ta-hero-film-45-backdrop.jpg).

Shots (source seconds, playback speed):
  speaker    5.22-7.52   0.8x   y0 0    crown ~85 px  -> ~11% headroom
  listeners  7.60-10.10  0.8x   y0 40   crowns ~160   -> ~16% headroom
  two guests 15.12-15.74 0.65x  y0 50   crowns ~130   -> ~10% headroom
Dropped from the previous cut, because the source itself leaves no room:
  - the speaker's opening close-up (4.02-5.20): his hair touches the top of the source frame;
  - the contact-exchange shot (10.16-11.10): the source column cuts through the face of the
    woman on the left, so no crop could show her whole head.

Treatment: frame-accurate speed change (no synthetic in-between frames), soft
dip-dissolves, and a closing dissolve into the exact first frame so the loop never
visibly resets. Light denoise + gentle unsharp at encode, as before.

Usage: python3 render_v.py OUTDIR
"""
import cv2, numpy as np, subprocess, math, sys, os

SRC = "/tmp/ta2/assets/recap-master/TenAmbassadors_Recap_16-35_Horizontal_1080p.mp4"
X0, CW, FPS = 655, 608, 30
W, H = 608, 760          # 4:5, native pixels (crop only)
DIP = 0.22               # darken at the midpoint of a dissolve
# (name, t0, t1, speed, y0, dissolve into the NEXT shot in seconds)
SHOTS = [
    ("speaker", 5.22, 7.52, 0.8, 0, 0.5),
    ("listen", 7.60, 10.10, 0.8, 40, 0.25),
    ("guests", 15.12, 15.74, 0.65, 50, 0.45),  # last value = closing dissolve into frame 0
]
NAME = "ta-hero-film-45"


def decode(t0, t1):
    p = subprocess.run(["ffmpeg", "-loglevel", "error", "-ss", f"{t0:.3f}", "-t", f"{t1 - t0:.3f}", "-i", SRC,
                        "-vf", f"crop={CW}:1080:{X0}:0", "-f", "rawvideo", "-pix_fmt", "bgr24", "-"],
                       capture_output=True).stdout
    n = len(p) // (CW * 1080 * 3)
    return np.frombuffer(p, np.uint8).reshape(n, 1080, CW, 3)


def smooth(a):
    return a * a * (3 - 2 * a)


def build(outdir):
    clips = [decode(a, b) for _, a, b, _, _, _ in SHOTS]
    durs = [(b - a) / sp for _, a, b, sp, _, _ in SHOTS]
    starts = [0.0]
    for i in range(len(SHOTS) - 1):
        starts.append(starts[-1] + durs[i] - SHOTS[i][5])
    T = starts[-1] + durs[-1]          # loop length; frame T == frame 0
    FC = SHOTS[-1][5]

    def frame(i, u):
        fr = clips[i]; sp = SHOTS[i][3]; y0 = SHOTS[i][4]
        k = max(0, min(len(fr) - 1, int(round(u * sp * FPS))))
        return fr[k, y0:y0 + H, :W].astype(np.float32)

    os.makedirs(outdir, exist_ok=True)
    mp4 = f"{outdir}/{NAME}.mp4"
    ff = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}",
                           "-r", str(FPS), "-i", "-", "-vf", "hqdn3d=1.5:1.2:4:4,unsharp=5:5:0.35",
                           "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-tune", "film", "-profile:v", "high",
                           "-level", "4.0", "-pix_fmt", "yuv420p", "-color_range", "tv", "-colorspace", "bt709",
                           "-color_primaries", "bt709", "-color_trc", "bt709", "-g", str(FPS * 2),
                           "-movflags", "+faststart", "-an", mp4], stdin=subprocess.PIPE)
    N = round(T * FPS)
    for fi in range(N):
        t = fi / FPS
        out = None; dip = 0.0
        for i in range(len(SHOTS)):
            u = t - starts[i]
            if u < 0 or u > durs[i]:
                continue
            im = frame(i, u)
            if out is None:
                out = im
            else:  # shot i dissolves in over shot i-1
                a = smooth(min(1.0, u / SHOTS[i - 1][5]))
                out = out * (1 - a) + im * a; dip = max(dip, math.sin(math.pi * a))
        if t > T - FC:                  # closing dissolve into the held first frame
            a = smooth((t - (T - FC)) / FC)
            out = out * (1 - a) + frame(0, 0) * a; dip = max(dip, math.sin(math.pi * a))
        px = np.clip(out * (1 - DIP * dip) + 0.5, 0, 255).astype(np.uint8)
        ff.stdin.write(px.tobytes())
        if fi == 0:
            cv2.imwrite(f"{outdir}/{NAME}-poster.jpg", px,
                        [cv2.IMWRITE_JPEG_QUALITY, 88, cv2.IMWRITE_JPEG_PROGRESSIVE, 1, cv2.IMWRITE_JPEG_OPTIMIZE, 1])
            # Backdrop: the same first frame, reduced to a tiny, heavily softened and darkened plate.
            # The browser stretches it under the contained film; it carries colour, not detail.
            small = cv2.resize(px, (24, 30), interpolation=cv2.INTER_AREA)
            small = cv2.GaussianBlur(small, (0, 0), 2.2)
            small = np.clip(small.astype(np.float32) * 0.55, 0, 255).astype(np.uint8)
            cv2.imwrite(f"{outdir}/{NAME}-backdrop.jpg", small, [cv2.IMWRITE_JPEG_QUALITY, 80])
    ff.stdin.close(); ff.wait()
    print(mp4, f"{T:.2f} s", "starts", [round(s, 2) for s in starts])


build(sys.argv[1] if len(sys.argv) > 1 else "/tmp/hf/out")
