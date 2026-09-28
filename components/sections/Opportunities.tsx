import Link from "next/link";
import type { Opportunity } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";
import { StatusPill } from "@/components/ui/PendingNote";
import styles from "./Opportunities.module.css";

const statusLabel: Record<Opportunity["status"], string> = {
  "coming-soon": "Coming soon",
  open: "Open now",
  closed: "Closed",
};

const pathwayLabel: Record<Opportunity["pathway"], string> = {
  scholarship: "Scholarship",
  mentorship: "Mentorship",
  service: "Service",
  events: "Events",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(iso));
}

export function Opportunities({ items }: { items: Opportunity[] }) {
  return (
    <section id="opportunities" className={`section ${styles.section}`} aria-labelledby="opps-title">
      <div className="container">
        <SectionHeading
          id="opps-title"
          eyebrow="Opportunities"
          title="Pathways opening soon."
          intro="Applications, programs, and events will be listed here with clear eligibility and dates as each one is confirmed."
        />

        <ul role="list" className={styles.list}>
          {items.map((o, i) => (
            <li
              key={o.id}
              className={styles.item}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <div className={styles.meta}>
                <span className={styles.pathway}>{pathwayLabel[o.pathway]}</span>
                <StatusPill>{statusLabel[o.status]}</StatusPill>
              </div>
              <h3 className={styles.title}>{o.title}</h3>
              <p className={styles.summary}>{o.summary}</p>
              <dl className={styles.facts}>
                <div>
                  <dt>Eligibility</dt>
                  <dd>{o.eligibility ?? "To be announced"}</dd>
                </div>
                <div>
                  <dt>Dates</dt>
                  <dd>{o.deadline ? formatDate(o.deadline) : "To be announced"}</dd>
                </div>
              </dl>
              <Link href={o.cta.href} className={styles.link}>
                <span>{o.cta.label}</span>
                <ArrowIcon className={styles.arrow} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
