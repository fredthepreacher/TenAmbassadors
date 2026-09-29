import type { Pathway } from "@/lib/types";
import { site } from "@/lib/site";

export const pathways: Pathway[] = [
  {
    id: "mentor",
    title: "Become a Mentor",
    summary: "Share your experience and open doors for an emerging leader.",
    action: { label: "Mentorship", href: "/mentorship#become-a-mentor", available: true },
  },
  {
    id: "volunteer",
    title: "Volunteer",
    summary: "Help deliver service initiatives, programs, and events.",
    action: { label: "Service", href: "/service#volunteer", available: true },
  },
  {
    id: "partner",
    title: "Partner With Us",
    summary: "Align your organization with scholarship, mentorship, and service.",
    action: { label: "Partnerships", href: "/partners", available: true },
  },
  {
    id: "support",
    title: "Support the Mission",
    summary: "Invest directly in opportunity for the next generation.",
    action: site.donation.url
      ? { label: "Give", href: site.donation.url, available: true }
      : { label: "Give", href: "/get-involved#support", available: true },
  },
  {
    id: "scholarships",
    title: "Scholarship Opportunities",
    summary: "Explore scholarships as criteria and application windows are announced.",
    action: { label: "Scholarships", href: "/scholarship", available: true },
  },
];
