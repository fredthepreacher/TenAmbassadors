import Link from "next/link";
import type { Pathway } from "@/lib/types";
import { ArrowIcon } from "@/components/ui/Icons";
import styles from "./GetInvolved.module.css";

export function GetInvolved({ pathways }: { pathways: Pathway[] }) {
  return (
    <section id="get-involved" className={`${styles.section} on-dark`} aria-labelledby="involved-title">
      <div className="container">
        <div className={styles.head} data-reveal>
          <p className="eyebrow">The next chapter</p>
          <h2 id="involved-title" className={styles.title}>
            Help expand what <em>opportunity</em> can look like.
          </h2>
        </div>

        <ul role="list" className={styles.grid}>
          {pathways.map((p, i) => (
            <li
              key={p.id}
              className={styles.card}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <span className={styles.index} aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.summary}>{p.summary}</p>
              <Link href={p.cta.href} className={styles.link}>
                <span>{p.cta.label}</span>
                <ArrowIcon className={styles.arrow} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
