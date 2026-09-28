import { site } from "@/lib/site";
import type {
  FeatureBlock,
  GalleryItem,
  Metric,
  Opportunity,
  Partner,
  Pathway,
  Pillar,
  Story,
} from "@/lib/types";
import { media } from "./media";

/* ---------------------------------------------------------------------------
 * Homepage content. Source language from existing Ten Ambassadors material is
 * marked [source]. Everything else is presentation copy that makes no factual
 * claims. Values set to `null` are pending from Geo.
 * ------------------------------------------------------------------------ */

export const hero = {
  eyebrow: site.pillarsLine,
  headline: "Developing the next generation of leaders.",
  lede: `${site.name} connects opportunity, guidance, and service to help future leaders move forward with purpose.`,
  image: media.speaker,
  primaryCta: { label: "Explore Our Mission", href: "/#about" },
  secondaryCta: { label: "Get Involved", href: "/#get-involved" },
};

export const origin = {
  eyebrow: "Who we are",
  /** [source] */
  themes: ["Strengthening Communities.", "Building Leaders.", "Expanding Opportunity."],
  /** [source] — brand name is injected so it follows the global setting. */
  statement: `Launched by ${site.parentOrg.name}, ${site.name} is an initiative focused on developing future leaders through Scholarship, Mentorship, and Service.`,
  image: media.group,
  imageCaption: "Community, in the room.",
};

export const pillars: Pillar[] = [
  {
    id: "scholarship",
    index: "01",
    letter: "S",
    title: "Scholarship",
    summary:
      "Opening doors to education, access, and opportunity for the next generation of leaders.",
    pendingDetail: "Criteria, awards, and application schedule to be announced.",
    cta: { label: "Scholarship pathway", href: "/scholarship" },
  },
  {
    id: "mentorship",
    index: "02",
    letter: "M",
    title: "Mentorship",
    summary:
      "Connecting emerging leaders with people, perspective, and networks that help them grow.",
    pendingDetail: "Mentorship structure and how to join to be announced.",
    cta: { label: "Mentorship pathway", href: "/mentorship" },
  },
  {
    id: "service",
    index: "03",
    letter: "S",
    title: "Service",
    summary:
      "Turning leadership into meaningful action that strengthens communities and expands possibility.",
    pendingDetail: "Service initiatives and volunteer opportunities to be announced.",
    cta: { label: "Service pathway", href: "/service" },
  },
];

export const featuredStory: Story = {
  eyebrow: "Mentorship in motion",
  headline: "Leadership grows through access to people who have walked the road before.",
  image: media.mentorship,
  quote: null,
  personName: null,
  personRole: null,
  cta: { label: "Explore mentorship", href: "/mentorship" },
};

export const gallery: GalleryItem[] = [
  { id: "group", kind: "image", image: media.group, caption: "Together", layout: "feature" },
  { id: "community", kind: "image", image: media.community, caption: "Community", layout: "standard" },
  { id: "mentorship", kind: "image", image: media.mentorship, caption: "Connection", layout: "standard" },
  { id: "video", kind: "video", image: null, videoUrl: null, caption: "Event film", layout: "wide" },
];

/** Metric slots only — labels are proposed; values must be verified. */
export const metrics: Metric[] = [
  { id: "scholarships", label: "Scholarships awarded", value: null, source: null },
  { id: "mentorships", label: "Mentorship connections", value: null, source: null },
  { id: "service", label: "Service hours", value: null, source: null },
  { id: "communities", label: "Communities reached", value: null, source: null },
];

export const opportunities: Opportunity[] = [
  {
    id: "scholarship-applications",
    pathway: "scholarship",
    title: "Scholarship applications",
    summary: "A future application pathway for students pursuing education and leadership.",
    status: "coming-soon",
    deadline: null,
    eligibility: null,
    cta: { label: "Application details", href: "/apply" },
  },
  {
    id: "mentorship-program",
    pathway: "mentorship",
    title: "Mentorship program",
    summary: "A future pathway for emerging leaders and the mentors who guide them.",
    status: "coming-soon",
    deadline: null,
    eligibility: null,
    cta: { label: "Mentorship details", href: "/mentorship" },
  },
  {
    id: "service-initiatives",
    pathway: "service",
    title: "Service initiatives",
    summary: "Future community service projects open to ambassadors and volunteers.",
    status: "coming-soon",
    deadline: null,
    eligibility: null,
    cta: { label: "Volunteer details", href: "/volunteer" },
  },
  {
    id: "events",
    pathway: "events",
    title: "Events & gatherings",
    summary: "A future calendar of convenings, celebrations, and community moments.",
    status: "coming-soon",
    deadline: null,
    eligibility: null,
    cta: { label: "Events", href: "/events" },
  },
];

export const starlight: FeatureBlock = {
  eyebrow: "Coming soon",
  title: "The Starlight Awards",
  body: "A dedicated home for Starlight Awards media, honorees, and event details — to be featured here once confirmed.",
  image: media.community,
  cta: { label: "Starlight Awards", href: "/starlight-awards" },
};

/** Six empty partner slots. Replace with approved names + logo files. */
export const partners: Partner[] = Array.from({ length: 6 }, (_, i) => ({
  id: `partner-${i + 1}`,
  name: null,
  logo: null,
  url: null,
}));

export const pathways: Pathway[] = [
  {
    id: "support",
    title: "Support",
    summary: "Invest in scholarship, mentorship, and service for future leaders.",
    cta: { label: "Give", href: "/donate" },
  },
  {
    id: "partner",
    title: "Partner",
    summary: "Align your organization with the next generation of leadership.",
    cta: { label: "Become a partner", href: "/partner" },
  },
  {
    id: "volunteer",
    title: "Volunteer",
    summary: "Share your time, experience, and network as a mentor or volunteer.",
    cta: { label: "Volunteer", href: "/volunteer" },
  },
  {
    id: "apply",
    title: "Apply",
    summary: "Step into a pathway built around scholarship, mentorship, and service.",
    cta: { label: "Apply", href: "/apply" },
  },
];
