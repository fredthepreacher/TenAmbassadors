import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Typographic wordmark — stand-in until the official logo files are supplied.
 * George: "blue or white logo" — royal blue on light surfaces, white on dark (champagne only in Starlight).
 * Replace the inner markup with the logo SVG when brand files arrive.
 */
export function Wordmark({ tone = "dark", className }: { tone?: "dark" | "light" | "night"; className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={cn("inline-flex items-baseline gap-2 whitespace-nowrap", className)}>
      <span
        className={cn(
          "font-serif text-[1.7rem] leading-none italic",
          tone === "dark" ? "text-royal-700" : tone === "night" ? "text-starlight" : "text-paper",
        )}
      >
        {site.wordmark.lead}
      </span>
      <span
        className={cn(
          "text-[0.8rem] font-semibold tracking-[0.28em] uppercase",
          tone === "dark" ? "text-royal-700" : tone === "night" ? "text-champagne" : "text-paper",
        )}
      >
        {site.wordmark.rest}
      </span>
    </Link>
  );
}
