import type { Scholarship } from "@/lib/types";
import { ActionButton, ButtonLink, TextLink } from "@/components/ui/Button";
import { PendingNote } from "@/components/ui/Pending";
import { VideoFeature } from "@/components/ui/VideoFeature";

const ARC = ["Legacy", "Opportunity", "Future"];

/** Scholarship chapter — where gold becomes meaningful. */
export function FeaturedScholarship({ scholarship }: { scholarship: Scholarship }) {
  const detailHref = `/scholarship/${scholarship.slug}`;
  const name = scholarship.name.replace(/^The /, "");
  return (
    <section
      id="featured-scholarship"
      aria-labelledby="featured-scholarship-title"
      className="section-y relative overflow-hidden bg-[linear-gradient(160deg,var(--color-royal-800)_0%,var(--color-navy-900)_70%)] text-paper"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_85%_10%,rgb(216_184_102/0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-8">
            <p className="eyebrow text-gold-300">
              <span className="inline-block h-px w-8 bg-gold-400" aria-hidden="true" />
              Featured scholarship
            </p>
            <h2 id="featured-scholarship-title" className="mt-6 font-editorial text-h1">
              {name.replace(/ Scholarship$/, "")} <em className="text-gold-300">Scholarship</em>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="font-serif text-xl text-paper/85 italic">{scholarship.honoree.name}</p>
            {scholarship.honoree.years ? <p className="mt-1 text-sm font-semibold tracking-[0.2em] text-gold-300">{scholarship.honoree.years}</p> : null}
          </div>
        </header>

        {/* Legacy → Opportunity → Future */}
        <ol className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-gold-400/25 py-4 text-sm font-semibold tracking-[0.18em] uppercase" aria-label="The scholarship's arc">
          {ARC.map((a, i) => (
            <li key={a} className="flex items-center gap-4" data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <span className={i === 0 ? "text-gold-300" : "text-paper/80"}>{a}</span>
              {i < ARC.length - 1 ? <span className="h-px w-8 bg-gold-400/60 sm:w-14" aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {scholarship.video ? (
            <div className="lg:col-span-8" data-reveal>
              <div className="frame-ticks">
                <VideoFeature video={scholarship.video.featured} />
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-paper/70">
                <p>Film · {scholarship.video.featured.durationLabel}</p>
                <PendingNote tone="dark">Working cut: shows production timecode and watermark · media clearance pending</PendingNote>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-8 lg:col-span-4" data-reveal>
            <p className="font-serif text-2xl leading-snug text-paper/90">{scholarship.summary}</p>

            <dl className="grid border-t border-gold-400/25">
              {scholarship.facts.slice(0, 3).map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-paper/10 py-3 text-[0.95rem]">
                  <dt className="text-paper/65">{f.label}</dt>
                  <dd className="text-right font-medium">{f.value ?? "To be announced"}</dd>
                </div>
              ))}
            </dl>
            <PendingNote tone="dark">Scholarship story, criteria and timeline pending</PendingNote>

            <div className="flex flex-col items-start gap-5">
              <ButtonLink href={`${detailHref}#details`} variant="gold" arrow>
                Scholarship details
              </ButtonLink>
              <TextLink href={detailHref} tone="light">
                Learn more about the scholarship
              </TextLink>
              <ActionButton action={scholarship.apply} noteTone="light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
