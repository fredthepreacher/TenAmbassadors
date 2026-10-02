# Geo 10-point revision — report

**Date:** 2026-10-02
**Branch:** `geo-revision-2026-10-02`, based on `phase1-v2-visual` @ `6d3102b`, which is the same commit production runs.
**Preview:** https://tenambassadors-idku143kp-wavysites-projects.vercel.app (`dpl_A1kLzKBAzKP83iMTwTLZgCJzUyzZ`, target: preview, Vercel Authentication on, served with `x-robots-tag: noindex`). Preview only; production and the production alias are untouched.

**Source of requests:** Geo's Oct 2 screen recording, as written up in the revision brief.

**Asset source:** `TenAmbassadors_Geo_Revision_Assets` (45 images plus `ASSET_INDEX.json`). Every image was reviewed against Geo's exact descriptions.

**Client direction during the pass:** no stand-in photos and no placeholders for Geo's missing images. Any section waiting on a Geo photo keeps its current approved image, with the slot wired so the real file drops in later.

## Asset reconciliation

| Geo's description | Result | File used |
|---|---|---|
| Man passing out a business card | **Matched** | `TA_Hero_IMG_3977` (approved hero; Approved Assets V2) |
| "White people picture": group with a drink held by the man | **Matched** | `V2_2_Claude_Handoff/IMG_4001_ORIGINAL.jpeg` |
| Two women, `AllseeinJah.com (15 of 424)[84].jpg` | **Missing** | No "(n of 424)" files in the folder. The AllseeinJah files present are a different series (2271–2356, Summer 2016), and none fits. |
| `A7306914.jpg`, people sitting and talking | **Missing** | No such file, and no seated-conversation photo |
| Man speaking on stage, red lighting | **Missing** | No stage photos in the folder |
| "All orgs" group with DJ equipment and wires on the left | **Missing** | Closest is IMG_4007 (eight women posing), but it has no DJ gear and is already on the site. Not used. |
| `010-AllseeinJah.com (13 of 639).jpg`, two people with two drinks | **Missing** | No such file. The only table-with-drinks shot (2271) shows four women standing. |
| Three people in Jopwell shirts | **Missing** | Not present |
| Geo speaking on stage | **Missing** | Not present |

These are most likely the files Geo attached to his email or screen recording, not files from the asset ZIPs. Missing files are recorded in `content/media.ts`, under `geoPending`.

## Point by point

### 1 · Source attribution on every photograph

**Status: done (system and confirmed labels). Most sources are still pending from Geo.**

- **Implementation**
  - `content/attributions.ts` is one registry keyed by served file path.
  - `<PhotoCredit src=…/>` renders the label in the bottom-right corner (`.photo-credit`): 11 px Inter Tight on a 62% navy, blurred pill, which keeps contrast at least 7:1 over any photo.
  - Labels never take pointer events and brighten on hover or touch.
  - In the mobile hero, the label sits above the copy overlap so it never covers faces.
  - `creditText()` supplies the same text to captions; the site has no lightbox yet, so any future lightbox carries it automatically.
- **Rules**
  - A label renders only when its status is `confirmed`.
  - The year is included only when known.
  - Nothing is guessed. Leads found in file metadata live in a non-rendered `lead` field.
  - Unconfirmed photos show a dashed "Source pending" tag only while `site.showPlaceholderNotes` is on (reviewer mode).
- **Confirmed now**

  | Photo | Label | Basis |
  |---|---|---|
  | 2292, 2321, 2342 | "Photo: AllseeinJah.com" | Photographer's own file naming |
  | IMG_4006 | "Upmixer event" | The #UPMIXER screen is visible in the frame; year unknown, so omitted |
  | Dr. Phang film stills | "Still from the Dr. Christopher A. Phang Scholarship film" | Extracted from the approved film |
  | Recap posters | "Upmixer event recap" | Client handoff V2.4. The recap is a video; its visible caption already states the source, so no corner label is added over the player controls. |

- **Pending:** IMG_3977, IMG_4001, IMG_4004, IMG_4007 and A7R00711.
  - A7R00711's camera metadata reads 2018-12-12, which may match Geo's "Circa Upmixer Holiday Event, 2018". It stays pending until confirmed.
- **Audit:** every `/media/` photo on all 15 routes at 390 and 1440 has a label or a pending tag, and none sits outside its frame.

### 2 · Human-centered hero video and four-photo collage

**Status: hero film live (client handoff, see "Real-photo hero film" below). Collage live.**

- **Hero film**
  - `HeroFilm` is a silent, muted, `playsInline`, looping layer above the poster.
  - It loads only after the window `load` event. The poster stays the LCP element.
  - Layers:

    | Layer | Behavior |
    |---|---|
    | Poster | Remains visible underneath |
    | Film | Fades in only once frames are playing, so there is no blank frame and no CLS |
    | Pause/Play button | 44 px, top-right (WCAG 2.2.2). Pausing is respected when the visitor scrolls away and back. |

  - Falls back to the poster with reduced motion, Data Saver or blocked autoplay.
  - Load errors keep the poster.
  - A portrait cut (`mobileMp4`) is served to phones when supplied.
  - Overlay: the existing edge-only gradients; there is no full-screen wash.
- **QA with a temporary test clip (not committed)**
  - Plays on desktop and phone.
  - Pause works and survives scrolling away and back.
  - Reduced motion → no `<video>`.
  - 404 → poster stays and no control appears.
  - CLS ≤ 0.0002, and the LCP element is still the poster image.
- **To activate:** set `heroFilm` in `content/media.ts` (16:9 MP4 plus an optional WebM and portrait MP4). Then set `media.hero` to a poster frame from the film, and the business-card photo moves into the collage automatically.
  - No AI film generator is available in this environment, so the film still needs to be produced to the creative direction in the brief.
- **Collage**
  - `components/home/Collage.tsx` sits directly below the hero.
  - It is an editorial composition: lead frame 4:3, a portrait frame offset downward, a landscape frame, and one overlapping inset with an ivory mat and shadow for depth.
  - Reveal is staggered at 0 / 120 / 240 / 360 ms.
  - Hover adds 2.5% image depth and a gold edge. On touch, the same plays as each frame crosses mid-screen.
  - Every tile carries its source label.
  - On phones it becomes a full-width lead, two side-by-side portraits with a stagger, and an overlapping full-width inset.
- **Assets**
  - IMG_3977, which moves from the hero.
  - IMG_4001: the drink was removed by **cropping only**. The frame now ends above the man's hand (2048×1530 from 2048×1857), so no hand, body or face was retouched.
    - Original: `assets/geo-revision-originals/IMG_4001_ORIGINAL.jpeg`.
    - Web file: `public/media/collage/ta-collage-4001.jpg`.
    - The bar shelf at top right is still in frame because it can't be cropped without cutting a person.
- **Missing:** the two-women photo and A7306914. Per client direction the collage renders only when all four tiles have real photos; there are no placeholders.

### 3 · Abstract image for "One community. Many networks."

**Status: done.**

- The homepage group photo (IMG_4007) is replaced by `components/ui/NetworkConstellation.tsx`, an inline SVG with no people.
  - Nine community clusters, each with a gold hub, linked by cobalt pathways and gold bridges.
  - Faint meridians and star dust in navy, ivory, cobalt and restrained gold.
- It is generated from a fixed seed, so it is identical on every render, sharp at any size and only a few kB.
- Motion: three gold light pulses travel along the gold bridges and the hubs glow gently. With reduced motion it is fully static.
- The title "One community. *Many networks.*" is unchanged and still sits over the artwork.

### 4 · Foundation-year disclaimer removed

**Status: done.**

- The note "This is where Ten Ambassadors is going — not a claim about where it is today. 2026 is our foundation year." is deleted, together with its container and its `note` prop.
- The Global outlook section now closes on a short gold rule that draws in. Spacing is rebalanced and no replacement disclaimer was added.
- The separate Impact-section sentence ("…is in its foundation year…") is different copy and was not part of the request. Left unchanged.

### 5 · Future Ambassador pathway image

- **Status: blocked on Geo's file.**
- The slot is wired (`geoPending.futureAmbassadorStage` → `/mentorship` Pathway B). The current approved image (2342) stays.

### 6 · Network Partners image ("all orgs", DJ gear removed)

- **Status: blocked on Geo's file.**
- The slot is wired (`geoPending.networkAllOrgs` → `/network-partners` wide image), and the required edit is recorded. The current approved image (IMG_4007) stays.

### 7 · Mentorship pathway image (two drinks removed)

- **Status: blocked on Geo's file.**
- The slot is wired (`geoPending.mentorshipTable` → `/mentorship` Pathway A), and the edit is recorded. The current approved image (2321) stays.

### 8 · Corporate Partners & Sponsors: Jopwell photo on the right

- **Status: blocked on Geo's file.**
- `/partners` passes `geoPending.sponsorJopwell` to the page hero's image panel. When the file is set, the layout becomes copy and CTAs on the left, image on the right; on phones the image sits directly under the CTAs. The CTA hierarchy is unchanged.

### 9 · About: Geo speaking on stage

- **Status: blocked on Geo's file.**
- The slot is wired (`geoPending.aboutGeoStage` → `/about` hero). The current approved image (A7R00711) stays.

### 10 · Social connections, Privacy, Terms, Accessibility

**Status: done (architecture and drafts). URLs and contact details are still pending from Geo.**

- **Footer "Connect"**
  - Email chip from `lib/site.ts` → `contact.email`.
  - LinkedIn, Instagram, Facebook and YouTube from `content/navigation.ts` → `socialLinks`.
  - `otherContacts[]` for any other approved destination.
  - All chips are 44 px. Missing links render as disabled "coming soon" chips, and no URLs were invented.
  - The Organization schema's `sameAs` fills automatically from verified URLs only.
- **Legal pages:** Privacy, Terms and Accessibility are written in plain language from what the site actually does, verified in code:
  - forms are disabled previews;
  - no analytics, cookies or third-party embeds;
  - fonts and media are self-hosted.
- **Not claimed:** no security, retention, data-selling, regulatory or certification claims.
  - The Accessibility page lists only features that are implemented: keyboard navigation and skip link, focus rings, landmarks, contrast, alt text, responsive layout, reduced motion, pausable films and labelled fields.
- The pages are marked "Draft for organization review" and stay `noindex` until `status: "approved"` is set in `content/legal.ts`.
- Each page has a "Last updated" date and contact routing; the contact line switches to the email address once it is set.

## Premium polish pass (restrained)

- **Chapter rhythm:** hero (curiosity) → purpose → why ten (credibility) → SMS → scholarship → mentorship (human connection) → service → network (partnership, now abstract) → global → Starlight → impact → get involved (action).
- **Edge illumination:** new `.photo-edge` (1 px gold inset plus a soft cobalt base glow, 300 ms) on mentorship, about, pathway and collage frames.
- **Touch equivalents:** `TouchLit` sets `data-lit` as frames cross mid-screen on touch devices, so the image depth, gold edge and label emphasis all play on phones.
- **Other details:**
  - attribution labels brighten on hover;
  - connect chips have press feedback;
  - constellation light pulses;
  - collage reveal sequence.
- **Unchanged:** existing button press states, arrow nudges, reveals and the reduced-motion handling. No constant or gimmick motion was added.

## Mobile parity

- **Viewport sweep:** 360 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920 on 15 routes, with zero horizontal overflow.
- **Tap targets:**
  - footer links are now at least 44 px below 1024 px;
  - the scholarship "On this page" bar and breadcrumb are 44 px;
  - the hero film control and connect chips are 44 px.
- **Safe areas:** `viewport-fit=cover`, plus:
  - container gutters never smaller than the safe-area inset (landscape notch);
  - header top inset, with the mobile menu and sticky sub-nav offset by it;
  - home-indicator padding on the footer and menu.
- **Other mobile details:**
  - the hero label is positioned above the copy overlap;
  - the collage has a dedicated phone arrangement;
  - heights use the existing `svh` logic;
  - inputs are 17 px, so iOS doesn't zoom.

## QA

| Check | Result |
|---|---|
| `tsc` / ESLint / `next build` (Next 16.3.6) | ✅ clean |
| Lighthouse mobile (local, 2 runs) | **96 / 96**: LCP 2.6 s, CLS 0, TBT 70 ms. Accessibility 100, Best practices 100, SEO 100. |
| Lighthouse desktop | **100**: LCP 0.7 s, CLS 0, TBT 0. Accessibility 100, Best practices 100, SEO 100. |
| axe-core (15 routes × 390 / 1440) | ✅ 0 violations once transitions settle. Two transient contrast hits were measured mid-transition (header fade, reveal fade) and disappear when settled. |
| Horizontal overflow, 360–1920 | ✅ none |
| Broken images | ✅ none |
| Internal links and anchors (58) | ✅ all resolve |
| Responsive images | ✅ no image served below its rendered size × DPR |
| Attribution audit | ✅ every photo has a label or a pending tag, all inside their frames, 11 px |
| Reduced motion | ✅ no reveal classes, constellation static, no hero film |
| Touch | ✅ frames light at mid-screen and clear off-screen |
| Keyboard | ✅ skip link → header → hero CTAs → pathway strip; focus ring visible |
| SEO/AEO | ✅ headings, canonical, robots and sitemap logic, and Organization/WebSite JSON-LD unchanged (`sameAs` added only when URLs exist). Draft legal pages stay noindex. |
| Source-file existence | ✅ every file referenced in `content/media.ts` exists; Geo's 7 missing files are listed above |

## New and edited media

| File | Change |
|---|---|
| `public/media/collage/ta-collage-4001.jpg` | **New.** IMG_4001 cropped to exclude the drink: 2048×1530, q86. Built for the collage, which stays hidden until all four photos exist. |
| `assets/geo-revision-originals/IMG_4001_ORIGINAL.jpeg` | **New.** Untouched original, not served. |
| `components/ui/NetworkConstellation.tsx` | **New.** Abstract artwork (code-generated SVG, no people). |

No existing photo was altered. No face, body or clothing was edited anywhere.

## Deployment

- Preview `tenambassadors-idku143kp-wavysites-projects.vercel.app` was deployed from the local branch `geo-revision-2026-10-02` with the Vercel CLI (no `--prod`).
- Production is still `dpl_6XNmvSHMgv7aRnnCcwUYwapjFkgN`, serving `main` @ `6d3102b`.
- The branch has not been pushed to GitHub. Push it, or merge to `main`, only after client approval.
- `app/robots.ts` still returns `Allow: /` in every environment (unchanged by this pass). The preview is kept out of search by Vercel's `x-robots-tag: noindex` header and by Deployment Protection.

Preview only (no `--prod`), with no change to the production alias, the custom domain or indexing. Vercel previews are served with `x-robots-tag: noindex`.


---

## Asset-package pass (2026-10-02, afternoon)

**Source:** `Ten_Ambassadors_Geo_Requested_Assets.zip`, the client's mapped package of 8 photos with a manifest. Originals are kept, unchanged, in `assets/geo-revision-originals/` and are not served.

**Client decision for the interim:** show the four-photo collage now. Until the hero film exists, the business-card photo (IMG_3977) stays in the hero as well.

| Geo point | Section | Asset | Web file | Edit |
|---|---|---|---|---|
| 2 · Collage, tile a | Home `#in-the-room` | IMG_3977 (business card) | `/media/hero/ta-hero-img-3977.jpg` | none |
| 2 · Collage, tile b | Home `#in-the-room` | AllseeinJah.com (15 of 424) | `/media/geo/ta-geo-collage-two-women.jpg` (1300×1625) | crop only |
| 2 · Collage, tile c | Home `#in-the-room` | A7306914 | `/media/geo/ta-geo-collage-panel.jpg` (1024×819) | none (re-encoded) |
| 2 · Collage, tile d | Home `#in-the-room` | AllseeinJah.com (11 of 424), the mixed group (**replaces IMG_4001** per the client's manifest) | `/media/geo/ta-geo-collage-group.jpg` (2048×1536) | crop only; the frame ends above the man's hand, so the drink is out of frame |
| 5 · Future Ambassador pathway | `/mentorship` Pathway B | AllseeinJah.com (139 of 424) | `/media/geo/ta-geo-stage-aaia.jpg` | none |
| 6 · Network Partners ("all orgs") | `/network-partners` wide image | IMG_4061 | `/media/geo/ta-geo-network-all-orgs.jpg` | none: no DJ equipment or wires are present in this file |
| 7 · Mentorship | `/mentorship` Pathway A | 010-AllseeinJah.com (13 of 639) | `/media/geo/ta-geo-mentorship-table.jpg` (1748×1365) | **two drinks removed** (see below), then cropped to exclude a background guest's glass on the far left |
| 8 · Corporate Partners & Sponsors | `/partners` hero, right side | AllseeinJah.com (16 of 424), Jopwell | `/media/geo/ta-geo-sponsor-jopwell.jpg` | none |
| 9 · About | `/about` hero | AllseeinJah.com (130 of 424), Geo on stage | `/media/geo/ta-geo-stage-red.jpg` | none |

**Drink removal on 13 of 639:**

- Big-LaMa inpainting (`scripts/geo_inpaint_lama.py`) in three passes, limited to a hand-drawn mask over the two glasses, the straw and their reflections on the table.
- The result is composited over the untouched original. Every changed pixel lies inside x 454–684, y 901–1341 of the 2048×1365 frame; nothing outside that box differs.
- No face, skin, body shape, clothing or pose was altered. The only person-adjacent pixels touched are the fingertip edge where it overlapped a glass.
- Records: `assets/geo-revision-edits/` holds the edited master and the first-pass mask.

**Attribution labels added** (`content/attributions.ts`):

- **"Circa Upmixer Holiday Event, 2018":** the 424 series (11, 15, 16, 130, 139). Camera metadata reads 2018-12-11, and the wording is Geo's own example. **Geo to confirm the event name.**
- **"Circa Upmixer event, 2023":** A7306914. Camera metadata reads 2023-02-25, and the UPMIXER backdrop is visible.
- **"Upmixer event":** IMG_4061. The UPMIXER mark is on the backdrop; there is no date metadata.
- **"Photo: AllseeinJah.com":** 13 of 639. Photographer's file naming; no date metadata.
- **Still pending:** IMG_3977, IMG_4004 and IMG_4007, as before.

**Mobile:** in the collage, the two side-by-side phone frames carry their label just below the frame instead of over the photo. The phone layout no longer overlaps vertically, so those labels stay readable. The seated-panel tile is landscape (5:4) on phones so all four people stay in frame.

**Mapping note:** this morning's written brief described the Future Ambassador photo as "red stage lighting". The client's manifest puts 130 (red stage) on About and 139 (AAIA New York screen) on Future Ambassador, and that mapping is followed. To swap them, exchange `aboutGeoStage` and `futureAmbassadorStage` in `content/media.ts`.

**Still missing:** final social URLs and email. (The hero film arrived later the same day; see "Real-photo hero film" below.)

## Real-photo hero film (2026-10-02, evening)

**Source:** `Ten_Ambassadors_Real_Photo_Hero_Handoff.zip` plus `CLAUDE_HERO_IMPLEMENTATION.md`. The film is made from older real event photographs and deliberately reuses none of the Geo-revision photos. Media replacement only: the headline, copy, CTAs, layout and navigation are unchanged.

| File | Role | Notes |
|---|---|---|
| `public/media/hero/ta-hero-film-720p.mp4` | Served film | The supplied 720p web derivative, **byte-for-byte unchanged**: 1280×720 H.264 High, 30 fps, 11.2 s, no audio track, faststart, 1.83 MB |
| `public/media/hero/ta-hero-film-poster.jpg` | Poster, static hero, LCP | Frame at 4.4 s from the 1080p master (1920×1080, q86): the full group with faces visible |
| `assets/hero-film-master/` | Source, not served | 1080p master, the supplied poster, the handoff instructions |

**Poster choice (Freddie, 2026-10-02):** the supplied poster and the film's first 3 s are a tight torso crop with no faces. As the static hero, that would be what reduced-motion and Data Saver visitors see permanently. The poster is therefore the full-group frame at about 5 s. The film itself is not edited.

**Wiring:**
- `content/media.ts`: `heroFilm` points at the 720p MP4, with no WebM or portrait cut, because none was supplied. `media.hero` points at the new poster.
- The business-card photo (IMG_3977) is no longer in the hero. It remains collage tile a.
- `content/attributions.ts`: the poster is registered as pending and has no label. The source photographs carry no event or date information, so no caption is invented. While a film is active, the hero shows no photo credit.

**Behavior** (`components/home/HeroFilm.tsx`; the playback model is unchanged from point 2):
- Muted, `playsInline`, loop, `preload="none"`, no `autoplay` attribute and no audio.
- `play()` starts only after the window `load` event, so the MP4 is never preloaded.
- New: the film fades in only after its first frame is actually painted (`requestVideoFrameCallback`, with a fallback to `playing`). The poster shows until then, so there is no black flash.
- New: it pauses when the tab is hidden and resumes when the tab is visible again, if it is still in view and the visitor hasn't paused it. It already paused offscreen.
- The only control is the existing 44 px WCAG 2.2.2 pause/play button. It appears only while the film plays.
- Reduced motion and Data Saver: no `<video>` element and no MP4 request.
- Blocked autoplay: the poster stays, no control appears, no errors.

**Readability and crop:**
- Below `lg`, the hero copy overlaps the bottom of the media, and the film has bright frames (white dresses).
- The bottom navy ramp is now taller and denser: navy-900 at 0%, 90% at 20%, 45% at 36%, 0% at 52%.
- The `lg` side gradients are unchanged. `object-fit: cover`, `object-position: 50% 30%`. Faces sit in the upper half on phones, clear of the headline and CTAs.

**QA** (Chromium; the H.264 MP4 was replaced in tests by a WebM rendered from the same film, served with range support):

| Check | Result |
|---|---|
| Sizes | 320, 375, 390, 430, 768, 1024, 1440, 1920 and 844×390: copy is readable on every frame; faces are clear of the copy on the poster and the group frames |
| MP4 timing | First request at about 306 ms, after `load` at about 241 ms. No MP4 before `load` |
| Black flash | 0 samples with the film visible before its first frame |
| Offscreen, hidden tab, user pause | All pause; resume rules hold |
| Reduced motion, Data Saver | No video, 0 MP4 requests |
| Blocked autoplay | Poster stays at opacity 1, no control, no page errors |
| CLS | 0 on phones and tablet. 0.0003 on desktop from a pre-existing font swap in the pathway strip, identical with video blocked |
| Lighthouse mobile A/B, 6 alternating runs each | bb0a046: perf 92, LCP 3.27 s, TBT 68 ms. This pass: perf 96, LCP 2.51 s, TBT 121 ms. CLS 0 in both. The LCP element is the poster `<img>` |
| Community Recap and Dr. Phang | Unchanged behavior at all 11 sizes: art direction, poster gating, reduced motion, Data Saver, background pause, tap-to-sound |
| Links, anchors, overflow, axe | 20 pages, 44 anchors: 0 broken, 0 overflow, 0 violations |

**Flags for review:**
1. **Content:** the opening 3 s are a faceless torso crop with carafes and bottles. The 6.5–11 s section is a red-lit club with a man holding a beer bottle. Both are kept as supplied.
2. **Loop:** the cut from the last shot back to the torso shot is hard, not a dissolve.
3. **Color:** the MP4 is tagged `yuvj420p` (full-range JPEG color). Most browsers handle it; some Android and older Safari decoders may show slightly crushed or lifted blacks. Re-encoding to `yuv420p` limited range would avoid this, but the file was kept as supplied.
4. **No portrait cut:** phones crop the 16:9 film to about 4:4.4. A supplied 9:16 or 4:5 cut would slot into `mobileMp4` with no code change.
5. **Not real-device tested:** iOS Safari (inline autoplay, Low Power Mode) and Android Chrome were not tested on hardware. Low Power Mode on iOS blocks autoplay, so those visitors see the poster.
