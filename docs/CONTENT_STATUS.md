# Content Status

Last updated: 2026-10-03 (George fidelity pass; V2.2 baseline below)

**Update (2026-10-03, George fidelity pass).** Public pages no longer show reviewer "pending" markers. Outstanding items appear to visitors only as polished, truthful launch-stage wording, for example "will be introduced as partnerships are confirmed" or "In preparation" cards. To see the reviewer markers on a review deployment, set the environment variable `NEXT_PUBLIC_SHOW_REVIEW_NOTES=1`.

This table is the internal source of truth for what is still outstanding. For how to update content, see `docs/CONTENT_UPDATES.md`.

## Needs client content

| Area | Needed | File |
|---|---|---|
| Brand | Official name style (Ten vs 10 Ambassadors), logo files, brand colors | `lib/site.ts`, `components/layout/Wordmark.tsx`, `app/globals.css` |
| Copy approval | All `[draft]` copy (hero headline, purpose statement, SMS lines, section titles) | `content/home.ts`, `content/about.ts` |
| About | Founding story; leadership / Founding Ambassadors (names, roles, photos, bios) | `content/about.ts` |
| Dr. Phang Scholarship | Story, legacy/biography, eligibility, award, application window, selection, timeline, recipients, impact, application URL; confirm "1968–2023"; honoree portrait | `content/scholarships.ts` |
| Scholarship film | Usage rights; clean export (no timecode or watermark); captions + transcript | `content/media.ts` |
| Future scholarships | Any additional scholarships | `content/scholarships.ts` |
| Mentorship | Program structure; mentor requirements; mentee eligibility; application flow | `content/programs.ts` |
| Service | Service initiatives; volunteer roles; sign-up destination | `content/programs.ts` |
| Starlight | Link to the existing event site; date, venue, city, tickets; honorees; sponsorship packages; photography | `content/starlight.ts` |
| Partners | Confirmed partners by category, with logo files (SVG preferred) and URLs | `content/partners.ts` |
| Donations | Chosen provider and its hosted checkout URL | `lib/site.ts` → `donation` |
| Contact | Email; phone and mailing address (optional) | `lib/site.ts` → `contact` |
| Forms | Destination for the contact and newsletter forms (email service / list provider) | `components/pages/ContactForm.tsx`, `components/layout/NewsletterForm.tsx` |
| Social | Verified Instagram, LinkedIn, Facebook, YouTube URLs | `content/navigation.ts` |
| Legal | Nonprofit status and disclosure text; privacy policy; terms; accessibility statement | `lib/site.ts`, `content/legal.ts` |
| The Upmixer | URL to link (after its Phase 2 redesign) | `lib/site.ts` → `parentOrg.url` |
| Impact | Verified statistics and stories (no Impact page is built until they exist) | — |
| Photo credits | Exact event names for the AllseeinJah.com 424 series; the label now reads "Photo: AllseeinJah.com, 2018". Sources for IMG_3977, IMG_4004, IMG_4007, A7R00711 | `content/attributions.ts` |
| Hero film | Optional: a higher-resolution export of the vertical recap footage (the current sharp column is 608 px wide) | `scripts/hero_recut/`, `content/media.ts` |
| Partners | Confirmation of any Jopwell relationship. Today the photo is historical event context only | `content/partners.ts` |

## Facts used on the site, and their sources

| Fact | Source |
|---|---|
| "Launched by The Upmixer, Ten Ambassadors is an initiative focused on developing future leaders through Scholarship, Mentorship, and Service." | Existing organization language (V1 package) |
| "Strengthening Communities. Building Leaders. Expanding Opportunity." | Existing organization language |
| The Upmixer is a professional networking, events, and marketing organization | Phase 1 brief |
| The Dr. Christopher A. Phang Scholarship exists | Phase 1 brief and approved asset package |
| "1968–2023" beside Dr. Phang's name | End card of the approved film (confirm) |
| Starlight Awards: celebrate excellence, fundraiser opportunity | Phase 1 brief (presented as a vision: "envisioned as") |

No impact numbers, amounts, recipients, dates, deadlines, partners, leaders, testimonials, geographic reach, or nonprofit status have been stated anywhere.


## V2.2 — strategy brief integration

**Now on the site, sourced from the client strategy brief** (proposed wording, pending final sign-off):

- Positioning, proposed mission, and the core message "Developing leaders. Connecting communities. Creating impact."
- Why "Ten"
- The founding ecosystem roles
- Network Partner types and roles (a draft framework)
- Program areas for scholarship, mentorship industries and formats, and service areas (all labelled as planned)
- The global direction and the 2026 / 2027–28 / 2029+ horizon
- Ambassador criteria and form fields
- The six sponsorship pathways
- The seven giving pathways
- The impact measures (no numbers are shown)
- Starlight positioning and Global Black Tie
- The four award concepts (labelled "Concept · pending approval")
- The Ten Ambassadors / Upmixer Inc. operating distinction

**Verified facts:** Starlight Awards Holiday Soirée 2026 · Friday, December 11, 2026 · Matriarch at Cachet Boutique Hotel · 512 W. 42nd Street, New York, NY 10036.

**Formation language:** the site says "being established" throughout. It makes no 501(c)(3) or tax-deductibility claims. `site.formationStatus` is shown on `/about` and `/donate`.

**Still pending from the client.** Each item is marked on the site with a dashed "pending" label:

| Pending item | Where it is marked on the site |
|---|---|
| Final mission / headline approval | Homepage "What is Ten Ambassadors?" · `/about#mission` |
| Founding Ambassadors | `/about#leadership` |
| Board | `/about#leadership` |
| Host Committee | `/about#leadership` (Institutional Host Committee) |
| Starlight start time | Homepage Starlight card · `/starlight` (Time: "To be announced") |
| Starlight ticket link | Homepage Starlight card · `/starlight` (Tickets: "To be announced") |
| Final awards / honorees | `/starlight` awards ("Concept · pending approval") and Honorees block |
| CRM / database | Every intake form ("Preview · not collecting yet") |
| Donation processor | `/donate`, `/get-involved#support` |
| Legal / tax-exempt status | Footer · `/about` · `/donate` (`site.formationStatus`) |
| Media clearance / captions | Homepage film · `/scholarship/dr-christopher-a-phang` |

Confirmed Network Partners and sponsors are also still needed.

**Resolved in the V2.2 follow-up:**

- **Mentorship conversation photo:** IMG_4006 is now used.
- **Dr. Phang homepage cut:** re-cut to the source's natural end, 41.00 s. A full ~45 s version is possible if Geo supplies clean footage past 02:00.

## V2.4 additions needing client approval

- **Recap film:** confirm that the people shown agreed to promotional use, and approve the caption wording, which states that the footage comes from the wider Upmixer event community.
- **"Questions, answered"** (`content/about.ts` → `faqs`, shown on `/about#questions`): every answer restates existing site facts. The client should approve the wording, especially the Upmixer relationship ("Upmixer Inc. … event-production and experience partner").
- **Meta titles and descriptions** (search snippets only; no visible copy changed): please review.
- **Contact geography / headquarters:** still unconfirmed. No office, city or chapter is claimed anywhere.

## Geo revision (2026-10-02): needs from Geo

| Area | Needed | File |
|---|---|---|
| Photo sources | Event / source and year for IMG_3977, IMG_4001, IMG_4004, IMG_4007, A7R00711 (A7R00711 metadata says 2018-12-12; confirm whether it was the Upmixer Holiday Event), plus the event for the AllseeinJah 2016 set | `content/attributions.ts` |
| Hero film | Human-centered organization-at-work cut, as a 16:9 MP4 (plus an optional WebM and a portrait cut for phones) | `content/media.ts` → `heroFilm` |
| Photos | Two-women AllseeinJah (15 of 424)[84]; A7306914; man on stage; "all orgs"; 010-AllseeinJah (13 of 639); Jopwell; Geo on stage | `content/media.ts` → `geoPending` |
| Connections | Final social, LinkedIn, email and other destination URLs | `content/navigation.ts`, `lib/site.ts` → `contact.email` |
| Legal | Approve the Privacy, Terms and Accessibility drafts, then set `status: "approved"` (pages become indexable) | `content/legal.ts` |
