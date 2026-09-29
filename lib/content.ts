/**
 * Content access layer — the only way components read content.
 *
 * To connect a CMS (recommended: Sanity — see docs/ARCHITECTURE.md), replace
 * these function bodies with CMS queries returning the same types.
 */
import * as home from "@/content/home";
import { about, leadership } from "@/content/about";
import { getLegalDoc, legalDocs } from "@/content/legal";
import { footerNav, headerCta, legalNav, primaryNav, socialLinks } from "@/content/navigation";
import { partnerCategories, partners } from "@/content/partners";
import { pathways } from "@/content/involvement";
import { mentorship, serviceInitiatives, volunteer } from "@/content/programs";
import { featuredScholarship, getScholarshipBySlug, scholarships } from "@/content/scholarships";
import { starlight } from "@/content/starlight";

export async function getHomepage() {
  return { ...home, featuredScholarship };
}

export async function getNavigation() {
  return { primaryNav, headerCta, footerNav, legalNav, socialLinks };
}

export async function getScholarships() {
  return scholarships;
}

export async function getScholarship(slug: string) {
  return getScholarshipBySlug(slug);
}

export async function getAbout() {
  return { about, leadership };
}

export async function getPrograms() {
  return { mentorship, serviceInitiatives, volunteer };
}

export async function getStarlight() {
  return starlight;
}

export async function getPartners() {
  return { partnerCategories, partners };
}

export async function getPathways() {
  return pathways;
}

export async function getLegalDocs() {
  return legalDocs;
}

export async function getLegal(slug: string) {
  return getLegalDoc(slug);
}
