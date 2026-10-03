import type { ImpactMeasure } from "@/lib/types";

/** Building our first year of impact — the measures we commit to, not numbers we do not have yet. */
export function ImpactFeature({ eyebrow, title, intro, measures }: { eyebrow: string; title: string; intro: string; measures: ImpactMeasure[] }) {
  return (
    <section id="impact" aria-labelledby="impact-title" className="section-y bg-ivory">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
          <h2 id="impact-title" className="mt-5 text-h2 text-navy-900">
            {title.split(" first ")[0]} <em className="text-royal-700">first {title.split(" first ")[1]}</em>
          </h2>
          <p className="mt-6 text-lede text-ink-2">{intro}</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="eyebrow text-gold-ink">What we will measure</h3>
          <dl className="mt-4 grid grid-cols-2 content-start gap-x-5 sm:gap-x-8">
            {measures.map((m, i) => (
              <div key={m.id} className="border-t border-line-strong py-4" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 70}ms` }}>
                <dt className="text-base leading-snug font-semibold tracking-[-0.015em] text-navy-900 sm:text-lg">{m.label}</dt>
                <dd className="mt-1 text-sm text-ink-2">{m.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
