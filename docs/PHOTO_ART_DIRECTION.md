# Photo art direction

**Scope.** This is the internal record for the George fidelity and premium visual pass (2026-10-03, branch `george-fidelity-visual-polish`). It is not public.

**Rule.** No photograph is allowed to lose a forehead, eyes, face, chin, head or meaningful gesture because of its container. Each frame shape is chosen for the photograph, and `object-position` is explicit. Where one crop cannot serve every breakpoint, the photo gets a derivative or its own frame shape.

## How crops are verified

The audit is automated, so it can be re-run after any content change.

1. **Face boxes.** YuNet (OpenCV face detector) finds face boxes in every served source image. Primary faces are those with confidence ≥ 0.75 and at least 15% of the area of the largest face in the photo. Known false positives are excluded: a jacket in A7R00711 and a hand in IMG_3977.
2. **Projection.** On every route at 13 viewports, each rendered `<img>` box, its `object-fit` / `object-position` and its natural size are used to project the face boxes onto the visible crop.
   - **Routes:** `/`, `/about`, `/scholarship`, `/scholarship/dr-christopher-a-phang`, `/mentorship`, `/service`, `/starlight`, `/partners`, `/network-partners`, `/get-involved`, `/contact`.
   - **Viewports:** 320, 360, 375, 390, 393, 430, 667×375, 844×390, 768, 1024, 1280, 1440, 1920.
3. **Flags.** The audit flags three things:
   - a face partially outside the crop (between 3% and 97% visible);
   - a head whose crown or sides are clipped, measured as the face box extended up by 55% and sideways by 12%; edges imposed by the source photo itself are ignored;
   - a credit label overlapping a face.

**Results:**

| Build | Cut faces | Cut heads | Credits over faces |
|---|---|---|---|
| 68ea38e (production) | 84 | 54 | 20 |
| This branch | **0** | **0** | **0** |

The production flags were: the hero poster's foreheads, the IMG_3977 collage edge, the Mentorship hero (2292), the Jopwell heads, the all-orgs edge heads, and credits over faces on 4006 and 4004.

The hero film was checked per frame: YuNet boxes on 6 fps samples of every shot, compared against each cut's safe zone. Phones and tablets need faces above the copy band; desktop needs faces clear of the left seam and the bottom fade.

## Placements

Frame sizes below are CSS pixels at 390×844 and 1440×900.

| Source | Route / section | Focal subject | Phone frame | Desktop frame | Position | Correction this pass | Credit |
|---|---|---|---|---|---|---|---|
| Recap footage (sizzle 16–35 s), 4:5 cut | `/` hero (all portrait screens, desktop) | Speaker → listeners → two guests in conversation | 390×488 (4:5, fills exactly) | 579×724 shown whole in the 727×724 panel | contain, 50% 50% | **Full-subject framing, 2026-10-04** (see below) | "Footage: The Upmixer event archive" |
| A7R00711 (landscape still) | `/` hero, landscape phones/tablets only | Two men in suits | 844×580 (16:11) | — | 50% 0% | New static still; exposure −6% for the white backdrop | Pending, so no label |
| IMG_3977 business card | `/` collage, lead | Card exchange, both faces, hands | 347×261 (4:3) | 738×558 | 100% 50% | Lead frame. It no longer has an overlapping inset across the hands | Pending (no source) |
| 15 of 424, two women | `/` collage, support | Both faces and shoulders | 187×187 (1:1) | 413×413 | 50% 0% | Square from the top | Photo: AllseeinJah.com, 2018 |
| 11 of 424, mixed group | `/` collage, context | Three faces | 187×187 (1:1) | 522×374 | 50% 0% | No longer an overlapping inset | Photo: AllseeinJah.com, 2018 |
| A7306914, seated panel | `/` collage, context | Four seated speakers | 347×195 (16:9) | 738×374 | 50% 6% | Wide frame keeps every head | Circa Upmixer event, 2023 |
| 2292, two men in suits | `/` mentorship; `/mentorship` hero | Two faces | 257×321 (4:5) | 456×570; hero 620×496 | **50% 0%** | Hero crop cut both heads at 22% (fixed) | Photo: AllseeinJah.com |
| IMG_4006 (inset) | `/` mentorship | Two-person conversation | 203×142 | 341×239 | 50% 40% | Credit moved bottom-left (a guest's face sat under it) | Upmixer event |
| 130 of 424, Geo on stage | `/about` hero | Geo speaking, head to knee | 347×434 (4:5) | 510×638 (4:5) | 50% 22% | **New 4:5 derivative** `ta-geo-stage-red-portrait.jpg` (crop only, 960×1200) in a portrait frame. Geo was a small figure in a 5:4 crop | Photo: AllseeinJah.com, 2018 |
| IMG_4004, three women | `/about` ecosystem band | Three faces | 347×121 | 1280×445 | 50% 50% | — (passes) | Pending |
| 13 of 639, drinks removed | `/mentorship` Become a Mentor | Two men at the table | 347×261 (4:3) | 510×383 | 45% 35% | — (passes) | Photo: AllseeinJah.com |
| 139 of 424, AAIA stage | `/mentorship` Future Ambassador | Speaker on stage | 347×261 | 510×383 | 52% 30% | — (passes) | Photo: AllseeinJah.com, 2018 |
| 16 of 424, Jopwell | `/partners` hero | Three people in Jopwell shirts | 347×261 | 620×496 | **42% 0%** | Heads were cut at 35% (fixed). File renamed `ta-geo-jopwell-event.jpg`. Caption under the image says no sponsorship is implied | Photo: AllseeinJah.com, 2018 |
| IMG_4061, all orgs | `/network-partners` band | Ten people on a red carpet | 390×293 | 1440×630 | **50% 8%** | Outer heads were cut at 40% (fixed) | Upmixer event |
| Recap poster | `/network-partners` recap film | Listener | 347×434 | 460×575 | 50% 45% | Film moved here from the homepage | Upmixer event recap |
| Phang posters | `/`, `/scholarship`, scholarship page | Two-shot | 16:9 | 16:9 | 50% 50% | — | Still from the Dr. Christopher A. Phang Scholarship film |

## Hero film (recut)

> **Superseded in part (2026-10-04, full-subject framing).** The phone and square cuts were replaced by one 4:5 cut, 608×760, crop only. It is shown with `object-fit: contain`, so the browser never crops it. On portrait phones the hero frame is 4:5 and the film fills it exactly; tablets and desktop show it whole over a softened backdrop.
>
> **Shot changes:**
> - The speaker shot now starts at 5.22 s, after the close-up whose hair touches the source's top edge.
> - The contact-exchange shot was replaced by two guests in conversation (15.12–15.74 s). The source column cuts through the face of the woman on the left, so no crop could show her whole head.
>
> See `docs/GEORGE_FIDELITY_REPORT.md` → "Hero full-subject framing" and `scripts/hero_recut/render_v.py`. The notes below describe the 2026-10-03 cut.

**Source:** `assets/recap-master/TenAmbassadors_Recap_16-35_Horizontal_1080p.mp4`. This is the client's sizzle section, George's suggested 16 s to 35 s, from the wider Upmixer community.

**Why.** George asked for realistic humans, the organization at work, connection and visible diversity. The 2026-10-02 handoff film had three problems:
- its opening was a faceless torso crop;
- its second half was a red-lit club scene with a drink in hand;
- its group frame was cut at the foreheads (verified on the 1080p master).

**Shots:**
- speaker addressing the room, 4.02–7.52 s (one internal punch-in);
- two young professionals listening, 7.60–10.10 s;
- two guests exchanging contacts, 10.16–11.10 s.

**Treatment:**
- Shots play at 0.8× with frame-accurate timing and no synthetic in-between frames.
- Soft dip-dissolves of 0.5 s. The closing dissolve lands on the exact first frame, so the loop never visibly resets.
- Only the sharp vertical column (x 655–1263) is used. Every crop sits above the burned-in captions, and no drinks are in frame.

**Cuts:**

| Cut | Size | Used for | Notes |
|---|---|---|---|
| Phone | 720×792 | Portrait phones | |
| Square | 720×720 | Portrait tablets and desktop | |
| Static still (A7R00711) | — | Landscape phones and tablets | A 16:11 frame cannot keep vertical footage's faces above the headline |

Each cut has a matching still, chosen by mutually exclusive media queries in both `<picture>` and HeroFilm.

**Script:** `scripts/hero_recut/render_v.py`, with face checks in `facescan.py`.

**Limit:** resolution. The sharp column is 608 px wide, so the film is soft on 2× screens. A higher-resolution export of the original vertical footage would fix this with no code change.

## Diversity

George asked for visible Black, white, Asian and Latino representation. It is spread across the site rather than carried by one section:

- **Hero:** a South Asian speaker; white and South Asian young professionals; two Black guests in conversation (since 2026-10-04). The landscape still shows a Black man and an East Asian man.
- **Collage:** Black (card exchange), Latina (two women), white (group), mixed (panel).
- **Mentorship:** Black (2292, 13 of 639).
- **Partners:** the Jopwell group.
- **About:** Geo.
- **Network Partners:** all orgs (a Black-professional majority).
- **Recap film:** diverse.

The only descriptions used here are what is visible. No identities are asserted in public copy or alt text.

## Tone

Client photographs are not filtered. The only pixel treatment this pass is a −6% exposure on the bright white backdrop of the landscape still. The film gets a light denoise and sharpen at encode; colour, faces and skin are untouched.
