import Link from "next/link";
import type { EcosystemRole } from "@/lib/types";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * Why "Ten"? — gives the Ring of Ten real meaning: ten founding Ambassadors
 * (gold nodes) connected outward to a much larger community (faint network).
 * The diagram is decorative; the text and the ecosystem list carry meaning.
 */
function TenNetwork() {
  const C = 200;
  const inner = Array.from({ length: 10 }, (_, i) => {
    const a = ((i * 36 - 90) * Math.PI) / 180;
    return { x: C + 92 * Math.cos(a), y: C + 92 * Math.sin(a), a };
  });
  // Outer network: three loose rings of smaller nodes.
  const outer: { x: number; y: number; r: number; from: number }[] = [];
  [150, 178].forEach((radius, ring) => {
    const n = ring === 0 ? 20 : 30;
    for (let k = 0; k < n; k++) {
      const a = ((k * (360 / n) - 90 + ring * 6) * Math.PI) / 180;
      outer.push({ x: C + radius * Math.cos(a), y: C + radius * Math.sin(a), r: ring === 0 ? 2.4 : 1.8, from: Math.round((k / n) * 10) % 10 });
    }
  });
  return (
    <svg viewBox="0 0 400 400" className="ten-network h-auto w-full" aria-hidden="true">
      <circle cx={C} cy={C} r={178} fill="none" stroke="rgb(255 255 255 / 0.07)" />
      <circle cx={C} cy={C} r={150} fill="none" stroke="rgb(255 255 255 / 0.1)" />
      {/* Ten → network connections */}
      {outer.map((o, i) => {
        const f = inner[o.from];
        return <line key={`l${i}`} className="net-line" x1={f.x} y1={f.y} x2={o.x} y2={o.y} stroke="rgb(156 182 234 / 0.28)" strokeWidth="0.7" />;
      })}
      {outer.map((o, i) => (
        <circle key={`o${i}`} cx={o.x} cy={o.y} r={o.r} fill="rgb(198 213 243 / 0.7)" />
      ))}
      {/* The ten, joined */}
      <polygon points={inner.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="var(--color-gold-400)" strokeOpacity="0.55" strokeWidth="1" />
      {inner.map((p, i) => (
        <circle key={`i${i}`} cx={p.x} cy={p.y} r={6} fill="var(--color-gold-400)" stroke="var(--color-navy-900)" strokeWidth="2" />
      ))}
      <text x={C} y={C + 16} textAnchor="middle" className="fill-paper font-sans text-[52px] font-semibold tracking-[-0.05em]">
        10
      </text>
    </svg>
  );
}

export function WhyTen({
  eyebrow,
  title,
  body,
  notTitle,
  qualities,
  note,
  ecosystem,
}: {
  eyebrow: string;
  title: string;
  body: string;
  notTitle: string;
  qualities: string[];
  note: string;
  /** Omit on pages that already present the full ecosystem (e.g. /about). */
  ecosystem?: EcosystemRole[];
}) {
  const [a, b] = title.split(". ");
  return (
    <section id="why-ten" aria-labelledby="why-ten-title" className="section-y relative overflow-hidden bg-navy-900 text-paper">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_75%_40%,rgb(35_88_192/0.35),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow rule-before text-gold-300">{eyebrow}</p>
          <h2 id="why-ten-title" className="mt-5 text-h2">
            {a}. <em className="block text-gold-300">{b}</em>
          </h2>
          <p className="mt-6 max-w-xl text-lede text-paper/80">{body}</p>
          <p className="mt-8 font-serif text-2xl text-paper">{notTitle}</p>
          <p className="mt-2 text-paper/75">They should embody:</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Qualities every Ambassador should embody">
            {qualities.map((q) => (
              <li key={q} className="rounded-full border border-gold-400/40 px-3.5 py-1.5 text-sm font-medium text-gold-200">
                {q}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-paper/70">{note}</p>
        </div>

        <div className="mx-auto w-full max-w-[250px] sm:max-w-[380px] lg:col-span-6 lg:max-w-[460px]" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <TenNetwork />
        </div>
      </div>

      {/* Founding ecosystem — concise editorial list; details live on internal pages. */}
      {ecosystem?.length ? (
      <div className="container-x relative mt-12 border-t border-paper/15 pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="eyebrow text-gold-300">The founding ecosystem</h3>
          <Link href="/about#ecosystem" className="link-reward text-sm text-paper">
            How it fits together
            <ArrowIcon className="link-arrow" />
          </Link>
        </div>
        <ol className="mt-5 grid grid-cols-2 gap-x-5 sm:gap-x-8 lg:grid-cols-4">
          {ecosystem.map((r, i) => (
            <li key={r.id} className="border-b border-paper/10 py-3.5 sm:py-4" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 4) * 60}ms` }}>
              <p className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-xs font-semibold tracking-[0.14em] text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.95rem] leading-snug font-semibold tracking-[-0.01em] sm:text-base">{r.title}</span>
              </p>
              <p className="mt-1 hidden pl-8 text-sm text-paper/70 sm:block">{r.summary}</p>
            </li>
          ))}
        </ol>
      </div>
      ) : null}
    </section>
  );
}
