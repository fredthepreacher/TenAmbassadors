import Image from "next/image";
import Link from "next/link";
import type { Link as LinkT, Media, SmsStage } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";
import { RingOfTen } from "@/components/ui/Motifs";

/**
 * Hero — people + possibility + leadership in the first seconds.
 * Choreography (~1.2s, CSS only): photo resolves → identifier → headline →
 * SMS line → CTAs → scroll cue. Everything is readable immediately with
 * motion disabled, and text starts faintly visible so LCP is not delayed.
 */
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
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-navy-900 text-paper">
      {/* Depth: royal light from upper left + the ring-of-ten mark behind the copy. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_20%,rgb(35_88_192/0.55),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="hero-grid relative pt-[76px]">
        <div className="hero-media relative aspect-[4/4.4] sm:aspect-[16/11] lg:aspect-auto lg:min-h-full">
          <div className="absolute inset-0 overflow-hidden lg:top-4">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 51vw"
              className="object-cover animate-settle"
              style={{ objectPosition: image.focus }}
            />
            {/* Blue seam and base: controlled gradients at the edges only — faces stay natural. */}
            <div
              className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-navy-900)_0%,rgb(8_27_51/0)_32%)] lg:bg-[linear-gradient(90deg,var(--color-navy-900)_0%,rgb(8_27_51/0.55)_9%,rgb(8_27_51/0)_24%),linear-gradient(0deg,rgb(8_27_51/0.55)_0%,rgb(8_27_51/0)_22%)]"
              aria-hidden="true"
            />
          </div>
          <span className="pointer-events-none absolute top-4 bottom-0 left-0 hidden w-px bg-gradient-to-b from-gold-400/0 via-gold-400/70 to-gold-400/0 lg:block" aria-hidden="true" />
        </div>

        <div className="hero-copy relative z-10 -mt-20 pl-container pr-5 pb-12 sm:-mt-28 sm:pr-10 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:py-16 lg:pr-14">
          <p className="eyebrow animate-rise text-[0.7rem] tracking-[0.14em] text-gold-300 [animation-delay:120ms] sm:text-eyebrow sm:tracking-[0.18em]">
            <RingOfTen className="size-5" strokeOpacity={0.6} highlight={0} />
            {eyebrow}
          </p>
          <h1 id="hero-title" className="mt-6 text-[clamp(2.2rem,0.4rem+4.6vw,3.25rem)] leading-[1.0] lg:text-[min(3.1rem,calc(4.15vw-8px))]">
            {headline.map((line, i) =>
              i === headline.length - 1 ? (
                <em key={line} className="block animate-rise pb-1 text-gold-300" style={{ animationDelay: `${200 + i * 90}ms` }}>
                  {line}
                </em>
              ) : (
                <span key={line} className="block animate-rise" style={{ animationDelay: `${200 + i * 90}ms` }}>
                  {line}
                </span>
              ),
            )}
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-lede text-paper/80 [animation-delay:480ms]">{lede}</p>
          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:580ms] sm:flex-row sm:flex-wrap">
            <ButtonLink href={primary.href} variant="gold" arrow>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="outline-light">
              {secondary.label}
            </ButtonLink>
          </div>
          <a
            href="#purpose"
            className="mt-12 hidden w-fit items-center gap-3 text-xs font-semibold tracking-[0.18em] text-paper/60 uppercase transition-colors hover:text-paper lg:inline-flex"
          >
            <span className="scroll-cue-line block h-10 w-px bg-gold-400" aria-hidden="true" />
            Begin the journey
          </a>
        </div>
      </div>

      {/* Pathway strip: the three stages and the return to the start. */}
      <nav aria-label="The SMS pathway" className="relative border-t border-paper/10 bg-navy-950">
        <ol className="container-x grid grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
          {stages.map((s, i) => (
            <li key={s.id} className={i > 0 ? "border-l border-paper/10" : ""}>
              <Link
                href={`/#${s.id}-stage`}
                className="group flex h-full flex-col gap-1 py-5 pr-3 pl-3 transition-colors hover:bg-royal-700/25 sm:flex-row sm:items-baseline sm:gap-4 sm:py-6 sm:pl-6 first:pl-0 sm:first:pl-0"
              >
                <span className="text-xs font-semibold tracking-[0.14em] text-gold-300">{s.index}</span>
                <span className="font-serif text-xl text-paper sm:text-2xl">{s.title}</span>
                <span className="hidden text-sm text-paper/60 transition-colors group-hover:text-paper/85 xl:inline">{s.line}</span>
              </Link>
            </li>
          ))}
          <li className="hidden items-center gap-3 border-l border-paper/10 pl-6 text-sm text-gold-300 lg:flex">
            <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
              <path d="M15.5 6.5A6.5 6.5 0 1 0 16.5 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M16 2.5v4.3h-4.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            New opportunity
          </li>
        </ol>
      </nav>
    </section>
  );
}
