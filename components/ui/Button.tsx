import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import type { Action } from "@/lib/types";
import { ArrowIcon } from "./Icons";

/**
 * Button variants map to the interaction language in globals.css (.btn-*):
 * tactile 1px lift, controlled fill, arrow travel and a single light sweep.
 * Gold is the interaction colour (Geo, 2026-10-05; it replaced George's green, which is retired, so do not
 * bring green back): `primary` is solid gold on light surfaces, `glass` is translucent gold on blue/navy,
 * `light` is the white button on royal, `outline` / `outline-light` are the secondary actions, and
 * `gold` / `night` keep the Starlight Awards' evening palette.
 */
export type ButtonVariant = "primary" | "glass" | "gold" | "outline" | "outline-light" | "light" | "night";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
}) {
  const external = /^https?:\/\//.test(href);
  const inner = (
    <>
      <span>{children}</span>
      {arrow ? <ArrowIcon className="btn-arrow" /> : null}
    </>
  );
  const cls = cn("btn", `btn-${variant}`, className);
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

/** Understated text link: a gold underline extends and the arrow travels on hover (gold-ink text on light). */
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
  const tones = { dark: "text-gold-ink", light: "text-paper", night: "text-champagne" };
  return (
    <Link href={href} className={cn("link-reward", tones[tone], className)}>
      <span>{children}</span>
      <ArrowIcon className="link-arrow" />
    </Link>
  );
}

/**
 * Renders an Action. When the destination isn't live yet (e.g. applications
 * not open), shows a clearly labelled, non-interactive state with a note —
 * never a dead link.
 */
export function ActionButton({
  action,
  variant = "primary",
  noteTone = "dark",
  arrow = true,
}: {
  action: Action;
  variant?: ButtonVariant;
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
  // Geo meeting revision: a call to action that is not open yet is not shown to visitors.
  // Reviewers (NEXT_PUBLIC_SHOW_REVIEW_NOTES=1) still see the disabled chip and its note.
  if (!site.showPlaceholderNotes) return null;
  const tones = { dark: "text-muted", light: "text-paper/75", night: "text-champagne/75" };
  const border = {
    dark: "border-line-strong text-muted",
    light: "border-paper/40 text-paper/80",
    night: "border-starlight/40 text-champagne/80",
  };
  return (
    <span className="inline-flex flex-col gap-2">
      <span
        className={cn(
          "inline-flex min-h-12 cursor-default items-center justify-center gap-2 rounded-full border px-6 text-[0.95rem] font-semibold whitespace-nowrap",
          border[noteTone],
        )}
      >
        {action.unavailableLabel ?? `${action.label} · not yet open`}
      </span>
      {action.pendingNote ? <span className={cn("max-w-xs text-sm", tones[noteTone])}>{action.pendingNote}</span> : null}
    </span>
  );
}
