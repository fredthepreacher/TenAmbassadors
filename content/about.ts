import type { Leader } from "@/lib/types";
import { site } from "@/lib/site";

export const about = {
  /** [draft] */
  mission:
    "To develop future leaders through Scholarship, Mentorship, and Service — opening pathways for the next generation.",
  /** [draft] framed as vision. */
  vision:
    "A world where talent, not circumstance, determines who gets to lead — and where every leader holds the door open for the next.",
  /** [source] */
  origin: `Launched by ${site.parentOrg.name}, ${site.name} is an initiative focused on developing future leaders through Scholarship, Mentorship, and Service.`,
  /** PENDING: the full founding story. */
  story: null as string | null,
  values: ["Strengthening Communities.", "Building Leaders.", "Expanding Opportunity."],
};

/** PENDING: Leadership / Founding Ambassadors — names, roles, photos, bios. */
export const leadership: Leader[] = [];
