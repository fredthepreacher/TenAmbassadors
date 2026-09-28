import Link from "next/link";
import { site } from "@/lib/site";
import type { SocialLink } from "@/lib/types";
import { PendingNote } from "@/components/ui/PendingNote";
import { NewsletterForm } from "./NewsletterForm";
import { Wordmark } from "./Wordmark";
import styles from "./SiteFooter.module.css";

type NavLink = { label: string; href: string };

interface SiteFooterProps {
  columns: { heading: string; links: NavLink[] }[];
  legal: NavLink[];
  social: SocialLink[];
}

export function SiteFooter({ columns, legal, social }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const { parentOrg, contact } = site;

  return (
    <footer className={`${styles.footer} on-dark`} id="newsletter">
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Wordmark tone="light" />
            <p className={styles.tagline}>{site.tagline}</p>
            <p className={styles.origin}>
              An initiative launched by{" "}
              {parentOrg.url ? (
                <a href={parentOrg.url} className={styles.inlineLink}>
                  {parentOrg.name}
                </a>
              ) : (
                <strong>{parentOrg.name}</strong>
              )}
              .
            </p>
          </div>

          <div className={styles.newsletterCol}>
            <NewsletterForm />
          </div>
        </div>

        <div className={styles.middle}>
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className={styles.col}>
              <h2 className={styles.colHeading}>{col.heading}</h2>
              <ul role="list">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.col}>
            <h2 className={styles.colHeading}>Contact</h2>
            {contact.email ? (
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            ) : (
              <PendingNote tone="dark">Contact details pending</PendingNote>
            )}
            <h2 className={`${styles.colHeading} ${styles.socialHeading}`}>Follow</h2>
            <ul role="list" className={styles.social}>
              {social.map((s) =>
                s.url ? (
                  <li key={s.platform}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.platform}
                    </a>
                  </li>
                ) : (
                  <li key={s.platform}>
                    <span className={styles.socialPending} title={`${s.platform} link pending`}>
                      {s.platform}
                      <span className="sr-only"> (link coming soon)</span>
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul role="list" className={styles.legal}>
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
