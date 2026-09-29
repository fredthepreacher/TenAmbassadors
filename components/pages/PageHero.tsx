import Image from "next/image";
import type { ReactNode } from "react";
import type { Media } from "@/lib/types";
import { cn } from "@/lib/cn";
import { RingOfTen } from "@/components/ui/Motifs";

type Tone = "light" | "royal" | "navy" | "night";

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
  const bg = {
    light: "bg-ivory text-navy-900",
    royal: "bg-royal-700 text-paper",
    navy: "bg-navy-900 text-paper",
    night: "bg-night-950 text-champagne",
  }[tone];
  const eyebrowTone = { light: "text-gold-ink", royal: "text-gold-300", navy: "text-gold-300", night: "text-starlight" }[tone];
  const introTone = { light: "text-ink-2", royal: "text-paper/85", navy: "text-paper/80", night: "text-champagne/80" }[tone];

  return (
    <section aria-labelledby="page-title" className={cn("relative overflow-hidden pt-[76px]", bg)}>
      <RingOfTen
        tone={tone === "light" ? "royal" : "gold"}
        className="absolute -top-[20%] -right-[18%] w-[70vw] max-w-[820px]"
        strokeOpacity={tone === "light" ? 0.16 : 0.24}
      />
      <div className={cn("container-x relative grid gap-10 pt-14 pb-16 md:pt-20 lg:pb-24", image ? "lg:grid-cols-12 lg:items-end" : "")}>
        <div className={image ? "lg:col-span-6" : "max-w-4xl"}>
          <p className={cn("eyebrow rule-before animate-rise", eyebrowTone)}>{eyebrow}</p>
          <h1 id="page-title" className="mt-6 animate-rise text-h1 [animation-delay:80ms]">
            {title}
          </h1>
          {intro ? <p className={cn("mt-7 max-w-2xl animate-rise text-lede [animation-delay:160ms]", introTone)}>{intro}</p> : null}
          {children ? <div className="mt-9 animate-rise [animation-delay:240ms]">{children}</div> : null}
        </div>
        {image ? (
          <div className="photo relative aspect-[4/3] bg-stone lg:col-span-6 lg:aspect-[5/4]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="animate-settle object-cover"
              style={{ objectPosition: image.focus }}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
