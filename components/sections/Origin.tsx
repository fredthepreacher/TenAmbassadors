import Image from "next/image";
import type { Media } from "@/lib/types";
import { site } from "@/lib/site";
import styles from "./Origin.module.css";

interface OriginProps {
  eyebrow: string;
  themes: string[];
  statement: string;
  image: Media;
  imageCaption: string;
}

export function Origin({ eyebrow, themes, statement, image, imageCaption }: OriginProps) {
  const parent = site.parentOrg.name;
  const [before, after] = statement.split(parent);

  return (
    <section id="about" className={`section ${styles.origin}`} aria-labelledby="origin-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.lead}>
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
          <h2 id="origin-title" className={styles.themes}>
            {themes.map((t, i) => (
              <span key={t} className={styles.theme} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <span className={styles.themeIndex} aria-hidden="true">
                  0{i + 1}
                </span>
                {t}
              </span>
            ))}
          </h2>
        </div>

        <div className={styles.aside}>
          <p className={styles.statement} data-reveal>
            {after !== undefined ? (
              <>
                {before}
                <strong>{parent}</strong>
                {after}
              </>
            ) : (
              statement
            )}
          </p>

          <figure className={styles.figure} data-reveal>
            <div className={styles.frame}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 860px) 92vw, 520px"
                className={styles.image}
                style={{ objectPosition: image.focus }}
              />
            </div>
            <figcaption className={styles.caption}>{imageCaption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
