import type { Action, AwardConcept } from "@/lib/types";

/**
 * Starlight Awards — the signature annual event/program of Ten Ambassadors
 * (not the whole organization). Event details below are VERIFIED (supplied
 * by the client, V2.2). Ticketing, times and honorees remain pending.
 */
export const starlight = {
  /** PENDING: URL of the existing Starlight event experience / ticketing. */
  externalUrl: null as string | null,
  positioning: "The annual gathering where leadership, achievement, service, community and culture come together.",
  tagline: "Our Signature Annual Celebration of Leadership & Impact",
  nextEvent: {
    name: "Starlight Awards Holiday Soirée 2026",
    /** ISO date — verified. Start time pending. */
    dateISO: "2026-12-11",
    date: "Friday, December 11, 2026",
    time: null as string | null,
    venue: "Matriarch at Cachet Boutique Hotel",
    street: "512 W. 42nd Street",
    city: "New York, NY 10036",
    locality: "New York",
    region: "NY",
    postalCode: "10036",
  },
  globalBlackTie: {
    title: "Global Black Tie",
    subtitle: "Around the World in Evening Excellence",
    body: "An invitation to global elegance — formal and cocktail attire, culturally influenced formalwear, heritage fabrics, global fashion, modern eveningwear and international accents. Celebration, not costume.",
  },
  /** Award concepts — pending final approval. */
  awards: [
    { id: "global-citizen", title: "Global Citizen Impact Award", status: "concept" },
    { id: "power-of-sports", title: "Power of Sports Ambassador Award", status: "concept" },
    { id: "rising-star-female", title: "Rising Star Award — Female", status: "concept" },
    { id: "rising-star-male", title: "Rising Star Award — Male", status: "concept" },
  ] satisfies AwardConcept[],
  /** Operating distinction [brief]. */
  roles: {
    tenAmbassadors: ["Mission & impact narrative", "Nonprofit-facing partnerships", "Ambassador platform", "Fundraising platform", "Scholarship, Mentorship & Service programs"],
    upmixer: ["Event production lead", "Venue & vendors", "Creative & event direction", "Execution & run of show", "Guest experience & production logistics"],
  },
  honorees: null as { name: string; award: string; year: string }[] | null,
  actions: [
    { label: "Explore Starlight", href: "/starlight", available: true },
    { label: "Attend", href: "/starlight#attend", available: false, unavailableLabel: "Tickets · details to come", pendingNote: "Start time and tickets will be announced." },
    { label: "Sponsor", href: "/starlight#sponsor", available: true },
  ] satisfies Action[],
  pillars: [
    { title: "Celebrate", body: "Honor leadership, achievement and service across the community." },
    { title: "Gather", body: "Bring together leaders, partners and supporters — culture included." },
    { title: "Fund", body: "Help power Scholarship, Mentorship and Service programming." },
  ],
};
