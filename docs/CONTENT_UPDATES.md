# Updating content (no developer needed for routine changes)

George's goal is for routine updates to be manageable internally, with recurring costs kept to roughly $20/month or less per website.

## How content is organized

Every visitor-facing fact lives in one typed file under `content/` or in `lib/site.ts`. Components never hard-code it. TypeScript catches a missing field before anything ships.

| Update | File | Notes |
|---|---|---|
| Contact email, phone, address | `lib/site.ts` → `contact` | The footer, Contact page and Organization schema all update |
| Social links | `content/navigation.ts` → `socialLinks` | Paste a URL to replace `null`. It also feeds the schema `sameAs` |
| Donations | `lib/site.ts` → `donation.url` | Setting a hosted checkout URL turns on every "Give" CTA |
| Starlight event (date, venue, time, tickets, honorees, external site) | `content/starlight.ts` | `time`, `externalUrl`, `honorees` and `actions[].available` |
| Scholarships | `content/scholarships.ts` | Add an entry to create a new `/scholarship/[slug]` page. Facts with a value appear automatically |
| Partners / sponsors | `content/partners.ts` → `partners` (logos in `public/media/partners/`) | Network Partners go in `networkPartners` |
| Founding Ambassadors, Board, Host Committee | `content/about.ts` → `leadership` | The "In preparation" cards disappear once entries exist |
| Service initiatives | `content/programs.ts` → `serviceInitiatives` | Give one a `title` and it replaces the focus areas |
| Photo captions / credits | `content/attributions.ts` | Keyed by image path. Use `status: "confirmed"` only for verified wording |
| Photos | `content/media.ts` (`focus` = the crop position) | After changing a crop, re-run the crop audit (see `docs/PHOTO_ART_DIRECTION.md`) |
| Hero film | `content/media.ts` → `heroFilm` | One cut per breakpoint, plus its first-frame still |
| Announcements | Newsletter signup today. A news/updates list would be a new `content/updates.ts` (approval needed) | — |

## Recommended workflow (free)

1. Edit the file in the GitHub web editor (the pencil icon on the file) and describe the change in the commit message.
2. Commit to a branch, not `main`. With the Vercel Git integration connected, every branch gets its own Preview URL.
3. Check the Preview, then merge to `main` to publish.

This needs no paid tools: GitHub, plus Vercel's Git integration.

**Hosting cost note.** Vercel Hobby is free but limited to non-commercial use; check its terms for a nonprofit organization site. Vercel Pro is $20/month per member. A static export to Cloudflare Pages or Netlify's free tier would also work, but it is a separate decision.

## If editing files becomes a burden

A free Git-based editor (for example Decap CMS) can sit on top of these same files. Editors get a simple form UI, and content still lives in the repo with no recurring cost.

`lib/content.ts` is already the single access layer, so a hosted CMS (Sanity's free tier, for example) could also replace the file reads later without touching components.

Either option needs Freddie's approval. **No CMS has been added.**

## Still needed from the client

See `docs/CONTENT_STATUS.md`. The short list:
- social URLs
- contact email and phone
- legal page approval
- confirmed partners
- photo event names
- founding Ambassadors and leadership
