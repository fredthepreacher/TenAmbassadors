"""
Prepare the approved V2 asset package for the web.

Usage:  python scripts/prepare_v2_assets.py <path-to-unzipped-package>

Treatment is limited to CROPPING and format/size handling. No tonal, face,
body, or identity edits are made here (the package's "Enhanced" files already
carry the client-approved restrained correction).

- Photos are copied as-is (next/image serves responsive AVIF/WebP from them).
- One crop: 492-493-AllseeinJah-2321 is framed at head-and-shoulders so the
  image reads as a portrait of two young women rather than a nightlife shot
  (the full frame includes a drink and a club T-shirt logo).
- Video files are copied byte-for-byte (already H.264/AAC with faststart).
- Poster frames are extracted from the videos and cropped to the inner
  picture, excluding the burned-in timecode strip.
"""
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image

src = Path(sys.argv[1])
root = Path(__file__).resolve().parent.parent
out = root / "public" / "media"
orig = root / "assets" / "approved-v2-originals"
for d in ["hero", "mentorship", "community", "scholarship"]:
    (out / d).mkdir(parents=True, exist_ok=True)
orig.mkdir(parents=True, exist_ok=True)

copies = {
    "01_Hero/TA_Hero_IMG_3977_Enhanced.jpg": "hero/ta-hero-img-3977.jpg",
    "02_Mentorship/TA_02_Mentorship_478-479-AllseeinJah-2292_Enhanced.jpg": "mentorship/ta-mentorship-2292.jpg",
    "03_Community_Professionals/TA_03_Community_Professionals_499-500-AllseeinJah-2342_Enhanced.jpg": "community/ta-community-2342.jpg",
    "03_Community_Professionals/TA_Community_Professionals_A7R00711_Enhanced.jpg": "community/ta-community-a7r00711.jpg",
    "04_Dr_Phang_Scholarship/Dr_Phang_Scholarship_01m19s-01m49s_30sec.mp4": "scholarship/dr-phang-30s.mp4",
    "04_Dr_Phang_Scholarship/Dr_Phang_Scholarship_01m00s-02m00s.mp4": "scholarship/dr-phang-60s.mp4",
}
for s, d in copies.items():
    shutil.copyfile(src / s, out / d)

# Originals kept for comparison only (not served).
for s in ["01_Hero/TA_Hero_IMG_3977_Original.jpeg", "03_Community_Professionals/A7R00711_Original.JPG", "README_ASSET_MAP.txt"]:
    shutil.copyfile(src / s, orig / Path(s).name)

# Crop only — head-and-shoulders framing of the two-women mentorship image.
peers = Image.open(src / "02_Mentorship/TA_02_Mentorship_492-493-AllseeinJah-2321_Enhanced.jpg")
peers.crop((190, 0, 1340, 820)).save(out / "mentorship/ta-mentorship-2321.jpg", quality=92, subsampling=0)
shutil.copyfile(src / "02_Mentorship/TA_02_Mentorship_492-493-AllseeinJah-2321_Enhanced.jpg", orig / "TA_02_Mentorship_492-493-AllseeinJah-2321_Enhanced_fullframe.jpg")


def poster(video: Path, t: float, dest: Path):
    tmp = dest.with_suffix(".png")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", str(video), "-frames:v", "1", str(tmp)], check=True)
    im = Image.open(tmp).convert("RGB")
    # Inner picture area of the 1920x1080 frame, minus the timecode strip.
    im.crop((244, 312, 1676, 982)).save(dest, quality=88)
    tmp.unlink()


poster(out / "scholarship/dr-phang-30s.mp4", 2, out / "scholarship/dr-phang-30s-poster.jpg")
# The close-up frames carry a visible third-party watermark, so the 60s cut
# uses a wide two-shot frame as well.
poster(out / "scholarship/dr-phang-60s.mp4", 22, out / "scholarship/dr-phang-60s-poster.jpg")

for p in sorted(out.rglob("*")):
    if p.is_file() and p.suffix == ".jpg":
        print(p.relative_to(root), Image.open(p).size, p.stat().st_size)
    elif p.is_file():
        print(p.relative_to(root), p.stat().st_size)
