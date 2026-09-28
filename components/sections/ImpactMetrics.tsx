import type { Metric } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PendingNote } from "@/components/ui/PendingNote";
import styles from "./ImpactMetrics.module.css";

/**
 * Impact metrics. Values stay `null` (rendered as an em-dash placeholder)
 * until Geo supplies verified figures — never estimate.
 */
export function ImpactMetrics({ metrics }: { metrics: Metric[] }) {
  const pending = metrics.some((m) => m.value === null);

  return (
    <section id="impact" className={`section ${styles.impact}`} aria-labelledby="impact-title">
      <div className="container">
        <SectionHeading
          id="impact-title"
          eyebrow="Impact"
          title="Progress you can measure."
          intro="Verified outcomes across scholarship, mentorship, and service will be reported here as they are confirmed."
          action={pending ? <PendingNote>Verified impact statistics pending</PendingNote> : undefined}
        />

        <dl className={styles.grid}>
          {metrics.map((m, i) => (
            <div
              key={m.id}
              className={styles.metric}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <dt className={styles.label}>{m.label}</dt>
              <dd className={styles.value}>
                {m.value ?? (
                  <>
                    <span aria-hidden="true" className={styles.dash}>
                      —
                    </span>
                    <span className="sr-only">Figure pending verification</span>
                  </>
                )}
              </dd>
              {m.source ? <dd className={styles.source}>{m.source}</dd> : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
