# Mobile media parity + hero autoplay hardening

**Date:** 2026-10-05
**Branch:** `mobile-media-parity`, from `main` at `7f6917a`. Production at the time was `7f6917a`.
**Status:** Preview only. Not merged, not deployed to production. Waiting for Freddie's review.
**Evidence:** `docs/review/mobile-media-parity/`

This is a reliability pass, not a redesign. Desktop stays the visual source of truth, and none of these change:

- Geo's approved V4 sequence and its frames
- the approved editorial cuts
- the copy

---

## 1. Diagnosis

**Reported:** the homepage hero film shows as a still image on mobile instead of moving.

### What was ruled out (verified)

**The production file is fine.** `https://tenambassadors.org/media/hero/ta-hero-film-geo.mp4` returns:

- `200`, `Content-Type: video/mp4`, `Accept-Ranges: bytes`, 4,075,051 bytes
- `206 Partial Content` for a `Range: bytes=0-1` request, so iOS can stream it
- no authentication and no preview-only dependency
- `Cache-Control: public, max-age=0, must-revalidate` with an ETag

The poster and backdrop return `200 image/jpeg` the same way.

**The encode is fine.**

- H.264 High profile, level 4.0, yuv420p, 24 fps
- 446 frames, 18.583 s
- `moov` ahead of `mdat` (faststart)

Every iPhone and Android phone in use can decode this.

**The code plays when the browser allows autoplay.** I tested the unchanged production code (`7f6917a`) in a Chromium that has real H.264 (Electron 44, Chromium 152) with phone emulation. It started in about 0.5 s and `currentTime` advanced normally.

**The live poster is the V4 poster.** Production's image-optimizer copies of the poster (AVIF and WebP at 640–1200 w) are byte-identical in size to freshly generated ones.

### Root cause

**The film itself was not broken. The old hero turned every case where the film does not start into a still image with no explanation.** Several of those cases are normal on iPhones:

| # | Situation on the phone | What the old code showed | Reproduced here |
|---|---|---|---|
| 1 | **Autoplay refused**: iOS Low Power Mode, an in-app browser (Instagram, LinkedIn, Gmail and other WKWebView apps), some Android battery or data savers | The poster, plus a 44 px corner icon that looked like the pause button | Yes: `01-hero-phone-before-after.jpg`, top middle |
| 2 | **Reduce Motion** turned on (iOS Settings › Accessibility › Motion), or Save-Data | The poster only. The film never mounted and there was no control at all | Yes: `01-…`, top right |
| 3 | **One reveal signal.** The film stayed at `opacity: 0` until `requestVideoFrameCallback` fired after `playing`, and the pause control appeared only then | If an engine never fires that callback for a video drawn at opacity 0, the film plays invisibly under the poster, with no control: exactly "a still image" | Not in Chromium, where the callback fires. WebKit could not be tested here, so I treat this as a credible iOS risk and removed it |
| 4 | **Late start.** Loading began only after the window `load` event (3.5 s fallback), with `preload="none"` | On cellular the poster sat alone for several seconds first | Yes: first frame at 3.7 s on throttled 4G |
| 5 | **No `autoplay` attribute**, and only one retry | The browser's own autoplay path was never used | n/a (code) |
| 6 | **Bitrate.** The 1.75 Mbps file paused 8 times in the first 25 s on a Slow 4G link (1.6 Mbps, 150 ms) | The film froze repeatedly mid-play | Yes |

**What I can't confirm without your phone:** which of states 1–3 your iPhone was in. Low Power Mode, Reduce Motion and opening the link inside an app are the three most common, and each one produced exactly the reported still with the old code.

**How to confirm:** open `/?mediadebug=1` on the phone. A small read-out names the state: `blocked`, `reducedMotion`, `dataSaver`, `playing` or `error`, with `readyState`, `currentTime` and the file.

### Two parity problems found on the way

1. **Navy bands on phones.** Geo's V4 film is 9:16, but the phone hero frame is 4:5. The CSS still hid the softened backdrop on portrait phones (a rule left from the earlier 4:5 cut), so the bands beside the film were flat navy. Desktop and tablets show the backdrop. Before and after: `01-…`, top left and bottom left.
2. **Reused filenames.** V4 replaced the earlier Geo cut under the same filenames (`ta-hero-film-geo*`). Production's caches had already turned over, but a reused name lets any browser, CDN or image-optimizer cache serve an older cut or poster for the same URL. It happened in this pass's local build: the image cache served the pre-V4 4:5 poster under the V4 poster URL.

---

## 2. Fix

### Hero film (`components/home/HeroFilm.tsx`)

**When it starts loading.** Once the poster (the LCP image) has painted and the page has loaded, and never more than 1.5 s after the poster or 3 s after hydration. It no longer waits indefinitely for `load`.

**The video element:**

- a real `<video autoplay muted playsinline webkit-playsinline loop preload="auto">`
- the `src` is on the element itself, so a missing file raises `error` on the video
- its `poster` is the `<picture>`'s current image
- `disablePictureInPicture` and `disableRemotePlayback`
- `muted`, `defaultMuted` and `playsInline`, plus the `muted`, `playsinline` and `webkit-playsinline` attributes, are set when the element attaches, before it loads (iOS checks them)

**Retries.** Event-driven, capped at 8 automatic attempts between successful starts, no polling. A retry runs on:

- `loadedmetadata`, `loadeddata` and `canplay`
- return to the tab (`visibilitychange`)
- a back/forward-cache restore (`pageshow` with `persisted`), which is how iOS Safari brings the homepage back
- the hero scrolling back into view

**After a refusal**, the visitor's next tap or key press anywhere starts the film, while the hero is in view. A user gesture is exactly what the OS asked for; this is not a bypass. A 6 s watchdog shows the Play control if the film is still paused at 0 s and not buffering.

**Reveal.** The film appears on the first painted frame (`requestVideoFrameCallback`) or the first `timeupdate` with progress, whichever comes first, so one missing signal can no longer hide a playing film. There is still no black flash: the video stays transparent until it has a frame, and the poster sits underneath.

**States.** `idle`, `still`, `reducedMotion`, `dataSaver`, `loading`, `playing`, `paused`, `blocked`, `error`. They are mirrored on the element as `data-state`, and `?mediadebug=1` shows them live.

**Controls:**

- **"Play film":** a labelled pill with a gold play disc, centred on the frame.
  - It appears when autoplay is refused, and as an opt-in with Reduced Motion or Save-Data.
  - With Reduced Motion or Save-Data, nothing downloads until it is tapped: `preload="none"`, no autoplay.
  - `play()` runs inside the tap, so iOS honours it.
  - Its position was checked against face boxes from 320 to 1920 px wide. It covers no face; on the first frame it sits on the tables.
- **Pause / resume:** the same small round control as before, in the same places.
  - A film the visitor paused never resumes on its own: not after a tab switch, not after scrolling away and back (WCAG 2.2.2).
- **On error:** one quiet reload after a dropped connection (`MEDIA_ERR_NETWORK`). Anything else keeps the poster.
- **Policy change:** turning Reduce Motion on while the film plays pauses it and offers Play.

### Media

**Versioned names.** The files are renamed with `git mv` and the bytes are unchanged, so the V4 sequence is untouched:

| New name | Old name | SHA-256 (unchanged) |
|---|---|---|
| `ta-hero-film-v4.mp4` | `ta-hero-film-geo.mp4` | `82d018ac…` |
| `ta-hero-film-v4-poster.jpg` | `ta-hero-film-geo-poster.jpg` | `66ce4078…` |
| `ta-hero-film-v4-backdrop.jpg` | `ta-hero-film-geo-backdrop.jpg` | `8cdd11aa…` |

`ta-hero-film-v4.plan.json`, the photo-credit key and `render_geo_v4.py`'s output name follow the new names.

**Phone encode, `ta-hero-film-v4-mobile.mp4`.** It is rendered by `scripts/hero_recut/encode_v4_mobile.py`. The approved film is re-encoded frame for frame:

- nothing is re-cut, re-framed or re-graded
- the same 446 frames, 720×1280, 24 fps, 18.583 s
- CRF 27 with a 1.2 Mbps VBV cap: about 1.25 Mbps on average
- a key frame every 2 s
- 2.90 MB instead of 4.08 MB
- SSIM 0.982 against the approved encode
- SHA-256 `c2885daa…`

The script can also render from Geo's 2160×3840 master with `render_geo_v4.py`'s exact ranges and graph.

Only portrait phones use it. Tablets and desktop keep the approved file.

On the same Slow 4G link, the old file paused to rebuffer 8 times in the first 25 s. The phone encode paused only once, at the loop restart, and only because that test had the cache disabled.

### Layout and CSS (`app/globals.css`, `components/home/Hero.tsx`)

- **Phone backdrop:** portrait phones now show the softened V4 backdrop in the side bands, matching desktop and tablets. Same 578-byte file.
- **Poster `sizes`:** each breakpoint now asks for the width the contained poster is actually drawn at. Preloads are grouped by still *and* size, and each still stays scoped to its own media query.

  | Breakpoint | Panel | `sizes` before | `sizes` now |
  |---|---|---|---|
  | Phone | 4:5 | `100vw` | `71vw` |
  | Portrait tablet | 1:1 | `100vw` | `57vw` |
  | Desktop | varies | `51vw` | `51vw` (unchanged) |

  In Lighthouse's phone emulation the poster download dropped from 39 KB to 34 KB.
- **Stale comments:** the CSS comments that still described a 4:5 film now describe the 9:16 film.
- **Focus ring:** the film controls get a visible gold focus ring.

### Other films

**Network Partners recap (`AmbientVideo.tsx`).** The same single-signal reveal risk existed here. The poster now dissolves on the first painted frame past the fade or the first `timeupdate` past it, whichever comes first. Its existing Play control for refused autoplay already worked, and was re-tested.

**Dr. Phang excerpt and full film (`VideoFeature.tsx`).** Already click-to-play with sound, with `play()` inside the tap. Tested on a phone and on desktop; no change needed.

**Stale runtime fallbacks.** None in runtime code. `ta-hero-sizzle`, `ta-hero-film-45`, the V2 cut and the 34.3 s cut appear only in historical scripts and docs. `ta-hero-film-geo*` no longer exists anywhere in `app/`, `components/`, `content/` or `lib/`.

---

## 3. Media audit

| File | Where | Format | Size | Delivery | Result |
|---|---|---|---|---|---|
| `hero/ta-hero-film-v4.mp4` | `/` desktop and portrait tablet | H.264 High@4.0, 720×1280, 24 fps, 446 fr, 18.58 s, 1.75 Mbps, no audio, faststart | 4.08 MB | Autoplay muted inline loop | Plays; `currentTime` advancing at 0.5/3/8/15 s at 768, 1024, 1440, 1920 |
| `hero/ta-hero-film-v4-mobile.mp4` | `/` portrait phones | The approved frames re-encoded: H.264 High@4.0, 720×1280, 24 fps, 446 fr, 18.58 s, ≈1.25 Mbps (CRF 27, 1.2 Mbps VBV), GOP 2 s, faststart; SSIM 0.982 | 2.90 MB | Autoplay muted inline loop | Plays at 320–430 px; smooth on Slow 4G |
| `hero/ta-hero-film-v4-poster.jpg` | Hero poster, all breakpoints except landscape | 720×1280 JPEG | 141 KB source; 34–39 KB AVIF served | `<picture>`, eager, `fetchpriority=high`, scoped preloads | LCP element in every Lighthouse run |
| `hero/ta-hero-film-v4-backdrop.jpg` | Hero side bands | 36×64 JPEG, blurred and darkened | 578 B | CSS background | Shown at every portrait or desktop breakpoint |
| `hero/ta-hero-landscape-a7r00711.jpg` | Hero, landscape phones and tablets | 1600×1100 | 167 KB | `<picture>` source | Unchanged approved still (see §5) |
| `scholarship/dr-phang-excerpt.mp4` | `/` | H.264 High@4.0 1920×1080 30 fps + AAC, 38.45 s, 1.52 Mbps, faststart | 7.31 MB | Click to play with sound | Plays with sound after the tap (390 and 1440) |
| `scholarship/dr-phang-film.mp4` | `/scholarship/dr-christopher-a-phang` | H.264 High@4.0 1920×1080 30 fps + AAC, 57.45 s, 1.43 Mbps, faststart | 10.28 MB | Click to play with sound | Plays with sound after the tap (390) |
| `community/ta-recap-community.mp4` | `/network-partners`, 4:5 | H.264 High@4.0 864×1080 30 fps + AAC, 19.0 s, faststart | 3.77 MB | Muted ambient when ≥40% visible | Plays (390); refused autoplay shows Play, and the tap plays |
| `community/ta-recap-community-wide.mp4` | `/network-partners`, 16:9 (tablets, landscape phones) | H.264 High@4.0 1280×720 30 fps + AAC, faststart | 2.63 MB | Same | Plays (768 portrait, 844×390 landscape) |
| `starlight/ta-starlight-night-{wide,tall}.jpg` | `/` Starlight chapter | 2400×1350 / 900×1600 | 84 / 52 KB | Lazy `<picture>` | Unchanged |

**next/image audit.** 30 rendered images across all 11 routes at 390×844 (DPR 3) and 1440×900, comparing requested width with drawn width × DPR:

- No image downloads more than 2.6× what it draws.
- None downloads less than 0.75× what it draws, except where the source itself is smaller (the 720 px poster on DPR 3 phones).
- Above-the-fold images are eager; the rest are lazy.

**Credits.** No credit changed. The hero credit moved with its file to the `ta-hero-film-v4-poster.jpg` key. It still reads "Footage: The Upmixer event archive", and its internal basis note now names the V4 reel.

---

## 4. Test matrix

### Engines and what they prove

| Engine | Where | Real H.264 | What it covers |
|---|---|---|---|
| **Electron 44 (Chromium 152)** with phone emulation (touch, mobile viewport, DPR, Android UA) | Cloud | Yes | Every playback test below. This is emulation of a phone in Blink, not a phone |
| **Bundled Playwright Chromium (Lighthouse)** | Cloud | No | LCP, CLS, TBT. The film cannot decode there, which does not affect the poster metrics |
| **Real iPhone Safari** | — | — | **Not available in this session, so there is no device pass.** No WebKit engine was available either |

### Refused autoplay

Chromium allows muted autoplay even with `--autoplay-policy=user-gesture-required`, so I simulated a refusal: a script blocks both the `autoplay` attribute and `play()` without a user gesture. This is how iOS Low Power Mode and in-app browsers behave. It is a **simulation of the policy, not iOS itself**.

### Playback proof (local production build, real H.264)

Readings are `currentTime` in seconds after navigation. `readyState` was 4 and `paused` false at every playing reading, and `videoWidth`×`videoHeight` was 720×1280 throughout.

| Viewport | File | 0.5 s | 3 s | 8 s | 15 s |
|---|---|---|---|---|---|
| 320×568 | mobile | 0.02 | 2.51 | 7.51 | 14.51 |
| 375×667 | mobile | 0.06 | 2.57 | 7.57 | 14.57 |
| 390×844 | mobile | 0.03 | 2.53 | 7.53 | 14.53 |
| 393×852 | mobile | 0.03 | 2.53 | 7.53 | 14.53 |
| 430×932 | mobile | loading | 2.48 | 7.49 | 14.48 |
| 768×1024 | approved | loading | 2.40 | 7.40 | 14.40 |
| 1440×900 | approved | loading | 2.40 | 7.40 | 14.40 |
| 1920×1080 | approved | 0.02 | 2.49 | 7.49 | 14.49 |
| 844×390 / 667×375 landscape | — | approved still, no film (by design) | | | |

### Networks

| Network | First frame | Rebuffers | Notes |
|---|---|---|---|
| Cold cache, fast | ≈0.5 s | 0 | |
| Warm cache | 0.38 s | 0 | |
| Slow 4G (1.6 Mbps, 150 ms), cold, cache disabled | 3.7 s | 1, at the loop restart (cache disabled) | `currentTime` 1.3 / 4.3 / 11.3 s at 5 / 8 / 15 s. Old file on the same link: 8 rebuffers |
| Slow 4G, warm | 0.69 s | 0 | |
| "Fast 3G" (1.44 Mbps, 562 ms), cold | 5.7 s | 1, at the loop restart (cache disabled) | Plays straight through |

### States and interactions (390×844)

| Scenario | Result |
|---|---|
| Reduced Motion | `reducedMotion`. Nothing downloaded (`readyState` 0, no autoplay). "Play film" shown; the tap plays (2.95 s after 3 s) |
| Save-Data | `dataSaver`, same behaviour; the tap plays |
| Autoplay refused, tap "Play film" | `blocked` with the pill; after the tap, `playing` with `currentTime` advancing |
| Autoplay refused, tap elsewhere on the page | Starts on that tap |
| Background → foreground | Pauses while hidden; resumes on return (2.58 → 5.29 s) |
| Visitor pauses, then tab switch and scroll away and back | Stays paused (`paused`, 2.58 s); resumes only on the visitor's tap |
| Scroll the hero out of view and back | Pauses off-screen; resumes in view |
| Rotate to landscape and back | Landscape shows the still; back in portrait the film reloads and plays |
| Navigate away and back | Plays again (Electron reloads rather than restoring from the back/forward cache, so the `pageshow` path is covered by code only) |
| `/?mediadebug=1` | Read-out shows `hero film: playing (phone)`, `t`, `ready 4`, file and size |

### Overlay and framing checks

- **Whole frame visible.** At 320, 375, 390, 393, 430, 768, 1024, 1440 and 1920 px the film uses `object-fit: contain`, and its drawn rectangle lies inside the panel. CSS crops nothing.
- **Faces and overlays.** YuNet face boxes on every quarter second of the film, with head allowance, checked against the credit, the pause control, "Play film" and the phone/tablet headline overlap:
  - no real face is covered;
  - the one hit (18.0 s) is a detector false positive on the speaker's hands, checked visually.
- **Frame edges.** About 29 head boxes per breakpoint touch the frame edge. That count is the same at every breakpoint, because it comes from Geo's own 9:16 framing, not from CSS.

### Routes

All 11 routes (`/`, `/about`, `/scholarship`, `/scholarship/dr-christopher-a-phang`, `/mentorship`, `/service`, `/network-partners`, `/partners`, `/get-involved`, `/contact`, `/starlight`) were swept at:

- **Phones:** 320×568, 375×667, 390×844, 393×852, 430×932
- **Tablet:** 768×1024
- **Desktop:** 1440×900, 1920×1080
- **Landscape:** 844×390

That is 99 page loads, each scrolled through.

| Check | Result |
|---|---|
| Console errors or warnings | 0 |
| Uncaught exceptions | 0 |
| Unhandled `play()` rejections | 0 |
| Hydration warnings | 0 |
| HTTP ≥ 400, including media | 0 |
| Broken images | 0 |
| Horizontal overflow | None |
| CLS | 0 everywhere except `/` at 1440×900 (0.0002, unchanged from before) |

### Lighthouse (bundled Chromium, median of 5 runs, local production build)

| Run | Perf | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|
| Mobile, before (`7f6917a`), run 1 | 92 | 1174 ms | 2849 ms | 182 ms | 0 |
| Mobile, before (`7f6917a`), run 2 | 90 | 1526 ms | 3457 ms | 56 ms | 0 |
| Mobile, after | 92 | 1218 ms | 3075 ms | 128 ms | 0 |
| Desktop, before (median of 3) | 100 | 415 ms | 730 ms | 12 ms | 0 |
| Desktop, after (median of 3) | 100 | 420 ms | 786 ms | 10 ms | 0 |

Accessibility, Best Practices and SEO stayed at 100 throughout. The differences are within run-to-run noise; the LCP element is the hero poster in every run.

**A start-time decision behind these numbers.** A first version started the film as soon as the poster loaded. In Lighthouse's simulation the film download then competed with the page, and FCP rose to about 1.5 s. Waiting for `load`, but never more than 1.5 s after the poster, removed that.

### Commands

| Command | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run build` | Pass (all routes static) |
| `git diff --check` | Clean |
| Windows (`next build`) and the Vercel Preview | See §6 |

---

## 5. Platform limits (stated plainly)

- **No real iPhone was available.** Everything above is Chromium with real H.264 under phone emulation, plus a simulated refusal policy. Please open the Preview on your iPhone, ideally once with Low Power Mode on and once from inside an app such as Messages → Safari, or Instagram. `?mediadebug=1` names the state.
- **iOS Low Power Mode, and some in-app browsers, refuse autoplay outright.** No website can override this, and this pass does not try to. The site shows a clear "Play film" control and starts on the visitor's first tap.
- **Reduced Motion and Save-Data are respected.** Nothing moves or downloads until the visitor chooses Play.
- **Landscape phones and tablets show the approved still (A7R00711), not the film.** This is the approved art direction from the Geo revision, so I did not change it. If you want the film in landscape too, it is a one-line change in `content/media.ts`: give the `tablet-landscape` variant `mp4: heroFilmV4Mobile`. It would show as on desktop: the whole 9:16 film over the backdrop.
- **The Dr. Phang films are 1080p (7.3 MB and 10.3 MB).** They only load when tapped, and progressive download starts playback quickly. A 720p phone derivative would be a later, optional optimisation.

---

## 6. Push and Preview

The branch is pushed as `mobile-media-parity`, and a **Vercel Preview** is deployed from it. Nothing is merged and production is not touched.

The Preview URL and the checks run against it are recorded below once it is live.

*(Preview results: see the follow-up commit on this branch.)*

---

## 7. Preserved

**Proof:** I compared 20 routes, before (`7f6917a`) against after, on three things:

- the visible text of every page;
- the `<title>`, description, canonical, Open Graph and Twitter tags;
- every external, `mailto:` and form link.

There are **0 differences**.

So all of these are unchanged:

- the young-professionals wording and the fundraiser wording
- the collage hierarchy
- the rejected red-lit mentorship photo stays removed
- the Dr. Phang edit, and the hidden scholarship sections
- the Network Partners recap
- the Starlight treatment
- the photo credits
- the alcohol reduction
- the domain, SEO metadata and form routing

No copy changed.

## 8. Files

| File | Change |
|---|---|
| `components/home/HeroFilm.tsx` | Rewritten playback logic (states, retries, reveal, controls, debug read-out) |
| `components/home/Hero.tsx` | Per-breakpoint poster `sizes`; preload grouping; comment |
| `components/ui/AmbientVideo.tsx` | Two-signal reveal |
| `app/globals.css` | Phone backdrop; "Play film" styles and focus ring; comments |
| `content/media.ts` | Versioned files; phone encode on the phone variant |
| `content/attributions.ts` | Credit key and basis note |
| `public/media/hero/ta-hero-film-v4*.{mp4,jpg}` | Renamed with the same bytes |
| `public/media/hero/ta-hero-film-v4-mobile.mp4` | New phone encode |
| `scripts/hero_recut/encode_v4_mobile.py` | New |
| `scripts/hero_recut/render_geo_v4.py`, `scripts/hero_recut/ta-hero-film-v4.plan.json` | Output name / rename |
| `docs/ASSET_MAP.md` | Hero file list |
| `docs/MOBILE_MEDIA_PARITY_REPORT.md` | This report |
| `docs/review/mobile-media-parity/*.jpg` | Evidence |
