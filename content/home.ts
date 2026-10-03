import type { SmsStage } from "@/lib/types";
import { site } from "@/lib/site";
import { communityVideoCinematic, communityVideos, geoPending, heroFilm, media } from "./media";

/*
 * Homepage copy.
 * [source]  = existing Ten Ambassadors language.
 * [draft]   = presentation copy written for this build, pending client approval.
 *             It makes no factual claims.
 */

export const hero = {
  eyebrow: site.pillarsLine,
  /** [brief] core message */
  headline: [...site.coreMessage],
  /** [brief] supporting direction */
  lede: "Through Scholarship, Mentorship and Service, Ten Ambassadors brings together leaders, organizations and communities committed to preparing the next generation for meaningful impact.",
  image: media.hero,
  /** Geo point 2: silent organization-at-work film. Null → the photograph stays. */
  film: heroFilm,
  primary: { label: "Explore the pathway", href: "/#sms" },
  secondary: { label: "Get involved", href: "/get-involved" },
};

export const purpose = {
  eyebrow: "What is Ten Ambassadors?",
  /** [draft] headline + [brief] positioning */
  statement:
    "Talent is everywhere. Access is not. Ten Ambassadors is a leadership and impact organization being established around Scholarship, Mentorship and Service — using community, partnerships and shared experiences to develop and connect the next generation of leaders.",
  /** [brief] proposed mission */
  origin:
    "Our mission: to connect emerging and established leaders through scholarship, mentorship, service, shared experiences and professional engagement — strengthening communities and preparing the next generation of leaders.",
  /** [brief] core message */
  themes: [...site.coreMessage],
};

/** The SMS cycle — Opportunity → Development → Service → New opportunity. [draft] */
export const smsStages: SmsStage[] = [
  {
    id: "scholarship",
    index: "01",
    title: "Scholarship",
    line: "Opportunity opens the door.",
    body: "Scholarship removes barriers — so talent and ambition can meet education, access, and possibility.",
    href: "/scholarship",
  },
  {
    id: "mentorship",
    index: "02",
    title: "Mentorship",
    line: "Someone helps you walk through it.",
    body: "Mentorship connects emerging leaders with people who have walked the road before — guidance, perspective, and relationships that last.",
    href: "/mentorship",
  },
  {
    id: "service",
    index: "03",
    title: "Service",
    line: "You hold the door open for someone else.",
    body: "Service turns development into impact — each ambassador creating opportunity for the next.",
    href: "/service",
  },
];

export const smsIntro = {
  eyebrow: "The SMS pathway",
  title: "More than a scholarship. A cycle of opportunity.",
  cycleLabel: ["Opportunity", "Development", "Service", "New opportunity"],
  /** [draft] */
  finale: {
    line: "The cycle begins again.",
    body: "Every ambassador who is served becomes someone who serves — and a new door opens for the next leader.",
  },
};

export const mentorshipFeature = {
  eyebrow: "Mentorship",
  /** [source — V1 baseline copy] */
  title: "Leadership grows through access to people who have walked the road before.",
  /** [draft] — the network relationship is supplied context (The Upmixer). */
  body: "Ten Ambassadors intends to connect emerging leaders with accomplished professionals across business, finance, technology, healthcare, public service, law, media, sports and more — people who can offer what no classroom can: perspective, introductions, and honest guidance.",
  pillars: [
    { title: "Access", body: "Rooms, conversations, and introductions that are hard to reach alone." },
    { title: "Guidance", body: "Perspective from people a few steps — or a generation — further along." },
    { title: "Relationships", body: "Connections that outlast a single program or event." },
  ],
  images: {
    generational: media.mentorshipGenerational,
    /** V2.2 follow-up: IMG_4006 (client-selected), cropped to the two-person conversation. */
    conversation: media.mentorshipConversation,
  },
};

export const serviceFeature = {
  eyebrow: "Service",
  /** [draft] */
  title: "Leadership becomes action.",
  body: "Leadership carries responsibility. Ten Ambassadors is developing service initiatives — from youth leadership and education to community development — that turn what leaders have gained into opportunity for their communities.",
};

export const starlightFeature = {
  eyebrow: "The Starlight Awards",
  /** [brief concept] */
  title: ["Celebrate excellence.", "Fund opportunity."],
  /** [brief] */
  body: "Our signature annual celebration of leadership and impact — the gathering where leadership, achievement, service, community and culture come together, and one of the ways Ten Ambassadors supports its programs.",
};

export const globalVision = {
  eyebrow: "Global outlook",
  /** [draft] title; [brief] approved body */
  title: "Built for a world of emerging leaders.",
  body: "Our communities are increasingly connected across industries, generations, cultures and borders. Ten Ambassadors is being built to prepare leaders for that reality — strengthening relationships locally while laying the foundation for future global collaboration.",
  image: media.communityNetwork,
};

/**
 * Geo point 2: four-photo editorial collage directly below the hero.
 * Tiles: a = business-card exchange (lead), b = two women, c = seated conversation,
 * d = IMG_4001 group (overlapping inset). A tile with `media: null` shows a
 * reviewer-only placeholder naming the awaited file; the public build hides it.
 */
export const collage = {
  eyebrow: "In the room",
  /** [draft] presentation line; makes no factual claim. */
  title: ["Introductions, conversations", "and the relationships that follow."],
  tiles: [
    {
      id: "a",
      // Client decision 2026-10-02: show the collage now. Until the hero film is delivered the
      // business-card photo also remains the hero; once `heroFilm` is set, `media.hero` becomes a
      // film poster frame and this tile keeps the business-card photo.
      media: media.businessCard,
      awaiting: "",
    },
    { id: "b", media: geoPending.collageTwoWomen.media, awaiting: `Geo\u2019s ${geoPending.collageTwoWomen.awaiting}` },
    { id: "c", media: geoPending.collageSeated.media, awaiting: `Geo\u2019s ${geoPending.collageSeated.awaiting}` },
    { id: "d", media: media.collageGroup, awaiting: "" },
  ] as const,
};

/** "One Community. Many Networks." [brief] */
export const networkFeature = {
  eyebrow: "Network Partners",
  title: ["One community.", "Many networks."],
  lede: "Leadership becomes more powerful when networks collaborate.",
  body: "Ten Ambassadors is designed as a network of networks — professional associations, alumni groups, universities, civic and cultural organizations, young-professional groups and more, sharing opportunities and developing leaders together.",
  /** Launch-stage wording; partnership status stays in docs (none confirmed yet). */
  note: "Founding Network Partners will be introduced as partnerships are confirmed.",
};

/** The Upmixer community recap film (V2.4) — now shown on /network-partners. */
export const communityRecap = {
  video: communityVideos.recap,
  videoCinematic: communityVideoCinematic.recap,
  caption:
    "Scenes from gatherings across the wider Upmixer event community — the kind of rooms, conversations and connections Ten Ambassadors is being built to extend.",
};

export const closing = {
  /** [draft] */
  title: "Someone opened a door for you. Hold it open for the next leader.",
  primary: { label: "Get involved", href: "/get-involved" },
  secondary: { label: "Stay in touch", href: "#newsletter" },
};
