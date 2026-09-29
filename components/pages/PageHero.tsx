import Image from "next/image";
import type { ReactNode } from "react";
import type { Media } from "@/lib/types";
import { cn } from "@/lib/cn";

type Tone = "light" | "evergreen" | "night";

/** Shared internal-page hero: editorial title block with an optional photo panel. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  tone = "light",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: Media;
  tone?: Tone;
  children?: ReactNode;
}) {
  const bg = { light: "bg-ivory text-ink", evergreen: "bg-evergreen-950 text-paper", night: "bg-night-950 text-champagne" }[tone];
  const eyebrowTone = { light: "text-gold-ink", evergreen: "text-gold-300", night: "text-starlight" }[tone];
  const introTone = { light: "text-ink-2", evergreen: "text-paper/80", night: "text-champagne/80" }[tone];

  return (
    <section aria-labelledby="page-title" className={cn("relative overflow-hidden pt-[76px]", bg)}>
      <div className={cn("container-x grid gap-10 pt-14 pb-16 md:pt-20 lg:pb-24", image ? "lg:grid-cols-12 lg:items-end" : "")}>
        <div className={image ? "lg:col-span-6" : "max-w-4xl"}>
          <p className={cn("eyebrow rule-before animate-rise", eyebrowTone)}>{eyebrow}</p>
          <h1 id="page-title" className="mt-6 text-h1 animate-rise [animation-delay:80ms]">
            {title}
          </h1>
          {intro ? <p className={cn("mt-7 max-w-2xl text-lede animate-rise [animation-delay:160ms]", introTone)}>{intro}</p> : null}
          {children ? <div className="mt-9 animate-rise [animation-delay:240ms]">{children}</div> : null}
        </div>
        {image ? (
          <div className="relative aspect-[4/3] overflow-hidden bg-stone lg:col-span-6 lg:aspect-[5/4]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover animate-settle"
              style={{ objectPosition: image.focus }}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
