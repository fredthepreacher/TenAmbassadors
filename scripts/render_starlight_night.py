"""Geo meeting revision (2026-10-04): the homepage Starlight chapter's static background.

Renders the Starlight Awards 2026 site's own hero art (night-sky gradient, stars, Manhattan skyline
and light tree; SVGs copied unchanged into assets/starlight-art/ from the Starlight project's
/art/ folder) to two JPEGs, with motion off so the light tree is fully drawn:

  public/media/starlight/ta-starlight-night-wide.jpg  2400x1350  (tablets, desktop)
  public/media/starlight/ta-starlight-night-tall.jpg   900x1600  (phones; tree smaller, at the right)

Usage: python3 scripts/render_starlight_night.py   (needs Playwright + Chromium and Pillow)
"""
import asyncio
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
ART = ROOT / "assets" / "starlight-art"
OUT = ROOT / "public" / "media" / "starlight"
VARIANTS = [("wide", 2400, 1350, "9%", "86%"), ("tall", 900, 1600, "-22%", "62%")]


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, w, h, right, height in VARIANTS:
            pg = await b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1, reduced_motion="reduce")
            await pg.goto((ART / "hero.html").as_uri())
            await pg.evaluate(f"document.documentElement.style.setProperty('--tr','{right}');document.documentElement.style.setProperty('--th','{height}')")
            await pg.wait_for_timeout(800)
            png = OUT / f"_{name}.png"
            await pg.screenshot(path=str(png))
            Image.open(png).convert("RGB").save(OUT / f"ta-starlight-night-{name}.jpg", quality=82, optimize=True, progressive=True)
            png.unlink()
        await b.close()


asyncio.run(main())
