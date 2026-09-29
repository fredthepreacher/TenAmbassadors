# Content Status — V1

Last updated: 2026-09-28 (V1.1 visual asset pass)

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

For these V1 crops, no color, tone, face, or body changes were made. Gradient overlays in the layout are CSS only and sit around the subjects, not over their faces.


### V1.1 — enhanced event photography (live on the site)

| Site file | Made from | Size | Treatment |
|---|---|---|---|
| `events-enhanced/speaker-event-enhanced.jpg` | `events/speaker-event.png` | 2560 × 1319 | Non-generative: Lanczos resize, 3px median denoise, contrast ×1.08, color ×1.05, brightness ×1.02, unsharp mask |
| `events-enhanced/group-event-enhanced.jpg` | `events/group-event.png` | 1800 × 1086 | Same |
| `events-enhanced/mentorship-enhanced.jpg` | `events/mentorship.png` | 1800 × 1086 | Same |
| `events-enhanced/community-event-enhanced.jpg` | `events/community-event.png` | 1800 × 1086 | Same |

Script: `scripts/enhance_assets.py`. No generative or face reconstruction was used. These are still screenshot-derived, so originals from Geo remain the top asset request. The `events/` PNGs are kept for comparison and are no longer referenced by the site.
