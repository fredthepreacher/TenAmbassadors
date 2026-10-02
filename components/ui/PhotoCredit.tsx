import { creditFor } from "@/content/attributions";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Source / context label for a photograph (Geo revision point 1).
 * Place inside a positioned photo frame. It reads from content/attributions.ts,
 * so labels are never hardcoded per component.
 *
 * - Confirmed: a small, semi-transparent editorial label in the bottom-right corner.
 * - Pending: nothing publicly. Reviewers (site.showPlaceholderNotes) see a dashed "Source pending" tag.
 */
export function PhotoCredit({ src, className }: { src: string; className?: string }) {
  const credit = creditFor(src);
  if (!credit) return null;
  const corner = credit.corner === "bl" ? "photo-credit--bl" : "";

  if (credit.status === "confirmed" && credit.label) {
    return (
      <small className={cn("photo-credit", corner, className)}>
        <span className="sr-only">Photo source: </span>
        {credit.label}
      </small>
    );
  }
  if (!site.showPlaceholderNotes) return null;
  return (
    <small className={cn("photo-credit photo-credit--pending", corner, className)}>
      <span className="sr-only">Pending content: </span>Source pending
    </small>
  );
}

/** Plain-text label for captions (e.g. a lightbox), or null when not confirmed. */
export function creditText(src: string): string | null {
  const c = creditFor(src);
  return c?.status === "confirmed" ? c.label : null;
}
