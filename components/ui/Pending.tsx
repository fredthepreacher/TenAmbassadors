import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type Tone = "light" | "dark" | "night";

const chip: Record<Tone, string> = {
  light: "border-gold-ink/45 bg-gold-400/10 text-gold-ink",
  dark: "border-gold-300/45 bg-gold-300/10 text-gold-300",
  night: "border-starlight/45 bg-starlight/10 text-starlight",
};

/**
 * Inline marker for content still pending from the client.
 * Hidden when site.showPlaceholderNotes is false.
 */
export function PendingNote({ children, tone = "light", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  if (!site.showPlaceholderNotes) return null;
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-dashed px-3 py-1 text-[0.78rem] font-medium leading-snug",
        chip[tone],
        className,
      )}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
      <span className="sr-only">Pending content: </span>
      {children}
    </p>
  );
}

const box: Record<Tone, string> = {
  light: "border-line-strong bg-paper/60 text-ink-2",
  dark: "border-paper/25 bg-paper/[0.04] text-paper/85",
  night: "border-starlight/30 bg-night-800/40 text-champagne/85",
};

/** A labelled placeholder block for a whole piece of pending content. */
export function PendingBlock({
  title,
  children,
  tone = "light",
  className,
}: {
  title: string;
  children?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-dashed p-6 md:p-8", box[tone], className)}>
      <p className="font-serif text-h3/tight">{title}</p>
      {children ? <div className="mt-3 max-w-prose text-[0.95rem] opacity-90">{children}</div> : null}
      {site.showPlaceholderNotes ? (
        <p className="mt-4 text-xs font-semibold tracking-[0.14em] uppercase opacity-70">Placeholder · content pending</p>
      ) : null}
    </div>
  );
}
