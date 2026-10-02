# TEN AMBASSADORS — REAL-PHOTO CINEMATIC HERO HANDOFF

## Goal
Replace the temporary business-card hero fallback with the attached cinematic hero made from real event photography. This is a focused media integration, not a redesign.

## Included files
- `TenAmbassadors_Hero_Cinematic_1080p.mp4` — 1920×1080 review/master.
- `TenAmbassadors_Hero_Web_720p.mp4` — optimized 1280×720 website derivative.
- `TenAmbassadors_Hero_Poster.jpg` — poster/static fallback.

## Source-photo rule
The hero was assembled from older event photographs selected specifically to avoid reusing the current Geo-revision photography already visible elsewhere on the site. Do not substitute any current Geo photo into the hero.

## Claude implementation instructions
1. Work ONLY on `geo-revision-2026-10-02`. Preserve `bb0a046` as the frozen Geo-revision base.
2. Do not touch Starlight, Upmixer, production, DNS, or the domain.
3. Put the optimized 720p MP4 and poster in an appropriate `public/media/hero/` path. Keep the 1080p master as a source/review asset unless serving it is justified.
4. Wire `heroFilm` in `content/media.ts` to the new film and poster. Once active, the business-card image should no longer be duplicated in the hero; it remains in its intended collage placement.
5. Preserve the existing hero headline, copy, CTAs, layout, navigation, and Geo revision. This is a media replacement only.
6. Hero behavior: muted autoplay where permitted, `playsInline`, loop, no autoplay audio. Do not add unnecessary visible controls to an ambient hero.
7. Use a dark/navy readability overlay so existing hero text remains clearly readable. Do not bake text into the video.
8. Desktop/tablet: cinematic 16:9 `object-cover`. Mobile: deliberately tune crop/object-position so faces and meaningful action are not hidden behind headline/CTA.
9. Test 320, 375, 390, 430, 768, 1024, 1440, 1920 px and landscape phone.
10. Preserve V2.4 mobile-media safeguards: iOS Safari inline playback, poster until first real frame, no black flash, pause when appropriate in background/offscreen, graceful autoplay failure.
11. `prefers-reduced-motion` and data-saving users must receive the polished poster/static hero without forced video download.
12. Protect initial-load performance and CLS. Poster establishes hero geometry before video is ready. Do not preload the full MP4 unnecessarily.
13. Verify the Community Recap and Dr. Christopher A. Phang films still behave exactly as intended.
14. Run typecheck, lint, production build, accessibility, link, overflow, and responsive QA.
15. Make one focused commit after implementation and report exactly what changed and any real-device caveats.
16. Do NOT merge to `main`, deploy production, or push unless Freddie explicitly approves.

## Visual intent
Premium documentary/editorial motion: restrained slow push/pan, soft dissolves, authentic event photography. It should feel alive and cinematic without looking like a slideshow or synthetic AI footage.
