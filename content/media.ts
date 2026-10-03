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
   * Hero still: the first frame of the hero film (square cut). `heroFilm.variants` carries every
   * breakpoint's framing; this entry is the fallback when no film is set.
   */
  hero: {
    src: "/media/hero/ta-hero-square-poster.jpg",
    alt: "Guests at an evening professional gathering.",
    width: 720,
    height: 720,
    focus: "50% 22%",
  },
  mentorshipGenerational: {
    src: "/media/mentorship/ta-mentorship-2292.jpg",
    alt: "Two men in suits stand shoulder to shoulder, smiling; the man on the left gives a thumbs-up.",
    width: 1365,
    height: 1741,
    focus: "50% 22%",
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
  collageGroup: {
    src: "/media/geo/ta-geo-collage-group.jpg",
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
  },
  /** AllseeinJah.com (16 of 424) — three people in Jopwell shirts, as supplied. */
  geoSponsorJopwell: {
    src: "/media/geo/ta-geo-sponsor-jopwell.jpg",
    alt: "Three smiling people wearing blue Jopwell T-shirts pose together in front of a Jopwell banner.",
    width: 2048,
    height: 1846,
    focus: "42% 35%",
  },
  /** IMG_4061 — the “all orgs” group photo, as supplied (no DJ gear or wires in this frame). */
  geoAllOrgs: {
    src: "/media/geo/ta-geo-network-all-orgs.jpg",
    alt: "A large group of professionals in suits and evening wear stand together on a red carpet in front of an event backdrop.",
    width: 2149,
    height: 1249,
    focus: "50% 40%",
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
  featured: {
    /*
     * V2.2 homepage cut: 01:19.00 → 02:00.00 of the source — the natural end of
     * the supplied 01:00–02:00 segment (exactly 41.00s; nothing looped or
     * extended). It closes on the held end card. Fades: video+audio in 0.9s,
     * cinematic out 1.75s. Framing untouched; burned-in timecode and watermark
     * untouched (media clearance still pending). Replace with a full ~45s cut
     * if clean footage past 02:00 is supplied.
     */
    title: "The Dr. Christopher A. Phang Scholarship — film excerpt",
    src: "/media/scholarship/dr-phang-featured.mp4",
    poster: media.phangPoster30,
    durationLabel: "0:41",
    captions: null,
    transcript: null,
  },
  full: {
    title: "The Dr. Christopher A. Phang Scholarship — 60-second film",
    src: "/media/scholarship/dr-phang-60s.mp4",
    poster: media.phangPoster60,
    durationLabel: "1:00",
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
 * Hero film (George fidelity pass, 2026-10-03) — recut from the client's own sizzle footage,
 * TenAmbassadors_Recap_16-35 (George's suggested 16 s–35 s section; scenes from the wider
 * Upmixer event community). It shows the organization's world at work rather than a party:
 * a speaker addressing the room → engaged young professionals listening → two guests connecting.
 *
 * - Only the sharp vertical column of the master is used; every crop sits above the burned-in
 *   captions, and no drinks are in frame. Faces were checked per frame (YuNet) for each crop.
 * - 0.8× speed (frame-accurate, no synthetic in-between frames), soft dip-dissolves, and a closing
 *   dissolve into the exact first frame, so the loop never resets visibly.
 * - Cuts: phone 720×792 (0.909, the phone hero frame) and square 720×720 (portrait tablets and
 *   desktop). Landscape phones/tablets (16:11 frame, any width below 1024) cannot hold this vertical footage without
 *   faces dropping under the headline, so they get a static still (A7R00711, Approved Assets V2).
 * - Source scripts: scripts/hero_recut/. Superseded handoff film: assets/hero-film-master/ (not served).
 */
const heroAlt = "Guests at an evening professional gathering.";
export const heroFilm: HeroFilm | null = {
  label: "Silent film of real community events: a speaker addresses the room, young professionals listen, and two guests connect.",
  variants: [
    {
      id: "phone",
      media: "(max-width: 639px) and (orientation: portrait)",
      mp4: "/media/hero/ta-hero-phone.mp4",
      poster: { src: "/media/hero/ta-hero-phone-poster.jpg", alt: heroAlt, width: 720, height: 792, focus: "50% 0%" },
    },
    {
      id: "tablet-portrait",
      media: "(min-width: 640px) and (max-width: 1023px) and (orientation: portrait)",
      mp4: "/media/hero/ta-hero-square.mp4",
      poster: { ...media.hero, alt: heroAlt },
    },
    {
      id: "tablet-landscape",
      media: "(max-width: 1023px) and (orientation: landscape)",
      mp4: null,
      poster: { src: "/media/hero/ta-hero-landscape-poster.jpg", alt: heroAlt, width: 1600, height: 1100, focus: "50% 0%" },
    },
    {
      id: "desktop",
      media: "(min-width: 1024px)",
      mp4: "/media/hero/ta-hero-square.mp4",
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
  | "sponsorJopwell"
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
  sponsorJopwell: { media: media.geoSponsorJopwell, awaiting: "The photo of three people wearing Jopwell shirts" },
  aboutGeoStage: { media: media.geoStageRed, awaiting: "The photo of Geo speaking on stage" },
};
