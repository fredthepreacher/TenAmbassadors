import type { Action } from "@/lib/types";
import { ActionButton } from "@/components/ui/Button";
import { StarIcon } from "@/components/ui/Icons";

/**
 * The Starlight Awards — a deliberate change of environment: the page
 * dims from ivory into night before the gala-like section begins.
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
      {/* Environment transition */}
      <div className="h-32 bg-gradient-to-b from-paper via-night-800 to-night-950 md:h-48" aria-hidden="true" />

      <div className="relative overflow-hidden bg-night-950 pb-[clamp(5rem,3rem+8vw,10rem)]">
        <div className="starfield starfield-twinkle pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_32%_at_50%_24%,rgb(232_201_133/0.14),transparent_72%)]" aria-hidden="true" />

        <div className="container-x relative pt-8 text-center">
          <div data-reveal>
            <StarIcon className="mx-auto size-10 text-starlight drop-shadow-[0_0_22px_rgb(232_201_133/0.7)]" />
            <p className="eyebrow mt-8 text-starlight">{eyebrow}</p>
            <h2 id="starlight-title" className="mx-auto mt-6 max-w-4xl text-display">
              <span className="luminous-text block">{title[0]}</span>
              <span className="block text-champagne italic">{title[1]}</span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lede text-champagne/80">{body}</p>
          </div>

          <ul className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden border-y border-starlight/20 text-left sm:grid-cols-3" data-reveal>
            {pillars.map((p) => (
              <li key={p.title} className="px-2 py-8 sm:px-8">
                <h3 className="font-serif text-2xl text-starlight">{p.title}</h3>
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
    </section>
  );
}
