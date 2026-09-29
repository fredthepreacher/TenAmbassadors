# Content Status — Phase 1 (V2)

Last updated: 2026-09-29

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
