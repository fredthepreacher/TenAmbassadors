import Image from "next/image";
import Link from "next/link";
import type { Link as LinkT, Media, SmsStage } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";

export function Hero({
  eyebrow,
  headline,
  lede,
  image,
  primary,
  secondary,
  stages,
}: {
  eyebrow: string;
  headline: string[];
  lede: string;
  image: Media;
  primary: LinkT;
  secondary: LinkT;
  stages: SmsStage[];
}) {
  return (
    <section aria-labelledby="hero-title" className="relative bg-ivory">
      <div className="hero-grid pt-[76px]">
        <div className="hero-head pl-container pr-5 pt-8 sm:pr-10 lg:self-end lg:pt-16 lg:pr-14">
          <p className="eyebrow rule-before animate-rise text-gold-ink">{eyebrow}</p>
          <h1 id="hero-title" className="mt-6 text-display text-evergreen-950 [animation-delay:80ms] animate-rise">
            <span className="block">{headline[0]}</span>
            <span className="block text-evergreen-700 italic">{headline[1]}</span>
          </h1>
        </div>

        <div className="hero-media relative mt-8 aspect-[4/4.2] sm:aspect-[16/11] lg:mt-0 lg:aspect-auto lg:min-h-full">
          <div className="absolute inset-0 overflow-hidden lg:top-6">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover animate-settle"
              style={{ objectPosition: image.focus }}
            />
          </div>
          {/* Thin gold keyline marks the frame edge on desktop. */}
          <span className="pointer-events-none absolute top-6 bottom-0 -left-px hidden w-px bg-gold-400/60 lg:block" aria-hidden="true" />
        </div>

        <div className="hero-body pl-container pr-5 pt-8 pb-12 sm:pr-10 lg:pt-8 lg:pr-14 lg:pb-16">
          <p className="max-w-xl text-lede text-ink-2 animate-rise [animation-delay:160ms]">{lede}</p>
          <div className="mt-9 flex flex-col gap-3 animate-rise [animation-delay:240ms] sm:flex-row sm:flex-wrap">
            <ButtonLink href={primary.href} arrow>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="outline">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Pathway strip — the three pillars, and the cycle back to the start. */}
      <nav aria-label="The SMS pathway" className="border-y border-line bg-paper">
        <ol className="container-x grid grid-cols-3">
          {stages.map((s, i) => (
            <li key={s.id} className={i > 0 ? "border-l border-line" : ""}>
              <Link
                href={`/#${s.id}-stage`}
                className="group flex flex-col gap-1 py-5 pr-3 pl-3 transition-colors hover:bg-evergreen-50 sm:flex-row sm:items-baseline sm:gap-4 sm:py-6 sm:pl-6 first:pl-0"
              >
                <span className="text-xs font-semibold tracking-[0.14em] text-gold-ink">{s.index}</span>
                <span className="font-serif text-xl text-evergreen-900 sm:text-2xl">{s.title}</span>
                <span className="hidden text-sm text-muted xl:inline">{s.line}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
