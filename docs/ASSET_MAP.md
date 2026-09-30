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

## V2.2 — curated photography and film revision (2026-09-29)

Source: `Ten_Ambassadors_V2_2_Claude_Handoff.zip`. Pipeline: `scripts/prepare_v22_assets.py`, which crops and cuts only. The originals are kept in `assets/approved-v22-originals/`.

**The handoff's photo descriptions did not match the files.** With the client's direction ("judgment call"), the photos were placed by what each image actually shows:

| File | What it actually shows | Decision | Web file / placement |
|---|---|---|---|
| IMG_4007 (enhanced) | Seven women dressed for an evening event, posed and smiling | **Used**: the wide cinematic "One community. Many networks." image | `public/media/community/ta-community-4007.jpg` (1984×1044; crop trims top/bottom only). Used on the homepage Network section and on `/network-partners`. |
| IMG_4004 (enhanced) | Three women at an evening event; one holds a martini glass, another a cup | **Used, cropped** to a head-and-shoulders band that excludes the drinks | `public/media/community/ta-community-4004.jpg` (1250×435). Used on `/about#ecosystem`. |
| IMG_4006 | A packed nightclub dance floor, DJ rig, and a large **"#UPMIXER"** screen. It is *not* two professionals in conversation | **Not used.** It reads as nightlife and as an Upmixer event, which the brief says to avoid. | — |
| IMG_4001 | Three people at a bar with liquor bottles and a posted choking first-aid notice | **Not used** (optional; nightlife context) | — |

Mentorship keeps the V2 photos (478-479-2292 and 492-493-2321), because no supplied image shows a mentoring conversation. **Still needed:** a real photo of two professionals in conversation for Mentorship.

### Dr. Phang film — homepage cut

| | |
|---|---|
| Requested | about 01:19 → 02:04 (about 45 s) |
| Delivered | **01:19.00 → 01:58.55 (39.55 s)** |
| Why | The supplied source (`Dr_Phang_Scholarship_01m00s-02m00s.mp4`) ends at 02:00. 01:58.55 is the last natural pause, on the held end card. |
| Fades | Video and audio fade in over 0.9 s and out over 1.5 s |
| File | `public/media/scholarship/dr-phang-featured.mp4`: 1920×1080 H.264 High, AAC 128k, faststart, **7.29 MB** (1.47 Mbps) |
| Unchanged | Framing, player UI, poster, and the watermark/timecode (not covered), plus the media-clearance note. The 60-second scholarship-page film is unchanged. The 30-second file is kept but no longer referenced. |

To reach 02:04, supply the source that runs past 02:00 and re-run the script with `end = 64.0` (adjusted to a natural pause).
