import type { Pathway } from "@/lib/types";

/** Ways to participate (V2.2). */
export const pathways: Pathway[] = [
  {
    id: "ambassador",
    title: "Become an Ambassador",
    summary: "For leaders with real community impact and a commitment to Scholarship, Mentorship and Service.",
    action: { label: "Ambassador pathway", href: "/get-involved/ambassador", available: true },
  },
  {
    id: "nominate",
    title: "Nominate an Ambassador",
    summary: "Know someone whose leadership is already changing their community?",
    action: { label: "Nominate", href: "/get-involved/nominate", available: true },
  },
  {
    id: "mentor",
    title: "Become a Mentor",
    summary: "Share your experience and open doors for an emerging young professional.",
    action: { label: "Mentor pathway", href: "/get-involved/mentor", available: true },
  },
  {
    id: "network-partner",
    title: "Become a Network Partner",
    summary: "Bring your organization into a network of networks.",
    action: { label: "Network Partners", href: "/network-partners", available: true },
  },
  {
    id: "volunteer",
    title: "Volunteer",
    summary: "Help deliver service initiatives, programs and events.",
    action: { label: "Volunteer", href: "/get-involved/volunteer", available: true },
  },
  {
    id: "sponsor",
    title: "Sponsor / Corporate Partnership",
    summary: "Partner on scholarship, mentorship, service, leadership development or Starlight.",
    action: { label: "Sponsorship", href: "/get-involved/sponsor", available: true },
  },
  {
    id: "support",
    title: "Support the Mission",
    summary: "Support Scholarship, Mentorship and Service.",
    action: { label: "Donate", href: "/donate", available: true },
  },
];
