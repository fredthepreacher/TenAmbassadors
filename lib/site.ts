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
    "Ten Ambassadors is a leadership and impact organization being established around Scholarship, Mentorship and Service to develop the next generation of leaders.",
  /** Canonical origin. Set NEXT_PUBLIC_SITE_URL per environment (preview vs production). */
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://tenambassadors.org",
  locale: "en_US",

  /** Historical relationship (source language). Ten Ambassadors keeps its own identity. */
  parentOrg: {
    name: "The Upmixer",
    /** Legal entity name used wherever the Starlight production role is described. */
    legalName: "Upmixer Inc.",
    /** Role relative to Ten Ambassadors (V2.4 entity definitions). */
    starlightRole: "event-production and experience partner for the Starlight Awards",
    /** PENDING: link to The Upmixer (its site is being redesigned in Phase 2). */
    url: null as string | null,
  },

  /**
   * Contact details. `email` is Ten Ambassadors' OWN address and is not created yet (PENDING from Geo).
   * Until it exists, `inbox` (below) is the address visitors and forms use.
   */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
  },

  /**
   * Where messages and form submissions go — ONE setting for the whole site (forms, newsletter,
   * footer, contact page, legal pages).
   *
   * Interim (Geo meeting, 2026-10-04): The Upmixer's inbox, info@theupmixer.com, until Ten Ambassadors
   * has its own address. To switch: set NEXT_PUBLIC_FORM_RECIPIENT in Vercel (or edit the fallback
   * below) and set `interim` to false. See docs/GEO_MEETING_REVISION_REPORT.md → "Contact and forms".
   */
  inbox: {
    address: process.env.NEXT_PUBLIC_FORM_RECIPIENT?.trim() || "info@theupmixer.com",
    /** True while the address belongs to The Upmixer rather than Ten Ambassadors. */
    interim: !process.env.NEXT_PUBLIC_FORM_RECIPIENT?.trim(),
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
   * Intake. With no `endpoint`, every form is delivered by email: submitting opens the visitor's
   * email app with the message addressed to `inbox.address` (no server, no secrets, nothing stored).
   * When a server route or CRM is approved, set NEXT_PUBLIC_INTAKE_ENDPOINT (e.g. "/api/intake") and
   * forms POST JSON there instead. See lib/forms.ts and docs/FORMS_CRM_ANALYTICS.md.
   */
  intake: {
    enabled: true,
    endpoint: (process.env.NEXT_PUBLIC_INTAKE_ENDPOINT?.trim() || null) as string | null,
  },

  /**
   * Reviewer-only "pending" markers (outstanding client content). OFF in every public build;
   * set NEXT_PUBLIC_SHOW_REVIEW_NOTES=1 on a review deployment to see them. The full list of
   * outstanding items lives in docs/CONTENT_STATUS.md and docs/GEORGE_FIDELITY_REPORT.md.
   */
  showPlaceholderNotes: process.env.NEXT_PUBLIC_SHOW_REVIEW_NOTES === "1",
} as const;
