from PIL import Image, ImageEnhance, ImageFilter
from pathlib import Path

root = Path(r"C:\Users\fredd\Documents\GitHub\TenAmbassadors")
src = root / "public" / "images" / "events"
out = root / "public" / "images" / "events-enhanced"
out.mkdir(parents=True, exist_ok=True)

files = ["speaker-event.png", "group-event.png", "mentorship.png", "community-event.png"]

for name in files:
    im = Image.open(src / name).convert("RGB")
    w, h = im.size
    target_w = 2560 if w >= 1200 else 1800
    scale = target_w / w
    target_h = round(h * scale)
    im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
    im = im.filter(ImageFilter.MedianFilter(size=3))
    im = ImageEnhance.Contrast(im).enhance(1.08)
    im = ImageEnhance.Color(im).enhance(1.05)
    im = ImageEnhance.Brightness(im).enhance(1.02)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.35, percent=135, threshold=3))
    out_name = name.replace(".png", "-enhanced.jpg")
    im.save(out / out_name, quality=94, subsampling=0, optimize=True)
    print(f"{name}: {(w,h)} -> {im.size} => {out_name}")
