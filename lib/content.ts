/**
 * Content access layer.
 *
 * Components never import /content directly — they call these async getters.
 * To connect a CMS later, replace the bodies of these functions with CMS
 * queries that return the same types (see lib/types.ts).
 */
import * as home from "@/content/home";
import { plannedPages, getPlannedPage } from "@/content/pages";
import { footerNav, legalNav, primaryNav, headerCta, socialLinks } from "@/content/navigation";

export async function getHomepage() {
  return home;
}

export async function getNavigation() {
  return { primaryNav, headerCta, footerNav, legalNav, socialLinks };
}

export async function getPlannedPages() {
  return plannedPages;
}

export async function getPage(slug: string) {
  return getPlannedPage(slug);
}
