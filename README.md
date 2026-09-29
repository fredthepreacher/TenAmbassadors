# Ten Ambassadors — Website (Phase 1 · V2)

The website for **Ten Ambassadors**, a nonprofit initiative built around **Scholarship, Mentorship, and Service (SMS)**.
Intended domain: `tenambassadors.org` (not connected; see "Deployment" below).

## Stack

- **Next.js 16** (App Router, static generation) · **React 19** · **TypeScript 5.9**
- **Tailwind CSS v4**. Design tokens live in `app/globals.css` (`@theme`).
- Self-hosted variable fonts (Newsreader, Inter Tight; SIL OFL) in `app/fonts/`. Builds need no network access.
- `next/image` for every photo (AVIF/WebP, responsive `sizes`). Video is click-to-play: only the poster image loads with the page.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + production build
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage story in 12 sections (see docs/ARCHITECTURE.md) |
| `/about` | Mission & vision, our story (`#story`), leadership (`#leadership`) |
| `/scholarship` | Scholarship overview and list, future scholarships (`#future`) |
| `/scholarship/[slug]` | **Reusable scholarship template**. First entry: `/scholarship/dr-christopher-a-phang` |
| `/mentorship` | Program overview, `#become-a-mentor`, `#ambassador-pathway` |
| `/service` | `#initiatives`, `#volunteer` |
| `/starlight` | Starlight Awards integration: dark "gala" environment, `#attend`, `#sponsor` |
| `/partners` | Partner categories, `#sponsor` |
| `/get-involved` | All pathways, `#support` (donations; provider pending) |
| `/contact` | Contact details (pending) and an accessible inquiry form (not connected yet) |
| `/privacy`, `/terms`, `/accessibility` | Legal page template. Approved text pending; these pages are `noindex` until then. |

## Project map

```
app/                 routes, layout, SEO (sitemap, robots, OG image), globals.css tokens
components/
  layout/            SiteHeader (sticky, route-aware tone, mobile menu), SiteFooter, Wordmark, NewsletterForm
  home/              Hero, Purpose, SmsStory + SmsCycle, InMotion, FeaturedScholarship, MentorshipFeature,
                     ServiceFeature, StarlightFeature, GlobalVision, PartnersFeature, GetInvolved, Closing
  pages/             PageHero, ContactForm
  ui/                Button (ButtonLink, TextLink, ActionButton), Pending (PendingNote, PendingBlock),
                     SectionHeading, VideoFeature, Icons, RevealObserver
content/             typed content: home, media, scholarships, programs, starlight, partners,
                     involvement, navigation, about, legal
lib/                 site.ts (brand, contact, donation, flags), types.ts (content model),
                     content.ts (async getters: the CMS seam), seo.ts, cn.ts
public/media/        approved V2 assets (hero, mentorship, community, scholarship video + posters)
assets/              originals from the approved package (not served)
scripts/             prepare_v2_assets.py (asset crop/poster pipeline)
docs/                ARCHITECTURE.md, CONTENT_STATUS.md, ASSET_MAP.md, benchmark notes, V1 archive
```

## Common edits

| Task | Where |
|---|---|
| Brand name (Ten vs 10 Ambassadors), logo | `lib/site.ts`, `components/layout/Wordmark.tsx` |
| Brand colors / type scale | `app/globals.css` → `@theme` |
| Homepage copy | `content/home.ts` (`[draft]` marks copy awaiting client approval) |
| Scholarship facts, story, recipients | `content/scholarships.ts` (add a new object for a new scholarship) |
| Donation provider | `lib/site.ts` → `donation.url`. Support CTAs switch over automatically. |
| Social / contact / nonprofit disclosure | `content/navigation.ts`, `lib/site.ts` |
| Partners and logos | `content/partners.ts` |
| Starlight date, venue, external site | `content/starlight.ts` |
| Hide all "pending" markers at launch | `lib/site.ts` → `showPlaceholderNotes: false` |

## Content integrity

`null` in `content/` means "not supplied yet". It renders a clearly labelled placeholder. **Never replace a `null` with invented facts.**
Photos keep people's natural appearance. The only edits allowed are crop and format. See `docs/ASSET_MAP.md`.

## Deployment

- Work happens on the branch `phase1-v2`. Pushing that branch creates a **Vercel preview deployment**. Previews are `noindex` by default.
- `main` deploys to production (`tenambassadors.vercel.app`). Merge only with client approval.
- **Do not** attach `tenambassadors.org` or change DNS without explicit approval.
- Set `NEXT_PUBLIC_SITE_URL` in each Vercel environment. Canonical URLs and the sitemap use it.
