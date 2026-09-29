/**
 * Global site configuration — the single place for brand-level settings.
 *
 * BRAND NAME: earlier material uses "10 Ambassadors"; current direction is
 * "Ten Ambassadors". Change `name` / `wordmark` here once confirmed.
 */
export const site = {
  name: "Ten Ambassadors",
  wordmark: { lead: "Ten", rest: "Ambassadors" },
  tagline: "Scholarship. Mentorship. Service.",
  pillarsLine: "Scholarship · Mentorship · Service",
  description:
    "Ten Ambassadors is an initiative focused on developing future leaders through Scholarship, Mentorship, and Service.",
  /** Canonical origin. Set NEXT_PUBLIC_SITE_URL per environment (preview vs production). */
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://tenambassadors.org",
  locale: "en_US",

  /** Historical relationship (source language). Ten Ambassadors keeps its own identity. */
  parentOrg: {
    name: "The Upmixer",
    /** PENDING: link to The Upmixer (its site is being redesigned in Phase 2). */
    url: null as string | null,
  },

  /** PENDING: contact details must come from the client. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
  },

  /**
   * Donations. No processor has been chosen. When one is (e.g. Stripe,
   * Givebutter, Donorbox, PayPal Giving Fund), set `url` to its hosted
   * checkout / form and the "Support" CTAs activate automatically.
   */
  donation: {
    provider: null as string | null,
    url: null as string | null,
  },

  /** PENDING: approved nonprofit status / disclosure language. Never invent. */
  nonprofitDisclosure: null as string | null,

  /**
   * When true, clearly labelled "pending" markers render so reviewers can see
   * what content is outstanding. Set to false for launch once all are resolved.
   */
  showPlaceholderNotes: true,
} as const;
