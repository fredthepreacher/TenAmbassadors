import Image, { getImageProps } from "next/image";
import { preload } from "react-dom";
import Link from "next/link";
import type { HeroFilm as HeroFilmT, Link as LinkT, Media, SmsStage } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";
import { RingOfTen } from "@/components/ui/Motifs";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { HeroFilm } from "./HeroFilm";

/**
 * Hero — people + possibility + leadership in the first seconds.
 * Choreography (~1.2s, CSS only): photo resolves → identifier → headline →
 * SMS line → CTAs → scroll cue. Everything is readable immediately with
 * motion disabled, and text starts faintly visible so LCP is not delayed.
 */
const HERO_SIZES = "(max-width: 1023px) 100vw, 51vw";

export function Hero({
  eyebrow,
  headline,
  lede,
  image,
  film,
  primary,
  secondary,
  stages,
}: {
  eyebrow: string;
  headline: string[];
  lede: string;
  image: Media;
  /** Optional silent hero film. `null` keeps the photograph as the hero. */
  film?: HeroFilmT | null;
  primary: LinkT;
  secondary: LinkT;
  stages: SmsStage[];
}) {
  const variants = film?.variants ?? [];
  const posters = variants.map((v) => {
    const { props } = getImageProps({ src: v.poster.src, alt: v.poster.alt, width: v.poster.width, height: v.poster.height, sizes: HERO_SIZES, quality: 78, loading: "eager" });
    return { media: v.media, srcSet: props.srcSet, sizes: props.sizes, width: props.width, height: props.height, img: props };
  });
  // One high-priority preload per distinct still, scoped to exactly the breakpoints that show it
  // (queries are mutually exclusive), so each device fetches only its own still — and stills shared by
  // two breakpoints (portrait tablet + desktop) keep a single, combined preload.
  const byStill = new Map<string, (typeof posters)[number] & { queries: string[] }>();
  for (const p of posters) {
    const key = p.img.src;
    const hit = byStill.get(key);
    if (hit) hit.queries.push(p.media);
    else byStill.set(key, { ...p, queries: [p.media] });
  }
  for (const p of byStill.values()) {
    preload(p.img.src, { as: "image", imageSrcSet: p.srcSet, imageSizes: p.sizes, media: p.queries.join(", "), fetchPriority: "high" });
  }
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-navy-900 text-paper">
      {/* Depth: royal light from upper left + the ring-of-ten mark behind the copy. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_20%,rgb(35_88_192/0.55),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="hero-grid relative pt-[76px]">
        <div className="hero-media relative">
          <div className="absolute inset-0 overflow-hidden lg:top-4">
            {variants.length ? (
              /* Art-directed poster: each breakpoint gets the first frame of its own film cut. */
              <picture>
                {posters.slice(0, -1).map((p) => (
                  <source key={p.media} media={p.media} srcSet={p.srcSet} sizes={p.sizes} width={p.width} height={p.height} />
                ))}
                <img
                  {...posters[posters.length - 1].img}
                  alt={variants[variants.length - 1].poster.alt}
                  fetchPriority="high"
                  className="hero-poster absolute inset-0 h-full w-full object-cover animate-settle"
                />
              </picture>
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload
                fetchPriority="high"
                sizes={HERO_SIZES}
                className="object-cover animate-settle"
                style={{ objectPosition: image.focus }}
              />
            )}
            {film ? <HeroFilm film={film} /> : null}
            {/* Readability: a navy base ramp under the copy on phones/tablets; on desktop a narrow seam into the
                copy column and a soft horizon into the pathway strip. Faces sit above both by composition. */}
            <div
              className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-navy-900)_0%,rgb(8_27_51/0.9)_20%,rgb(8_27_51/0.45)_36%,rgb(8_27_51/0)_52%)] lg:bg-[linear-gradient(90deg,var(--color-navy-900)_0%,rgb(8_27_51/0.5)_4%,rgb(8_27_51/0)_11%),linear-gradient(0deg,rgb(8_27_51/0.85)_0%,rgb(8_27_51/0.35)_6%,rgb(8_27_51/0)_15%)]"
              aria-hidden="true"
            />
            {/* On phones the copy overlaps the photo's lower edge, so the label sits above it. */}
            <PhotoCredit src={image.src} className="photo-credit--hero" />
          </div>
          <span className="pointer-events-none absolute top-4 bottom-0 left-0 hidden w-px bg-gradient-to-b from-gold-400/0 via-gold-400/70 to-gold-400/0 lg:block" aria-hidden="true" />
        </div>

        <div className="hero-copy relative z-10 -mt-20 pl-container pr-5 pb-12 sm:-mt-28 sm:pr-10 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:py-10 lg:pr-8 xl:py-16 xl:pr-14">
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
            <ButtonLink href={primary.href} variant="glass" arrow>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="outline-light">
              {secondary.label}
            </ButtonLink>
          </div>
          <a
            href="#purpose"
            className="mt-12 hidden w-fit items-center gap-3 text-xs font-semibold tracking-[0.18em] text-paper/60 uppercase transition-colors hover:text-paper xl:inline-flex"
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
                className="group flex h-full flex-col gap-1 py-5 pr-3 pl-3 transition-colors hover:bg-green-500/15 sm:flex-row sm:items-baseline sm:gap-4 sm:py-6 sm:pl-6 first:pl-0 sm:first:pl-0"
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
