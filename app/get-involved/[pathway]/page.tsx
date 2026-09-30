import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IntakeForm } from "@/components/forms/IntakeForm";
import { PageHero } from "@/components/pages/PageHero";
import { getPathway, getPathwayPages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPathwayPages()).map((p) => ({ pathway: p.slug }));
}

type Props = { params: Promise<{ pathway: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPathway((await params).pathway);
  if (!p) return {};
  return pageMetadata({ title: p.eyebrow, description: p.intro, path: `/get-involved/${p.slug}` });
}

export default async function PathwayPage({ params }: Props) {
  const p = await getPathway((await params).pathway);
  if (!p) notFound();

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro}>
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/get-involved" className="underline underline-offset-4 hover:text-royal-700">
            Get involved
          </Link>{" "}
          / <span aria-current="page">{p.eyebrow}</span>
        </nav>
      </PageHero>
      <section className="section-y bg-paper pt-12 md:pt-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {p.criteria ? (
            <div className="lg:col-span-4">
              <h2 className="eyebrow rule-before text-gold-ink">{p.criteriaTitle}</h2>
              <ul className="mt-6 border-t border-line-strong">
                {p.criteria.map((c, i) => (
                  <li key={c} className="flex items-baseline gap-3 border-b border-line py-3.5">
                    <span className="text-xs font-semibold tracking-[0.14em] text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg text-navy-900">{c}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">Substance over prestige: we look for contribution, not credentials alone.</p>
            </div>
          ) : null}
          <div className={p.criteria ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-8"}>
            <IntakeForm formId={p.formId} headingLevel={p.criteria ? "h3" : "h2"} />
          </div>
        </div>
      </section>
    </>
  );
}
