"""
V2.2 asset preparation (crop / cut only — no tonal, face, body or identity edits).

Usage:
  python scripts/prepare_v22_assets.py <V2.2 handoff dir> <V2 asset package dir>

Photos (package "ENHANCED" masters used as delivered, cropped only):
  IMG_4007 -> public/media/community/ta-community-4007.jpg  (full width, trimmed top/bottom; all seven faces kept)
  IMG_4004 -> public/media/community/ta-community-4004.jpg  (head-and-shoulders band; excludes the drinks lower in frame)
  IMG_4006 -> public/media/mentorship/ta-mentorship-4006.jpg  (ORIGINAL master; crop only to the two men in
              conversation — excludes the #UPMIXER screen, DJ rig and dance floor; 420x300 native, no upscale)
  IMG_4001 is intentionally NOT used (see docs/ASSET_MAP.md).

Video (homepage featured cut):
  source  Dr_Phang_Scholarship_01m00s-02m00s.mp4 (covers 01:00–02:00)
  window  01:19.00 → 02:00.00  (offsets 19.00 → 60.00; exactly 41.00 s — the natural end of the source;
          nothing looped or extended)
  fades   video + audio: in 0.9 s, cinematic out 1.75 s (on the held end card)
  output  public/media/scholarship/dr-phang-featured.mp4 (H.264 High, CRF 21, AAC 128k, faststart)
"""
import subprocess
import sys
from pathlib import Path

from PIL import Image

handoff, v2pkg = Path(sys.argv[1]), Path(sys.argv[2])
root = Path(__file__).resolve().parent.parent
out = root / "public" / "media"

im = Image.open(handoff / "assets/primary/IMG_4007_ENHANCED.jpg")
w, _ = im.size
im.crop((0, 40, w, 40 + int(w / 1.9))).save(out / "community/ta-community-4007.jpg", quality=88, subsampling=0, optimize=True)

im = Image.open(handoff / "assets/primary/IMG_4004_ENHANCED.jpg")
im.crop((230, 50, 1480, 485)).save(out / "community/ta-community-4004.jpg", quality=88, subsampling=0, optimize=True)

# ORIGINAL chosen over ENHANCED: identical tone, but the enhanced master's sharpening adds visible
# noise on the faces at this crop size; the original grain reads more natural.
im = Image.open(handoff / "assets/primary/IMG_4006_ORIGINAL.jpeg")
im.crop((1060, 630, 1480, 930)).save(out / "mentorship/ta-mentorship-4006.jpg", quality=90, subsampling=0, optimize=True)

start, end, fade_in, fade_out = 19.0, 60.0, 0.9, 1.75
dur = end - start
subprocess.run(
    [
        "ffmpeg", "-y", "-ss", str(start), "-to", str(end),
        "-i", str(v2pkg / "04_Dr_Phang_Scholarship/Dr_Phang_Scholarship_01m00s-02m00s.mp4"),
        "-vf", f"fade=t=in:st=0:d={fade_in},fade=t=out:st={dur - fade_out:.2f}:d={fade_out},format=yuv420p",
        "-af", f"afade=t=in:st=0:d={fade_in},afade=t=out:st={dur - fade_out:.2f}:d={fade_out}",
        "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-maxrate", "2200k", "-bufsize", "4400k",
        "-profile:v", "high", "-level", "4.0", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
        str(out / "scholarship/dr-phang-featured.mp4"),
    ],
    check=True,
)
