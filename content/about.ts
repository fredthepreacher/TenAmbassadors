import type { EcosystemRole, HorizonPhase, Leader } from "@/lib/types";
import { site } from "@/lib/site";

/*
 * About / organization content. Sources: consolidated strategy brief (V2.2).
 * [brief] = supplied by the client strategy brief (proposed; pending final sign-off).
 */

export const about = {
  /** [brief] positioning */
  positioning:
    "A leadership and impact organization built around Scholarship, Mentorship and Service, using community, partnerships and shared experiences to develop and connect the next generation of leaders.",
  /** [brief] proposed mission */
  mission:
    "Ten Ambassadors connects emerging and established leaders through scholarship, mentorship, service, shared experiences, and professional engagement to strengthen communities and prepare the next generation of leaders.",
  /** [brief] supporting direction */
  vision:
    "Through Scholarship, Mentorship and Service, Ten Ambassadors brings together leaders, organizations and communities committed to preparing the next generation for meaningful impact.",
  /** [brief] what it is not */
  notList: ["an awards show", "a networking club", "a scholarship fund alone", "an event company", "a members-only social club"],
  /** Historical relationship — kept accurate and secondary. */
  origin: `${site.name} is historically connected to ${site.parentOrg.name}, an established professional networking, events and marketing organization. The two are distinct brands, intentionally connected — ${site.name} carries its own identity and nonprofit-facing mission.`,
  /** PENDING: the full founding story. */
  story: null as string | null,
  values: site.coreMessage as readonly string[],
};

/** Why "Ten"? [brief] */
export const whyTen = {
  eyebrow: "Why “Ten”?",
  title: "Ten founding leaders. One growing community.",
  body: "Ten founding Ambassadors represent the leadership and impact philosophy of the organization — while the wider Ten Ambassadors community is designed to grow far beyond them.",
  notTitle: "Ambassadors are not honorary titles.",
  qualities: ["Scholarship", "Mentorship", "Service", "Leadership", "Community impact", "Collaboration"],
  note: "Founding Ambassadors will be introduced once confirmed.",
};

/** Founding ecosystem [brief]. Descriptions are draft and future-facing. */
export const ecosystem: EcosystemRole[] = [
  { id: "ambassadors", title: "Ten Ambassadors", summary: "Leaders who embody Scholarship, Mentorship and Service.", href: "/get-involved/ambassador" },
  { id: "founding", title: "Founding Ambassadors", summary: "The first leaders shaping the organization.", href: "/about#leadership" },
  { id: "board", title: "Board & Leadership", summary: "Governance and stewardship of the mission.", href: "/about#leadership" },
  { id: "network", title: "Network Partners", summary: "Organizations that collaborate as a network of networks.", href: "/network-partners" },
  { id: "host", title: "Institutional Host Committee", summary: "Institutions that help convene and host.", href: "/about#ecosystem" },
  { id: "mentors", title: "Mentors", summary: "Accomplished professionals guiding emerging leaders.", href: "/get-involved/mentor" },
  { id: "volunteers", title: "Volunteers", summary: "People who turn leadership into action.", href: "/get-involved/volunteer" },
  { id: "sponsors", title: "Sponsors & Corporate Partners", summary: "Organizations investing in the mission.", href: "/partners" },
];

/** Development horizon [brief] — intentions, not accomplishments. */
export const horizon: HorizonPhase[] = [
  {
    period: "2026",
    title: "Foundation",
    items: ["Governance", "Partnerships", "Programs", "Founding Ambassadors", "Flagship event"],
  },
  {
    period: "2027–2028",
    title: "Connectivity",
    items: ["Potential exchanges", "International speakers", "Diaspora partnerships", "Selective trans-Atlantic programming"],
  },
  {
    period: "2029+",
    title: "Global Network",
    items: ["Potential recurring international partnerships", "Cultural programs", "Exchanges", "Regional networks"],
  },
];

/** [brief] approved global direction */
export const globalDirection =
  "Our communities are increasingly connected across industries, generations, cultures and borders. Ten Ambassadors is being built to prepare leaders for that reality — creating opportunities for mentorship, service, professional engagement and shared experiences that strengthen relationships locally while laying the foundation for future global collaboration.";

/** PENDING: Leadership / Founding Ambassadors / Board — names, roles, photos, bios. */
export const leadership: Leader[] = [];
