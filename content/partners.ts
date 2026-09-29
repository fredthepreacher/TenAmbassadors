import type { Partner, PartnerCategory } from "@/lib/types";

export const partnerCategories: PartnerCategory[] = [
  { id: "corporate", title: "Corporate sponsors", description: "Companies investing in the next generation of talent and leadership." },
  { id: "university", title: "Universities", description: "Academic partners helping scholars access education and opportunity." },
  { id: "foundation", title: "Foundations", description: "Philanthropic partners funding scholarship and program growth." },
  { id: "community", title: "Community partners", description: "Local organizations extending service and mentorship where it matters most." },
  { id: "association", title: "Professional associations", description: "Networks that connect emerging leaders with experienced professionals." },
];

/** PENDING: no partners have been confirmed. Add approved partners (with logo files) here. */
export const partners: Partner[] = [];
