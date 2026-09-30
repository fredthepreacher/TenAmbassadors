# Architecture & Recommendations — Phase 1 (V2 / V2.1)

> V2.1 (`phase1-v2-visual`) replaces the ivory/evergreen palette with royal blue / navy / warm white / reward gold and adds the interaction system described in `docs/DESIGN_SYSTEM.md`. Sections 1–2 below describe V2; the storyboard order in V2.1 moves Global Vision before Starlight so Starlight is the night-time climax.

## 1. Creative system

**Two environments, one brand**

- **Ten Ambassadors (bright):** ivory and paper surfaces, evergreen ink, restrained gold. Serif-led editorial typography (Newsreader) with a clean sans (Inter Tight). Large real photography, sharp-edged frames, generous whitespace.
- **Starlight (night):** near-black, starfield, a champagne-gold "luminous" headline. The homepage dims from paper to night before the Starlight section, and `/starlight` is fully in the night environment. The header switches tone on its own.

**Narrative spine:** Opportunity → Development → Service → New opportunity.

- Scholarship: *opportunity opens the door.*
- Mentorship: *people help you walk through it.*
- Service: *then you hold the door open for someone else.*

The homepage SMS section expresses this as a scroll-linked cycle diagram. It has no scroll hijacking and works fully without JavaScript.

**Motion**, all of it disabled or reduced under `prefers-reduced-motion`:

- A transform-only "settle" on hero photos
- A text rise on load
- Soft image reveals as frames enter view
- CSS scroll-driven drift (no JS)
- A twinkling Starlight starfield
- SMS cycle progression

## 2. Homepage storyboard

| # | Section | Component | Assets |
|---|---|---|---|
| 01 | Hero + SMS strip | `home/Hero` | IMG_3977 (enhanced) |
| 02 | Why we exist (+ Upmixer origin, source language) | `home/Purpose` | — |
| 03 | SMS story (sticky cycle) | `home/SmsStory`, `home/SmsCycle` | — |
| 04 | Opportunity in motion | `home/InMotion` | A7R00711 (enhanced), 499-500-2342 |
| 05 | Featured scholarship: Dr. Christopher A. Phang | `home/FeaturedScholarship` | 30-second film + poster |
| 06 | Mentorship | `home/MentorshipFeature` | 478-479-2292, IMG_4006 (cropped; V2.2 follow-up) |
| 07 | Service (future initiatives) | `home/ServiceFeature` | — |
| 08 | Starlight transition | `home/StarlightFeature` | — (typographic) |
| 09 | Global vision (aspiration, explicitly not a claim) | `home/GlobalVision` | decorative meridian SVG |
| 10 | Partners & sponsors (five categories, no fake logos) | `home/PartnersFeature` | — |
| 11 | Get involved (five pathways) | `home/GetInvolved` | — |
| 12 | Closing + newsletter + footer | `home/Closing`, `layout/SiteFooter` | — |

## 3. Sitemap

```
/                     Home
/about                Mission & Vision · Our Story (#story) · Leadership / Founding Ambassadors (#leadership)
/scholarship          Overview · scholarships list · Future scholarships (#future)
  /[slug]             Scholarship detail template → /dr-christopher-a-phang
/mentorship           Overview · Become a Mentor (#become-a-mentor) · Future Ambassador pathway (#ambassador-pathway)
/service              Initiatives (#initiatives) · Volunteer (#volunteer)
/starlight            Starlight Awards · Attend (#attend) · Sponsor (#sponsor)
/partners             Partner categories · Sponsorship (#sponsor)
/get-involved         Pathways · Support the Mission (#support)
/contact
/privacy /terms /accessibility
```

These were deliberately **not** built because no content exists for them yet: Impact / Stories, News / Insights / Resources, standalone Events, and per-person Leadership pages. The content model already has types for leaders, and the scholarship template shows the pattern. Add routes when real content arrives.

## 4. Content model and CMS

All content is typed (`lib/types.ts`) and read only through the async getters in `lib/content.ts`. To connect a CMS, rewrite those getters. No component changes are needed.

**Recommendation: Sanity (Free plan).** Sanity's pricing page, checked 2026-09-29, lists:

- $0/month with up to 20 user seats, 10,000 documents, 2 public datasets, 1M CDN API requests and 250k API requests a month.
- Growth is $15 per seat per month if the team ever needs more.
- A nonprofit plan for eligible organizations (application required).

Why Sanity:

- Its structured schemas map one-to-one onto the existing types: scholarship, program, event, leader, partner, story, and the Starlight settings.
- It gives Geo's team a hosted editing studio.
- It includes a free image CDN.
- The site stays statically generated. On-demand revalidation via webhook means pages update in seconds without a rebuild.

Alternative with no third-party service: **Keystatic** (git-based, content stays in this repository). This suits a very small editing team, but every edit is a git commit.

Suggested Sanity schemas:

- `scholarship`: slug, name, honoree{name, years, portrait}, status, summary, story, legacy, facts[], timeline[], recipients[], video refs, apply{url, open}
- `program` (mentorship and service tracks)
- `initiative`
- `event` (including Starlight)
- `leader`
- `partner` (category, logo, url)
- `story` (for the future Impact section)
- `siteSettings` (contact, social, donation URL, nonprofit disclosure)

## 5. Hosting and recurring cost

The client target is about **$20/month or less per website**, excluding domains and payment processing.

| Item | Cost | Note |
|---|---|---|
| Vercel Pro | $20/month (one developer seat; viewer seats free) | Vercel's Hobby plan is for personal, non-commercial use, so Pro is the safe choice for an organization |
| Sanity Free | $0 | Or apply for Sanity's nonprofit plan |
| Email and newsletter | $0 to low | Many providers have free tiers at small list sizes. Choose at launch. |
| Domain | billed separately | Registration can stay where it is; only DNS records point to the host |

This lands at about $20/month. If a $0 host is required, the site is a standard static-first Next.js app and can also run on hosts with free commercial tiers. Verify each provider's current terms before committing.

## 6. Donations

No processor was chosen, so none was integrated. Every Support/Give CTA reads `site.donation.url`. When it's set, the CTAs link to the provider's hosted checkout or form. Keep processing fees separate from hosting in client billing.

Common nonprofit options to evaluate: Stripe Checkout / Payment Links, Givebutter, Donorbox, Zeffy, PayPal Giving Fund.

## 7. SEO foundation

- Per-page metadata via `lib/seo.ts`: title template, description, canonical, Open Graph.
- A generated OG image (`app/opengraph-image.tsx`).
- `sitemap.xml` covers real routes only; legal placeholder pages are `noindex`.
- `robots.txt`.
- Organization JSON-LD in `app/layout.tsx`. Founder is The Upmixer, per the source line. It uses no `NGO` type and no nonprofit claims until status is confirmed.
- Semantic landmarks, one `h1` per page, and descriptive alt text on every photo.
- No rankings or traffic are promised.

## 8. Accessibility

- Skip link; landmarks; one `h1` per page; logical heading order.
- A two-tone focus ring, visible on every surface.
- A keyboard-operable mobile menu with focus trap, Escape to close, and focus returned to the toggle.
- Accessible forms: labels, required fields, live status messages.
- Pending CTAs render as non-interactive, clearly labelled text rather than dead links.
- Video is click-to-play with native controls. A caption `<track>` renders automatically once captions exist.
- Reduced motion is respected throughout.
- axe-core (WCAG 2.0/2.1 A/AA and best practices) reported 0 violations on all 13 routes plus the 404 page, at 1440px and 390px.

## 9. Performance

- Static generation for every route; one ~11 KB (compressed) stylesheet; a small client JS footprint.
  - Client components: header, SMS story, video, forms, and the reveal observer.
- The hero image is preloaded with `fetchPriority="high"`. Hero motion is transform-only, so it never delays LCP.
- Video bytes load only after the visitor presses play. Posters are optimized by `next/image`.
- Fonts are self-hosted with metric-matched fallbacks (CLS 0). The serif uses the weight-only axis files (about 120 KB, versus about 280 KB with the optical-size axis).
- Lighthouse, run locally against `next start` on simulated mobile/4G, typically scored:
  - Performance 81–88; Accessibility, Best Practices and SEO 100.
  - Desktop Performance 99.
  - The main mobile cost is web-font download under throttling. A CDN (Vercel) usually improves on local numbers.
