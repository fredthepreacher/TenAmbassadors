/**
 * Global site configuration.
 *
 * BRAND NAME: existing material uses "10 Ambassadors"; current direction uses
 * "Ten Ambassadors". Change `name` (and `wordmark`) here once Geo confirms the
 * official style — every component reads from this file.
 */
export const site = {
  name: "Ten Ambassadors",
  wordmark: { lead: "Ten", rest: "Ambassadors" },
  tagline: "Scholarship. Mentorship. Service.",
  pillarsLine: "Scholarship · Mentorship · Service",
  description:
    "Ten Ambassadors is an initiative focused on developing future leaders through Scholarship, Mentorship, and Service.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",

  /** Relationship to the founding organization (source language). */
  parentOrg: {
    name: "The Upmixer",
    /** PENDING: official URL for The Upmixer. Leave null until confirmed. */
    url: null as string | null,
  },

  /** PENDING: all contact details must come from Geo. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
  },

  /** PENDING: donation destination / processor. */
  donationUrl: null as string | null,

  /**
   * When true, clearly-labelled placeholder notes render on the site so
   * reviewers can see what content is still pending. Set to false for launch
   * once every placeholder has been replaced.
   */
  showPlaceholderNotes: true,
} as const;

export type SiteConfig = typeof site;
