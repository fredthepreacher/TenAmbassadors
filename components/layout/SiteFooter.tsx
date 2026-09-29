import Link from "next/link";
import { site } from "@/lib/site";
import type { NavItem, SocialLink } from "@/lib/types";
import { PendingNote } from "@/components/ui/Pending";
import { NewsletterForm } from "./NewsletterForm";
import { Wordmark } from "./Wordmark";

export function SiteFooter({
  columns,
  legal,
  social,
}: {
  columns: { heading: string; links: NavItem[] }[];
  legal: NavItem[];
  social: SocialLink[];
}) {
  const year = new Date().getFullYear();
  const { parentOrg, contact, nonprofitDisclosure } = site;

  return (
    <footer className="bg-evergreen-950 text-paper" id="newsletter">
      <div className="container-x grid gap-12 border-b border-paper/15 py-16 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="grid content-start gap-5">
          <Wordmark tone="light" />
          <p className="max-w-md font-serif text-h3 text-paper">{site.tagline}</p>
          <p className="text-paper/70">
            An initiative launched by{" "}
            {parentOrg.url ? (
              <a href={parentOrg.url} className="underline underline-offset-4">
                {parentOrg.name}
              </a>
            ) : (
              <span className="font-semibold text-paper">{parentOrg.name}</span>
            )}
            .
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
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className="text-paper/75 hover:text-paper">
                {contact.email}
              </a>
            ) : (
              <PendingNote tone="dark">Contact details pending</PendingNote>
            )}
            <ul className="flex flex-wrap gap-2" aria-label="Social media">
              {social.map((s) =>
                s.url ? (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-paper/25 px-3 py-1.5 text-sm hover:border-paper"
                    >
                      {s.platform}
                    </a>
                  </li>
                ) : (
                  <li key={s.platform}>
                    <span className="inline-flex cursor-default rounded-full border border-dashed border-paper/25 px-3 py-1.5 text-sm text-paper/60">
                      {s.platform}
                      <span className="sr-only"> (link coming soon)</span>
                    </span>
                  </li>
                ),
              )}
            </ul>
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
