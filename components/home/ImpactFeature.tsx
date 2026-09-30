import type { ImpactMeasure } from "@/lib/types";

/** Building our first year of impact — measures, not numbers (no zero counters). */
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
          <p className="mt-6 inline-flex items-center gap-3 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-gold-200">
            <span className="size-2 rounded-full bg-gold-400" aria-hidden="true" />
            2026 · Foundation year
          </p>
        </div>
        <dl className="grid content-start gap-x-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {measures.map((m, i) => (
            <div key={m.id} className="group border-t border-line-strong py-5" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 70}ms` }}>
              <dt className="text-lg font-semibold tracking-[-0.015em] text-navy-900">{m.label}</dt>
              <dd className="mt-1 text-sm text-ink-2">{m.description}</dd>
              <dd className="mt-4 flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.14em] text-muted uppercase">
                <span className="block h-px w-8 bg-gold-500 transition-all duration-500 group-hover:w-14" aria-hidden="true" />
                To be reported
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
