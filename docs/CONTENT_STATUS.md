# Content Status — Phase 1 (V2)

Last updated: 2026-09-29 (V2.2)

Everything below renders on the site as a **clearly labelled placeholder**. When the client supplies the content, update the listed file (or the CMS, once connected). To hide every marker at launch, set `lib/site.ts` → `showPlaceholderNotes: false`.

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

## Facts used on the site, and their sources

| Fact | Source |
|---|---|
| "Launched by The Upmixer, Ten Ambassadors is an initiative focused on developing future leaders through Scholarship, Mentorship, and Service." | Existing organization language (V1 package) |
| "Strengthening Communities. Building Leaders. Expanding Opportunity." | Existing organization language |
| The Upmixer is a professional networking, events, and marketing organization | Phase 1 brief |
| The Dr. Christopher A. Phang Scholarship exists | Phase 1 brief and approved asset package |
| "1968–2023" beside Dr. Phang's name | End card of the approved film (confirm) |
| Starlight Awards: celebrate excellence, fund opportunity | Phase 1 brief (presented as a vision: "envisioned as") |

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
