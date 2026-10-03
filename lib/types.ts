/**
 * CMS-ready content model.
 *
 * Data currently lives as typed TypeScript in /content. When a CMS is
 * connected (see docs/ARCHITECTURE.md), map its documents to these shapes in
 * lib/content.ts — components will not need to change.
 *
 * Convention: `null` means "not supplied yet" and renders a clearly labelled
 * placeholder. Never fill a null with invented facts.
 */

export type PillarId = "scholarship" | "mentorship" | "service";

export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position for responsive crops. */
  focus?: string;
}

/**
 * Silent, looping hero film. One art-directed cut per hero breakpoint, each
 * framed for that container so faces never sit behind the headline or get
 * cropped. The matching poster is the LCP image and the static hero for
 * reduced motion, Data Saver, blocked autoplay and load errors.
 */
export interface HeroFilmVariant {
  id: "phone" | "tablet-portrait" | "tablet-landscape" | "desktop";
  /** Media query that selects this cut — the poster <source> uses the same query. Queries must not overlap. */
  media: string;
  /** H.264 MP4 (yuv420p, faststart, no audio). `null` = this breakpoint shows the still only. */
  mp4: string | null;
  /** The film's first frame (or the static hero where there is no film). */
  poster: Media;
}

export interface HeroFilm {
  /** Ordered phone → tablet → desktop; the last one is the <img> fallback. */
  variants: HeroFilmVariant[];
  /** Accessible description of what the film shows (decorative motion; the poster carries the alt text). */
  label: string;
}

export interface VideoAsset {
  title: string;
  src: string;
  poster: Media;
  durationLabel: string;
  /** WebVTT captions URL. PENDING until a verified transcript exists. */
  captions: string | null;
  /** Plain-text transcript. PENDING. */
  transcript: string | null;
}

export interface Link {
  label: string;
  href: string;
}

/** A call to action that may not be live yet (e.g. applications not open). */
export interface Action extends Link {
  available: boolean;
  /** Shown instead of a link when `available` is false. */
  pendingNote?: string;
  /** Pill text while unavailable (default: "<label> · not yet open"). */
  unavailableLabel?: string;
}

export interface SmsStage {
  id: PillarId;
  index: string;
  title: string;
  line: string;
  body: string;
  href: string;
}

export interface ScholarshipFact {
  label: string;
  value: string | null;
}

export interface Scholarship {
  slug: string;
  name: string;
  honoree: {
    name: string;
    /** As shown in the approved scholarship film. Confirm with the family/client. */
    years: string | null;
    portrait: Media | null;
  };
  status: "in-development" | "open" | "closed";
  summary: string;
  story: string | null;
  legacy: string | null;
  facts: ScholarshipFact[];
  timeline: { label: string; date: string }[] | null;
  recipients: { name: string; year: string; photo: Media | null }[] | null;
  impact: string | null;
  video: { featured: VideoAsset; full: VideoAsset } | null;
  apply: Action;
}

export interface Initiative {
  id: string;
  title: string | null;
  summary: string | null;
  status: "planned" | "active" | "completed";
}

export type PartnerCategoryId =
  | "scholarship"
  | "mentorship"
  | "service"
  | "leadership"
  | "starlight"
  | "global";

export interface PartnerCategory {
  id: PartnerCategoryId;
  title: string;
  description: string;
}

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategoryId;
  logo: Media | null;
  url: string | null;
}

export interface Pathway {
  id: string;
  title: string;
  summary: string;
  action: Action;
}

export interface Leader {
  name: string;
  role: string;
  photo: Media | null;
  bio: string | null;
}

export interface SocialLink {
  platform: "LinkedIn" | "Instagram" | "Facebook" | "YouTube" | "X" | "TikTok";
  /** Verified profile URL from the client. `null` renders a disabled "coming soon" chip. */
  url: string | null;
}

/** Any other client-approved contact destination (e.g. a booking page or press inbox). */
export interface ContactDestination {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDoc {
  slug: "privacy" | "terms" | "accessibility";
  title: string;
  summary: string;
  /** Plain-language text written from what the site actually does. `null` = not written. */
  sections: LegalSection[] | null;
  /** "draft" until the organization (and its counsel, if any) approves the text. Draft pages stay noindex. */
  status: "draft" | "approved";
  /** Date the text was last revised (ISO). */
  updated: string;
}

/** A role in the founding ecosystem (About / homepage "Why Ten?"). */
export interface EcosystemRole {
  id: string;
  title: string;
  summary: string;
  href?: string;
}

export interface HorizonPhase {
  period: string;
  title: string;
  items: string[];
}

export interface ImpactMeasure {
  id: string;
  label: string;
  description: string;
}

export interface AwardConcept {
  id: string;
  title: string;
  /** Concepts pending final approval. */
  status: "concept" | "approved";
}

export interface ProgramArea {
  title: string;
  /** Always future-facing unless confirmed. */
  status: "planned" | "active";
}
