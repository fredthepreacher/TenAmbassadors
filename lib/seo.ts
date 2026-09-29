import type { Metadata } from "next";
import { site } from "./site";

/** Per-page metadata with consistent canonical + Open Graph defaults. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string; width: number; height: number };
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      ...(image ? { images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }] } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
