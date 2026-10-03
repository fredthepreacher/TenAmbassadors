import type { ImpactMeasure } from "@/lib/types";

/**
 * "Building Our First Year of Impact" — what Ten Ambassadors intends to
 * measure. No numbers are shown until they are real (no zero counters).
 */
export const impact = {
  eyebrow: "Impact",
  title: "Building our first year of impact.",
  intro:
    "Impact will be reported honestly, as it happens. These are the measures Ten Ambassadors is committing to track — and share — as its programs begin.",
  measures: [
    { id: "scholarships", label: "Scholarships awarded", description: "Education and professional-development support delivered." },
    { id: "mentorship-hours", label: "Mentorship hours", description: "Time invested by mentors in emerging leaders." },
    { id: "service-hours", label: "Service hours", description: "Leadership turned into community action." },
    { id: "leaders", label: "Young leaders supported", description: "Emerging leaders reached across all three pillars." },
    { id: "partners", label: "Partner organizations", description: "Networks, institutions and sponsors collaborating." },
    { id: "countries", label: "Countries represented", description: "A measure for the future global network." },
  ] satisfies ImpactMeasure[],
};

/** Giving pathways — no processor selected; no tax-deductibility claims. */
export const givingPathways = [
  { id: "donate", title: "Donate", summary: "A one-time gift to the mission." },
  { id: "recurring", title: "Recurring giving", summary: "Sustained monthly or annual support." },
  { id: "scholarship-fund", title: "Scholarship Fund", summary: "Support future scholarship programs." },
  { id: "general", title: "General support", summary: "Where the need is greatest." },
  { id: "program", title: "Program sponsorship", summary: "Underwrite a mentorship, service or leadership program." },
  { id: "corporate", title: "Corporate giving", summary: "Company gifts, matching and employee giving." },
  { id: "event", title: "Event contributions", summary: "Support the Starlight Awards and other gatherings." },
];
