import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { PendingBlock } from "@/components/ui/Pending";
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
  // Keep placeholder legal pages out of search until approved text exists.
  return pageMetadata({ title: doc.title, description: doc.summary, path: `/${doc.slug}`, noindex: !doc.body });
}

export default async function LegalPage({ params }: Props) {
  const doc = await getLegal((await params).legal);
  if (!doc) notFound();
  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} intro={doc.summary} />
      <section className="bg-paper py-16 md:py-24">
        <div className="container-narrow">
          {doc.body ? (
            <div className="grid gap-5 text-lede">{doc.body}</div>
          ) : (
            <PendingBlock title="Approved text pending">
              This page will publish the organization&rsquo;s approved {doc.title.toLowerCase()} text. No policy language has
              been drafted here to avoid publishing unreviewed legal statements.
            </PendingBlock>
          )}
        </div>
      </section>
    </>
  );
}
