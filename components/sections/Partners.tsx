import Image from "next/image";
import type { Partner } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./Partners.module.css";

export function Partners({ partners }: { partners: Partner[] }) {
  return (
    <section id="partners" className={`section ${styles.partners}`} aria-labelledby="partners-title">
      <div className="container">
        <SectionHeading
          id="partners-title"
          eyebrow="Partners & sponsors"
          title="Invest in the next generation of leaders."
          intro="Partners and sponsors who make scholarship, mentorship, and service possible will be recognized here."
          action={
            <ButtonLink href="/partner" variant="ghost" arrow>
              Become a partner
            </ButtonLink>
          }
        />

        <ul role="list" className={styles.grid} aria-label="Partner logos">
          {partners.map((p) => (
            <li key={p.id} className={styles.slot} data-reveal>
              {p.logo ? (
                p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles.logoLink}>
                    <Image src={p.logo.src} alt={p.logo.alt} width={p.logo.width} height={p.logo.height} className={styles.logo} />
                  </a>
                ) : (
                  <Image src={p.logo.src} alt={p.logo.alt} width={p.logo.width} height={p.logo.height} className={styles.logo} />
                )
              ) : (
                <span className={styles.empty}>
                  Partner logo
                  <span className="sr-only"> — placeholder, pending approval</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
