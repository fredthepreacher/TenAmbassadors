# Design System — V2.1 (Royal Blue / Gold exploration)

Branch `phase1-v2-visual`. `phase1-v2` (ivory/evergreen) stays as the comparison point.
The color direction is an **exploration pending client approval**. Every value lives in `app/globals.css` → `@theme`.

## Color

| Role | Token | Value | Use |
|---|---|---|---|
| Brand primary | `royal-700` | `#1746A2` | Primary buttons, links, Service chapter, closing |
| Royal family | `royal-900…50` | `#0E2F6E` → `#F2F6FD` | Hovers, tints, hover fills |
| Authority / depth | `navy-900` | `#081B33` | Hero, global vision, scholarship gradient |
| Deepest | `navy-950` | `#040E1E` | Footer, focus inner ring |
| Warm white | `ivory` | `#F8F6F0` | Default page surface |
| White | `paper` | `#FFFFFF` | SMS, get involved, cards |
| Reward gold | `gold-500` | `#C7A34B` | Brand gold (rules, completion, marks) |
| Gold on light | `gold-ink` | `#7A5B12` | Small gold text on light surfaces (AA) |
| Gold on dark | `gold-300/400` | `#E6CF93` / `#D8B866` | Accents on navy/royal; gold CTAs |
| Night | `night-950…700` | `#03060D` → `#16223A` | Starlight |
| Starlight | `starlight`, `champagne` | `#E9CD86`, `#F6ECD2` | Luminous type on night |

**Gold is a reward color.** Use it only for:

- completion (SMS cycle, journey marker)
- recognition and legacy (the scholarship chapter)
- Starlight
- the three highest-value CTAs: the hero, scholarship details, and Explore Starlight
- hover acknowledgments (underlines that extend, rules that draw)

**Homepage rhythm** (visual chapters):

1. Hero: navy + photo
2. Why we exist: warm white
3. SMS: white
4. Opportunity in motion: warm white, photography-led
5. Scholarship: royal → navy, with gold
6. Mentorship: warm white
7. Service: royal
8. Global vision: navy
9. Dusk
10. Starlight: night
11. Dawn
12. Partners: warm white
13. Get involved: white
14. Closing: royal
15. Footer: navy-950

## Typography (two families)

- **Inter Tight** handles UI, body text, and **h1/h2 headlines**: semibold, tracking −0.035em. It gives authority and momentum.
- **Newsreader** (serif) supplies the emphasis inside headlines: every `<em>` in an h1/h2 renders as serif italic.
  - This contemporary-sans-plus-editorial-serif pairing is the brand's typographic signature.
  - Newsreader is also used for h3 labels, scholarship legacy lines (`font-editorial`), and Starlight.
- The fluid scale (`text-display`, `text-h1…h3`, `text-lede`) uses `clamp()` from 320px up to 1920px.

## Graphic system

- **Ring of ten** (`components/ui/Motifs.tsx → RingOfTen`): ten nodes on a circle. It stands for ten ambassadors and one connected cycle. It appears:
  - small, in the hero eyebrow
  - as ghosted geometry in Purpose, page heroes, Global vision, and Closing
  - functionally, as the ten ticks of the SMS cycle
- **SMS connective geometry**: dashed gold connector lines between photographs (In Motion, Mentorship), directional flow lines (Service), and meridians (Global vision).
- **Outline numerals** (`OutlineNumeral`): oversized 01/02/03 behind the SMS stages and scholarship-detail sections.
- **Editorial rules**: gold hairlines that draw in on reveal (`data-reveal="rule"`), corner ticks framing the film (`.frame-ticks`), and the Legacy → Opportunity → Future arc.

## Interaction language (`globals.css`, components layer)

| Pattern | Class | Behavior |
|---|---|---|
| Button | `.btn` + `.btn-primary / -gold / -outline / -outline-light / -light / -night` | 1px lift, controlled fill, arrow travels 4px, one light sweep on hover, 0.985 press on tap |
| Text link | `.link-reward` | Underline extends to full width and turns gold; arrow travels |
| Photo | `.photo` + `.photo-caption` | Hover scale 2.5%; caption label reveals on hover (always visible on touch) |
| Rows (get involved, partners, service) | — | Row tint on hover/press, gold baseline grows across, arrow chip fills |
| Navigation | `SiteHeader` | Transparent over dark first screens, clean white after scrolling; underline grows from the left; active page keeps a gold underline; mobile menu items stagger in (40ms) |
| Reveal | `data-reveal`, `data-reveal="image"`, `data-reveal="rule"` | 0.7s fade-up, a mask lift for images, a gold rule draw; stagger via `--reveal-delay` (60–140ms) |
| Drift | `.drift` | CSS scroll-driven, about 2.5% travel, no JS |

Hover is never required: every state has a tap or focus equivalent. All motion is disabled under `prefers-reduced-motion`.

## Signature moments

1. **Hero choreography** (about 1.2s, CSS only): the photo settles from 104.5%; then the identifier, headline lines, lede, CTAs, and scroll cue follow at 120/200/300/420/540ms. Text starts at 12% opacity so LCP isn't delayed.
2. **SMS cycle** (`SmsStory` + `SmsCycle`): the ring draws itself with reading progress (piecewise: each stage owns a third).
   - Ticks light as the line passes them, and the centre reads "Stage n of 3".
   - Reaching "The cycle begins again" closes the circle: the line turns gold, a soft glow blooms, and **one gold pulse travels around it once**.
   - On mobile a sticky three-segment rail fills, then the ↻ chip turns gold.
3. **Journey marker** (`JourneyIndicator`): a quiet right-edge dot rail while the visitor is in the Scholarship, Mentorship, and Service chapters.
   - Leaving Service completes it to "New opportunity" in gold.
   - Labels only show at 1600px and wider; on mobile it becomes a hairline under the header.
4. **Day becomes night** (`StarlightFeature`): navy → night-800 → night-950.
   - Sparse stars fade in and a gold horizon line widens with scroll (CSS scroll-driven).
   - The headline receives one slow pass of light.
   - A short "dawn" gradient returns to warm white.
