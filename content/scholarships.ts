import type { Scholarship } from "@/lib/types";
import { media, phangVideos } from "./media";

/**
 * Scholarships. Each entry renders at /scholarship/[slug] using the shared
 * scholarship detail template. Add future scholarships here (or in the CMS).
 *
 * Only the honoree's name and the years shown in the approved film are used.
 * Everything else is pending and renders as a labelled placeholder.
 */
export const scholarships: Scholarship[] = [
  {
    slug: "dr-christopher-a-phang",
    name: "The Dr. Christopher A. Phang Scholarship",
    honoree: {
      name: "Dr. Christopher A. Phang",
      // Source: approved scholarship film (end card). Confirm before launch.
      years: "1968–2023",
      portrait: null,
    },
    status: "in-development",
    summary:
      "A scholarship carrying the name of Dr. Christopher A. Phang — and the belief that the right opportunity, at the right moment, can change the direction of a life.",
    story: null,
    legacy: null,
    facts: [
      { label: "Eligibility", value: null },
      { label: "Award", value: null },
      { label: "Application window", value: null },
      { label: "Selection", value: null },
    ],
    timeline: null,
    recipients: null,
    impact: null,
    video: phangVideos,
    apply: {
      label: "Apply",
      href: "/scholarship/dr-christopher-a-phang#apply",
      available: false,
      pendingNote: "Criteria and dates will be announced as the scholarship is established.",
    },
  },
];

export function getScholarshipBySlug(slug: string) {
  return scholarships.find((s) => s.slug === slug) ?? null;
}

export const featuredScholarship = scholarships[0];

export const scholarshipImage = media.phangPoster30;
