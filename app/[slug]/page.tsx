import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getPage, getPlannedPages } from "@/lib/content";
import { site } from "@/lib/site";
import styles from "./page.module.css";

/**
 * Safe placeholder target for every planned route (see content/pages.ts).
 * Only registered slugs are generated; anything else 404s.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getPlannedPages();
  return pages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.summary,
    alternates: { canonical: `/${page.slug}` },
    // Keep in-development pages out of search results until they are real.
    robots: { index: false, follow: true },
  };
}

export default async function PlannedPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <section className={`${styles.page} on-dark`} aria-labelledby="page-title">
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 id="page-title" className={styles.title}>
          {page.title}
        </h1>
        <p className={styles.summary}>{page.summary}</p>

        <div className={styles.status}>
          <p className={styles.statusLabel}>
            <span className={styles.dot} aria-hidden="true" />
            This page is in development
          </p>
          {site.showPlaceholderNotes ? (
            <>
              <p className={styles.statusBody}>It will be published once the following is confirmed:</p>
              <ul className={styles.pending}>
                {page.pending.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <div className={styles.actions}>
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/#get-involved" variant="secondary">
            Ways to get involved
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
