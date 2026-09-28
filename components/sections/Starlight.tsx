import Image from "next/image";
import type { FeatureBlock } from "@/lib/types";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StarIcon } from "@/components/ui/Icons";
import { PendingNote } from "@/components/ui/PendingNote";
import styles from "./Starlight.module.css";

export function Starlight({ block }: { block: FeatureBlock }) {
  const { eyebrow, title, body, image, cta } = block;

  return (
    <section id="starlight" className={`${styles.starlight} on-dark`} aria-labelledby="starlight-title">
      <div className={styles.media}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 960px) 100vw, 55vw"
          className={styles.image}
          style={{ objectPosition: image.focus }}
        />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy} data-reveal>
          <StarIcon className={styles.star} />
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="starlight-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.body}>{body}</p>
          <PendingNote tone="dark">Starlight Awards details &amp; media pending</PendingNote>
          <div>
            <ButtonLink href={cta.href} variant="secondary" arrow>
              {cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
