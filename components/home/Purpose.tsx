import { RingOfTen } from "@/components/ui/Motifs";
import { PendingNote } from "@/components/ui/Pending";

export function Purpose({
  eyebrow,
  statement,
  origin,
  themes,
}: {
  eyebrow: string;
  statement: string;
  origin: string;
  themes: string[];
}) {
  // Emphasize the pivot of the statement ("Access is not.") without extra markup in content.
  const [first, second, ...rest] = statement.split(". ");
  return (
    <section id="purpose" aria-labelledby="purpose-title" className="section-y relative overflow-hidden bg-ivory">
      <RingOfTen tone="royal" className="absolute -top-[18%] -right-[22%] w-[56vw] max-w-[720px]" strokeOpacity={0.14} highlight={2} />
      <div className="container-x relative grid gap-12 lg:grid-cols-12">
        <p className="eyebrow rule-before text-gold-ink lg:col-span-3 lg:pt-4" data-reveal>
          {eyebrow}
        </p>
        <div className="lg:col-span-9">
          <h2 id="purpose-title" className="text-display text-navy-900" data-reveal>
            {first}. <em className="block text-royal-700">{second}.</em>
          </h2>
          <p className="mt-8 max-w-3xl text-[clamp(1.35rem,1.1rem+1vw,1.9rem)] leading-snug tracking-[-0.015em] text-ink-2" data-reveal>
            {rest.join(". ")}
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            <div data-reveal>
              <span className="block h-px w-16 bg-gold-500" data-reveal="rule" aria-hidden="true" />
              <p className="mt-6 text-lede text-ink-2">{origin}</p>
              <PendingNote className="mt-6">Proposed mission &amp; headlines · final approval pending</PendingNote>
            </div>
            <ul className="grid gap-0 border-t border-line">
              {themes.map((t, i) => (
                <li
                  key={t}
                  className="group flex items-baseline gap-4 border-b border-line py-4 font-serif text-2xl text-navy-900 transition-colors hover:text-royal-700"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <span className="font-sans text-xs font-semibold tracking-[0.14em] text-gold-ink">0{i + 1}</span>
                  {t}
                  <span className="ml-auto h-px w-0 self-center bg-gold-500 transition-all duration-500 group-hover:w-10" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
