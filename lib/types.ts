/**
 * CMS-ready content model.
 *
 * These types describe every piece of content the site renders. Today the data
 * lives in /content as typed TypeScript; when a CMS (Sanity, Contentful,
 * Supabase, etc.) is connected, map its documents to these shapes inside
 * lib/content.ts and the components will not need to change.
 *
 * Convention: a value of `null` means "not supplied yet — render a clearly
 * labelled placeholder". Never fill these with invented facts.
 */

export type PillarId = "scholarship" | "mentorship" | "service";

export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used when the image is cropped responsively. */
  focus?: string;
  /** True while the file is a screenshot-derived reference, not the original. */
  isReference?: boolean;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface Pillar {
  id: PillarId;
  index: string;
  letter: string;
  title: string;
  summary: string;
  /** What this pathway will cover once program details are confirmed. */
  pendingDetail: string;
  cta: CallToAction;
}

export interface Story {
  eyebrow: string;
  headline: string;
  image: Media;
  /** Approved participant story. `null` until supplied and approved. */
  quote: string | null;
  personName: string | null;
  personRole: string | null;
  cta: CallToAction;
}

export interface GalleryItem {
  id: string;
  kind: "image" | "video";
  image: Media | null;
  caption: string;
  /** For future video embeds (YouTube / Vimeo / Mux). */
  videoUrl?: string | null;
  layout: "feature" | "tall" | "wide" | "standard";
}

export interface Metric {
  id: string;
  label: string;
  /** Verified value, e.g. "120+". `null` until confirmed. */
  value: string | null;
  source: string | null;
}

export type OpportunityStatus = "coming-soon" | "open" | "closed";

export interface Opportunity {
  id: string;
  pathway: PillarId | "events";
  title: string;
  summary: string;
  status: OpportunityStatus;
  /** ISO date string. `null` until confirmed. */
  deadline: string | null;
  eligibility: string | null;
  cta: CallToAction;
}

export interface Partner {
  id: string;
  name: string | null;
  logo: Media | null;
  url: string | null;
}

export interface Pathway {
  id: "support" | "partner" | "volunteer" | "apply";
  title: string;
  summary: string;
  cta: CallToAction;
}

export interface SocialLink {
  platform: "Instagram" | "Facebook" | "LinkedIn" | "YouTube";
  url: string | null;
}

export interface FeatureBlock {
  eyebrow: string;
  title: string;
  body: string;
  image: Media;
  cta: CallToAction;
}

export interface PlannedPage {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  /** Inputs needed before this page can be built out. */
  pending: string[];
}
