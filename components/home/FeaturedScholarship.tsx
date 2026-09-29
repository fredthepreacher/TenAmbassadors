import type { Scholarship } from "@/lib/types";
import { ActionButton, ButtonLink, TextLink } from "@/components/ui/Button";
import { PendingNote } from "@/components/ui/Pending";
import { VideoFeature } from "@/components/ui/VideoFeature";

export function FeaturedScholarship({ scholarship }: { scholarship: Scholarship }) {
  const detailHref = `/scholarship/${scholarship.slug}`;
  return (
    <section id="featured-scholarship" aria-labelledby="featured-scholarship-title" className="section-y bg-evergreen-950 text-paper">
      <div className="container-x">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-8">
            <p className="eyebrow rule-before text-gold-300">Featured scholarship</p>
            <h2 id="featured-scholarship-title" className="mt-5 text-h2">
              {scholarship.name.replace(/^The /, "")}
            </h2>
          </div>
          <p className="font-serif text-xl text-paper/80 italic lg:col-span-4 lg:text-right">
            {scholarship.honoree.name}
            {scholarship.honoree.years ? <span className="not-italic text-gold-300"> · {scholarship.honoree.years}</span> : null}
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {scholarship.video ? (
            <div className="lg:col-span-8" data-reveal>
              <VideoFeature video={scholarship.video.featured} />
            </div>
          ) : null}

          <div className="flex flex-col gap-8 lg:col-span-4" data-reveal>
            <p className="text-lede text-paper/85">{scholarship.summary}</p>

            <dl className="grid border-t border-paper/15">
              {scholarship.facts.slice(0, 3).map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-paper/15 py-3 text-[0.95rem]">
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
