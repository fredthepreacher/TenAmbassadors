"""
V2.4 community recap — web derivative (crop / re-encode only; no edit changes).

Source master (kept, not served): assets/recap-master/TenAmbassadors_Recap_16-35_Horizontal_1080p.mp4
  00:16–00:35 of the client-supplied Recap Reel V2 · 1920×1080 · 19.0 s · H.264/AAC · ~11.7 MB
  (vertical footage centred on a blurred, darkened fill).

Web derivative: centre 4:5 crop (x 528–1392) — the full vertical footage plus a sliver
of its blurred fill — at native 864×1080 (no scaling), H.264 High CRF 25, AAC 128k,
faststart. The edit, fades and open captions are unchanged. The homepage frame is 4:5
(object-cover), so the full 16:9 frame would only waste bytes on off-screen fill.

  python scripts/prepare_v24_recap.py
"""
import subprocess
from pathlib import Path

from PIL import Image

root = Path(__file__).resolve().parent.parent
src = root / "assets/recap-master"
out = root / "public/media/community"

subprocess.run(
    [
        "ffmpeg", "-y", "-i", str(src / "TenAmbassadors_Recap_16-35_Horizontal_1080p.mp4"),
        "-vf", "crop=864:1080:528:0,format=yuv420p",
        "-c:v", "libx264", "-preset", "slow", "-crf", "25", "-profile:v", "high", "-level", "4.0",
        "-maxrate", "3000k", "-bufsize", "6000k",
        "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
        str(out / "ta-recap-community.mp4"),
    ],
    check=True,
)

Image.open(src / "TenAmbassadors_Recap_16-35_Poster.jpg").crop((528, 0, 1392, 1080)).save(
    out / "ta-recap-community-poster.jpg", quality=86, optimize=True, progressive=True
)
