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
     * V2.2 homepage cut: 01:19.00 → 01:58.55 of the source (39.55s), from the
     * supplied 01:00–02:00 segment. The requested ~02:04 end lies beyond the
     * supplied footage; 01:58.55 is the last natural pause (held end card).
     * Fades: video+audio in 0.9s, out 1.5s. Framing untouched; burned-in
     * timecode and watermark untouched (media clearance still pending).
     */
    title: "The Dr. Christopher A. Phang Scholarship — film excerpt",
    src: "/media/scholarship/dr-phang-featured.mp4",
    poster: media.phangPoster30,
    durationLabel: "0:40",
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
