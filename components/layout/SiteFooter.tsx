import Link from "next/link";
import { site } from "@/lib/site";
import type { ContactDestination, NavItem, SocialLink } from "@/lib/types";
import { PendingNote } from "@/components/ui/Pending";
import { NewsletterForm } from "./NewsletterForm";
import { Wordmark } from "./Wordmark";

export function SiteFooter({
  columns,
  legal,
  social,
  other = [],
}: {
  columns: { heading: string; links: NavItem[] }[];
  legal: NavItem[];
  social: SocialLink[];
  other?: ContactDestination[];
}) {
  const year = new Date().getFullYear();
  const { contact, inbox, nonprofitDisclosure } = site;
  const email = contact.email ?? inbox.address;
  const liveSocial = social.filter((s) => s.url);

  return (
    <footer className="bg-navy-950 text-paper" id="newsletter">
      <div className="container-x grid gap-12 border-b border-paper/15 py-16 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="grid content-start gap-5">
          <Wordmark tone="light" />
          <p className="max-w-md font-serif text-h3 text-paper">{site.tagline}</p>
          <p className="text-paper/70">
            A leadership and impact organization being established around Scholarship, Mentorship and Service.
          </p>
        </div>
        <NewsletterForm />
      </div>

      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 border-b border-paper/15 py-14 lg:grid-cols-4">
        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="eyebrow text-gold-300">{col.heading}</h2>
            <ul className="mt-5 grid gap-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-paper/75 transition-colors hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-2 lg:col-span-1">
          <h2 className="eyebrow text-gold-300">Connect</h2>
          <div className="mt-5 grid justify-items-start gap-4">
            {/* Geo point 10: email, social and other destinations all come from content/navigation.ts + lib/site.ts. */}
            {/* Interim: until Ten Ambassadors has its own address, the chip uses site.inbox (The Upmixer's inbox). */}
            <a href={`mailto:${email}`} className="connect-chip text-paper/90">
              <MailGlyph />
              {contact.email ? contact.email : "Email us"}
            </a>
            {/* Social accounts appear only once Geo supplies verified URLs (content/navigation.ts). */}
            {liveSocial.length || other.length ? (
            <ul className="flex flex-wrap gap-2" aria-label="Social media and other links">
              {liveSocial.map((s) => (
                <li key={s.platform}>
                  <a href={s.url!} target="_blank" rel="noopener noreferrer" className="connect-chip">
                    {s.platform}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              {other.map((o) => (
                <li key={o.href}>
                  <a href={o.href} className="connect-chip" {...(/^https?:/.test(o.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {o.label}
                  </a>
                </li>
              ))}
            </ul>
            ) : null}
            {!contact.email || social.some((s) => !s.url) ? <PendingNote tone="dark">Connection links pending from the client</PendingNote> : null}
          </div>
        </div>
      </div>

      <div className="container-x grid gap-6 py-8 text-sm text-paper/65 md:grid-cols-[1fr_auto] md:items-start">
        <div className="grid justify-items-start gap-3">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          {nonprofitDisclosure ? (
            <p className="max-w-2xl">{nonprofitDisclosure}</p>
          ) : (
            <PendingNote tone="dark">Nonprofit status and disclosure language pending</PendingNote>
          )}
        </div>
        <ul className="flex flex-wrap gap-6">
          {legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-paper">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 shrink-0" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 5.5l7 5.5 7-5.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
