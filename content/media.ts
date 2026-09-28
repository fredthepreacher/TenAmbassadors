import type { Media } from "@/lib/types";

/**
 * Event photography.
 *
 * These files are cropped from screenshot-derived references (white screenshot
 * margins removed — no other edits). Replace each `src` with the original
 * high-resolution file from Geo and update width/height. Allowed final
 * treatment: exposure, white balance, denoise, mild sharpening, resolution
 * improvement, crop. Never alter a person's appearance.
 *
 * Alt text describes only what is visible — no names or roles are assumed.
 */
export const media = {
  speaker: {
    src: "/images/events/speaker-event.png",
    alt: "A woman in a green dress speaks into a microphone in front of a floral wall as guests look on.",
    width: 1733,
    height: 893,
    focus: "52% 30%",
    isReference: true,
  },
  group: {
    src: "/images/events/group-event.png",
    alt: "A large group of guests in formal attire pose together for a photo at an evening event.",
    width: 567,
    height: 342,
    focus: "50% 40%",
    isReference: true,
  },
  mentorship: {
    src: "/images/events/mentorship.png",
    alt: "Two men lean over a table and look at a phone together during a conversation at an event.",
    width: 567,
    height: 342,
    focus: "55% 40%",
    isReference: true,
  },
  community: {
    src: "/images/events/community-event.png",
    alt: "A crowded event hall under colorful stage lights, with guests gathered and talking.",
    width: 567,
    height: 342,
    focus: "50% 50%",
    isReference: true,
  },
} satisfies Record<string, Media>;
