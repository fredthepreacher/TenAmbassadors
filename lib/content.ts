/**
 * Content access layer — the only way components read content.
 *
 * To connect a CMS (recommended: Sanity — see docs/ARCHITECTURE.md), replace
 * these function bodies with CMS queries returning the same types.
 */
import * as home from "@/content/home";
import { about, ecosystem, faqs, globalDirection, horizon, leadership, whyTen } from "@/content/about";
import { givingPathways, impact } from "@/content/impact";
import { getPathwayPage, pathwayPages } from "@/content/getInvolved";
import { getLegalDoc, legalDocs } from "@/content/legal";
import { footerNav, headerCta, legalNav, otherContacts, primaryNav, socialLinks } from "@/content/navigation";
import { networkPartnerRoles, networkPartnerTypes, networkPartners, partnerCategories, partners } from "@/content/partners";
import { pathways } from "@/content/involvement";
import {
  mentorship,
  mentorshipFormats,
  mentorshipIndustries,
  scholarshipAreas,
  serviceAreas,
  serviceInitiatives,
  volunteer,
} from "@/content/programs";
import { featuredScholarship, getScholarshipBySlug, scholarships } from "@/content/scholarships";
import { starlight } from "@/content/starlight";

export async function getHomepage() {
  return { ...home, featuredScholarship };
}

export async function getNavigation() {
  return { primaryNav, headerCta, footerNav, legalNav, socialLinks, otherContacts };
}

export async function getScholarships() {
  return scholarships;
}

export async function getScholarship(slug: string) {
  return getScholarshipBySlug(slug);
}

export async function getAbout() {
  return { about, leadership, whyTen, ecosystem, horizon, globalDirection, faqs };
}

export async function getImpact() {
  return impact;
}

export async function getGiving() {
  return givingPathways;
}

export async function getPathwayPages() {
  return pathwayPages;
}

export async function getPathway(slug: string) {
  return getPathwayPage(slug);
}

export async function getPrograms() {
  return { mentorship, serviceInitiatives, volunteer, scholarshipAreas, mentorshipIndustries, mentorshipFormats, serviceAreas };
}

export async function getStarlight() {
  return starlight;
}

export async function getPartners() {
  return { partnerCategories, partners, networkPartnerTypes, networkPartnerRoles, networkPartners };
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
