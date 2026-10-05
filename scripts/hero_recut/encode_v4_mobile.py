"""Phone encode of Geo's approved V4 hero film (mobile media parity pass, 2026-10-05).

The phone file is the approved film re-encoded, frame for frame: the same 446 frames, 720x1280, 24 fps,
18.583 s, in the same order. Nothing is re-cut, re-framed or re-graded. Only the encoder settings differ,
for phones on cellular networks:

  * capped bitrate: CRF 27 with a 1.2 Mbps VBV ceiling. The approved encode averages 1.75 Mbps, with peaks
    above that. On a throttled "Slow 4G" link (1.6 Mbps, 150 ms) the approved file paused to rebuffer eight
    times in the first 25 s of playback; this encode played straight through;
  * a key frame every 2 s, so the loop restart and any resume start on a nearby key frame;
  * x264 preset veryslow, tune film, High profile level 4.0, yuv420p, BT.709 tags, faststart, no audio.

Source, either of:
  * the approved encode, public/media/hero/ta-hero-film-v4.mp4 (default; how the shipped file was made);
  * Geo's 2160x3840 "Recap Reel V4.mp4" master. The script then applies exactly the ranges and filter
    graph of render_geo_v4.py (16.4-20.0 then 24.0-39.0, full frame scaled to 720x1280, 24 fps), so the
    frames are the same.

The desktop and tablet hero keep the approved encode. The checks at the end (frame count, duration, SSIM
against the approved encode) must pass before a new render ships.

Usage:
    python scripts/hero_recut/encode_v4_mobile.py [SOURCE.mp4]
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

HERO = Path(__file__).resolve().parents[2] / "public" / "media" / "hero"
APPROVED = HERO / "ta-hero-film-v4.mp4"
MOBILE = HERO / "ta-hero-film-v4-mobile.mp4"
SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else APPROVED

# Identical to render_geo_v4.py: Geo's ranges, full frame, no crop. Used only for the 2160x3840 master.
MASTER_GRAPH = (
    "[0:v]trim=start=16.4:end=20,setpts=PTS-STARTPTS[v0];"
    "[0:v]trim=start=24:end=39,setpts=PTS-STARTPTS[v1];"
    "[v0][v1]concat=n=2:v=1:a=0,"
    "scale=720:1280:flags=lanczos,fps=24,format=yuv420p[outv]"
)


def probe(path: Path, entries: str) -> str:
    return subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", entries, "-of", "compact=p=0:nk=0", str(path)],
        capture_output=True, text=True, check=True,
    ).stdout.strip().replace("\n", " | ")


height = int(probe(SOURCE, "stream=height").split("=")[-1])
picture = ["-filter_complex", MASTER_GRAPH, "-map", "[outv]"] if height > 1280 else ["-map", "0:v:0"]

subprocess.run(
    [
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-i", str(SOURCE), *picture, "-an",
        "-c:v", "libx264", "-preset", "veryslow", "-tune", "film",
        "-crf", "27", "-maxrate", "1200k", "-bufsize", "2400k",
        "-g", "48", "-keyint_min", "24",
        "-profile:v", "high", "-level", "4.0", "-pix_fmt", "yuv420p",
        "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
        "-movflags", "+faststart",
        str(MOBILE),
    ],
    check=True,
)

COUNT = "stream=width,height,r_frame_rate,nb_frames:format=duration,bit_rate,size"
print("mobile  ", probe(MOBILE, COUNT))
print("approved", probe(APPROVED, COUNT))
ssim = subprocess.run(
    ["ffmpeg", "-hide_banner", "-i", str(MOBILE), "-i", str(APPROVED), "-lavfi", "ssim", "-f", "null", "-"],
    capture_output=True, text=True,
).stderr
m = re.search(r"All:([0-9.]+)", ssim)
print("SSIM vs approved encode:", m.group(1) if m else "n/a")
