# Ten Ambassadors — V1 Build Summary (2026-09-28)

**Location:** `C:\Users\fredd\Documents\GitHub\TenAmbassadors` (81 files, not yet a git repo)

**Stack:** Next.js 16.3.6 · React 19.3 · TypeScript 5.9.3 · ESLint 9 (eslint-config-next) · plain CSS (global tokens + CSS Modules) · self-hosted Newsreader + Inter Tight fonts.

**Status:** `npm run check` (typecheck + lint + build) passes. axe-core WCAG 2 A/AA + best-practice: 0 violations on home, planned page, and 404. No horizontal overflow from 320 to 1920px. All internal links resolve (13 planned routes render safe "in development" pages).

**Design decisions:** deep green (#103f35 family) / warm paper / restrained gold; serif-led editorial type; hero photo occupies the right 62% so the speaker's face is never under text; reveal-on-scroll honors reduced motion.

**Architecture:** components call `lib/content.ts` getters → typed data in `content/` (types in `lib/types.ts`). `null` = pending content → labelled placeholder. Brand name lives in `lib/site.ts` (Ten vs 10 Ambassadors). `site.showPlaceholderNotes` hides all pending markers for launch.

## Recommended Phase 2
1. Get Geo's inputs (see list below), especially original photos and logo.
2. Real pages for Scholarship / Mentorship / Service, plus About.
3. Application and volunteer forms (route handlers + email or CRM), with the donation integration once a processor is chosen.
4. Connect a CMS (Sanity is the natural fit for this content model) so Geo can edit.
5. Events model and Starlight Awards page with a media gallery and video embeds.
6. Analytics, deploy to Vercel/Netlify, domain, OG image with real photography.

---

# Content Status — V1

Last updated: 2026-09-28

## Unresolved placeholders on the site

| Area | Placeholder shown | File to update |
|---|---|---|
| Brand name style | Using "Ten Ambassadors" (source material says "10 Ambassadors") | `lib/site.ts` |
| Logo | Typographic wordmark stand-in | `components/layout/Wordmark.tsx` |
| Pillar details | "Criteria / structure / initiatives to be announced" notes | `content/home.ts` → `pillars[].pendingDetail` |
| Featured story | Dashed "participant story will live here" card | `content/home.ts` → `featuredStory` |
| Event video | "Event film — video pending" tile | `content/home.ts` → `gallery` (video item) |
| Impact metrics | Four "—" slots with proposed labels | `content/home.ts` → `metrics` |
| Opportunities | Four "Coming soon" cards, eligibility/dates "To be announced" | `content/home.ts` → `opportunities` |
| Starlight Awards | "Details & media pending" | `content/home.ts` → `starlight` |
| Partners | Six dashed "Partner logo" slots | `content/home.ts` → `partners` |
| Contact | "Contact details pending" | `lib/site.ts` → `contact` |
| Social links | Instagram / Facebook / LinkedIn / YouTube shown as disabled chips | `content/navigation.ts` |
| Newsletter | Form shows a "not connected yet" message | `components/layout/NewsletterForm.tsx` |
| Donation | `/donate` in-development page | `lib/site.ts` → `donationUrl`, build `app/donate` |
| The Upmixer link | Name only, no URL | `lib/site.ts` → `parentOrg.url` |
| 13 planned pages | Safe "in development" pages (noindex) | `content/pages.ts` |
| Privacy / Terms | In-development pages | `content/pages.ts` |

## Original assets still needed from Geo

- Official logo and brand files (colors, fonts if any)
- Original high-resolution photo files for the four event images currently in use (the current files are cropped screenshots, about 570px wide except the hero)
- More event and participant photography, with permissions
- Event videos
- Scholarship criteria, award details, and application schedule
- Mentorship structure
- Service initiatives
- Verified impact statistics, with sources
- Approved participant stories and testimonials, with names, photos, and consent
- Partner and sponsor names and logo files (SVG preferred)
- Contact details
- Donation destination / processor
- Social media URLs
- Starlight Awards details and media
- Final contract confirmation
- Official name style: "Ten Ambassadors" or "10 Ambassadors"

## Photo handling log

| Site file | Source reference | Treatment |
|---|---|---|
| `events/speaker-event.png` | `reference/speaker-event-reference.png` | White screenshot margin cropped. No other edits. |
| `events/group-event.png` | `reference/group-event-reference.png` | White screenshot margin cropped. No other edits. |
| `events/mentorship.png` | `reference/mentorship-reference.png` | White screenshot margin cropped. No other edits. |
| `events/community-event.png` | `reference/community-event-reference.png` | White screenshot margin cropped. No other edits. |

No color, tone, face, or body changes were made. Gradient overlays in the layout are CSS only and sit around the subjects, not over their faces.
