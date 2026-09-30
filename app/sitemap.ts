import type { MetadataRoute } from "next";
import { scholarships } from "@/content/scholarships";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/scholarship",
    "/mentorship",
    "/service",
    "/starlight",
    "/network-partners",
    "/partners",
    "/get-involved",
    "/get-involved/ambassador",
    "/get-involved/nominate",
    "/get-involved/mentor",
    "/get-involved/volunteer",
    "/get-involved/sponsor",
    "/donate",
    "/contact",
  ];
  const now = new Date();
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, lastModified: now, priority: r === "" ? 1 : 0.7 })),
    ...scholarships.map((s) => ({ url: `${site.url}/scholarship/${s.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
