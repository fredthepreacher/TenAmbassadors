import type { FormId } from "@/lib/forms";

/** Pathway pages at /get-involved/[pathway] (V2.2). Criteria are from the strategy brief. */
export interface PathwayPage {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  criteriaTitle?: string;
  criteria?: string[];
  formId: FormId;
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
    criteriaTitle: "What we will consider",
    criteria: ambassadorCriteria,
    formId: "ambassador-application",
  },
  {
    slug: "nominate",
    eyebrow: "Nominate an Ambassador",
    title: "Know a leader others should know?",
    intro: "Nominations help Ten Ambassadors find leaders whose impact speaks louder than their profile.",
    criteriaTitle: "Nominees are considered for",
    criteria: ambassadorCriteria,
    formId: "ambassador-nomination",
  },
  {
    slug: "mentor",
    eyebrow: "Become a Mentor",
    title: "Share the road you have already walked.",
    intro:
      "Ten Ambassadors intends to connect emerging leaders with accomplished professionals across business, finance, technology, healthcare, public service, entrepreneurship, law, engineering, media, sports, hospitality and international affairs.",
    criteriaTitle: "Mentors we hope to meet",
    criteria: ["Accomplished in their field", "Generous with time and perspective", "Committed to emerging leaders", "Open to cross-generational conversation"],
    formId: "mentor-application",
  },
  {
    slug: "volunteer",
    eyebrow: "Volunteer",
    title: "Leadership becomes action.",
    intro: "Volunteers will help deliver service initiatives, programs and events as they are established.",
    formId: "volunteer-application",
  },
  {
    slug: "sponsor",
    eyebrow: "Sponsor / Corporate Partnership",
    title: "Invest in the next generation of leaders.",
    intro:
      "Partnership pathways are being prepared across Scholarship, Mentorship, Service, Leadership Development, the Starlight Awards and future global programming.",
    formId: "sponsor-inquiry",
  },
];

export function getPathwayPage(slug: string) {
  return pathwayPages.find((p) => p.slug === slug) ?? null;
}
