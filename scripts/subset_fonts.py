"""
Font delivery optimization (V2.3) — same typefaces, same outlines, fewer bytes.

The site ships Newsreader and Inter Tight as full variable fonts (wght 200–800 /
100–900), but only a few weights are ever rendered (audited on every route at
390 px and 1440 px, 2026-09-30):

  Newsreader  400 normal · 400 italic · 600 normal (only /partners headings)
  Inter Tight 400 · 500 · 600  (400 italic is synthesized, as before)

fontTools' instancer pins/limits the wght axis to exactly those locations.
Glyph outlines at those weights are unchanged (the source fonts are unhinted,
so rasterization is identical). Sources stay in assets/fonts-source/ (not served).

  python scripts/subset_fonts.py        (requires: pip install fonttools brotli)
"""
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

root = Path(__file__).resolve().parent.parent
src, out = root / "assets/fonts-source", root / "app/fonts"

JOBS = [
    ("newsreader-latin-wght-normal.woff2", {"wght": 400}, "newsreader-latin-400-normal.woff2"),
    ("newsreader-latin-wght-normal.woff2", {"wght": 600}, "newsreader-latin-600-normal.woff2"),
    ("newsreader-latin-wght-italic.woff2", {"wght": 400}, "newsreader-latin-400-italic.woff2"),
    ("inter-tight-latin-wght-normal.woff2", {"wght": (400, 600)}, "inter-tight-latin-wght400-600-normal.woff2"),
]

for source, location, target in JOBS:
    original = TTFont(src / source)
    font = instancer.instantiateVariableFont(TTFont(src / source), location)
    # Keep the source's average character width: browsers use it to size form
    # controls (e.g. an <input>'s default width), so recalculating it would
    # shift layouts by a few pixels.
    font["OS/2"].xAvgCharWidth = original["OS/2"].xAvgCharWidth
    font.flavor = "woff2"
    font.save(out / target)
    print(f"{target}: {(out / target).stat().st_size:,} bytes (from {(src / source).stat().st_size:,})")
