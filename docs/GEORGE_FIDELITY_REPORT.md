# George fidelity + premium visual polish: report

> **Superseded in part (2026-10-05):** the green interaction system described here was replaced by gold at Geo's direction. See `docs/GOLD_CTA_CLIENT_OVERRIDE_REPORT.md`. The rest of this report is unchanged history.

- **Branch:** `george-fidelity-visual-polish`, from production `68ea38e`
- **Date:** 2026-10-03
- **Status:** Vercel Preview only. Not merged, not deployed to production.
- **Preview:** https://tenambassadors-l3fe5ksfz-wavysites-projects.vercel.app (built from `802f14e`)

## Summary

The pass interprets George's written direction without redesigning what already works.

| Area | Change |
|---|---|
| Hero | Rebuilt from his own sizzle footage: the organization at work, diverse, faces from the first frame |
| Collage | His four-photo collage, re-set as an editorial spread |
| Interaction colour | Translucent green for buttons and links, with the blue/ivory foundation kept |
| Wordmark | Blue/white |
| Photography | Every photo crop audited by script: 0 cut faces or heads, down from 138 flags on production |
| Homepage | About 24% shorter at desktop |
| Copy | Development-build wording replaced with truthful launch-stage language |

## Changes, reasons and the George instruction behind each

| # | Change | Why | George instruction |
|---|---|---|---|
| 1 | **Hero recut** from `TenAmbassadors_Recap_16-35`: speaker → listeners → two guests connecting. 0.8×, seamless loop, caption-free crops, no drinks in frame. Separate phone (10:11) and square cuts, plus a static still for landscape phones | The previous film opened on faceless torsos and closed in a red-lit club with a drink in hand. Its group frame was also cut at the foreheads | "Realistic humans, not overly formal, organization at work, human connection, mission-driven activity"; diverse sizzle reel, 16–35 s |
| 2 | Hero poster is an art-directed `<picture>` matching each cut's first frame, with one preload per still. All playback safeguards kept | Poster/first-frame match; mobile and tablet crops | §8 |
| 3 | **Green interaction system.** Solid green primary buttons on light; translucent green "glass" on blue and navy (white text 5.3:1 or better); green links, underlines and hover/selected states | His requested translucent green for buttons and links | "Translucent green for buttons and links" |
| 4 | Gold is kept for editorial italic accents and Starlight only | It no longer competes with the interaction colour | §3 "retain gold only where intentional" |
| 5 | **Wordmark** is royal blue on light, white on dark (champagne in Starlight) | Previously gold "Ten" | "Blue or white logo" |
| 6 | **Collage** as an editorial spread: business card leads; two women support; group and seated panel form the context row. No overlaps; credits bottom-right | Four equal-weight tiles with an inset covering the card-exchange hands | Four-photo collage; mapped photos |
| 7 | **Abstract "One Community. Many Networks." art** kept. The recap film moved to `/network-partners` | Its footage now opens the hero, so reuse on one page is avoided | "Abstract image" for the network section |
| 8 | **Crop corrections.** Mentorship hero (2292), Jopwell, all-orgs, 4006 credit corner; About hero uses a 4:5 derivative of Geo on stage | Heads were cut at phone and tablet sizes; Geo was a small figure | §5, §19, §21 |
| 9 | **Credits.** 424 series reads "Photo: AllseeinJah.com, 2018" (photographer file naming plus camera metadata). The unconfirmed event wording "Upmixer Holiday Event" is kept internal | Truthful bottom-right credits; no invented events | "Source credit at the bottom-right of each photo" |
| 10 | **Jopwell.** File renamed `ta-geo-jopwell-event.jpg`; caption "From a past community event, shown for context. No sponsorship is implied." | No false sponsor implication | §12 |
| 11 | **Pacing** (see the table below) | The homepage was about 18,750 px tall at desktop | §15 |
| 12 | **SMS** remains one sticky progression with compact stages; About gains a three-door SMS band | One connected progression | §16, §19 |
| 13 | **Launch-stage copy.** Reviewer markers are opt-in (`NEXT_PUBLIC_SHOW_REVIEW_NOTES=1`); "to be announced", "pending" and "coming soon" rewritten; "In preparation" cards; service focus areas from the brief; impact measures without "to be reported" tags | Development-build feel | §17 |
| 14 | **About** adds the Starlight relationship line and the SMS band; mission/vision approval notes are no longer public | Explain TA, SMS, why Ten, the ecosystem, Starlight, now vs future | §19 |
| 15 | **Partners** copy addresses corporations, foundations, universities, and professional and community organizations | Audience fit | §22 |
| 16 | **Maintainability** documented in `docs/CONTENT_UPDATES.md`. GitHub web edits plus Vercel previews; no paid CMS added | Internal updates; under $20/month | §24–25 |

## Palette

| Token | Value | Use |
|---|---|---|
| `green-600` | #137F58 | Primary button on light (white text 5.0:1) |
| `green-700` | #0E6A4A | Links on ivory (6.1:1) |
| `green-500` @ 40% + `green-300` border | translucent | Glass buttons on navy (white 9.5:1) and royal (6.2:1) |
| Royal #1746A2, Navy #081B33, Ivory #F8F6F0 | unchanged | Foundation |
| Gold #C7A34B | unchanged | Editorial accents, Starlight only for buttons |

## Homepage height

| Viewport | 68ea38e | This branch | Less vertical travel |
|---|---|---|---|
| 1920×1080 | 19,757 | 14,766 | 25% |
| 1440×900 | 18,757 | 14,353 | 24% |
| 768×1024 | 21,318 | 16,974 | 20% |
| 390×844 | 22,139 | 17,383 | 21% |
| 320×568 | 23,030 | 18,786 | 18% |

Phones land slightly under the 25% target. The remaining length is content George asked for, so it was kept rather than cut further:
- the full four-photo collage;
- the founding ecosystem;
- seven get-involved pathways;
- the Starlight event card.

## Image derivatives

| File | Source and treatment |
|---|---|
| `public/media/hero/ta-hero-film-45.mp4` + poster + backdrop | Recap 16–35, one 4:5 cut, 608×760 (crop only), 6.2 s, 1.09 MB. Replaced the phone (720×792) and square (720×720) cuts on 2026-10-04; see "Hero full-subject framing" |
| `public/media/hero/ta-hero-landscape-a7r00711.jpg` | A7R00711, 1600×1100, −6% exposure |
| `public/media/geo/ta-geo-stage-red-portrait.jpg` | 130 of 424, 960×1200, crop only |
| `public/media/geo/ta-geo-jopwell-event.jpg` | Renamed from `ta-geo-sponsor-jopwell.jpg`, unchanged |

## Performance

Lighthouse, local production build, alternating runs:

| Run | 68ea38e | This branch |
|---|---|---|
| Mobile, simulated, 6 runs (median) | perf 93 · LCP 2.96 s · TBT 91 ms · CLS 0 | perf 93 · LCP 2.97 s · TBT 95 ms · CLS 0 |
| Mobile, devtools throttling, 3 runs | perf 88 · LCP 2.13 s · CLS 0.014 | perf 85 · LCP 2.05 s · CLS 0.014 (same font-swap source as production) |
| Desktop, 4 runs | perf 100 · LCP 0.70 s | perf 100 · LCP 0.72 s |

Video loading behaves as before:
- No MP4 is requested before the window `load` event.
- Reduced motion and Data Saver request no video.
- One still and one film download per device.

## Accessibility and QA

- **Build checks:** typecheck, lint and production build pass.
- **Site audit (20 pages):** 0 broken links, all 44 anchors resolve, 0 horizontal overflow, 0 axe violations.
- **Console:** 17 routes at phone and desktop size; no console errors (only the expected 404 on the test URL).
- **Hero behavior:**
  - Muted, playsInline, looping and poster-gated, with no black-flash samples.
  - Pauses offscreen and in background tabs.
  - The 44 px pause button holds across scrolling.
  - Reduced motion and Data Saver play no video and request no MP4.
  - When autoplay is blocked, the poster stays and there are no errors.
  - CLS is 0 on phone, tablet and landscape; 0.0003 on desktop, which pre-dates this pass.
- **Community Recap** (now on `/network-partners`): art direction holds at 11 sizes, plus reduced motion, Data Saver, background pause and sound mode.
- **Phang film:** tap-to-play on the homepage unchanged.
- **Crop audit (11 routes × 13 viewports):** 0 cut faces, 0 cut heads, 0 credits over faces. Production had 84, 54 and 20.

Real-device caveat: QA ran in Chromium. The MP4s were replaced by WebM stand-ins because Chromium has no H.264. iOS Safari, Android Chrome and Low Power Mode (which blocks autoplay, so the still shows) still need checking on hardware.

## Affected files

- **Hero:** `components/home/Hero.tsx`, `HeroFilm.tsx`
- **Homepage sections:** `Collage.tsx`, `NetworkFeature.tsx`, `SmsStory.tsx`, `ServiceFeature.tsx`, `ImpactFeature.tsx`, `FeaturedScholarship.tsx`, `MentorshipFeature.tsx`, `StarlightFeature.tsx`, `WhyTen.tsx`, `GlobalVision.tsx`, `GetInvolved.tsx`, `Purpose.tsx`, `Closing.tsx`
- **Layout:** `components/layout/{SiteHeader,Wordmark,NewsletterForm}.tsx`
- **Shared components:** `components/pages/{PageHero,AreaList}.tsx`, `components/ui/{Button,Pending}.tsx`, `components/forms/IntakeForm.tsx`
- **Pages:** `app/{about,partners,network-partners,service,starlight,contact,donate,scholarship/[slug],get-involved/[pathway]}/page.tsx`
- **Styles:** `app/globals.css`
- **Content:** `content/{media,attributions,home,about,programs,impact,scholarships,starlight}.ts`
- **Config and types:** `lib/{site,types}.ts`
- **Scripts:** `scripts/hero_recut/`
- **Docs:** `docs/{PHOTO_ART_DIRECTION,CONTENT_UPDATES,CONTENT_STATUS,ASSET_MAP,GEORGE_FIDELITY_REPORT}.md`, `docs/review/` (before/after screenshots)

## Before / after review package

`docs/review/`:
- homepage desktop and mobile
- hero desktop and mobile
- collage desktop and mobile
- SMS section
- About, Mentorship, Network Partners, Partners/Jopwell (desktop and mobile each)

## George requirement checklist

| Requirement | Status |
|---|---|
| Transitional blue sections, ivory backgrounds | Kept |
| Translucent green buttons and links | Done |
| Blue or white logo | Done (typographic wordmark; official logo files still to come) |
| Visible Black, white, Asian and Latino representation, distributed | Done (see PHOTO_ART_DIRECTION §Diversity) |
| Source credit bottom-right on each photo | Done where truthful; 4 photos have no confirmed source (see questions) |
| Human-centered hero, organization at work | Done (recut from his sizzle footage) |
| Four-photo collage below the hero, business card included | Done |
| Abstract art for One Community, Many Networks | Kept |
| Foundation-year statement removed | Kept removed (also gone from the Impact intro) |
| Future Ambassador = 139, Network = IMG_4061, Mentorship = 13 of 639 (drinks removed), Partners = Jopwell, About = Geo on stage | All kept; About uses a crop-only derivative |
| Privacy / Terms / Accessibility prepared | Drafts kept and still noindex |
| Social / contact links | Waiting on George; nothing invented |
| Routine updates manageable internally; about $20/month or less | Documented; no paid dependencies added |
| No false sponsorship, 501(c)(3) or impact claims | Verified |

## Open questions for the client

1. **Credits:** the exact event name for the AllseeinJah.com 424 series. Is it "Upmixer Holiday Event"? 139 of 424 shows an AAIA New York screen.
2. **Credits:** sources for IMG_3977 (business card), IMG_4004, IMG_4007 and A7R00711 (landscape hero still).
3. **Hero:** a higher-resolution export of the vertical recap footage. The sharp column is 608 px wide, so the film is soft on Retina screens.
4. **Logo:** official logo files (blue and white versions).
5. **Contact:** final social URLs and the contact email and phone.
6. **Partners:** any confirmed partners or sponsors, and whether there is any Jopwell relationship.
7. **Legal:** approval of the legal pages.
8. **Hosting:** confirm the Vercel plan (Hobby is non-commercial; Pro is $20/month per member).

## Preview

- **URL:** https://tenambassadors-l3fe5ksfz-wavysites-projects.vercel.app
- **Deployment:** `dpl_B6hw9Ggm1Rr8NCTq3UGs5GEtzKxn`, Vercel Preview, built from `802f14e` (branch `george-fidelity-visual-polish`).
- **Access:** protected by Vercel login.
- **Code:** `802f14e` and the commit that adds this line deploy identical code; this commit changes `docs/` only, which is excluded from deployments.
- **Production is unchanged:** `dpl_DCTgQusqxEx2pnecNT9TxMPCMPow`, `main` @ `68ea38e`.

Production deployment, merging to `main`, aliases, DNS and the domain all wait for Freddie's explicit approval.

## Pre-client micro-pass (2026-10-03)

This is a small cleanup before Geo reviews the site. The approved George fidelity build is otherwise unchanged: no redesign, and no change to crops, layout, palette, copy, SEO/schema or video behavior.

**Hero attribution.**
- The visible credit changed from "Upmixer event recap" to **"Footage: The Upmixer event archive"** (phone and square stills, and the film).
- **Why:** Ten Ambassadors stays the primary brand, and the credit now reads as historical source footage rather than an Upmixer page.
- **Accuracy:** it rests on the client's own description of the footage, "scenes from gatherings across the wider Upmixer event community". It names no event or date, and it does not present the people shown as Ten Ambassadors participants.
- **Position:** still bottom-right. The credit sits over the speaker's torso on phones, above the copy band, and on desktop it sits in the bottom-right corner. It never covers a face in any shot; this was checked on the poster at 13 viewports and on the playing film at 390, 430, 1440 and 1920.
- **Screen readers:** the hidden prefix now reads "Source:" rather than "Photo source:", so footage credits read naturally.
- **Scope:** the /network-partners recap film keeps "Upmixer event recap", since it sits beside its own descriptive caption.

**Hero source quality.**
- The current optimized cuts are unchanged. Nothing was upscaled, sharpened or AI-enhanced, and no face was manipulated.
- **Higher-resolution source footage is recommended before final public launch, for maximum quality on Retina and other high-density displays.** The usable vertical column of the current source is 608 px wide. This does not block the client preview.

**Repo cleanup.**
- `.gitignore` now ignores `/handoff/` and `/Claude outputs/`:
  - `handoff/` holds client source drops: the hero handoff zip and masters, and the V1.1 asset-pass zip. They are kept on the working machine, untouched, but never committed. The hero master already used in the repo stays in `assets/hero-film-master/`.
  - `Claude outputs/` holds about 38 MB of earlier QA screenshots and audit exports. They are kept on disk but not committed.
- `Claude outputs/ten-ambassadors-v1-preview.png` had been committed in V1. It is now untracked; the file stays on disk.
- Nothing was deleted, and no other project files changed.
- The intentional review package remains in `docs/review/`.

**Final QA.**
- **Build checks:** typecheck, lint and production build pass.
- **Site audit (20 pages):** 0 broken links, all 44 anchors resolve, 0 horizontal overflow, 0 axe violations.
- **Console (17 routes):** no errors; only the expected 404 on the test URL.
- **Images and crops (11 routes × 13 viewports):** no broken images; 0 cut faces, 0 cut heads, 0 credits over faces.
- **Hero:**
  - Poster until the first painted frame, with no black flash.
  - MP4 requested only after `load`.
  - Pauses offscreen and in background tabs.
  - Pause button present and holds.
  - Reduced motion and Data Saver: no video, 0 MP4 requests.
  - Blocked autoplay: the still stays, with no errors.
  - CLS 0 to 0.0001.
- **Unchanged:** SEO, schema and copy (no attribution data feeds the JSON-LD). There are still no sponsorship claims.

**Preview for George's review.**
- **URL:** https://tenambassadors-2dy9sg0g6-wavysites-projects.vercel.app (`dpl_HDus36Ghp3CYzEj9shWVGvK2S7ya`, Vercel Preview).
- **Build:** from `a96265c`. The commit that records this URL changes `docs/` only, which is not deployed.
- **Access:** protected by Vercel login.
- **Production is unchanged:** `dpl_DCTgQusqxEx2pnecNT9TxMPCMPow`, `main` @ `68ea38e`. Nothing is merged or pushed, and aliases, DNS and the domain are untouched.

## Hero full-subject framing (2026-10-04)

One isolated fix to the homepage hero; nothing else on the site changed. Freddie's rule: never crop a person's head or body to fill the hero.

**Root cause.**
- The film and its poster used `object-fit: cover`, so the browser enlarged the footage until it filled the media box and cut off whatever did not fit.
- The derivatives themselves were also tight: the phone cut used only 669 of the 1,080 source rows, and the square cut only 608.

**Fit strategy.**
- The film and its poster now use `object-fit: contain` (`object-position: 50% 50%`), so the hero frame never crops the footage.
- **Portrait phones:** the hero frame is now 4:5, the film's own shape, so the film fills it edge to edge with nothing cut.
- **Portrait tablets and desktop:** the panel keeps its size, and the whole film sits centered in it. The sides show `ta-hero-film-45-backdrop.jpg`: the film's first frame reduced to 24×30 px (0.7 KB), stretched, blurred, darkened and vignetted in navy. It reads as a deep-navy frame with a hint of the room's colour, not a social-video blur.
  - The backdrop is CSS-hidden on phones, where it is never needed, and on landscape screens.
  - Its intrinsic size is tiny, so it never competes for LCP.
- **Landscape phones and tablets:** unchanged. They keep the static A7R00711 still, art-directed for its 16:11 frame (`cover`), which passes the crop audit.

**Derivative regenerated** (`scripts/hero_recut/render_v.py`).
- **What:** one 4:5 cut, 608×760, taken pixel-for-pixel from the sharp vertical column of the master.
- **Not done:** no upscaling, sharpening beyond the previous light encode treatment, generative fill or face manipulation.
- **Captions:** each shot's crop window sits above the burned-in captions, which start at about y 825.

| Shot | Source | Speed | Crop window | Headroom above the highest head |
|---|---|---|---|---|
| Speaker | 5.22–7.52 s | 0.8× | y 0–760 | about 11% |
| Listeners | 7.60–10.10 s | 0.8× | y 40–800 | about 15% |
| Two guests in conversation | 15.12–15.74 s | 0.65× | y 50–810 | about 10% |

- **Shots dropped,** because the source itself leaves no room:
  - **Speaker close-up (4.02–5.20 s):** his hair touches the top of the source frame.
  - **Contact exchange (10.16–11.10 s):** the vertical source column cuts through the face of the woman on the left, so no crop could show her whole head.
- **Replacement shot:** two guests in conversation (15.12–15.74 s). Both heads and faces are whole, there is clear headroom, and no drinks are in frame. The loop is now 6.2 s (was 7.2 s).
- **Edges that remain:** the outer edge of a shoulder or back where a person stands at the edge of the original vertical footage. Every head and face is inside the frame.

**Mobile hero dimensions.**

| | Before | After |
|---|---|---|
| Hero media frame (portrait phones) | 10:11, 390×429 at 390 px wide | **4:5, 390×488** (320×400 at 320; 430×538 at 430) |
| Copy overlap onto the media | 80 px (`-mt-20`) | 48 px (`-mt-12`) |
| Base readability ramp | navy up to 52% of the frame | navy up to 34% of the frame, below every head |
| Headline top at 390×844 | 477 px | 568 px, starting 4 px below the media |
| Credit | bottom-right, 92 px up | bottom-right, 64 px up, beside the pause control |
| Pause control | top-right | bottom-right on portrait phones, over clothing, never a head; top-right elsewhere |

The tablet-portrait frame (1:1) and the desktop panel keep their sizes.

**QA.**
- **Visual composition:** frames at 0.2, 1.5, 3.0, 4.5, 5.6 and 6.0 s, at 320×568, 360×800, 375×812, 390×844, 393×852, 430×932, 768×1024, 1024×768, 1280×800, 1440×900 and 1920×1080 (66 frames). Every frame was reviewed by eye for hair, forehead, face, chin, shoulders and body position.
- **Face projection, same frames:** 110 face checks, 0 cut faces, 0 cut heads, 0 credits over a face, 0 pause-control-over-head.
- **Site-wide crop audit (11 routes × 13 viewports):** 0 flags.
- **Before/after boards:** `docs/review/hero-framing-before-after-1440.jpg` and `-390.jpg` show the speaker, listener and connection frames.
- **Hero safeguards:**
  - Poster stays until the first painted frame, with no black flash.
  - The MP4 is requested only after `load`.
  - Pauses offscreen and in background tabs; the pause button holds.
  - Reduced motion and Data Saver: no video, 0 MP4 requests.
  - Blocked autoplay: the poster stays, with no errors.
  - CLS 0–0.0003, identical to the previous build at every size tested.
- **Site checks:**
  - Typecheck, lint and production build pass.
  - 16 routes at 390 and 1440: 0 axe violations, 0 horizontal overflow, 0 broken images.
  - Console: only the expected 404 on the test URL.
  - All anchors resolve.
- **Unchanged:** the credit ("Footage: The Upmixer event archive"), SEO/schema, copy, typography, CTAs, the green system, the navbar, the SMS strip, the collage and every other page.
- **Weight:** each device now loads one 1.09 MB film (was 1.27 MB on phones, 1.15 MB elsewhere).

