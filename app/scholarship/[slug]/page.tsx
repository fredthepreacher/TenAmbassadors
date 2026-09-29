import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionButton, ButtonLink, TextLink } from "@/components/ui/Button";
import { PendingBlock, PendingNote } from "@/components/ui/Pending";
import { VideoFeature } from "@/components/ui/VideoFeature";
import { getScholarship, getScholarships } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/**
 * Reusable scholarship detail template. Every section renders real content
 * when supplied, and a labelled placeholder when it is still pending.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getScholarships()).map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await getScholarship((await params).slug);
  if (!s) return {};
  return pageMetadata({
    title: s.name,
    description: s.summary,
    path: `/scholarship/${s.slug}`,
    image: s.video?.featured.poster,
  });
}

const statusLabel = { "in-development": "In development", open: "Applications open", closed: "Applications closed" } as const;

export default async function ScholarshipDetail({ params }: Props) {
  const s = await getScholarship((await params).slug);
  if (!s) notFound();

  const sections = [
    { id: "story", label: "Story" },
    { id: "legacy", label: "Legacy" },
    { id: "details", label: "Details" },
    { id: "recipients", label: "Recipients" },
    { id: "apply", label: "Apply" },
  ];

  return (
    <>
      <section aria-labelledby="page-title" className="relative overflow-hidden bg-evergreen-950 pt-[76px] text-paper">
        <div className="container-x pt-14 pb-16 md:pt-20 lg:pb-20">
          <nav aria-label="Breadcrumb" className="text-sm text-paper/70">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/scholarship" className="underline underline-offset-4 hover:text-paper">
                  Scholarship
                </Link>
                <span aria-hidden="true"> /</span>
              </li>
              <li aria-current="page">{s.honoree.name}</li>
            </ol>
          </nav>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow rule-before animate-rise text-gold-300">{statusLabel[s.status]}</p>
              <h1 id="page-title" className="mt-6 text-h1 animate-rise [animation-delay:80ms]">
                {s.name}
              </h1>
            </div>
            <div className="lg:col-span-5 animate-rise [animation-delay:160ms]">
              <p className="font-serif text-2xl text-paper italic">
                {s.honoree.name}
                {s.honoree.years ? <span className="not-italic text-gold-300"> · {s.honoree.years}</span> : null}
              </p>
              <p className="mt-4 text-lede text-paper/80">{s.summary}</p>
            </div>
          </div>
        </div>

        {s.video ? (
          <div className="container-x pb-16 lg:pb-24" data-reveal>
            <VideoFeature video={s.video.full} priority sizes="(max-width: 1280px) 100vw, 1280px" />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-paper/70">
              <p>{s.video.full.title}</p>
              {!s.video.full.captions ? <PendingNote tone="dark">Captions &amp; transcript pending</PendingNote> : null}
            </div>
          </div>
        ) : null}
      </section>

      <nav aria-label="On this page" className="sticky top-[76px] z-30 border-b border-line bg-ivory/95 backdrop-blur">
        <ul className="container-x flex gap-6 overflow-x-auto py-3 text-sm font-medium whitespace-nowrap">
          {sections.map((sec) => (
            <li key={sec.id}>
              <a href={`#${sec.id}`} className="text-ink-2 hover:text-evergreen-900">
                {sec.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-ivory">
        <DetailSection id="story" eyebrow="The story" title="Why this scholarship exists">
          {s.story ? <p className="text-lede">{s.story}</p> : <PendingBlock title="Scholarship story">The story behind the scholarship — in the words of those closest to it — will be published here.</PendingBlock>}
        </DetailSection>

        <DetailSection id="legacy" eyebrow="Legacy" title={`Remembering ${s.honoree.name}`}>
          {s.legacy ? (
            <p className="text-lede">{s.legacy}</p>
          ) : (
            <PendingBlock title="Legacy & biography">A tribute to {s.honoree.name}&rsquo;s life, leadership, and influence will appear here, with approved photographs.</PendingBlock>
          )}
        </DetailSection>

        <DetailSection id="details" eyebrow="Scholarship details" title="Eligibility, award, and timeline">
          <dl className="grid border-t border-line-strong sm:grid-cols-2">
            {s.facts.map((f) => (
              <div key={f.label} className="border-b border-line py-5 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
                <dt className="eyebrow text-gold-ink">{f.label}</dt>
                <dd className="mt-2 font-serif text-2xl text-evergreen-900">{f.value ?? "To be announced"}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            {s.timeline ? (
              <ol className="grid gap-3">
                {s.timeline.map((t) => (
                  <li key={t.label}>
                    {t.label} — {t.date}
                  </li>
                ))}
              </ol>
            ) : (
              <PendingNote>Criteria, award amount, and application timeline pending</PendingNote>
            )}
          </div>
        </DetailSection>

        <DetailSection id="recipients" eyebrow="Recipients & impact" title="Scholars">
          {s.recipients && s.recipients.length > 0 ? null : (
            <PendingBlock title="Scholarship recipients">Recipients and their stories will be featured here once announced and approved.</PendingBlock>
          )}
        </DetailSection>

        <DetailSection id="apply" eyebrow="Apply" title="Applications">
          <div className="flex flex-col items-start gap-8">
            <ActionButton action={s.apply} />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <ButtonLink href="/get-involved#support" variant="outline" arrow>
                Support this scholarship
              </ButtonLink>
              <TextLink href="/scholarship">All scholarships</TextLink>
            </div>
          </div>
        </DetailSection>
      </div>
    </>
  );
}

function DetailSection({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-b border-line py-16 md:py-24">
      <div className="container-x grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-4 text-h3">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6" data-reveal>
          {children}
        </div>
      </div>
    </section>
  );
}
