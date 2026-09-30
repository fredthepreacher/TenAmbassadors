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
| IMG_4006 (**original**) | A crowded evening event (DJ rig and a "#UPMIXER" screen at the top of the frame). Right of centre, two men in dark jackets stand face to face in conversation | **Used, cropped** to that two-person conversation (client-selected for Mentorship, follow-up of 2026-09-29). The crop excludes the screen, DJ rig and dance floor. | `public/media/mentorship/ta-mentorship-4006.jpg` (420×300, native). Homepage Mentorship inset, captioned "In conversation". |
| IMG_4001 | Three people at a bar with liquor bottles and a posted choking first-aid notice | **Not used** (optional; nightlife context) | — |

**IMG_4006 notes.**

- ORIGINAL was chosen over ENHANCED. Tone is identical, but the enhanced master's sharpening adds visible noise on the faces at crop size; the original's grain reads more naturally.
- The crop is only 420×300 px, framed tight so the conversation reads first. That is sharp at the inset's rendered size (about 210–340 CSS px) at standard density and on phones, but slightly soft on high-DPI desktop screens, so it is **not** used in larger slots.
- The event's magenta stage lighting is kept as shot (no tonal edits).
- A higher-resolution or daylight conversation photo would allow a larger placement later.

Mentorship now uses:

- **Homepage:** 478-479-2292 (large, "Across generations") and IMG_4006 (inset, "In conversation").
- **`/mentorship`:** unchanged. The hero is 2292; the "Become a Mentor" track is 2321, which stays in use there.

### Dr. Phang film — homepage cut

| | |
|---|---|
| Requested | about 01:19 → 02:04 (about 45 s) |
| Delivered | **01:19.00 → 02:00.00: exactly 41.00 s** (1,230 frames at 30 fps; the audio stream is also 41.00 s) |
| Why | The supplied source (`Dr_Phang_Scholarship_01m00s-02m00s.mp4`) ends at 02:00. The cut runs to that natural endpoint. Nothing is looped, slowed or extended. It closes on the held end card. |
| Fades | Video and audio fade in over 0.9 s and use a cinematic fade-out over 1.75 s (39.25 → 41.00). The fade begins in the natural pause at about 01:58.2, so the last words fade out cleanly. |
| File | `public/media/scholarship/dr-phang-featured.mp4`: 1920×1080 H.264 High, AAC 128k, faststart, **7.37 MB** (7,366,995 bytes; 1.44 Mbps) |
| Unchanged | Framing, player UI, poster, and the watermark/timecode (not covered), plus the media-clearance note. The 60-second scholarship-page film is unchanged. The 30-second file is kept but no longer referenced. |

If Geo supplies clean footage past 02:00, re-run the script with `end = 64.0` (adjusted to a natural pause) for the full ~45 s version. Also update `durationLabel` in `content/media.ts`.

## V2.4 — community recap film (2026-09-30)

Source: `Ten_Ambassadors_V2_4_Video_SEO_AEO_Handoff.zip`. It is 00:16–00:35 of the client-supplied Recap Reel V2. The footage comes from the wider Upmixer event community and is **not** a record of Ten Ambassadors programs. The caption on the site says so.

| | |
|---|---|
| Master (kept, not served) | `assets/recap-master/TenAmbassadors_Recap_16-35_Horizontal_1080p.mp4`: 1920×1080, 19.0 s (video track 18.3 s), H.264/AAC, 30 fps, 11.7 MB. The poster master is kept alongside it. |
| Web derivative | `public/media/community/ta-recap-community.mp4`: **864×1080**, a centre 4:5 crop containing the full vertical footage plus a sliver of blurred fill. It is at native resolution (no scaling), H.264 High CRF 25, AAC 128k, faststart, **3.77 MB** (1.59 Mbps). The edit, fades and burned-in captions are unchanged. |
| Poster | `public/media/community/ta-recap-community-poster.jpg`: the supplied poster, cropped the same way (864×1080, 86 KB). It is served through `next/image`. |
| Placement | Homepage, **"One community. Many networks."** section (`#network`), in the right column beside the Network Partner copy. IMG_4007 stays as the section's wide image. |
| Behavior | `components/ui/AmbientVideo.tsx`: the source is attached only near the viewport. The film plays muted, inline and looping while at least 40% visible, and pauses off-screen. There is a visible Pause/Play control plus "Play with sound" (native controls, from the start). With reduced motion or Save-Data it does not autoplay and shows the poster with a Play control. There is never autoplay audio. |
| Pipeline | `scripts/prepare_v24_recap.py` |

The client should confirm that everyone shown in the recap agreed to appear in promotional use.
