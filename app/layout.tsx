import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { getNavigation } from "@/lib/content";
import { site } from "@/lib/site";
import "./globals.css";

/* Fonts are self-hosted (SIL OFL) so builds never depend on a network call. */
const serif = localFont({
  src: [
    { path: "./fonts/newsreader-latin-wght-normal.woff2", style: "normal", weight: "200 800" },
    { path: "./fonts/newsreader-latin-wght-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  // Editorial accents only — not preloaded, so it never competes with the
  // hero image and UI font for early bandwidth (fallback metrics prevent shift).
  preload: false,
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

const sans = localFont({
  src: [{ path: "./fonts/inter-tight-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
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
  themeColor: "#f6f2ea",
  width: "device-width",
  initialScale: 1,
};

/** Adds the reveal class before first paint so content doesn't flash. */
const revealBootstrap = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){document.documentElement.classList.add('js-reveal')}}catch(e){}`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nav = await getNavigation();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    slogan: site.coreMessage.join(" "),
    knowsAbout: ["Leadership development", "Mentorship", "Scholarship", "Community service", "Professional mentorship", "Young professional leadership"],
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
        <SiteFooter columns={nav.footerNav} legal={nav.legalNav} social={nav.socialLinks} />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
