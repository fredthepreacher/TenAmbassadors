# Asset map: Approved Assets V2 (FINAL)

Source: `Ten_Ambassadors_Approved_Assets_V2_FINAL.zip`, creative-reviewed. Web copies are produced by `scripts/prepare_v2_assets.py`. Originals kept for comparison are in `assets/approved-v2-originals/` and are not served.

**Treatment rule:** the site uses the package's "Enhanced" files as delivered. The only edits made here are cropping and poster-frame extraction. There are no tonal, face, body, or identity changes.

| Package file | Web file | Used in | Treatment |
|---|---|---|---|
| `01_Hero/TA_Hero_IMG_3977_Enhanced.jpg` (1536×1025) | `public/media/hero/ta-hero-img-3977.jpg` | Homepage hero | As delivered |
| `01_Hero/TA_Hero_IMG_3977_Original.jpeg` | `assets/approved-v2-originals/` | Comparison only | — |
| `02_Mentorship/…478-479-AllseeinJah-2292_Enhanced.jpg` (1365×1741) | `public/media/mentorship/ta-mentorship-2292.jpg` | Home mentorship (generational), `/mentorship` hero | As delivered |
| `02_Mentorship/…492-493-AllseeinJah-2321_Enhanced.jpg` (1365×2048) | `public/media/mentorship/ta-mentorship-2321.jpg` (1150×820) | Home mentorship (peers), `/mentorship` Become a Mentor | **Crop only** to head-and-shoulders. The full frame includes a drink and a club T-shirt logo that read as nightlife. The full frame is kept in `assets/`. |
| `03_Community_Professionals/…499-500-AllseeinJah-2342_Enhanced.jpg` (1365×1643) | `public/media/community/ta-community-2342.jpg` | Home "Opportunity in motion", `/mentorship` Ambassador pathway | As delivered |
| `03_Community_Professionals/TA_Community_Professionals_A7R00711_Enhanced.jpg` (2048×1366) | `public/media/community/ta-community-a7r00711.jpg` | Home "Opportunity in motion", `/about` hero | As delivered |
| `03_Community_Professionals/A7R00711_Original.JPG` | `assets/approved-v2-originals/` | Comparison only | — |
| `04_Dr_Phang_Scholarship/…01m19s-01m49s_30sec.mp4` | `public/media/scholarship/dr-phang-30s.mp4` | Home featured scholarship | Byte-for-byte copy (H.264/AAC, already faststart) |
| `04_Dr_Phang_Scholarship/…01m00s-02m00s.mp4` | `public/media/scholarship/dr-phang-60s.mp4` | `/scholarship/dr-christopher-a-phang` | Byte-for-byte copy |
| Frames from both films | `…/dr-phang-30s-poster.jpg`, `…/dr-phang-60s-poster.jpg` | Video posters, scholarship list | Extracted wide two-shot frames, cropped to the picture area to exclude the burned-in timecode strip |

## Notes for the client

1. **The films contain burned-in production overlays:** timecode, a `CAL_230331` clip label, and a faint third-party "Cineflix" watermark (most visible on close-ups). Posters avoid them, but they appear during playback. Please:
   - confirm usage rights for this footage
   - supply a clean export without timecode or watermark if one exists.
2. **Captions and transcript:** the films have audio. Captions (WebVTT) and a transcript are needed for accessibility. The player adds the caption track automatically once `captions` is set in `content/media.ts`.
3. **Dr. Phang's years:** "1968–2023" is used because it appears on the film's end card. Please confirm it with the family or client before launch.
4. **Resolution:** the hero is 1536px wide. It is sharp at standard density but slightly soft on large high-DPI screens. A higher-resolution original (or a larger export of the enhanced file) would help.
5. **V1 screenshot images** (`public/images/`) are no longer referenced by the site. They are kept per the earlier instruction not to delete source images and can be removed once the client agrees.
