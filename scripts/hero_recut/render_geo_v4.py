"""Render Geo's approved Ten Ambassadors homepage hero from Recap Reel V4.

Client-selected ranges:
- 16.4-20.0 seconds (starts after the brief drink close-up at 16.0-16.4)
- 24.0-39.0 seconds

The V4 master is a 2160x3840 portrait source. We keep the complete portrait frame and
scale it to 720x1280 with no crop, so heads and bodies are not cut by the media derivative.
The site then renders the video with object-fit: contain over a softened/darkened poster
backdrop.

Usage:
    python scripts/hero_recut/render_geo_v4.py "Recap Reel V4.mp4" OUTPUT_DIR
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

SOURCE = Path(sys.argv[1])
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

NAME = "ta-hero-film-geo"
MP4 = OUT / f"{NAME}.mp4"
POSTER = OUT / f"{NAME}-poster.jpg"
BACKDROP = OUT / f"{NAME}-backdrop.jpg"
PLAN = OUT / f"{NAME}.plan.json"

# Geo asked for 16-20 and 24-39. The first 0.4 s is only a close-up of a drink,
# so the usable first segment begins at the next shot at 16.4.
SEGMENTS_USED = [(16.4, 20.0), (24.0, 39.0)]

filter_complex = (
    "[0:v]trim=start=16.4:end=20,setpts=PTS-STARTPTS[v0];"
    "[0:v]trim=start=24:end=39,setpts=PTS-STARTPTS[v1];"
    "[v0][v1]concat=n=2:v=1:a=0,"
    "scale=720:1280:flags=lanczos,fps=24,format=yuv420p[outv]"
)

subprocess.run(
    [
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-i", str(SOURCE),
        "-filter_complex", filter_complex,
        "-map", "[outv]",
        "-an",
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "26",
        "-profile:v", "high",
        "-level", "4.0",
        "-movflags", "+faststart",
        str(MP4),
    ],
    check=True,
)

subprocess.run(
    [
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-i", str(MP4),
        "-frames:v", "1",
        "-q:v", "2",
        str(POSTER),
    ],
    check=True,
)

subprocess.run(
    [
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-i", str(POSTER),
        "-vf", "scale=36:64,gblur=sigma=2,eq=brightness=-0.30",
        "-q:v", "5",
        str(BACKDROP),
    ],
    check=True,
)

plan = {
    "source": SOURCE.name,
    "source_dimensions": [2160, 3840],
    "source_fps": 24,
    "segments_requested": [[16.0, 20.0], [24.0, 39.0]],
    "segments_used": [[16.4, 20.0], [24.0, 39.0]],
    "omitted": [
        {"range": [16.0, 16.4], "reason": "brief drink close-up before the next shot"},
        {"range": [20.0, 24.0], "reason": "client-directed omission"},
    ],
    "output_dimensions": [720, 1280],
    "output_fps": 24,
    "strategy": "full portrait frame; no crop; site uses object-fit: contain",
    "audio": "removed for muted autoplay hero",
}
PLAN.write_text(json.dumps(plan, indent=2), encoding="utf-8")
print(json.dumps(plan, indent=2))

