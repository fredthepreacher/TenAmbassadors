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
  light: "border-line bg-paper/70 text-ink-2",
  dark: "border-paper/15 bg-paper/[0.05] text-paper/85",
  night: "border-starlight/20 bg-night-800/40 text-champagne/85",
};

const label: Record<Tone, string> = { light: "text-gold-ink", dark: "text-gold-300", night: "text-starlight" };

/**
 * Launch-stage card for content that is being established (honorees, sponsorship, volunteer roles…):
 * a title and one polished, truthful sentence. Since the Geo meeting revision (2026-10-04) the public
 * build shows no "In preparation" or "pending" label; reviewers (NEXT_PUBLIC_SHOW_REVIEW_NOTES=1)
 * still see one.
 */
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
    <div className={cn("rounded-2xl border p-6 md:p-8", box[tone], className)}>
      {site.showPlaceholderNotes ? (
        <p className={cn("mb-3 text-[0.7rem] font-semibold tracking-[0.18em] uppercase", label[tone])}>In preparation</p>
      ) : null}
      <p className="font-serif text-h3/tight">{title}</p>
      {children ? <div className="mt-3 max-w-prose text-[0.95rem] opacity-90">{children}</div> : null}
      {site.showPlaceholderNotes ? (
        <p className="mt-4 text-xs font-semibold tracking-[0.14em] uppercase opacity-70">Placeholder · content pending</p>
      ) : null}
    </div>
  );
}
