# Geo meeting revision report

**Date:** 2026-10-04
**Branch:** `george-fidelity-visual-polish`
**Commits:** `b223d8f` → `8ee215d` → `a128c76` → `83d17fd` → this report. `b223d8f` was the starting point; none of the commits are squashed, and the final hash is the commit that adds this file.
**Production:** unchanged at `68ea38e` (`dpl_DCTgQusqxEx2pnecNT9TxMPCMPow`). Nothing was merged, pushed or promoted, and no alias, DNS or domain was touched.

This is a client-directed refinement pass, not a redesign. The approved structure is kept, including:

- the blue / ivory / green system
- the typography and navigation
- the Why Ten gold 10
- the Network Partners video
- SEO/schema, accessibility, Reduced Motion and Data Saver handling

## 1. Homepage hero: Geo's cut

**Source.** Geo named "Recap Reel V4.mp4" (Google Drive, file `1-l63RzCcQjPWqbwm8yS3NyOp-VUk1M1B`).

**Cut.** Reel seconds **16–20**, then **24–39**, spliced together. Seconds 20–24, the speaker Geo turned down, are left out.

**What this build uses.**
- This build environment cannot download from Google Drive: the network policy blocks `drive.usercontent.google.com`.
- So this render uses the 16–35 s extract of the recap reel that is already in the repo: `assets/recap-master/TenAmbassadors_Recap_16-35_Horizontal_1080p.mp4`, from Recap Reel **V2**.
- That extract covers 16–20 and **24–34.3**. The last 4.7 s (34.3–39) are not in it.
- **Action:** put "Recap Reel V4.mp4" in `assets/recap-master/` and run:

```
python3 scripts/hero_recut/render_geo.py "assets/recap-master/Recap Reel V4.mp4" 0 /tmp/geo
```

  Then copy the three `ta-hero-film-geo*` files into `public/media/hero/`. Nothing else changes.
- **Check first:** confirm that V4 has the same footage at these times as V2. If V4 differs, its own 16–20 and 24–39 are what the script uses.

**Drinks rule.** The reel's first 0.4 s (16.0–16.4) is a close-up of a hand holding a drink, so the cut starts at the next shot, 16.4. Drinks appear in no other shot inside the 4:5 window.

**Shot plan.** Every shot is framed in a 4:5 window (608×760) taken pixel-for-pixel from the sharp vertical column, with no upscaling and no generative fill. The window position (`y0`) is chosen per shot from face boxes. The full plan is in `scripts/hero_recut/ta-hero-film-geo.plan.json`.

| Reel time | Shot | y0 | Note |
|---|---|---|---|
| 16.4–17.9 | Guests seated at the lounge tables | 78 | Table drinks fall below the window |
| 17.9–20.0 | Young man listening | 24 | Window stays above the burned-in caption |
| *(20–24 omitted, per Geo)* | | | |
| 24.0–26.1 | Two young professionals listening | 65 | Above the caption |
| 26.1–27.1 | Two guests with a phone (man in cap) | 0 | The source itself cuts the woman's face at the left edge and the cap at the top |
| 27.1–28.3 | Guests exchanging contacts | 0 | The source cuts the woman at the right edge |
| 28.3–29.2 | Host with a microphone | 0 | |
| 29.2–30.1 | Guest in a blue suit | 0 | His hair touches the top of the source frame |
| 30.1–31.1 | Guest in a white shirt | 0 | |
| 31.1–31.8 | Two guests in conversation | 45 | |
| 31.8–32.5 | Young man speaking | 0 | |
| 32.5–33.3 | Guest in glasses | 0 | His head touches the top of the source frame |
| 33.3–34.3 | Guest speaking | 8 | |

**Edit.**
- Playback is real-time: no slow motion and no synthetic frames. Geo's own hard cuts are kept.
- One soft dissolve (0.35 s) joins 20 to 24, and a closing dissolve (0.5 s) returns to the exact first frame.
- **File:** `public/media/hero/ta-hero-film-geo.mp4`, 13.6 s, 2.28 MB, H.264 High.

**Mobile strategy.**
- **Framing.** The film and its poster use `object-fit: contain`, so the browser never crops a person.
  - **Portrait phones:** the hero frame is 4:5, the film's own shape, so the film fills it edge to edge.
  - **Portrait tablets and desktop:** the whole film sits inside the panel over a softened, darkened plate of its own first frame.
  - **Landscape phones and tablets:** keep the static A7R00711 still.
- **Reliability** (Geo saw the hero fail to play on his phone):
  - `muted`, `playsinline` and `webkit-playsinline` are set as real attributes before loading. iOS checks these.
  - Loading also starts after a 3.5 s fallback when the window `load` event is slow.
  - A failed first `play()` is retried once the file can play.
  - When the browser refuses autoplay (iOS Low Power Mode, some data savers), the poster stays and a **Play** control appears, so one tap starts the film.
- **Unchanged:** Reduced Motion and Data Saver (no video, 0 MP4 requests), the pause control, and offscreen and background-tab pausing.

**Limit: the framing the source allows.** Our frame never adds a crop. Where Geo's footage was filmed with a head at the very top or a guest half out of the vertical frame, the site shows it as filmed; there is no fabrication or fill. This affects four shots (26.1, 27.1, 29.2, 32.5 s).

**Review images:** `docs/review/geo-hero-cut-phones.jpg` and `-desktop.jpg`, at 0.2, 1.5, 3, 6, 10 and 13.2 s.

## 2. Terminology: the primary audience is "young professionals"

The audience is now "young professionals" wherever the site describes the people being connected, mentored and supported.

**Changed to "young professionals":**
- The mission line: "connect emerging young professionals and established leaders".
- Mentorship (SMS stage, homepage, /mentorship hero and metadata, the industries intro, the mentor pathway page, the mentor form question, the FAQ).
- The ecosystem "Mentors" role.
- Impact measures ("Young professionals supported").
- The global outlook ("Built for a world of emerging young professionals"; "prepare young professionals for that reality").
- The Network Partners body and description.
- Partner and recommendation copy.
- The Organization schema `knowsAbout`.

**Kept as "leaders" / "leadership",** where the sentence is about leadership itself, future leaders or the Ambassador role:
- "Developing leaders"
- "a leadership and impact organization"
- "the next generation of leaders"
- "Leadership becomes action"
- "Organizations that already build leaders"
- Ambassador criteria ("emerging and established leaders")

**Ambassadors are a distinct role.** Copy that implied every beneficiary is an Ambassador was rewritten:
- SMS Service, the cycle finale, and the /service intro and initiatives line.
- The closing line: "Hold it open for the next generation."

## 3. Copy and punctuation

Dash-heavy mission and program sentences now use plain punctuation, with no change in meaning. This covers:

- the purpose statement and mission
- the SMS stages
- Mentorship and Service
- Starlight
- the global outlook
- Network Partners
- the FAQ answers
- the scholarship summary
- the Why Ten body (punctuation only; the gold 10 is untouched)
- the donate, about and contact intros

**SMS copy:**
- **Mentorship:** "Someone helps you walk through it." is kept, followed by "Mentorship connects emerging young professionals with experienced, accomplished professionals for guidance, perspective, access and relationships that last."
- **Service:** "Service turns development into impact, creating opportunity for the next person and the next generation through service to the community." No service programming is claimed as launched: initiatives are still "being developed".

## 4. Collage hierarchy

- **Lead, dominant frame:** the two-women photo (AllseeinJah.com 15 of 424). It is a square on phones and the large left frame on desktop, framed from the top so both faces and shoulders stay whole.
- **Supporting square:** the business-card exchange (IMG_3977). It is centred on the exchange, so both faces and the card stay in frame. The guest already cut by the photo's right edge falls fully outside the square.
- **Context row:** unchanged.
- **No repeats:** the two-women photo is used nowhere else on the site.

## 5. Mentorship photo

- The client-selected **13 of 639** photo, in the version with the drinks already removed (`assets/geo-revision-edits/`), now leads **/mentorship**, beside "Someone helps you walk through it."
- The Become a Mentor track below takes 2292, the photo the hero used before, so no photo repeats on that page.
- The crop is natural and faces are untouched.

## 6. Mentor story or testimonial: hidden, not deleted

**Interpretation.** The build has no mentor testimonial block; the V1 "featured story" card was removed in V2. The element that told a mentor story was the pair of caption labels, "Across generations" and "In conversation", on the homepage Mentorship photos. They implied a mentor relationship between people who are not confirmed mentors.

**What changed.**
- Both labels are hidden from the public site. The markup stays in place behind `showMentorStory` in `components/home/MentorshipFeature.tsx`, with the note: `TODO: Restore mentor story/testimonial when Geo supplies a confirmed mentor and approved copy.`
- No mentor, name or quote was invented.
- If Geo meant a different block, it is a one-line change.

## 7. Network Partners

- The section and the recap video are **kept as approved**.
- Only the terminology and punctuation changed, plus one line on /network-partners ("Every partnership is shaped together, with responsibilities agreed with each partner").
- The network-of-networks idea and the layout are unchanged.

## 8. Dr. Phang scholarship film

**What was removed.** One narration line: "unexpectedly passed away this year".
- **Found with:** a Whisper and voice-activity pass on the approved source (`Dr_Phang_Scholarship_01m00s-02m00s.mp4`).
- **Where:** 54.49–56.62 s in that file, which is 01:54–01:57 of the film.

**The edit.**
- The narration now reads: "Today we gather to remember and honor a true luminary in the medical world, physician Dr. Christopher Phang. Dr. Phang, born October 7, 1968. He was not just a doctor…"
- The cut joins the natural pause after "1968" to the pause before "He was". A 0.24 s equal-power audio crossfade and a matching video dissolve sit over the static end card, so the join is invisible and silent.
- Re-checked by transcribing the output: the line is gone and nothing else changed.

**Both pages use the same edit.**

| Where | File | Length |
|---|---|---|
| Homepage excerpt | `dr-phang-excerpt.mp4` (01:19 → end, same fades as before) | 0:38 |
| Scholarship page | `dr-phang-film.mp4` | 0:57 |

- The old cuts are no longer served.
- The approved source moved to `assets/phang-master/`.
- The burned-in timecode and watermark are untouched; no clean export has been supplied.
- **Script:** `scripts/edit_phang_statement.py`.

## 9. Scholarship detail page

- **Kept below the film:** a closing row ("Support this scholarship", "All scholarships").
- **Hidden** until real content exists: Story, Legacy, Eligibility/award/timeline, Recipients and Apply. That rules out empty story blocks, recipients, metrics, award amounts, timelines and application forms.
- The "On this page" bar hides when there is only one section.
- **Nothing deleted:** the data model (`content/scholarships.ts`) and the template are kept. Filling a field brings its section back with no code change, and reviewers see every section with `NEXT_PUBLIC_SHOW_REVIEW_NOTES=1`.
- The status label reads "Named scholarship" (it said "In development").
- The homepage scholarship CTA now opens the scholarship page. The disabled "Apply" chip is no longer shown.

## 10. Public placeholder language removed

**Removed from what visitors see:**
- the "In preparation" eyebrow on launch-stage cards
- the "Preview" chip and "Not yet accepting submissions" button on forms
- every "not yet open" call-to-action chip (for example "Apply · not yet open", "Tickets · details to come")
- the disabled "Email" and social chips (and their "coming soon" screen-reader text) in the footer
- "Direct email and phone details will be listed here"
- "Newsletter sign-up isn't connected yet…"
- the empty founding-story card

**Rewritten:**
- "Online giving is being set up / prepared" now reads "Online giving will open soon".
- The About leadership area shows one polished line: "Profiles of the Founding Ambassadors, Board and Institutional Host Committee will be published soon."

**Kept as polished launch-stage sentences:** for example, "Start time and tickets will be announced" and "Founding Network Partners will be introduced as partnerships are confirmed".

**Still available to reviewers** with `NEXT_PUBLIC_SHOW_REVIEW_NOTES=1`: the internal notes and code TODOs.

**Verified:** a text audit of all 20 rendered pages finds no instance of "pending", "placeholder", "preview", "coming soon", "to be announced", "in preparation" or "in development".

## 11. Contact and forms: interim inbox

Geo approved routing to The Upmixer's inbox until Ten Ambassadors has its own address.

- **Recipient:** `info@theupmixer.com`.
- **One setting for the whole site:** `site.inbox` in `lib/site.ts`. It is overridable with `NEXT_PUBLIC_FORM_RECIPIENT`.
- **How delivery works:** every form and the newsletter open the visitor's email app with the message written and addressed to the inbox. Nothing is sent until they press send, and the website stores nothing. No secret and no paid service is involved.
- **Updated to match:**
  - **Contact page:** shows the address with "Messages to Ten Ambassadors are currently handled by The Upmixer team."
  - **Footer:** the "Email us" chip.
  - **Privacy, Terms and Accessibility:** explain the email delivery and the interim inbox. These pages are still drafts for legal review.
- **For server-side delivery later:** add `app/api/intake/route.ts` with a mail or CRM provider whose key lives only in Vercel environment variables (for example `RESEND_API_KEY`), then set `NEXT_PUBLIC_INTAKE_ENDPOINT=/api/intake`. See `docs/FORMS_CRM_ANALYTICS.md`.

## 12. Starlight

**Homepage treatment.**
- The Starlight chapter now uses the **Starlight event site's own hero visual** (night sky, Manhattan skyline and light tree) as a static background, not the moving hero.
- **How it was made:** rendered from the Starlight site's SVG art, copied unchanged into `assets/starlight-art/`, by `scripts/render_starlight_night.py`.
- **Files:** two light JPEGs, 84 KB wide and 52 KB tall, loaded lazily.
- **Readability:** a dark field sits behind the copy, and a translucent panel sits behind the three pillars.

**Routing decision.**
- "Explore Starlight" (homepage) and a new "Visit the Starlight Awards site" button (top of /starlight and in its Attend section) go **straight to the Starlight event site**.
- **The URL:** `https://starlight-awards-2026.vercel.app`, the production URL of the Starlight Awards 2026 project in the Wavvy Sites Vercel team.
- **Why that one:** there are two Starlight projects (`starlight-awards`, `starlight-awards-2026`). Neither has a custom domain, and both currently disallow search engines. `starlight-awards-2026` is the actively developed one.
- **Reversible:** change `content/starlight.ts → externalUrl`, or set `NEXT_PUBLIC_STARLIGHT_SITE_URL`. Setting it to `null` routes everything back to /starlight.
- **Kept:** /starlight, the "Starlight" navigation item, the footer link and the Event schema, for SEO and navigation.
- **Before production:** confirm the final Starlight domain.

## 13. Alcohol and drink imagery audit

Every image on the site (24 files) was reviewed at the crops actually shown.

| Image | Finding | Action |
|---|---|---|
| Group photo, 11 of 424 (collage) | Liquor bottles on the back-bar shelf behind the guests | Removed with the same localized LaMa cleanup used for 13 of 639 (only shelf pixels changed; mask and result in `assets/geo-revision-edits/`) |
| 13 of 639 (Mentorship) | Two drinks on the table | Already cleaned (Geo's request); the cleaned version is used |
| Hero reel at 16.0–16.4 | Close-up of a hand holding a drink | Trimmed from the cut |
| Hero lounge shot (16.4–17.9) | Drinks on the tables | Below the 4:5 window; not shown |
| IMG_4007 | Plastic cups in hand | Not displayed anywhere (fallback only) |
| IMG_4006 (homepage Mentorship inset) | Magenta club lighting, no drinks | Kept (client-selected). Flag for Geo if it reads as too nightlife |

## 14. Logo and favicon

The favicon (`app/icon.svg`, a gold four-point star on green) is a **temporary placeholder**. Replace it with the official Ten Ambassadors mark once Geo supplies the approved logo files.

## 15. QA

**Build checks:**
- `npm run typecheck`, `npm run lint` and `npm run build` pass (26 static pages).

**Site checks:**
- 16 routes at 390 and 1440: **0 axe violations**, 0 horizontal overflow, 0 broken images.
- 17 routes: no console errors beyond the expected 404 on the test URL, and 0 failed responses.
- 29 anchors resolve, and 36 internal links all return 200.
- External links: the Starlight site and the mailto.
- **Photo crop audit** (11 routes × 13 viewports, YuNet): **0** cut faces, 0 cut heads, 0 credits over faces.
- **SEO and schema:** JSON-LD parses on every checked page, with Organization, WebSite, FAQPage, Event and BreadcrumbList intact.

**Hero:**
- **Faces:** 54 projected checks across 6 viewports × 6 times: 0 cut by our frame, 0 credit or pause control over a face or head.
- **Loading:** poster until the first painted frame, with no black flash. The MP4 is requested only after `load`.
- **Pausing:** offscreen and background-tab pause work, and the pause button holds.
- **Reduced Motion and Data Saver:** 0 MP4 requests.
- **Blocked autoplay:** the poster stays, a Play control appears, and tapping it plays the film.
- **CLS:** 0–0.0003, unchanged.

**Lighthouse (mobile, 3 alternating runs):**

| Build | Performance | LCP | CLS |
|---|---|---|---|
| Previous preview (`b223d8f`) | 86 | 3.60 s | 0 |
| This build | 85 | 3.68 s | 0 |

That difference is within run-to-run noise. Accessibility, Best Practices and SEO score 100.

**Visual review:**
- **Homepage:** reviewed at 320, 390, 430, 768, 1440 and 1920.
- **Inner pages:** reviewed at 390 and 1440 — About, Scholarship, Dr. Phang, Mentorship, Network Partners, Partners, Contact, the mentor form and Starlight.

## 16. Still needed from Geo

1. **"Recap Reel V4.mp4"**, so the hero can use the full 24–39 range from his source (see §1).
2. **Official Ten Ambassadors logo files**, including the favicon mark.
3. **The final Ten Ambassadors email** and contact details. Forms use `info@theupmixer.com` until then.
4. **Final social links:** LinkedIn, Instagram, Facebook and YouTube.
5. **Confirmed partners and sponsors.** Jopwell is still not described as a sponsor or partner.
6. **The final Starlight event domain** (see §12).
7. **Unresolved photo credits:**
   - the 424-series event name ("Circa Upmixer Holiday Event" is still unverified)
   - sources for IMG_3977, IMG_4004, IMG_4007 and A7R00711
8. **Legal sign-off** on Privacy, Terms and Accessibility (still drafts), nonprofit status and disclosure language.
9. **Higher-resolution media:**
   - a higher-resolution export of the vertical recap footage (the sharp column is 608 px)
   - a clean Dr. Phang film with no timecode or watermark, plus captions and a transcript
10. **A confirmed mentor and approved copy**, if the mentor story should return (see §6).
