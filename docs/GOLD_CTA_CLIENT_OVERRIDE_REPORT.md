# Client override: gold CTA / button system

**Date:** 2026-10-05
**Branch:** `mobile-media-parity`. This pass builds on the mobile media parity work, which is preserved and not reset or squashed.
**Starting commit:** `8223cfd` (`docs(review): record mobile media parity Preview QA`).
**Final commit:** the commit that adds this report, `fix(brand): apply Geo gold CTA direction`. It is committed separately from the media work.
**Status:** Vercel Preview only. Not merged; production unchanged. It needs Freddie's approval of both the mobile media changes and this gold treatment before any production merge.
**Evidence:** `docs/review/gold-cta-pass/`

---

## 1. Client direction

Geo clarified that the site's green CTA/button system should become gold, using the existing Ten Ambassadors gold family. This supersedes the earlier direction (George's brief, 2026-10-03) that green is the interaction colour.

The request is about the button and CTA interaction system. I did not blindly recolour every green pixel: photographs, video and every non-interactive colour are untouched.

## 2. Tokens and CSS (`app/globals.css`)

**Gold tokens used** (all already in the project; no new colours):

| Token | Value | Used for |
|---|---|---|
| `gold-200` | `#F1E3BD` | Glass button text on navy/royal; newsletter submit text; Get Involved row hover tint (35%) and press (60%) |
| `gold-300` | `#E6CF93` | Glass edge and arrow; outer focus ring; link underline on dark; active nav marker over dark heroes; hover lines on royal |
| `gold-400` | `#D8B866` | Primary hover; Starlight `gold` button; hero SMS strip hover tint (12%) |
| `gold-500` | `#C7A34B` | Primary fill (brand gold); glass fill (8%, 14% on hover); outline tint (8%, 16% on hover); link underline on light; active nav marker on white; Get Involved row baseline and arrow-chip fill |
| `gold-600` | `#A8862F` | Outline edge (80%, solid on hover); primary glow |
| `gold-ink` | `#7A5B12` | Text on light surfaces: text links, outline button, white `light` button, nav hover, contact/about inline links |
| `champagne` | `#F6ECD2` | Glass hover text and edge; `light` button hover fill; Starlight `night` text |
| `starlight` | `#E9CD86` | Starlight `night` edge on hover (unchanged) |
| `navy-950` | `#040E1E` | Text on solid gold; inner focus ring |

**Green tokens retired.**

- The ten `--color-green-*` values are replaced by `--color-green-*: initial;`, with a comment explaining Geo's direction.
- No green utility is generated, including Tailwind's default greens, so future work cannot quietly bring the old system back.
- The built CSS contains no `green` at all.

**Focus ring.** The button ring was navy + white; it is now navy + gold, matching the global ring the rest of the site already uses (`navy-950` 3px inside, `gold-300` outside). The navy ring carries contrast on light surfaces and the gold ring carries it on navy, royal and night:

| Surface | Ring that shows | Contrast |
|---|---|---|
| Ivory | Navy | 17.9:1 |
| Royal | Gold | 5.6:1 |
| Navy | Gold | 11.3:1 |
| Night | Gold | 13.2:1 |

`outline: 2px solid transparent` keeps a ring in forced-colors mode. Every button and link tested reports `:focus-visible` on keyboard focus.

**Comments updated so the green system is not restored by accident:**

- `components/ui/Button.tsx`, which used to say "Green is the interaction colour"
- the `.btn-*` and `.link-reward` comments in `globals.css`
- `docs/DESIGN_SYSTEM.md`, which gains a current interaction-colour note; its CTA rules are adjusted
- `docs/GEORGE_FIDELITY_REPORT.md`, which gains a one-line "superseded in part" note

No other brand documentation was rewritten.

## 3. Button variants

The hierarchy is preserved, from most to least visual weight.

| Variant | Where | Before (green) | After (gold) |
|---|---|---|---|
| `primary` | Light surfaces; scrolled header; mobile menu; form submits; error page | Solid `green-600`, white text | Solid `gold-500` with a soft top sheen, `navy-950` text, gold glow. Hover: `gold-400` |
| `glass` | Navy/royal: hero, featured scholarship, About, Network Partners, Donate, Closing, header over dark heroes | Translucent green fill, mint edge, white text | Gold glass: `gold-500` at 8% fill, `gold-300` edge, `gold-200` text, gold arrow, gold glow. Hover: 14% fill, champagne edge and text |
| `light` | White button on royal (Service) | White, `green-800` text, mint hover | White, `gold-ink` text. Hover: champagne |
| `outline` | Secondary on light | Green edge and text, mint tint | `gold-600` edge, `gold-ink` text, 8% gold tint. Hover: 16% |
| `outline-light` | Secondary on dark | White edge; mint hover | White edge and text; hover turns the edge `gold-300` with a 14% gold tint |
| `gold`, `night` | Starlight | Gold / champagne | **Unchanged.** They already used gold and still read as the evening palette |

**Why the glass carries its gold in the edge.** A translucent gold fill heavier than about 10% reads as grey-olive over blue. Yellow over blue desaturates; this was rendered and compared on navy, royal and the hero gradient during this pass. A fill heavy enough to look gold drops white text below 4.5:1. So the gold lives in the edge, the pale-gold text, the arrow and the glow, and the fill stays a light tint. On screen it reads as a navy pill with a gold rim.

**Disabled.** Form submits keep `disabled:opacity-60`: gold at 60% with navy text, about 4.2:1. Disabled controls are exempt from WCAG contrast; it still reads clearly as inactive (`07-button-states.jpg`). The "not yet open" chips appear only in review mode and were never green.

## 4. Text links and other interactive accents

**Changed to gold, because they act as CTAs or as interaction feedback next to the buttons:**

- **`TextLink` and `.link-reward`.** `gold-ink` text on light surfaces. The underline extends in `gold-500` on light and `gold-300` on dark (`.link-reward.text-paper` / `.text-champagne`, through a `--link-accent` variable).
- **Homepage SMS story links** ("Explore scholarship / mentorship / service"): `gold-ink`.
- **Get Involved rows (homepage):**
  - hover tint `gold-200` at 35%, press tint at 60%
  - baseline `gold-500`
  - title hover `gold-ink`
  - arrow chip `gold-ink`, filling `gold-500` with navy arrow on hover
- **Hero SMS pathway strip:** hover tint `gold-400` at 12%.
- **Header nav:**
  - hover `gold-ink` on the white header
  - active marker `gold-500` on white and `gold-300` over dark heroes (Starlight keeps `starlight`)
  - mobile menu press colour `gold-ink`
- **Hover rules:** `/service` area list (`gold-500`) and the homepage Service chapter (`gold-300`).
- **Area list hover** (`/mentorship`, `/service`): `gold-ink`.
- **Inline links:** the Contact page email link and the About page "Starlight Awards" link are now `gold-ink` with a `gold-500` underline at 50%, solid on hover.
- **Pathway pages and the scholarship page's in-page nav:** the back link and section links hover in `gold-ink`.
- **Footer newsletter "Subscribe":** the same gold-glass treatment as `glass`.

**Green intentionally retained: none in the interface.** The only remaining mentions of green are:

- historical records in old reports (`GEORGE_FIDELITY_REPORT.md`, which is now marked superseded, and earlier pass reports);
- "evergreen" in `ARCHITECTURE.md`, which describes the V1 palette's history.

Neither affects the site.

## 5. Contrast verification (measured)

**Method.**

1. Each button and CTA link was screenshotted in place with its text made transparent.
2. The median colour inside the shape was taken as the actual background. This includes glass blur, gradients, sheen and whatever lies beneath.
3. That background was compared with the computed text colour, in the default state on every viewport and in the hover state on desktop.

**Scope:** 14 routes, 6 viewports, 806 measurements. All pass WCAG AA (4.5:1) with margin.

| Element | Default, minimum | Hover, minimum | Before (green), default / hover |
|---|---|---|---|
| `primary` | **8.43** | **10.45** | 4.99 / 6.61 |
| `glass` | **5.97** (header CTA over the `/service` hero) | **6.10** | 6.18 / 5.42 |
| `light` | **6.30** | **5.36** | 8.83 / 8.12 |
| `outline` | **5.49** | **5.16** | 5.71 / 5.35 |
| `outline-light` | **8.63** | **6.82** | 8.63 / 7.41 |
| `gold` (Starlight) | 10.09 | 12.62 | unchanged |
| `night` (Starlight) | 13.29 | 13.20 | unchanged |
| Text links (`.link-reward`, `gold-ink`) | **5.83** | **5.83** | 6.11 / 6.11 |
| Newsletter submit | **12.59** | **12.29** | 11.67 / 9.15 |
| Get Involved rows (text) | 18.11 | 16.64 | 18.11 / 16.65 |

The lowest value anywhere is **5.16:1** (`outline` hover on stone). The old green primary was at the AA floor (4.99:1); the gold primary is 8.43:1.

## 6. Responsive review

| Check | Result |
|---|---|
| Viewports | 320×568, 390×844, 430×932, 768×1024, 1440×900, 1920×1080, plus 375×667, 393×852 and 844×390 in the route sweep |
| Button text clipping | 0, across 594 button/link measurements |
| Buttons under 44 px tall | 0. `.btn` is 48 px, the header CTA 44 px, the Get Involved arrow chip 44 px |
| Horizontal overflow | None on any route at any viewport |
| Long labels | Fit at 320 px (e.g. "Learn about the scholarship", "Visit the Starlight Awards site", "Become a Network Partner") |
| Wrapping | Full-width stacked buttons on phones wrap as before |
| Real-codec sweep: Electron 44 / Chromium 152, 11 routes × 9 viewports (99 loads) | 0 console errors, 0 exceptions, 0 unhandled rejections, 0 hydration warnings, 0 HTTP ≥ 400, 0 broken images, CLS ≤ 0.0002 |
| Hero film | Still plays on phones (mobile encode) and desktop |
| Copy, SEO and form routing (20 routes, before vs after) | Visible text, titles, descriptions, canonicals, Open Graph/Twitter tags, media and every link identical. The only difference is the CSS bundle's file name |
| Rejected red-lit Mentorship photo (`ta-mentorship-4006.jpg`) | Rendered on 0 of 20 routes; still removed |
| Commands | `npm run typecheck` ✓ · `npm run lint` ✓ · `npm run build` ✓ · `git diff --check` ✓ |

## 7. Screenshots (`docs/review/gold-cta-pass/`)

| File | Contents |
|---|---|
| `01-home-desktop-1.jpg` | 1440, before/after: header over the hero (glass) and scrolled (primary), hero CTAs, featured scholarship, SMS story links, Mentorship, Service |
| `02-home-desktop-2.jpg` | 1440, before/after: Network Partners, Starlight (unchanged), Get Involved rows and row hover, Closing, footer newsletter |
| `03-home-mobile-1.jpg`, `04-home-mobile-2.jpg` | The same at 390×844 |
| `05-inner-desktop.jpg`, `06-inner-mobile.jpg` | About, Mentorship, Scholarship, Network Partners, Get Involved, Contact (form submit and email link), Starlight, Service, before/after |
| `07-button-states.jpg` | Every variant: default, hover, keyboard focus, pressed and disabled (form submit) |
| `08-viewports.jpg` | Hero, Service, Mentorship and Contact CTAs at 320, 430, 768 and 1920 |

The screenshots come from a local production build in Chromium, with Reduced Motion on so the reveal animations are settled. In those shots the hero shows its "Play film" control and poster, not the moving film.

## 8. Preserved

Every Geo revision is untouched:

- the young-professionals wording and "Fundraiser opportunity"
- the approved V4 hero and the mobile hero/media fixes
- the collage hierarchy, with the two-women photo as the lead image
- the Mentorship copy; the secondary red-lit Upmixer Mentorship image stays removed
- the Dr. Phang edited film, and the hidden incomplete scholarship sections
- the Network Partners video and the Starlight treatment
- the photo credits
- contact/form routing, SEO/canonicals and accessibility behaviour

## 9. Files

| File | Change |
|---|---|
| `app/globals.css` | Gold button variants; link accent; focus ring; green tokens retired |
| `components/ui/Button.tsx` | Comment and `TextLink` dark tone |
| `components/layout/SiteHeader.tsx`, `components/layout/NewsletterForm.tsx` | Header nav accents; newsletter submit |
| `components/home/GetInvolved.tsx`, `Hero.tsx`, `ServiceFeature.tsx`, `SmsStory.tsx`, `components/pages/AreaList.tsx` | Rows, pathway strip, hover lines, links |
| `app/about`, `app/contact`, `app/service`, `app/get-involved/[pathway]`, `app/scholarship/[slug]` (`page.tsx`) | Inline links and hover accents |
| `docs/DESIGN_SYSTEM.md`, `docs/GEORGE_FIDELITY_REPORT.md` | Current interaction colour; superseded note |
| `docs/GOLD_CTA_CLIENT_OVERRIDE_REPORT.md`, `docs/review/gold-cta-pass/*.jpg` | This report and the evidence |
