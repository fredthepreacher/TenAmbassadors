import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "split" | "stack";
  action?: ReactNode;
}

/** Consistent section header: eyebrow + serif title + optional intro/action. */
export function SectionHeading({ id, eyebrow, title, intro, align = "split", action }: SectionHeadingProps) {
  return (
    <header className={[styles.head, align === "stack" ? styles.stack : ""].join(" ")} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <div className={styles.body}>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {intro ? <p className={styles.intro}>{intro}</p> : null}
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    </header>
  );
}
