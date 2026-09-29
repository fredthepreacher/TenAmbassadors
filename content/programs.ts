import type { Initiative } from "@/lib/types";

/** Mentorship program architecture. Structure and dates are pending. [draft] */
export const mentorship = {
  intro:
    "Mentorship connects emerging leaders with experienced professionals for guidance, perspective, and relationships that last beyond a single program.",
  tracks: [
    {
      id: "become-a-mentor",
      title: "Become a Mentor",
      body: "For professionals ready to share experience, open doors, and invest in the next generation.",
      pending: "Mentor requirements and time commitment to be announced.",
    },
    {
      id: "ambassador-pathway",
      title: "Future Ambassador pathway",
      body: "For students and emerging professionals seeking guidance as they build their careers and leadership.",
      pending: "Eligibility and how to join to be announced.",
    },
  ],
  structure: null as string | null,
};

/** Service initiatives. None have been announced — slots only. */
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
