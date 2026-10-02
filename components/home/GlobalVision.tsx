import { RingOfTen } from "@/components/ui/Motifs";

/**
 * Global vision — immersive navy. Framed explicitly as aspiration.
 * The meridian graphic is abstract and deliberately carries no locations.
 */
export function GlobalVision({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  const [a, b] = title.split(" of ");
  return (
    <section aria-labelledby="vision-title" className="section-y relative overflow-hidden bg-navy-900 text-paper">
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
      <RingOfTen className="pointer-events-none absolute top-1/2 right-[6%] hidden w-[34vw] max-w-[520px] -translate-y-1/2 lg:block" strokeOpacity={0.4} highlight={3} />

      <div className="container-x relative">
        <div className="max-w-3xl" data-reveal>
          <p className="eyebrow rule-before text-gold-300">{eyebrow}</p>
          <h2 id="vision-title" className="mt-5 text-h1">
            {b ? (
              <>
                {a} of <em className="text-gold-300">{b}</em>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="mt-8 max-w-2xl text-lede text-paper/80">{body}</p>
          {/* Geo point 4: the foundation-year disclaimer is removed. A gold rule closes the thought instead. */}
          <span className="mt-12 block h-px w-24 origin-left bg-gold-400" data-reveal="rule" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
