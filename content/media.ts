import type { HeroFilm, Media, VideoAsset } from "@/lib/types";

/**
 * Approved asset package V2 (creative-reviewed). See docs/ASSET_MAP.md.
 * Alt text describes only what is visible — no names or roles are assumed.
 */
export const media = {
  /** IMG_3977 — the business-card exchange. Hero photo until the hero film exists; always the collage lead. */
  businessCard: {
    src: "/media/hero/ta-hero-img-3977.jpg",
    alt: "At a professional gathering, a man in a blue windowpane suit studies a business card while a woman beside him gestures mid-conversation.",
    width: 1536,
    height: 1025,
    focus: "44% 38%",
  },
  /**
   * Hero still: the first frame of the hero film (Geo's cut, 4:5). It is shown whole
   * (`object-fit: contain`), never cropped by its frame. `heroFilm.variants` carries every
   * breakpoint; this entry is also the fallback when no film is set.
   */
  hero: {
    src: "/media/hero/ta-hero-film-geo-poster.jpg",
    alt: "Guests at an evening professional gathering.",
    width: 608,
    height: 760,
    focus: "50% 50%",
  },
  mentorshipGenerational: {
    src: "/media/mentorship/ta-mentorship-2292.jpg",
    alt: "Two men in suits stand shoulder to shoulder, smiling; the man on the left gives a thumbs-up.",
    width: 1365,
    height: 1741,
    focus: "50% 0%",
  },
  mentorshipPeers: {
    src: "/media/mentorship/ta-mentorship-2321.jpg",
    alt: "Two young women stand close together smiling, one with her arm around the other.",
    width: 1150,
    height: 820,
    focus: "40% 40%",
  },
  communityProfessionals: {
    src: "/media/community/ta-community-2342.jpg",
    alt: "A young man in a suit and tie stands with his arms crossed beside two smiling women at a professional gathering.",
    width: 1365,
    height: 1643,
    focus: "50% 25%",
  },
  communityNetwork: {
    src: "/media/community/ta-community-a7r00711.jpg",
    alt: "Two men in suits pose together against a white wall, smiling at the camera.",
    width: 2048,
    height: 1366,
    focus: "58% 35%",
  },
  /* ---- V2.2 curated photography (crop only; see docs/ASSET_MAP.md) ---- */
  communityGroup: {
    src: "/media/community/ta-community-4007.jpg",
    alt: "Seven women dressed for an evening event stand together, smiling at the camera.",
    width: 1984,
    height: 1044,
    focus: "50% 6%",
  },
  communityPortrait: {
    src: "/media/community/ta-community-4004.jpg",
    alt: "Three smiling women stand close together at an evening gathering.",
    width: 1250,
    height: 435,
    focus: "50% 40%",
  },
  mentorshipConversation: {
    src: "/media/mentorship/ta-mentorship-4006.jpg",
    alt: "Two men in dark jackets stand face to face in conversation amid a crowded evening gathering.",
    width: 420,
    height: 300,
    focus: "50% 40%",
  },
  /* ---- Geo revision 2026-10-02 (see docs/GEO_10_POINT_REVISION_REPORT.md) ---- */
  /** AllseeinJah.com (11 of 424), Geo-selected for the collage (mixed group). Crop only: the frame
   *  stops above the man's hand, so the drink he holds is out of frame — no retouching. */
  /**
   * AllseeinJah.com (11 of 424). Geo meeting revision (2026-10-04): the liquor bottles on the back-bar
   * shelf behind the guests were removed (scripts/geo_inpaint_lama.py; mask and result in
   * assets/geo-revision-edits/). Only the shelf was changed: the people are untouched.
   */
  collageGroup: {
    src: "/media/geo/ta-geo-collage-group-clean.jpg",
    alt: "A young man in a dark blazer stands with two smiling women at an evening event.",
    width: 2048,
    height: 1536,
    focus: "50% 30%",
  },
  /* ---- Geo asset package (Ten_Ambassadors_Geo_Requested_Assets, 2026-10-02) ---- */
  /** AllseeinJah.com (15 of 424) — crop only (two women). */
  geoTwoWomen: {
    src: "/media/geo/ta-geo-collage-two-women.jpg",
    alt: "Two smiling women stand close together at an evening event.",
    width: 1300,
    height: 1625,
    focus: "50% 25%",
  },
  /** A7306914 — seated panel conversation, as supplied. */
  geoPanel: {
    src: "/media/geo/ta-geo-collage-panel.jpg",
    alt: "Four people sit on stage in a panel conversation; one speaks into a microphone while the others listen.",
    width: 1024,
    height: 819,
    focus: "50% 62%",
  },
  /** 010-AllseeinJah.com (13 of 639) — the two drinks on the table removed (inpainted, table/arm area
   *  only; see docs/ASSET_MAP.md), then cropped to exclude a background guest's glass on the far left. */
  geoMentorshipTable: {
    src: "/media/geo/ta-geo-mentorship-table.jpg",
    alt: "Two men lean over a table looking at a phone together at an evening gathering; one wears a white shirt and a backpack, the other a dark suit.",
    width: 1748,
    height: 1365,
    focus: "45% 35%",
  },
  /** AllseeinJah.com (139 of 424) — speaker on stage, as supplied. */
  geoStageAaia: {
    src: "/media/geo/ta-geo-stage-aaia.jpg",
    alt: "A man in a blue suit speaks into a microphone on stage in front of a large screen while a woman holding papers looks on.",
    width: 2048,
    height: 1365,
    focus: "52% 30%",
  },
  /** AllseeinJah.com (130 of 424) — speaker on a red-lit stage, as supplied. */
  geoStageRed: {
    src: "/media/geo/ta-geo-stage-red.jpg",
    alt: "A man in a grey coat speaks into a microphone on a stage lit in red.",
    width: 2048,
    height: 1365,
    focus: "68% 35%",
  },  /** 4:5 art-directed derivative of 130 of 424 (crop only): Geo on stage, head to knee, for the About hero. */
  geoStageRedPortrait: {
    src: "/media/geo/ta-geo-stage-red-portrait.jpg",
    alt: "A man in a grey coat speaks into a microphone on a stage lit in red.",
    width: 960,
    height: 1200,
    focus: "50% 22%",
  },
  /** AllseeinJah.com (16 of 424) — three people in Jopwell shirts, as supplied. */
  geoJopwellEvent: {
    src: "/media/geo/ta-geo-jopwell-event.jpg",
    alt: "Three smiling people wearing blue Jopwell T-shirts pose together in front of a Jopwell banner.",
    width: 2048,
    height: 1846,
    focus: "42% 0%",
  },
  /** IMG_4061 — the “all orgs” group photo, as supplied (no DJ gear or wires in this frame). */
  geoAllOrgs: {
    src: "/media/geo/ta-geo-network-all-orgs.jpg",
    alt: "A large group of professionals in suits and evening wear stand together on a red carpet in front of an event backdrop.",
    width: 2149,
    height: 1249,
    focus: "50% 8%",
  },
  recapPoster: {
    src: "/media/community/ta-recap-community-poster.jpg",
    alt: "Guests seated on a leather banquette listen to a speaker at an evening gathering.",
    width: 864,
    height: 1080,
    focus: "50% 45%",
  },
  recapPosterWide: {
    src: "/media/community/ta-recap-community-poster-wide.jpg",
    alt: "Guests seated on a leather banquette listen to a speaker at an evening gathering.",
    width: 1920,
    height: 1080,
    focus: "50% 50%",
  },
  phangPoster30: {
    src: "/media/scholarship/dr-phang-30s-poster.jpg",
    alt: "Still from the Dr. Christopher A. Phang scholarship film: two men talk seated by a sunlit window.",
    width: 1432,
    height: 670,
    focus: "50% 50%",
  },
  phangPoster60: {
    src: "/media/scholarship/dr-phang-60s-poster.jpg",
    alt: "Still from the Dr. Christopher A. Phang scholarship film: a young man and an older man in a blue blazer in conversation, seated by tall windows.",
    width: 1432,
    height: 670,
    focus: "50% 50%",
  },
} satisfies Record<string, Media>;

export const phangVideos = {
  /*
   * Geo meeting revision (2026-10-04): both cuts come from one edit of the approved source
   * (Dr_Phang_Scholarship_01m00s-02m00s.mp4, kept in assets/phang-master/) that removes the single
   * narration line "unexpectedly passed away this year" (scripts/edit_phang_statement.py). Nothing
   * else changes: framing, music, end card and the burned-in timecode/watermark are untouched
   * (no clean export has been supplied). The homepage and the scholarship page always match.
   */
  featured: {
    /* Homepage excerpt: 01:19 → the source's natural end at 02:00, minus the removed line. Fades 0.9 s in, 1.75 s out. */
    title: "The Dr. Christopher A. Phang Scholarship film (excerpt)",
    src: "/media/scholarship/dr-phang-excerpt.mp4",
    poster: media.phangPoster30,
    durationLabel: "0:38",
    captions: null,
    transcript: null,
  },
  full: {
    title: "The Dr. Christopher A. Phang Scholarship film",
    src: "/media/scholarship/dr-phang-film.mp4",
    poster: media.phangPoster60,
    durationLabel: "0:57",
    captions: null,
    transcript: null,
  },
} satisfies Record<string, VideoAsset>;

/**
 * V2.4 community recap — 00:16–00:35 of the client-supplied Recap Reel V2
 * (broader Upmixer event community; not Ten Ambassadors programs).
 * Master (1920×1080, 19.0 s, ~11.7 MB) is kept in assets/recap-master/.
 * Web derivative: centre 4:5 crop of the master (the vertical footage plus a
 * sliver of its blurred fill) at native 864×1080 — H.264 High CRF 25, AAC
 * 128k, faststart, ~3.8 MB. It never loads with the page (see AmbientVideo).
 * Speech is open-captioned in the footage itself.
 */
export const communityVideos = {
  recap: {
    title: "Community in motion — event recap",
    src: "/media/community/ta-recap-community.mp4",
    poster: media.recapPoster,
    durationLabel: "0:19",
    captions: null,
    transcript:
      "A speaker asks: “Are you only using AI just to make money? If so, I invite you to consider that perhaps you could do more.” Guests then meet, talk and exchange contacts.",
  },
} satisfies Record<string, VideoAsset>;

/**
 * V2.4 mobile-media pass — cinematic 16:9 derivative for tablets and landscape
 * phones: the full master frame (vertical footage on its blurred fill) scaled
 * to 1280×720, H.264 High CRF 26, AAC 128k, faststart, ~2.6 MB.
 */
export const communityVideoCinematic = {
  recap: { src: "/media/community/ta-recap-community-wide.mp4", poster: media.recapPosterWide },
};

/**
 * Hero film — Geo's own cut (Geo meeting revision, 2026-10-04): reel seconds 16–20 spliced to
 * 24–39 of the client's Recap Reel (20–24 left out on purpose), cut by scripts/hero_recut/render_geo.py.
 * The shot plan (reel times, crop window per shot) is in scripts/hero_recut/ta-hero-film-geo.plan.json.
 *
 * - Source: Geo named "Recap Reel V4.mp4" (Google Drive). Until that file is in the repo, the cut is
 *   rendered from the 16–35 s extract already in assets/recap-master/ (Recap Reel V2), which covers
 *   16–20 and 24–34.3; re-run the script on V4 (offset 0) and the full 24–39 range follows.
 * - The reel's first 0.4 s (a close-up of a hand holding a drink) is trimmed: the cut starts at 16.4.
 * - One 4:5 window per shot, 608×760, pixel-for-pixel from the sharp vertical column (no upscaling,
 *   no generative fill); each window gives the highest head the most headroom the source allows and
 *   stays above the burned-in captions. Real-time playback; Geo's hard cuts are kept.
 * - Shown whole (`object-fit: contain`). Portrait phones: the 4:5 frame matches the film exactly.
 *   Portrait tablets and desktop: the film sits inside the panel over `backdrop`, a tiny softened,
 *   darkened plate of its first frame. Landscape phones/tablets keep the static still (A7R00711).
 */
const heroAlt = "Guests at an evening professional gathering.";
const heroFilmGeo = "/media/hero/ta-hero-film-geo.mp4";
export const heroFilm: HeroFilm | null = {
  label: "Silent film of real community gatherings: guests meet, listen and talk with one another.",
  backdrop: "/media/hero/ta-hero-film-geo-backdrop.jpg",
  variants: [
    {
      id: "phone",
      media: "(max-width: 639px) and (orientation: portrait)",
      mp4: heroFilmGeo,
      poster: { ...media.hero, alt: heroAlt },
    },
    {
      id: "tablet-portrait",
      media: "(min-width: 640px) and (max-width: 1023px) and (orientation: portrait)",
      mp4: heroFilmGeo,
      poster: { ...media.hero, alt: heroAlt },
    },
    {
      id: "tablet-landscape",
      media: "(max-width: 1023px) and (orientation: landscape)",
      mp4: null,
      poster: { src: "/media/hero/ta-hero-landscape-a7r00711.jpg", alt: heroAlt, width: 1600, height: 1100, focus: "50% 0%" },
    },
    {
      id: "desktop",
      media: "(min-width: 1024px)",
      mp4: heroFilmGeo,
      poster: { ...media.hero, alt: heroAlt },
    },
  ],
};

/**
 * Geo-requested photographs. Filled 2026-10-02 from
 * Ten_Ambassadors_Geo_Requested_Assets (client asset manifest). A slot set back
 * to `null` restores the section's previous approved image. Never fill one
 * with a look-alike.
 */
export const geoPending: Record<
  | "collageTwoWomen"
  | "collageSeated"
  | "futureAmbassadorStage"
  | "networkAllOrgs"
  | "mentorshipTable"
  | "partnersJopwellEvent"
  | "aboutGeoStage",
  { media: Media | null; awaiting: string; edit?: string }
> = {
  collageTwoWomen: { media: media.geoTwoWomen, awaiting: "\u201cAllseeinJah.com (15 of 424)[84].jpg\u201d \u2014 the two-women photo" },
  collageSeated: { media: media.geoPanel, awaiting: "\u201cA7306914.jpg\u201d \u2014 people sitting and talking" },
  futureAmbassadorStage: { media: media.geoStageAaia, awaiting: "The photo of the man speaking on stage (red stage lighting)" },
  networkAllOrgs: {
    media: media.geoAllOrgs,
    awaiting: "The \u201call orgs\u201d group photo",
    edit: "Remove only the DJ equipment and wires on the left; keep every person unchanged",
  },
  mentorshipTable: {
    media: media.geoMentorshipTable,
    awaiting: "\u201c010-AllseeinJah.com (13 of 639).jpg\u201d",
    edit: "Remove only the two drinks on the table; rebuild the table surface",
  },
  partnersJopwellEvent: { media: media.geoJopwellEvent, awaiting: "The photo of three people wearing Jopwell shirts" },
  aboutGeoStage: { media: media.geoStageRedPortrait, awaiting: "The photo of Geo speaking on stage" },
};
