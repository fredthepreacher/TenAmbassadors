import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { TouchLit } from "@/components/ui/TouchLit";
import { getNavigation } from "@/lib/content";
import { site } from "@/lib/site";
import { ids, jsonLd } from "@/lib/seo";
import "./globals.css";

/* Fonts are self-hosted (SIL OFL) so builds never depend on a network call. */
const serif = localFont({
  // Instanced to the weights the design uses (see scripts/subset_fonts.py);
  // the 600 face only downloads on pages that render it.
  src: [
    { path: "./fonts/newsreader-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "./fonts/newsreader-latin-600-normal.woff2", style: "normal", weight: "600" },
    { path: "./fonts/newsreader-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  // Editorial accents only — not preloaded, so it never competes with the
  // hero image and UI font for early bandwidth (fallback metrics prevent shift).
  preload: false,
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

const sans = localFont({
  // Variable wght axis limited to 400–600, the range the design uses.
  src: [{ path: "./fonts/inter-tight-latin-wght400-600-normal.woff2", style: "normal", weight: "400 600" }],
  variable: "--font-inter-tight",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url || "https://tenambassadors.org"),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#081b33",
  width: "device-width",
  initialScale: 1,
  // Lets safe-area insets (notch, home indicator) reach the page; padding handles them.
  viewportFit: "cover",
};

/** Adds the reveal class before first paint so content doesn't flash. */
const revealBootstrap = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){document.documentElement.classList.add('js-reveal')}}catch(e){}`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nav = await getNavigation();
  const sameAs = nav.socialLinks.map((s) => s.url).filter((u): u is string => Boolean(u && /^https?:/.test(u)));

  // Verified fields only: no logo, founding date, legal/tax status, address, people or sameAs until confirmed.
  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ids.organization,
        name: site.name,
        url: site.url,
        description: site.description,
        slogan: site.coreMessage.join(" "),
        // Only verified, published profiles (content/navigation.ts). Empty until Geo supplies them.
        ...(sameAs.length ? { sameAs } : {}),
        knowsAbout: [
          "Leadership development",
          "Scholarship",
          "Professional mentorship",
          "Community service",
          "Young professionals",
          "Young professional development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        name: site.name,
        url: site.url,
        description: site.description,
        inLanguage: "en-US",
        publisher: { "@id": ids.organization },
      },
    ],
  };

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader
          nav={nav.primaryNav}
          cta={nav.headerCta}
          secondary={[
            { label: "Dr. Christopher A. Phang Scholarship", href: "/scholarship/dr-christopher-a-phang" },
            { label: "Corporate Partners", href: "/partners" },
            { label: "Donate", href: "/donate" },
            { label: "Contact", href: "/contact" },
          ]}
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter columns={nav.footerNav} legal={nav.legalNav} social={nav.socialLinks} other={nav.otherContacts} />
        <RevealObserver />
        <TouchLit />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(siteJsonLd)}
        />
      </body>
    </html>
  );
}
