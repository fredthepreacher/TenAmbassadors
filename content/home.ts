import type { SmsStage } from "@/lib/types";
import { site } from "@/lib/site";
import { media } from "./media";

/*
 * Homepage copy.
 * [source]  = existing Ten Ambassadors language.
 * [draft]   = presentation copy written for this build, pending client approval.
 *             It makes no factual claims.
 */

export const hero = {
  eyebrow: site.pillarsLine,
  /** [draft] */
  headline: ["Opening pathways.", "Building leaders."],
  /** [draft] */
  lede: "Ten Ambassadors opens pathways for the next generation through Scholarship, Mentorship, and Service.",
  image: media.hero,
  primary: { label: "Explore the pathway", href: "/#sms" },
  secondary: { label: "Get involved", href: "/get-involved" },
};

export const purpose = {
  eyebrow: "Why we exist",
  /** [draft] */
  statement:
    "Talent is everywhere. Access is not. Ten Ambassadors exists to close that distance — connecting emerging leaders with the opportunity, people, and purpose that turn potential into leadership.",
  /** [source] */
  origin: `Launched by ${site.parentOrg.name}, ${site.name} is an initiative focused on developing future leaders through Scholarship, Mentorship, and Service.`,
  /** [source] */
  themes: ["Strengthening Communities.", "Building Leaders.", "Expanding Opportunity."],
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
    line: "People help you walk through it.",
    body: "Mentorship connects emerging leaders with people who have walked the road before — guidance, perspective, and relationships that last.",
    href: "/mentorship",
  },
  {
    id: "service",
    index: "03",
    title: "Service",
    line: "Then you hold the door open for someone else.",
    body: "Service turns development into impact — each ambassador creating opportunity for the next.",
    href: "/service",
  },
];

export const smsIntro = {
  eyebrow: "The SMS pathway",
  title: "More than a scholarship. A cycle of opportunity.",
  cycleLabel: ["Opportunity", "Development", "Service", "New opportunity"],
};

export const inMotion = {
  eyebrow: "Opportunity in motion",
  /** [draft] */
  title: "Opportunity moves through people.",
  body: "Every pathway begins with a relationship — an introduction, a conversation, a door someone chose to open. These are the rooms where that happens.",
  images: {
    lead: media.communityNetwork,
    side: media.communityProfessionals,
  },
};

export const mentorshipFeature = {
  eyebrow: "Mentorship",
  /** [source — V1 baseline copy] */
  title: "Leadership grows through access to people who have walked the road before.",
  /** [draft] — the network relationship is supplied context (The Upmixer). */
  body: "Ten Ambassadors is rooted in a professional network built by The Upmixer — leaders across industries who can offer what no classroom can: perspective, introductions, and honest guidance.",
  pillars: [
    { title: "Access", body: "Rooms, conversations, and introductions that are hard to reach alone." },
    { title: "Guidance", body: "Perspective from people a few steps — or a generation — further along." },
    { title: "Relationships", body: "Connections that outlast a single program or event." },
  ],
  images: {
    generational: media.mentorshipGenerational,
    peers: media.mentorshipPeers,
  },
};

export const serviceFeature = {
  eyebrow: "Service",
  /** [draft] */
  title: "Leadership, turned outward.",
  body: "Service is where development becomes impact. Ten Ambassadors will organize service initiatives that let ambassadors turn what they have gained into opportunity for their communities.",
};

export const starlightFeature = {
  eyebrow: "The Starlight Awards",
  /** [brief concept] */
  title: ["Celebrate excellence.", "Fund opportunity."],
  /** [draft] */
  body: "The Starlight Awards is envisioned as Ten Ambassadors' signature evening — honoring achievement while helping fund scholarship, mentorship, and service.",
};

export const globalVision = {
  eyebrow: "Global vision",
  /** [draft] — framed as aspiration, not existing reach. */
  title: "Built for a world of emerging leaders.",
  body: "Talent is not limited to one city, one community, or one background — and neither is our ambition. Ten Ambassadors is being built to grow: to connect leaders across industries, generations, and, in time, borders.",
  note: "This is our vision for where Ten Ambassadors is going — not a claim about where it is today.",
  image: media.communityNetwork,
};

export const closing = {
  /** [draft] */
  title: "Someone opened a door for you. Hold it open for the next leader.",
  primary: { label: "Get involved", href: "/get-involved" },
  secondary: { label: "Stay in touch", href: "#newsletter" },
};
