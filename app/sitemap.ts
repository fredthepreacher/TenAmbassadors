import type { MetadataRoute } from "next";
import { scholarships } from "@/content/scholarships";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/scholarship", "/mentorship", "/service", "/starlight", "/partners", "/get-involved", "/contact"];
  const now = new Date();
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, lastModified: now, priority: r === "" ? 1 : 0.7 })),
    ...scholarships.map((s) => ({ url: `${site.url}/scholarship/${s.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
