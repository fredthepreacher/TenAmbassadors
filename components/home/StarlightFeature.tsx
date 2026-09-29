import type { Action } from "@/lib/types";
import { ActionButton } from "@/components/ui/Button";
import { StarIcon } from "@/components/ui/Icons";

/**
 * The Starlight Awards — "day becomes night".
 * The navy of the preceding chapter deepens into night; a few stars appear
 * and a gold horizon line widens as you scroll in (CSS scroll-driven, static
 * for reduced motion). The headline receives one slow pass of light.
 */
export function StarlightFeature({
  eyebrow,
  title,
  body,
  pillars,
  actions,
}: {
  eyebrow: string;
  title: string[];
  body: string;
  pillars: { title: string; body: string }[];
  actions: Action[];
}) {
  return (
    <section id="starlight" aria-labelledby="starlight-title" className="relative text-champagne">
      {/* Dusk: navy → night */}
      <div className="relative h-[34vh] min-h-56 overflow-hidden bg-gradient-to-b from-navy-900 via-night-800 to-night-950" aria-hidden="true">
        <div className="dusk-stars starfield absolute inset-0" />
        <div className="absolute inset-x-0 bottom-10 flex justify-center">
          <span className="dusk-horizon block h-px w-[min(70vw,760px)] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>
      </div>

      <div className="relative overflow-hidden bg-night-950 pb-[clamp(5rem,3rem+8vw,9.5rem)]">
        <div className="starfield starfield-twinkle pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_32%_at_50%_20%,rgb(233_205_134/0.13),transparent_72%)]"
          aria-hidden="true"
        />

        <div className="container-x relative pt-4 text-center">
          <div data-reveal>
            <StarIcon className="mx-auto size-9 text-starlight drop-shadow-[0_0_20px_rgb(233_205_134/0.6)]" />
            <p className="eyebrow mt-8 text-starlight">{eyebrow}</p>
            <h2 id="starlight-title" className="mx-auto mt-6 max-w-4xl font-editorial text-display">
              <span className="luminous-text block">{title[0]}</span>
              <em className="block text-champagne">{title[1]}</em>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lede text-champagne/80">{body}</p>
          </div>

          <ul className="mx-auto mt-16 grid max-w-5xl border-y border-starlight/20 text-left sm:grid-cols-3">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                className="border-starlight/15 px-2 py-8 sm:px-8 sm:not-first:border-l"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-starlight/80">0{i + 1}</p>
                <h3 className="mt-2 text-2xl text-starlight">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] text-champagne/75">{p.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:items-start" data-reveal>
            {actions.map((a, i) => (
              <ActionButton key={a.label} action={a} variant={i === 0 ? "gold" : "night"} noteTone="night" arrow={i === 0} />
            ))}
          </div>
        </div>
      </div>

      {/* Dawn: night → warm white, returning to the brand world */}
      <div className="h-24 bg-gradient-to-b from-night-950 via-navy-800 to-ivory md:h-32" aria-hidden="true" />
    </section>
  );
}
