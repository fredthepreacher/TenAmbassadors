/**
 * Global vision — framed explicitly as aspiration.
 * The meridian graphic is decorative and deliberately carries no locations.
 */
export function GlobalVision({ eyebrow, title, body, note }: { eyebrow: string; title: string; body: string; note: string }) {
  return (
    <section aria-labelledby="vision-title" className="section-y relative overflow-hidden bg-ivory">
      <svg
        viewBox="0 0 600 600"
        className="drift-slow pointer-events-none absolute top-1/2 right-[-18%] h-[130%] w-auto -translate-y-1/2 text-evergreen-800/15 sm:right-[-8%] lg:right-[-2%]"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
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

      <div className="container-x relative">
        <div className="max-w-3xl" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
          <h2 id="vision-title" className="mt-5 text-h1 text-evergreen-950">
            {title}
          </h2>
          <p className="mt-8 max-w-2xl text-lede text-ink-2">{body}</p>
          <p className="mt-8 max-w-xl border-l-2 border-gold-400 pl-4 text-sm text-muted italic">{note}</p>
        </div>
      </div>
    </section>
  );
}
