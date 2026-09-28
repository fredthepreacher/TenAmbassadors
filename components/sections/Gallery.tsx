import Image from "next/image";
import type { GalleryItem } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlayIcon } from "@/components/ui/Icons";
import { PendingNote } from "@/components/ui/PendingNote";
import styles from "./Gallery.module.css";

export function Gallery({ items }: { items: GalleryItem[] }) {
  return (
    <section id="community" className={`section ${styles.gallery}`} aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading
          id="gallery-title"
          eyebrow="Community"
          title={
            <>
              Built around real people, real rooms, <em>and real relationships.</em>
            </>
          }
        />

        <ul role="list" className={styles.grid}>
          {items.map((item, i) => (
            <li
              key={item.id}
              className={`${styles.tile} ${styles[item.layout]}`}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              {item.kind === "image" && item.image ? (
                <figure className={styles.figure}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes={item.layout === "feature" ? "(max-width: 860px) 92vw, 58vw" : "(max-width: 860px) 92vw, 40vw"}
                    className={styles.image}
                    style={{ objectPosition: item.image.focus }}
                  />
                  <figcaption className={styles.caption}>{item.caption}</figcaption>
                </figure>
              ) : (
                <div className={styles.video}>
                  <span className={styles.play} aria-hidden="true">
                    <PlayIcon className={styles.playIcon} />
                  </span>
                  <p className={styles.videoTitle}>{item.caption}</p>
                  <PendingNote tone="dark">Event video pending</PendingNote>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
