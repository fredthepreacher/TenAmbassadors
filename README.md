# Ten Ambassadors — Website (V1 Foundation)

Premium Next.js site for **Ten Ambassadors**, a nonprofit initiative launched by The Upmixer and focused on **Scholarship, Mentorship, and Service (SMS)**.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript 5.9
- Plain CSS: global tokens in `app/globals.css`, one CSS Module per component (no Tailwind needed)
- Self-hosted variable fonts (Newsreader + Inter Tight, SIL OFL) in `app/fonts/`, so builds don't need a network connection
- `next/image` for every photo (AVIF/WebP, responsive `sizes`)

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + production build
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` once the domain is confirmed.

## Project map

```
app/
  layout.tsx            Fonts, metadata, header/footer, Organization JSON-LD
  page.tsx              Homepage (composes sections in order)
  [slug]/page.tsx       Safe "in development" page for every planned route
  not-found.tsx         404
  sitemap.ts robots.ts opengraph-image.tsx icon.svg
  globals.css           Design tokens + base styles
components/
  layout/               SiteHeader (sticky, mobile menu), SiteFooter, Wordmark, NewsletterForm
  sections/             Hero, Origin, Pillars, FeaturedStory, Gallery, ImpactMetrics,
                        Opportunities, Starlight, Partners, GetInvolved
  ui/                   ButtonLink/TextLink, SectionHeading, PendingNote/StatusPill, Icons, RevealObserver
content/
  home.ts               All homepage copy + data
  media.ts              Photo registry (src, alt, size, focal point)
  navigation.ts         Header/footer/social links
  pages.ts              Planned routes + what each still needs
lib/
  site.ts               Brand name, parent org, contact, donation URL, placeholder toggle
  types.ts              CMS-ready content model
  content.ts            Async getters (the only thing components call)
public/images/
  events/               Photos used on the site (cropped from references)
  reference/            Original screenshot references (untouched)
docs/                   Build prompt, asset plan, benchmark notes, CONTENT_STATUS.md
```

## Common edits

| Task | Where |
|---|---|
| Change brand name (Ten ↔ 10 Ambassadors) | `lib/site.ts` → `name`, `wordmark` |
| Swap brand colors | `app/globals.css` → `:root` tokens |
| Replace a photo with the original | Drop the file in `public/images/events/`, update `content/media.ts` (src, width, height) |
| Add verified impact numbers | `content/home.ts` → `metrics[].value` / `source` |
| Add a participant story | `content/home.ts` → `featuredStory.quote`, `personName`, `personRole` |
| Add partner logos | `content/home.ts` → `partners[]` (`name`, `logo`, `url`) |
| Add social / contact / donation links | `content/navigation.ts` → `socialLinks`; `lib/site.ts` → `contact`, `donationUrl` |
| Open an opportunity | `content/home.ts` → `opportunities[]` → `status: "open"`, `deadline`, `eligibility` |
| Build a real page | Create `app/<slug>/page.tsx`, then remove that slug from `content/pages.ts` |
| Hide all "pending" markers for launch | `lib/site.ts` → `showPlaceholderNotes: false` |

## Connecting a CMS later

Components never import `content/` directly; they call the getters in `lib/content.ts`. To move to Sanity, Contentful, Supabase, or another CMS, rewrite those getters to query the CMS and return the types in `lib/types.ts`. A `null` field means the content hasn't been supplied yet, and the UI shows a clearly labelled placeholder for it.

## Content integrity rules

- **Don't invent facts.** Dollar amounts, eligibility, dates, names, testimonials, statistics, partners, addresses, donation details, and social URLs all have to come from Geo.
- **Photos:** keep every person's natural appearance. Allowed treatment is exposure, white balance, denoise, mild sharpening, resolution improvement, and crop. Never alter faces, bodies, skin tone, or age, never add or remove people, and never fabricate a moment. See `docs/ASSET_PLAN.md`.

See `docs/CONTENT_STATUS.md` for everything that is still pending.
