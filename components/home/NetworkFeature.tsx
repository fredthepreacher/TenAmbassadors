import { NetworkConstellation } from "@/components/ui/NetworkConstellation";
import { ButtonLink, TextLink } from "@/components/ui/Button";

/**
 * "One Community. Many Networks." George's point 3: the section image is abstract network
 * artwork (no people). The network-of-networks idea follows. No organization is presented as a
 * partner until confirmed. (The Upmixer community recap film now lives on /network-partners;
 * its footage opens the homepage hero.)
 */
export function NetworkFeature({
  eyebrow,
  title,
  lede,
  body,
  types,
  note,
}: {
  eyebrow: string;
  title: string[];
  lede: string;
  body: string;
  types: string[];
  note: string;
}) {
  return (
    <section id="network" aria-labelledby="network-title" className="relative bg-ivory">
      <figure className="group relative">
        <div className="photo relative aspect-[16/10] bg-navy-900 sm:aspect-[16/7] lg:aspect-[21/7]" data-reveal="image">
          <NetworkConstellation className="drift absolute inset-0 h-full w-full" />
          {/* Base gradient for the title overlap. */}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(8_27_51/0.92)_0%,rgb(8_27_51/0.45)_28%,rgb(8_27_51/0)_55%)]" aria-hidden="true" />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-x pb-7 text-paper sm:pb-10" data-reveal>
            <p className="eyebrow text-gold-300">{eyebrow}</p>
            <h2 id="network-title" className="mt-3 text-h1">
              {title[0]} <em className="text-gold-300">{title[1]}</em>
            </h2>
          </div>
        </div>
      </figure>

      <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6" data-reveal>
          <p className="font-serif text-h3 text-royal-700 italic">{lede}</p>
          <p className="mt-5 text-lede text-ink-2">{body}</p>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="/network-partners#apply" arrow>
              Become a Network Partner
            </ButtonLink>
            <TextLink href="/network-partners">How it works</TextLink>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8" data-reveal>
          <h3 className="eyebrow text-gold-ink">Networks we hope to connect</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {types.map((t) => (
              <li key={t} className="rounded-full border border-line-strong bg-paper px-3.5 py-1.5 text-sm text-ink-2">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-md text-[0.95rem] text-muted">{note}</p>
        </div>
      </div>
    </section>
  );
}
