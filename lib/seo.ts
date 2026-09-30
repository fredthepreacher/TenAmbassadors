import type { Metadata } from "next";
import { site } from "./site";

/** The generated share card (app/opengraph-image.tsx) — used when a page has no image of its own. */
const defaultShareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` };

/**
 * Per-page metadata with consistent canonical, Open Graph and Twitter defaults.
 * Child `openGraph` objects replace the root layout's, so every field
 * (type, site name, locale, image) is set here rather than inherited.
 * `title` is combined with the "| Ten Ambassadors" template unless
 * `absoluteTitle` is given.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  image,
  noindex = false,
}: {
  title: string;
  absoluteTitle?: string;
  description: string;
  path: string;
  image?: { src: string; alt: string; width: number; height: number };
  noindex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${site.name}`;
  const images = image ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] : [defaultShareImage];
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => ({ url: i.url, alt: i.alt })),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Absolute URL for structured data. */
export const absoluteUrl = (path = "") => `${site.url}${path === "/" ? "" : path}`;

/** Stable entity identifiers so every JSON-LD block refers to the same organization and site. */
export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
};

/** BreadcrumbList JSON-LD matching the visible breadcrumb trail. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}

/** Serialize JSON-LD safely for inline <script> (escapes "<" to avoid breaking out of the tag). */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
