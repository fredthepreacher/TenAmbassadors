import Image from "next/image";
import type { Story } from "@/lib/types";
import { TextLink } from "@/components/ui/ButtonLink";
import { QuoteIcon } from "@/components/ui/Icons";
import { PendingNote } from "@/components/ui/PendingNote";
import styles from "./FeaturedStory.module.css";

export function FeaturedStory({ story }: { story: Story }) {
  const { eyebrow, headline, image, quote, personName, personRole, cta } = story;

  return (
    <section className={`${styles.story} on-dark`} aria-labelledby="story-title">
      <div className={`container ${styles.grid}`}>
        <figure className={styles.figure} data-reveal>
          <div className={styles.frame}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 960px) 92vw, 50vw"
              className={styles.image}
              style={{ objectPosition: image.focus }}
            />
          </div>
        </figure>

        <div className={styles.copy}>
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
          <h2 id="story-title" className={styles.title} data-reveal>
            {headline}
          </h2>

          {quote ? (
            <blockquote className={styles.quote} data-reveal>
              <QuoteIcon className={styles.quoteIcon} />
              <p>{quote}</p>
              {personName ? (
                <footer>
                  <cite>{personName}</cite>
                  {personRole ? <span>{personRole}</span> : null}
                </footer>
              ) : null}
            </blockquote>
          ) : (
            <div className={styles.placeholder} data-reveal>
              <QuoteIcon className={styles.quoteIcon} />
              <p className={styles.placeholderTitle}>A participant story will live here.</p>
              <p className={styles.placeholderBody}>
                An approved mentor, scholar, or participant story — with their name, photo, and words — will be featured
                in this space.
              </p>
              <PendingNote tone="dark">Approved story &amp; permissions pending</PendingNote>
            </div>
          )}

          <div data-reveal>
            <TextLink href={cta.href} tone="light">
              {cta.label}
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
