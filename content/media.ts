import type { Media, VideoAsset } from "@/lib/types";

/**
 * Approved asset package V2 (creative-reviewed). See docs/ASSET_MAP.md.
 * Alt text describes only what is visible — no names or roles are assumed.
 */
export const media = {
  hero: {
    src: "/media/hero/ta-hero-img-3977.jpg",
    alt: "At a professional gathering, a man in a blue windowpane suit studies a business card while a woman beside him gestures mid-conversation.",
    width: 1536,
    height: 1025,
    focus: "44% 38%",
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
