import type { NavItem, SocialLink } from "@/lib/types";

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Scholarship", href: "/scholarship" },
  { label: "Mentorship", href: "/mentorship" },
  { label: "Service", href: "/service" },
  { label: "Starlight", href: "/starlight" },
  { label: "Network Partners", href: "/network-partners" },
];

export const headerCta: NavItem = { label: "Get Involved", href: "/get-involved" };

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Organization",
    links: [
      { label: "About", href: "/about" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Why “Ten”?", href: "/about#why-ten" },
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
      { label: "Starlight Awards", href: "/starlight" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Become an Ambassador", href: "/get-involved/ambassador" },
      { label: "Nominate an Ambassador", href: "/get-involved/nominate" },
      { label: "Become a Mentor", href: "/get-involved/mentor" },
      { label: "Network Partners", href: "/network-partners" },
      { label: "Corporate Partners", href: "/partners" },
      { label: "Donate", href: "/donate" },
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
