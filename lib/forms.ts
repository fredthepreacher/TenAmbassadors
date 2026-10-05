/**
 * Centralized intake architecture (V2.2).
 *
 * Every form on the site is defined here and submits through ONE function
 * (`submitIntake`) toward ONE destination. Today that destination is email: the
 * visitor's email app opens with the message addressed to `site.inbox.address`
 * (interim: info@theupmixer.com). When a CRM/database is approved, set
 * NEXT_PUBLIC_INTAKE_ENDPOINT and the same forms POST there. No paid service
 * has been added and no secret is needed.
 *
 * CRM mapping: every submission becomes a Contact (person or organization)
 * + an Interaction tagged with `formId`, `pathway` and optional `referral`
 * (Network Partner referral code). See docs/FORMS_CRM_ANALYTICS.md.
 */
import { site } from "./site";

export type FieldType = "text" | "email" | "url" | "textarea" | "select" | "checkbox";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  autoComplete?: string;
  options?: string[];
  hint?: string;
}

export type FormId =
  | "ambassador-application"
  | "ambassador-nomination"
  | "mentor-application"
  | "network-partner-application"
  | "volunteer-application"
  | "sponsor-inquiry"
  | "general-contact"
  | "scholarship-interest"
  | "newsletter-signup"
  | "media-inquiry";

export interface FormDefinition {
  id: FormId;
  title: string;
  /** CRM record type the submission creates. */
  crmType: "person" | "organization";
  fields: FormField[];
}

const person: FormField[] = [
  { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "organization", label: "Organization", type: "text", autoComplete: "organization" },
  { name: "title", label: "Title / role", type: "text", autoComplete: "organization-title" },
  { name: "linkedin", label: "LinkedIn profile", type: "url", hint: "https://www.linkedin.com/in/…" },
  { name: "location", label: "City / location", type: "text", autoComplete: "address-level2" },
];

const referral: FormField = {
  name: "referral",
  label: "Referred by (person or Network Partner)",
  type: "text",
  hint: "Optional. Helps us recognize partner networks.",
};

export const forms: Record<FormId, FormDefinition> = {
  "ambassador-application": {
    id: "ambassador-application",
    title: "Ambassador application",
    crmType: "person",
    fields: [
      ...person,
      { name: "background", label: "Professional background", type: "textarea", required: true },
      { name: "community", label: "Community involvement", type: "textarea", required: true, hint: "Where and how you are already making an impact." },
      { name: "experience", label: "Mentorship / service experience", type: "textarea" },
      { name: "motivation", label: "Why Ten Ambassadors?", type: "textarea", required: true },
      { name: "affiliation", label: "Organizational affiliations", type: "text" },
      referral,
    ],
  },
  "ambassador-nomination": {
    id: "ambassador-nomination",
    title: "Ambassador nomination",
    crmType: "person",
    fields: [
      { name: "nominatorName", label: "Your name", type: "text", required: true, autoComplete: "name" },
      { name: "nominatorEmail", label: "Your email", type: "email", required: true, autoComplete: "email" },
      { name: "nomineeName", label: "Nominee's name", type: "text", required: true },
      { name: "nomineeEmail", label: "Nominee's email (if known)", type: "email" },
      { name: "nomineeOrganization", label: "Nominee's organization / title", type: "text" },
      { name: "nomineeLinkedin", label: "Nominee's LinkedIn", type: "url" },
      { name: "location", label: "Nominee's location", type: "text" },
      { name: "community", label: "Their community impact", type: "textarea", required: true },
      { name: "motivation", label: "Why they embody Scholarship, Mentorship and Service", type: "textarea", required: true },
      referral,
    ],
  },
  "mentor-application": {
    id: "mentor-application",
    title: "Mentor application",
    crmType: "person",
    fields: [
      ...person,
      {
        name: "industry",
        label: "Industry",
        type: "select",
        options: ["Business", "Finance", "Technology", "Healthcare", "Public service", "Entrepreneurship", "Law", "Engineering", "Media", "Sports", "Hospitality", "International affairs", "Other"],
      },
      { name: "experience", label: "Mentorship experience", type: "textarea" },
      { name: "motivation", label: "What would you like to offer emerging young professionals?", type: "textarea", required: true },
      referral,
    ],
  },
  "network-partner-application": {
    id: "network-partner-application",
    title: "Network Partner application",
    crmType: "organization",
    fields: [
      { name: "organization", label: "Organization name", type: "text", required: true, autoComplete: "organization" },
      {
        name: "orgType",
        label: "Organization type",
        type: "select",
        required: true,
        options: ["Professional association", "Alumni group", "Civic / cultural organization", "Industry association", "Fraternity / sorority", "Young-professional group", "Nonprofit", "Corporate employee group", "University", "Business group", "Community organization", "Other"],
      },
      { name: "website", label: "Website", type: "url" },
      { name: "name", label: "Contact name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Contact email", type: "email", required: true, autoComplete: "email" },
      { name: "title", label: "Contact title", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "collaboration", label: "How would you like to collaborate?", type: "textarea", required: true },
    ],
  },
  "volunteer-application": {
    id: "volunteer-application",
    title: "Volunteer interest",
    crmType: "person",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "location", label: "City / location", type: "text" },
      { name: "interests", label: "Areas of interest", type: "textarea", hint: "Events, service initiatives, mentorship support…" },
      referral,
    ],
  },
  "sponsor-inquiry": {
    id: "sponsor-inquiry",
    title: "Sponsorship / corporate partnership inquiry",
    crmType: "organization",
    fields: [
      { name: "organization", label: "Organization", type: "text", required: true, autoComplete: "organization" },
      { name: "name", label: "Contact name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "title", label: "Title", type: "text" },
      {
        name: "pathway",
        label: "Partnership interest",
        type: "select",
        options: ["Scholarship Partner", "Mentorship Partner", "Service Partner", "Leadership Development Partner", "Starlight Awards Partner", "Global Partnership Partner", "Not sure yet"],
      },
      { name: "message", label: "Message", type: "textarea" },
    ],
  },
  "general-contact": {
    id: "general-contact",
    title: "General contact",
    crmType: "person",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "message", label: "Message", type: "textarea", required: true },
    ],
  },
  "scholarship-interest": {
    id: "scholarship-interest",
    title: "Scholarship interest",
    crmType: "person",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "interest", label: "Area of interest", type: "text" },
    ],
  },
  "newsletter-signup": {
    id: "newsletter-signup",
    title: "Newsletter",
    crmType: "person",
    fields: [{ name: "email", label: "Email", type: "email", required: true, autoComplete: "email" }],
  },
  "media-inquiry": {
    id: "media-inquiry",
    title: "Media inquiry",
    crmType: "person",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "outlet", label: "Outlet", type: "text" },
      { name: "message", label: "Request", type: "textarea", required: true },
    ],
  },
};

export type IntakeResult =
  | { ok: true; via: "email" | "endpoint"; mailto?: string }
  | { ok: false; reason: "disabled" | "error"; message: string };

/**
 * Builds the email a submission becomes: addressed to `site.inbox.address`, subject naming the form,
 * body listing every answered field by its label. Exported so the UI can offer the same link as a
 * fallback ("if your email app didn't open…").
 */
export function intakeMailto(formId: FormId, data: Record<string, string>): string {
  const def = forms[formId];
  const lines = def.fields
    .map((f) => {
      const raw = (data[f.name] ?? "").trim();
      if (!raw) return null;
      const value = f.type === "checkbox" ? "Yes" : raw;
      return `${f.label}: ${value}`;
    })
    .filter(Boolean) as string[];
  const subject = `${site.name}: ${def.title}`;
  const body = [`${def.title} (sent from the ${site.name} website)`, "", ...lines].join("\n");
  return `mailto:${site.inbox.address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * The single submission path for every form.
 * - No endpoint (today): the submission is delivered by email. The visitor's email app opens with the
 *   message addressed to the site inbox; nothing is sent until they press send, and nothing is stored.
 * - Endpoint set (future CRM / route handler): POST { formId, data } as JSON; no component changes needed.
 */
export async function submitIntake(formId: FormId, data: Record<string, string>): Promise<IntakeResult> {
  if (!site.intake.enabled) {
    return { ok: false, reason: "disabled", message: "This form is not accepting messages right now." };
  }
  if (!site.intake.endpoint) {
    const mailto = intakeMailto(formId, data);
    if (typeof window !== "undefined") window.location.href = mailto;
    return { ok: true, via: "email", mailto };
  }
  try {
    const res = await fetch(site.intake.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId, data }),
    });
    return res.ok ? { ok: true, via: "endpoint" } : { ok: false, reason: "error", message: "Something went wrong. Please try again." };
  } catch {
    return { ok: false, reason: "error", message: "Something went wrong. Please try again." };
  }
}
