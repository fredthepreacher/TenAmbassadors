import type { Media } from "@/lib/types";

/**
 * Event photography.
 *
 * V1.1: these are the enhanced versions in /images/events-enhanced/. They were
 * made from the cropped screenshot references (/images/events/) with
 * non-generative processing only — Lanczos resize, light denoise, subtle
 * contrast/color correction and sharpening (see scripts/enhance_assets.py).
 * They are still screenshot-derived: replace each `src` with the original
 * high-resolution file from Geo when supplied and update width/height. Allowed final
 * treatment: exposure, white balance, denoise, mild sharpening, resolution
 * improvement, crop. Never alter a person's appearance.
 *
 * Alt text describes only what is visible — no names or roles are assumed.
 */
export const media = {
  speaker: {
    src: "/images/events-enhanced/speaker-event-enhanced.jpg",
    alt: "A woman in a green dress speaks into a microphone in front of a floral wall as guests look on.",
    width: 2560,
    height: 1319,
    focus: "47% 32%",
    isReference: true,
  },
  group: {
    src: "/images/events-enhanced/group-event-enhanced.jpg",
    alt: "A large group of guests in formal attire pose together for a photo at an evening event.",
    width: 1800,
    height: 1086,
    focus: "50% 40%",
    isReference: true,
  },
  mentorship: {
    src: "/images/events-enhanced/mentorship-enhanced.jpg",
    alt: "Two men lean over a table and look at a phone together during a conversation at an event.",
    width: 1800,
    height: 1086,
    focus: "55% 40%",
    isReference: true,
  },
  community: {
    src: "/images/events-enhanced/community-event-enhanced.jpg",
    alt: "A crowded event hall under colorful stage lights, with guests gathered and talking.",
    width: 1800,
    height: 1086,
    focus: "50% 50%",
    isReference: true,
  },
} satisfies Record<string, Media>;
