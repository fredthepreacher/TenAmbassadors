import type { FormId } from "@/lib/forms";

/** Pathway pages at /get-involved/[pathway] (V2.2). Criteria are from the strategy brief. */
export interface PathwayPage {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Search snippet (≤160 chars) when `intro` is longer. */
  metaDescription?: string;
  criteriaTitle?: string;
  criteria?: string[];
  formId: FormId;
  /** Where to go next while intake is closed — keeps every pathway from dead-ending. */
  nextSteps: { label: string; href: string }[];
}

const ambassadorCriteria = [
  "Community credibility",
  "Demonstrated leadership",
  "Alignment with the mission",
  "Measurable community involvement",
  "Commitment to mentorship and service",
  "Collaboration",
  "Long-term engagement",
];

export const pathwayPages: PathwayPage[] = [
  {
    slug: "ambassador",
    eyebrow: "Become an Ambassador",
    title: "Leadership measured by contribution, not title.",
    intro:
      "Ambassadors are not honorary titles. Ten Ambassadors is looking for emerging and established leaders whose work already strengthens their communities — and who are ready to invest in the next generation.",
    metaDescription:
      "Who can become a Ten Ambassador: emerging and established leaders whose work strengthens their communities and who are ready to mentor and serve.",
    criteriaTitle: "What we will consider",
    criteria: ambassadorCriteria,
    formId: "ambassador-application",
    nextSteps: [
      { label: "Why “Ten”? How Ambassadors fit", href: "/about#why-ten" },
      { label: "Nominate another leader", href: "/get-involved/nominate" },
    ],
  },
  {
    slug: "nominate",
    eyebrow: "Nominate an Ambassador",
    title: "Know a leader others should know?",
    intro: "Nominations help Ten Ambassadors find leaders whose impact speaks louder than their profile.",
    metaDescription:
      "Nominate an emerging or established leader for Ten Ambassadors — someone whose community impact speaks louder than their profile.",
    criteriaTitle: "Nominees are considered for",
    criteria: ambassadorCriteria,
    formId: "ambassador-nomination",
    nextSteps: [
      { label: "What an Ambassador embodies", href: "/about#why-ten" },
      { label: "Become an Ambassador yourself", href: "/get-involved/ambassador" },
    ],
  },
  {
    slug: "mentor",
    eyebrow: "Become a Mentor",
    title: "Share the road you have already walked.",
    intro:
      "Ten Ambassadors intends to connect emerging leaders with accomplished professionals across business, finance, technology, healthcare, public service, entrepreneurship, law, engineering, media, sports, hospitality and international affairs.",
    metaDescription:
      "Become a mentor with Ten Ambassadors: accomplished professionals in business, finance, tech, healthcare, law, media, sports and more, guiding emerging leaders.",
    criteriaTitle: "Mentors we hope to meet",
    criteria: ["Accomplished in their field", "Generous with time and perspective", "Committed to emerging leaders", "Open to cross-generational conversation"],
    formId: "mentor-application",
    nextSteps: [
      { label: "How mentorship will work", href: "/mentorship" },
      { label: "Bring your network as a Network Partner", href: "/network-partners" },
    ],
  },
  {
    slug: "volunteer",
    eyebrow: "Volunteer",
    title: "Leadership becomes action.",
    intro: "Volunteers will help deliver service initiatives, programs and events as they are established.",
    metaDescription:
      "Volunteer with Ten Ambassadors: help deliver service initiatives, programs and events as they are established. Roles and sign-up will be announced.",
    formId: "volunteer-application",
    nextSteps: [
      { label: "Planned service areas", href: "/service#initiatives" },
      { label: "Other ways to get involved", href: "/get-involved" },
    ],
  },
  {
    slug: "sponsor",
    eyebrow: "Sponsor / Corporate Partnership",
    title: "Invest in the next generation of leaders.",
    intro:
      "Partnership pathways are being prepared across Scholarship, Mentorship, Service, Leadership Development, the Starlight Awards and future global programming.",
    formId: "sponsor-inquiry",
    nextSteps: [
      { label: "Corporate & community partnerships", href: "/partners" },
      { label: "Sponsor the Starlight Awards", href: "/starlight#sponsor" },
    ],
  },
];

export function getPathwayPage(slug: string) {
  return pathwayPages.find((p) => p.slug === slug) ?? null;
}
