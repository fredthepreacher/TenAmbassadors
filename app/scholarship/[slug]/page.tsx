import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionButton, ButtonLink, TextLink } from "@/components/ui/Button";
import { PendingBlock, PendingNote } from "@/components/ui/Pending";
import { VideoFeature } from "@/components/ui/VideoFeature";
import { OutlineNumeral } from "@/components/ui/Motifs";
import { getScholarship, getScholarships } from "@/lib/content";
import { breadcrumbJsonLd, jsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * Reusable scholarship detail template (more scholarships will use it).
 *
 * Geo meeting revision (2026-10-04): below the film, a section renders ONLY when it has real,
 * approved content (story, legacy, details, recipients, an open application). Nothing unfinished is
 * shown to visitors: no empty story blocks, no recipients, metrics, award amounts or timelines that
 * do not exist yet. The data model (content/scholarships.ts) and the sections are kept, so filling a
 * field brings its section back with no code change. Reviewers can still see every section with
 * NEXT_PUBLIC_SHOW_REVIEW_NOTES=1.
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

const statusLabel = { "in-development": "Named scholarship", open: "Applications open", closed: "Applications closed" } as const;

export default async function ScholarshipDetail({ params }: Props) {
  const s = await getScholarship((await params).slug);
  if (!s) notFound();

  const review = site.showPlaceholderNotes;
  const has = {
    story: Boolean(s.story) || review,
    legacy: Boolean(s.legacy) || review,
    details: s.facts.some((f) => f.value) || Boolean(s.timeline) || review,
    recipients: Boolean(s.recipients?.length) || review,
    apply: s.apply.available || review,
  };
  const sections = [
    { id: "story", label: "Story" },
    { id: "legacy", label: "Legacy" },
    { id: "details", label: "Details" },
    { id: "recipients", label: "Recipients" },
    { id: "apply", label: "Apply" },
  ].filter((sec) => has[sec.id as keyof typeof has]);
  let n = 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: "Scholarship", path: "/scholarship" },
            { name: s.name, path: `/scholarship/${s.slug}` },
          ]),
        )}
      />
      <section aria-labelledby="page-title" className="relative overflow-hidden bg-navy-900 pt-[76px] text-paper">
        <div className="container-x pt-14 pb-16 md:pt-20 lg:pb-20">
          <nav aria-label="Breadcrumb" className="text-sm text-paper/70">
            <ol className="-my-3 flex flex-wrap items-center gap-2">
              <li>
                <Link href="/scholarship" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-paper">
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
              <h1 id="page-title" className="mt-6 animate-rise font-editorial text-h1 [animation-delay:80ms]">
                {s.name.replace(/ Scholarship$/, "")} <em className="text-gold-300">Scholarship</em>
              </h1>
            </div>
            <div className="lg:col-span-5 animate-rise [animation-delay:160ms]">
              <ol className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase" aria-label="The scholarship's arc">
                <li className="text-gold-300">Legacy</li>
                <li aria-hidden="true" className="h-px w-6 bg-gold-400/60" />
                <li className="text-paper/80">Opportunity</li>
                <li aria-hidden="true" className="h-px w-6 bg-gold-400/60" />
                <li className="text-paper/80">Future</li>
              </ol>
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
            <div className="frame-ticks">
              <VideoFeature video={s.video.full} priority sizes="(max-width: 1280px) 100vw, 1280px" />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-paper/70">
              <p>{s.video.full.title}</p>
              <div className="flex flex-wrap gap-2">
                <PendingNote tone="dark">Working cut: production timecode &amp; watermark visible · media clearance pending</PendingNote>
                {!s.video.full.captions ? <PendingNote tone="dark">Captions &amp; transcript pending</PendingNote> : null}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {sections.length > 1 ? (
      <nav aria-label="On this page" className="sticky top-[76px] z-30 border-b border-line bg-ivory/95 backdrop-blur">
        <ul className="no-scrollbar container-x flex gap-2 overflow-x-auto text-sm font-medium whitespace-nowrap sm:gap-4">
          {sections.map((sec) => (
            <li key={sec.id}>
              {/* 44px tap height (mobile parity) without changing the bar's look */}
              <a href={`#${sec.id}`} className="inline-flex min-h-11 items-center px-1.5 text-ink-2 transition-colors hover:text-gold-ink">
                {sec.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      ) : null}

      <div className="bg-ivory">
        {has.story ? (
        <DetailSection id="story" eyebrow="The story" title="Why this scholarship exists" index={++n}>
          {s.story ? <p className="text-lede">{s.story}</p> : <PendingBlock title="Scholarship story">The story behind the scholarship, in the words of those closest to it, will be shared here.</PendingBlock>}
        </DetailSection>
        ) : null}

        {has.legacy ? (
        <DetailSection id="legacy" eyebrow="Legacy" title={`Remembering ${s.honoree.name}`} index={++n}>
          {s.legacy ? (
            <p className="text-lede">{s.legacy}</p>
          ) : (
            <PendingBlock title="Legacy & biography">A tribute to {s.honoree.name}&rsquo;s life, leadership and influence is being prepared with those closest to him.</PendingBlock>
          )}
        </DetailSection>
        ) : null}

        {has.details ? (
        <DetailSection id="details" eyebrow="Scholarship details" title="Eligibility, award, and timeline" index={++n}>
          {s.facts.some((f) => f.value) ? (
          <dl className="grid border-t border-line-strong sm:grid-cols-2">
            {s.facts.filter((f) => f.value).map((f) => (
              <div key={f.label} className="border-b border-line py-5 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
                <dt className="eyebrow text-gold-ink">{f.label}</dt>
                <dd className="mt-2 font-serif text-2xl text-royal-700">{f.value}</dd>
              </div>
            ))}
          </dl>
          ) : (
            <PendingBlock title="Eligibility, award & timeline">
              Eligibility, the award, selection and the application window will be announced as the scholarship is established.
            </PendingBlock>
          )}
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
        ) : null}

        {has.recipients ? (
        <DetailSection id="recipients" eyebrow="Recipients & impact" title="Scholars" index={++n}>
          {s.recipients && s.recipients.length > 0 ? null : (
            <PendingBlock title="Scholarship recipients">Recipients and their stories will be featured here as scholarships are awarded.</PendingBlock>
          )}
        </DetailSection>
        ) : null}

        {has.apply ? (
        <DetailSection id="apply" eyebrow="Apply" title="Applications" index={++n}>
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
        ) : (
          /* Until the scholarship is open, the page closes with the two truthful next steps. */
          <section aria-label="Support and more scholarships" className="py-14 md:py-20">
            <div className="container-x flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <ButtonLink href="/get-involved#support" variant="outline" arrow>
                Support this scholarship
              </ButtonLink>
              <TextLink href="/scholarship">All scholarships</TextLink>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function DetailSection({
  id,
  eyebrow,
  title,
  index,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative border-b border-line py-16 md:py-24">
      <div className="container-x grid gap-8 lg:grid-cols-12">
        <div className="relative lg:col-span-4" data-reveal>
          <OutlineNumeral tone="gold" className="mb-4 text-[4.5rem]">{String(index).padStart(2, "0")}</OutlineNumeral>
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
