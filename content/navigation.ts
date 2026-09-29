import type { NavItem, SocialLink } from "@/lib/types";

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Scholarship", href: "/scholarship" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Service", href: "/service" },
  { label: "Starlight", href: "/starlight" },
  { label: "Partners", href: "/partners" },
];

export const headerCta: NavItem = { label: "Get Involved", href: "/get-involved" };

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Organization",
    links: [
      { label: "Mission & Vision", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Programs",
    links: [
      { label: "Scholarship", href: "/scholarship" },
      { label: "Dr. Christopher A. Phang Scholarship", href: "/scholarship/dr-christopher-a-phang" },
      { label: "Mentorship", href: "/mentorship" },
      { label: "Service", href: "/service" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { label: "Become a Mentor", href: "/mentorship#become-a-mentor" },
      { label: "Volunteer", href: "/service#volunteer" },
      { label: "Partner With Us", href: "/partners" },
      { label: "Support the Mission", href: "/get-involved#support" },
      { label: "Starlight Awards", href: "/starlight" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

/** PENDING: verified URLs. `null` renders a disabled, labelled chip. */
export const socialLinks: SocialLink[] = [
  { platform: "Instagram", url: null },
  { platform: "LinkedIn", url: null },
  { platform: "Facebook", url: null },
  { platform: "YouTube", url: null },
];
