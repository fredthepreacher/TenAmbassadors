import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "light" | "dark" | "night";

const eyebrowTone: Record<Tone, string> = {
  light: "text-gold-ink",
  dark: "text-gold-300",
  night: "text-starlight",
};

const introTone: Record<Tone, string> = {
  light: "text-muted",
  dark: "text-paper/75",
  night: "text-champagne/75",
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  tone = "light",
  as: Tag = "h2",
  className,
  titleClassName,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: Tone;
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)} data-reveal>
      <p className={cn("eyebrow rule-before", eyebrowTone[tone])}>{eyebrow}</p>
      <Tag id={id} className={cn("mt-5", Tag === "h1" ? "text-h1" : "text-h2", titleClassName)}>
        {title}
      </Tag>
      {intro ? <p className={cn("mt-6 max-w-2xl text-lede", introTone[tone])}>{intro}</p> : null}
    </header>
  );
}
