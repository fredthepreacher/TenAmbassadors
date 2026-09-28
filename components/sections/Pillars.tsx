import Link from "next/link";
import type { Pillar } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";
import { PendingNote } from "@/components/ui/PendingNote";
import styles from "./Pillars.module.css";

export function Pillars({ pillars }: { pillars: Pillar[] }) {
  return (
    <section id="pathways" className={`section ${styles.pillars}`} aria-labelledby="pillars-title">
      <div className="container">
        <SectionHeading
          id="pillars-title"
          eyebrow="The SMS framework"
          title={
            <>
              Three pillars. <em>One leadership pathway.</em>
            </>
          }
          intro="Scholarship, Mentorship, and Service work together — each one a distinct pathway, all of them pointed toward leadership."
        />

        <ol role="list" className={styles.grid}>
          {pillars.map((p, i) => (
            <li
              key={p.id}
              id={p.id}
              className={styles.card}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.index}>{p.index}</span>
                <span className={styles.letter} aria-hidden="true">
                  {p.letter}
                </span>
              </div>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.summary}>{p.summary}</p>
              <PendingNote className={styles.note}>{p.pendingDetail}</PendingNote>
              <Link href={p.cta.href} className={styles.link}>
                <span>{p.cta.label}</span>
                <ArrowIcon className={styles.arrow} />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
