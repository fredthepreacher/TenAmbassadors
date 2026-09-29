import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Action } from "@/lib/types";
import { ArrowIcon } from "./Icons";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "light" | "night";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-editorial)] hover:-translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-evergreen-900 text-paper hover:bg-evergreen-800",
  gold: "bg-gold-400 text-evergreen-950 hover:bg-gold-300",
  outline: "border border-line-strong text-evergreen-900 hover:border-evergreen-900",
  "outline-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper/5",
  light: "bg-paper text-evergreen-900 hover:bg-ivory",
  night: "border border-starlight/50 text-champagne hover:border-starlight hover:bg-starlight/10",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  const external = /^https?:\/\//.test(href);
  const inner = (
    <>
      <span>{children}</span>
      {arrow ? <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" /> : null}
    </>
  );
  const cls = cn(base, variants[variant], className);
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Understated text link with an animated arrow. */
export function TextLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light" | "night";
  className?: string;
}) {
  const tones = {
    dark: "text-evergreen-900 decoration-evergreen-900/30 hover:decoration-evergreen-900",
    light: "text-paper decoration-paper/35 hover:decoration-paper",
    night: "text-champagne decoration-starlight/40 hover:decoration-starlight",
  };
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-semibold underline decoration-1 underline-offset-[6px] transition-colors",
        tones[tone],
        className,
      )}
    >
      <span>{children}</span>
      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/**
 * Renders an Action. When the destination isn't live yet (e.g. applications
 * not open), shows a clearly disabled control with an explanatory note.
 */
export function ActionButton({
  action,
  variant = "primary",
  noteTone = "dark",
  arrow = true,
}: {
  action: Action;
  variant?: Variant;
  noteTone?: "dark" | "light" | "night";
  arrow?: boolean;
}) {
  if (action.available) {
    return (
      <ButtonLink href={action.href} variant={variant} arrow={arrow}>
        {action.label}
      </ButtonLink>
    );
  }
  const tones = { dark: "text-muted", light: "text-paper/70", night: "text-champagne/70" };
  return (
    <span className="inline-flex flex-col gap-2">
      <span
        className={cn(
          base,
          "cursor-not-allowed border border-dashed hover:translate-y-0",
          noteTone === "dark" ? "border-line-strong text-muted" : noteTone === "night" ? "border-starlight/40 text-champagne/70" : "border-paper/40 text-paper/70",
        )}
      >
        {action.label} — coming soon
      </span>
      {action.pendingNote ? <span className={cn("max-w-xs text-sm", tones[noteTone])}>{action.pendingNote}</span> : null}
    </span>
  );
}
