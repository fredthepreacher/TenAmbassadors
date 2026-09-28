import { site } from "@/lib/site";
import styles from "./PendingNote.module.css";

/**
 * Clearly-labelled marker for content that is still pending from the client.
 * Renders nothing when `site.showPlaceholderNotes` is false.
 */
export function PendingNote({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!site.showPlaceholderNotes) return null;
  return (
    <p className={[styles.note, tone === "dark" ? styles.dark : "", className].filter(Boolean).join(" ")}>
      <span className={styles.dot} aria-hidden="true" />
      <span className="sr-only">Placeholder: </span>
      {children}
    </p>
  );
}

/** Small status pill, e.g. "Coming soon". */
export function StatusPill({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return <span className={[styles.pill, tone === "dark" ? styles.pillDark : ""].join(" ")}>{children}</span>;
}
