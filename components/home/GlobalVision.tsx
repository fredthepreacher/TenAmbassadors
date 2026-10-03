import { RingOfTen } from "@/components/ui/Motifs";

/**
 * Global vision — immersive navy. Framed explicitly as aspiration.
 * The meridian graphic is abstract and deliberately carries no locations.
 */
export function GlobalVision({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  const [a, b] = title.split(" of ");
  return (
    <section aria-labelledby="vision-title" className="relative overflow-hidden bg-navy-900 py-14 text-paper md:py-20">
      <svg
        viewBox="0 0 600 600"
        className="drift pointer-events-none absolute top-1/2 right-[-30%] h-[125%] w-auto -translate-y-1/2 text-royal-500/40 sm:right-[-12%] lg:right-[-4%]"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="300" cy="300" r="280" />
          {[60, 130, 200, 250].map((rx) => (
            <ellipse key={rx} cx="300" cy="300" rx={rx} ry="280" />
          ))}
          {[-200, -110, 0, 110, 200].map((dy) => {
            const r = Math.sqrt(280 * 280 - dy * dy);
            return <ellipse key={dy} cx="300" cy={300 + dy} rx={r} ry={r * 0.12} />;
          })}
        </g>
      </svg>
      <RingOfTen className="pointer-events-none absolute top-1/2 right-[3%] hidden w-[26vw] max-w-[420px] -translate-y-1/2 opacity-60 lg:block" strokeOpacity={0.4} highlight={3} />

      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12" data-reveal>
          <div className="lg:col-span-6">
          <p className="eyebrow rule-before text-gold-300">{eyebrow}</p>
          <h2 id="vision-title" className="mt-5 text-h2">
            {b ? (
              <>
                {a} of <em className="text-gold-300">{b}</em>
              </>
            ) : (
              title
            )}
          </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-2xl text-lede text-paper/80">{body}</p>
            {/* Geo point 4: the foundation-year disclaimer is removed. A gold rule closes the thought instead. */}
            <span className="mt-8 block h-px w-24 origin-left bg-gold-400" data-reveal="rule" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
