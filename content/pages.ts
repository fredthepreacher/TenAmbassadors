import type { PlannedPage } from "@/lib/types";

/**
 * Planned routes. Each renders a safe "in development" page until real
 * content arrives, so no link on the site is ever broken. When a page is built
 * out, create a dedicated route (e.g. app/scholarship/page.tsx) and remove its
 * entry here.
 */
export const plannedPages: PlannedPage[] = [
  {
    slug: "about",
    eyebrow: "About",
    title: "Who we are",
    summary: "The full story of the initiative, its origin with The Upmixer, and the people behind it.",
    pending: ["Approved organizational story", "Leadership / team details", "Official logo and brand files"],
  },
  {
    slug: "scholarship",
    eyebrow: "Pathway 01",
    title: "Scholarship",
    summary: "Opening doors to education, access, and opportunity for the next generation of leaders.",
    pending: ["Scholarship criteria", "Award details", "Application schedule"],
  },
  {
    slug: "mentorship",
    eyebrow: "Pathway 02",
    title: "Mentorship",
    summary: "Connecting emerging leaders with people, perspective, and networks that help them grow.",
    pending: ["Mentorship structure", "Mentor / mentee application flow", "Participant stories"],
  },
  {
    slug: "service",
    eyebrow: "Pathway 03",
    title: "Service",
    summary: "Turning leadership into meaningful action that strengthens communities and expands possibility.",
    pending: ["Service initiatives", "Volunteer opportunities", "Community outcomes"],
  },
  {
    slug: "apply",
    eyebrow: "Apply",
    title: "Applications",
    summary: "Application pathways for scholarship and mentorship will open here.",
    pending: ["Eligibility rules", "Application dates", "Application form destination"],
  },
  {
    slug: "donate",
    eyebrow: "Give",
    title: "Support the mission",
    summary: "A secure way to invest in scholarship, mentorship, and service.",
    pending: ["Donation destination / processor", "Giving levels (if any)", "Tax / legal language"],
  },
  {
    slug: "partner",
    eyebrow: "Partner",
    title: "Become a partner",
    summary: "Sponsorship and partnership opportunities for organizations that invest in future leaders.",
    pending: ["Partnership tiers or options", "Partner contact route", "Existing partner logos"],
  },
  {
    slug: "volunteer",
    eyebrow: "Volunteer",
    title: "Volunteer & mentor",
    summary: "Ways to give your time, experience, and network.",
    pending: ["Volunteer roles", "Mentor requirements", "Sign-up form destination"],
  },
  {
    slug: "events",
    eyebrow: "Events",
    title: "Events & gatherings",
    summary: "Upcoming convenings, celebrations, and community moments.",
    pending: ["Event calendar", "Event photography and video", "Registration links"],
  },
  {
    slug: "starlight-awards",
    eyebrow: "Starlight Awards",
    title: "The Starlight Awards",
    summary: "Media, honorees, and event details for the Starlight Awards.",
    pending: ["Starlight Awards details", "Honorees", "Photo and video media"],
  },
  {
    slug: "contact",
    eyebrow: "Contact",
    title: "Get in touch",
    summary: "Contact details and an inquiry form will be published here.",
    pending: ["Official email", "Phone (optional)", "Mailing address (optional)", "Social media URLs"],
  },
  {
    slug: "privacy",
    eyebrow: "Legal",
    title: "Privacy policy",
    summary: "The privacy policy will be published here before launch.",
    pending: ["Approved privacy policy text"],
  },
  {
    slug: "terms",
    eyebrow: "Legal",
    title: "Terms of use",
    summary: "Terms of use will be published here before launch.",
    pending: ["Approved terms of use text"],
  },
];

export function getPlannedPage(slug: string) {
  return plannedPages.find((p) => p.slug === slug) ?? null;
}
