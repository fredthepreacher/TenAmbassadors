import type { Partner, PartnerCategory } from "@/lib/types";

/**
 * Corporate / sponsorship PATHWAYS (V2.2). These are ways an organization
 * could partner — not claims of existing sponsors.
 */
export const partnerCategories: PartnerCategory[] = [
  { id: "scholarship", title: "Scholarship Partner", description: "Help fund education and professional-development opportunities as scholarship programs are established." },
  { id: "mentorship", title: "Mentorship Partner", description: "Open your leaders, rooms and expertise to emerging professionals." },
  { id: "service", title: "Service Partner", description: "Collaborate on community service and volunteer initiatives." },
  { id: "leadership", title: "Leadership Development Partner", description: "Support workshops, leadership circles and professional engagement." },
  { id: "starlight", title: "Starlight Awards Partner", description: "Partner on the signature annual celebration of leadership and impact." },
  { id: "global", title: "Global Partnership Partner", description: "Help lay the foundation for future cross-border exchanges and collaboration." },
];

/** PENDING: no partners or sponsors have been confirmed. */
export const partners: Partner[] = [];

/**
 * Network Partners — "a network of networks". Types of organizations that
 * MAY become Network Partners. None are partners yet.
 */
export const networkPartnerTypes = [
  "Professional associations",
  "Alumni groups",
  "Civic & cultural organizations",
  "Industry associations",
  "Fraternities & sororities",
  "Young-professional groups",
  "Nonprofits",
  "Corporate employee groups",
  "Universities",
  "Business groups",
  "Community organizations",
];

/** What a Network Partner could do together with Ten Ambassadors. [draft] */
export const networkPartnerRoles = [
  { title: "Share", body: "Share programs and opportunities with each other's communities." },
  { title: "Recommend", body: "Recommend emerging leaders, Ambassadors and mentors." },
  { title: "Collaborate", body: "Co-create programming and support events." },
  { title: "Serve", body: "Take part in service initiatives together." },
  { title: "Connect", body: "Identify sponsorship and partnership opportunities." },
];

/** Network Partners confirmed by the client. Empty until announced. */
export const networkPartners: { name: string; url: string | null }[] = [];
