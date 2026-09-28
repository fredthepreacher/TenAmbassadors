import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./Wordmark.module.css";

/**
 * Typographic wordmark — a stand-in until the official logo is supplied.
 * Swap the inner markup for the logo SVG when brand files arrive.
 */
export function Wordmark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      className={[styles.mark, tone === "light" ? styles.light : "", className].filter(Boolean).join(" ")}
      aria-label={`${site.name} — home`}
    >
      <span className={styles.lead}>{site.wordmark.lead}</span>
      <span className={styles.rest}>{site.wordmark.rest}</span>
    </Link>
  );
}
