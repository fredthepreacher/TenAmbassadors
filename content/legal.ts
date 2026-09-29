import type { LegalDoc } from "@/lib/types";

/** Approved legal text is pending. These pages exist so footer links resolve. */
export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "How Ten Ambassadors collects, uses, and protects personal information.",
    body: null,
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary: "The terms that govern use of this website.",
    body: null,
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    summary: "Our commitment to an accessible website for everyone.",
    body: null,
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug) ?? null;
}
