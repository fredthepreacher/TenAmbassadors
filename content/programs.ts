import type { Initiative } from "@/lib/types";

/** Mentorship program architecture. Structure and dates are pending. [draft] */
export const mentorship = {
  intro:
    "Mentorship connects emerging young professionals with experienced, accomplished professionals for guidance, perspective, access and relationships that last beyond a single program.",
  tracks: [
    {
      id: "become-a-mentor",
      title: "Become a Mentor",
      body: "For professionals ready to share experience, open doors, and invest in the next generation.",
      pending: "Mentor requirements and time commitments will be shared when the program opens.",
    },
    {
      id: "ambassador-pathway",
      title: "Future Ambassador pathway",
      body: "For students and young professionals seeking guidance as they build their careers and leadership.",
      pending: "Eligibility and how to join will be shared when the pathway opens.",
    },
  ],
  structure: null as string | null,
};

/**
 * Service focus areas (from the brief: "from youth leadership and education to community development").
 * Future-facing; shown until named initiatives are confirmed.
 */
export const serviceFocus = [
  { title: "Youth leadership", body: "Helping young people see, and step into, their own leadership." },
  { title: "Education", body: "Opening doors to learning, mentoring and opportunity." },
  { title: "Community development", body: "Turning what people have gained into lasting local impact." },
];

/** Service initiatives. None have been announced — slots only (titles stay null until confirmed). */
export const serviceInitiatives: Initiative[] = [
  { id: "initiative-1", title: null, summary: null, status: "planned" },
  { id: "initiative-2", title: null, summary: null, status: "planned" },
  { id: "initiative-3", title: null, summary: null, status: "planned" },
];

export const volunteer = {
  intro: "Volunteers will help deliver service initiatives, events, and programs.",
  roles: null as string[] | null,
  signupUrl: null as string | null,
};

/* ---- V2.2 program areas (future-facing; none are claimed as active) ---- */

export const scholarshipAreas = [
  "College scholarships",
  "Professional-development grants",
  "Study-abroad support",
  "Leadership-development funding",
  "Certification & training assistance",
  "International learning opportunities",
  "Educational partnerships",
];

export const mentorshipIndustries = [
  "Business",
  "Finance",
  "Technology",
  "Healthcare",
  "Public service",
  "Entrepreneurship",
  "Law",
  "Engineering",
  "Media",
  "Sports",
  "Hospitality",
  "International affairs",
];

export const mentorshipFormats = [
  "Executive mentorship",
  "Leadership circles",
  "Career development",
  "Fireside conversations",
  "Workshops",
  "Mentor matching",
  "Retreats",
  "Cross-generational conversations",
];

export const serviceAreas = [
  "Volunteer initiatives",
  "Nonprofit partnerships",
  "Community service",
  "Youth leadership",
  "Health & wellness",
  "Education",
  "Community development",
  "International service",
];
