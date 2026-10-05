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
    "Ten Ambassadors connects emerging young professionals and established leaders through scholarship, mentorship, service, shared experiences and professional engagement to strengthen communities and prepare the next generation of leaders.",
  /** [brief] supporting direction */
  vision:
    "Through Scholarship, Mentorship and Service, Ten Ambassadors brings together leaders, organizations and communities committed to preparing the next generation for meaningful impact.",
  /** [brief] what it is not */
  notList: ["an awards show", "a networking club", "a scholarship fund alone", "an event company", "a members-only social club"],
  /** Historical relationship — kept accurate and secondary. */
  origin: `${site.name} is historically connected to ${site.parentOrg.name}, an established professional networking, events and marketing organization. The two are distinct brands, intentionally connected: ${site.name} carries its own identity and nonprofit-facing mission.`,
  /** PENDING: the full founding story. */
  story: null as string | null,
  values: site.coreMessage as readonly string[],
};

/** Why "Ten"? [brief] */
export const whyTen = {
  eyebrow: "Why “Ten”?",
  title: "Ten founding leaders. One growing community.",
  body: "Ten founding Ambassadors represent the leadership and impact philosophy of the organization, while the wider Ten Ambassadors community is designed to grow far beyond them.",
  notTitle: "Ambassadors are not honorary titles.",
  qualities: ["Scholarship", "Mentorship", "Service", "Leadership", "Community impact", "Collaboration"],
  note: "The ten founding Ambassadors will be introduced as they are confirmed.",
};

/** Founding ecosystem [brief]. Descriptions are draft and future-facing. */
export const ecosystem: EcosystemRole[] = [
  { id: "ambassadors", title: "Ten Ambassadors", summary: "Leaders who embody Scholarship, Mentorship and Service.", href: "/get-involved/ambassador" },
  { id: "founding", title: "Founding Ambassadors", summary: "The first leaders shaping the organization.", href: "/about#leadership" },
  { id: "board", title: "Board & Leadership", summary: "Governance and stewardship of the mission.", href: "/about#leadership" },
  { id: "network", title: "Network Partners", summary: "Organizations that collaborate as a network of networks.", href: "/network-partners" },
  { id: "host", title: "Institutional Host Committee", summary: "Institutions that help convene and host.", href: "/about#ecosystem" },
  { id: "mentors", title: "Mentors", summary: "Accomplished professionals guiding emerging young professionals.", href: "/get-involved/mentor" },
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
  "Our communities are increasingly connected across industries, generations, cultures and borders. Ten Ambassadors is being built to prepare young professionals for that reality, creating opportunities for mentorship, service, professional engagement and shared experiences that strengthen relationships locally while laying the foundation for future global collaboration.";

/** PENDING: Leadership / Founding Ambassadors / Board — names, roles, photos, bios. */
export const leadership: Leader[] = [];

/**
 * Questions, answered (V2.4 — answer-engine clarity). Every answer restates
 * facts already on the site; nothing here is new or unconfirmed. Keep this
 * short: add a question only when it has a real, verified answer.
 */
export interface Faq {
  q: string;
  a: string;
  link?: { label: string; href: string };
}

export const faqs: Faq[] = [
  {
    q: "What is Ten Ambassadors?",
    a: "Ten Ambassadors is a leadership and impact organization being established around three pillars: Scholarship, Mentorship and Service. It uses community, partnerships and shared experiences to develop and connect the next generation of leaders.",
  },
  {
    q: "What do Scholarship, Mentorship and Service mean here?",
    a: "They form one connected pathway. Scholarship opens the door to opportunity; Mentorship connects emerging young professionals with people who have walked the road before; Service turns what they have gained into opportunity for others, and the cycle begins again.",
    link: { label: "The SMS pathway", href: "/#sms" },
  },
  {
    q: "Why is it called Ten Ambassadors?",
    a: "Ten founding Ambassadors represent the organization’s leadership and impact philosophy, while the wider Ten Ambassadors community is designed to grow far beyond them. The founding Ambassadors will be introduced as they are confirmed.",
    link: { label: "Why “Ten”?", href: "/about#why-ten" },
  },
  {
    q: "Who can become an Ambassador?",
    a: "Emerging and established leaders whose work already strengthens their communities and who are ready to invest in the next generation. Ambassadors are not honorary titles: candidates are considered for credibility, leadership, mission alignment, community involvement, commitment to mentorship and service, collaboration and long-term engagement.",
    link: { label: "Become an Ambassador", href: "/get-involved/ambassador" },
  },
  {
    q: "How can I become a mentor?",
    a: "Ten Ambassadors intends to connect emerging young professionals with accomplished professionals across business, finance, technology, healthcare, public service, law, media, sports and more. Mentors can apply on the Become a Mentor page.",
    link: { label: "Become a Mentor", href: "/get-involved/mentor" },
  },
  {
    q: "What is a Network Partner, and how can an organization take part?",
    a: "A Network Partner is an organization that already develops leaders, such as a professional association, alumni group, university, fraternity or sorority, young-professional group or community organization, collaborating with Ten Ambassadors as a network of networks. Corporations and foundations can explore sponsorship and partnership pathways. Founding partners will be introduced as partnerships are confirmed.",
    link: { label: "Network Partners", href: "/network-partners" },
  },
  {
    q: "What are the Starlight Awards, and are they the whole organization?",
    a: "Starlight is Ten Ambassadors’ signature annual celebration of leadership and impact. It is one program, not the whole organization. Upmixer Inc. is its event-production and experience partner.",
    link: { label: "Starlight Awards", href: "/starlight" },
  },
  {
    q: "When and where is Starlight 2026?",
    a: "The Starlight Awards Holiday Soirée 2026 is on Friday, December 11, 2026, at Matriarch at Cachet Boutique Hotel, 512 W. 42nd Street, New York, NY 10036, near Times Square. Start time and tickets will be announced.",
    link: { label: "Event details", href: "/starlight#attend" },
  },
  {
    q: "How is Ten Ambassadors related to The Upmixer?",
    a: "Ten Ambassadors is historically connected to The Upmixer, an established professional networking, events and marketing organization. They are distinct brands, intentionally connected: Ten Ambassadors carries its own mission, and Upmixer Inc. produces the Starlight Awards as its event-production and experience partner.",
  },
  {
    q: "Does Ten Ambassadors operate internationally?",
    a: "Not yet. Its global outlook is a development horizon of potential exchanges, international speakers and partnerships in future years, not a record of current operations.",
    link: { label: "Development horizon", href: "/about#vision" },
  },
  {
    q: "How can I support the work?",
    a: "Nominate a leader, mentor, volunteer, bring your organization in as a Network Partner or sponsor, or support scholarship, mentorship and service. Online giving will open soon. Ten Ambassadors is being established, and its legal and tax-exempt status has not yet been finalized.",
    link: { label: "Ways to get involved", href: "/get-involved" },
  },
];
