import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { PendingBlock, PendingNote } from "@/components/ui/Pending";
import { getLegal, getLegalDocs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getLegalDocs()).map((d) => ({ legal: d.slug }));
}

type Props = { params: Promise<{ legal: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = await getLegal((await params).legal);
  if (!doc) return {};
  // Draft text stays out of search until the organization approves it.
  return pageMetadata({ title: doc.title, description: doc.summary, path: `/${doc.slug}`, noindex: doc.status !== "approved" || !doc.sections });
}

const dateLabel = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default async function LegalPage({ params }: Props) {
  const doc = await getLegal((await params).legal);
  if (!doc) notFound();
  return (
    <>
      <PageHero eyebrow="Ten Ambassadors" title={doc.title} intro={doc.summary} />
      <section className="bg-paper py-16 md:py-24">
        <div className="container-narrow">
          {doc.sections ? (
            <>
              <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-line pb-6 text-sm text-muted">
                <span>
                  Last updated <time dateTime={doc.updated}>{dateLabel(doc.updated)}</time>
                </span>
                {doc.status === "draft" ? <PendingNote>Draft for organization review</PendingNote> : null}
              </div>
              <article className="legal-prose text-lede">
                {doc.sections.map((s) => (
                  <section key={s.heading} aria-labelledby={`h-${slug(s.heading)}`}>
                    <h2 id={`h-${slug(s.heading)}`}>{s.heading}</h2>
                    {s.paragraphs?.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                    {s.list ? (
                      <ul>
                        {s.list.map((li) => (
                          <li key={li.slice(0, 40)}>{li}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </article>
            </>
          ) : (
            <PendingBlock title={doc.title}>This page will be published soon.</PendingBlock>
          )}
        </div>
      </section>
    </>
  );
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
