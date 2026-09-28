import type { SocialLink } from "@/lib/types";

export const primaryNav = [
  { label: "About", href: "/#about" },
  { label: "Pathways", href: "/#pathways" },
  { label: "Impact", href: "/#impact" },
  { label: "Opportunities", href: "/#opportunities" },
  { label: "Starlight", href: "/#starlight" },
];

export const headerCta = { label: "Get Involved", href: "/#get-involved" };

export const footerNav = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Scholarship", href: "/scholarship" },
      { label: "Mentorship", href: "/mentorship" },
      { label: "Service", href: "/service" },
      { label: "Starlight Awards", href: "/starlight-awards" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { label: "Give", href: "/donate" },
      { label: "Partner", href: "/partner" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Apply", href: "/apply" },
      { label: "Events", href: "/events" },
    ],
  },
];

export const legalNav = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

/** PENDING: add verified URLs. `null` renders as a disabled, labelled chip. */
export const socialLinks: SocialLink[] = [
  { platform: "Instagram", url: null },
  { platform: "Facebook", url: null },
  { platform: "LinkedIn", url: null },
  { platform: "YouTube", url: null },
];
