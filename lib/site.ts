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
  /** Core message (strategy brief V2.2). */
  coreMessage: ["Developing leaders.", "Connecting communities.", "Creating impact."],
  description:
    "Ten Ambassadors is a leadership and impact organization being established around Scholarship, Mentorship and Service — developing and connecting the next generation of leaders.",
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

  /**
   * Formation status. Legal / nonprofit / tax-exempt status is NOT finalized:
   * use formation language ("is being established") and never claim
   * 501(c)(3) status or tax deductibility until confirmed.
   */
  formationStatus: "Ten Ambassadors is currently being established. Legal and tax-exempt status has not yet been finalized.",
  /** PENDING: approved nonprofit status / disclosure language. Never invent. */
  nonprofitDisclosure: null as string | null,

  /**
   * Intake (forms → CRM). OFF until a backend / CRM destination is approved.
   * See lib/forms.ts and docs/FORMS_CRM_ANALYTICS.md.
   */
  intake: {
    enabled: false,
    /** e.g. "/api/intake" once a route handler + CRM adapter is approved. */
    endpoint: null as string | null,
  },

  /**
   * When true, clearly labelled "pending" markers render so reviewers can see
   * what content is outstanding. Set to false for launch once all are resolved.
   */
  showPlaceholderNotes: true,
} as const;
