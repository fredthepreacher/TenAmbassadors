import Image from "next/image";
import Link from "next/link";
import type { Media, Pillar, CallToAction } from "@/lib/types";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./Hero.module.css";

interface HeroProps {
  eyebrow: string;
  headline: string;
  lede: string;
  image: Media;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  pillars: Pillar[];
}

export function Hero({ eyebrow, headline, lede, image, primaryCta, secondaryCta, pillars }: HeroProps) {
  // Split the final two words onto an italic line for editorial rhythm.
  const words = headline.split(" ");
  const tail = words.splice(-2).join(" ");

  return (
    <section className={`${styles.hero} on-dark`} aria-labelledby="hero-title">
      <div className={styles.media}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(max-width: 960px) 100vw, 62vw"
          className={styles.image}
          style={{ objectPosition: image.focus }}
        />
        <div className={styles.fade} aria-hidden="true" />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {words.join(" ")} <em>{tail}</em>
          </h1>
          <p className={styles.lede}>{lede}</p>
          <div className={styles.actions}>
            <ButtonLink href={primaryCta.href} arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      <nav aria-label="Our three pathways" className={styles.strip}>
        <ol role="list" className={`container ${styles.stripList}`}>
          {pillars.map((p) => (
            <li key={p.id}>
              <Link href={`/#${p.id}`} className={styles.stripLink}>
                <span className={styles.stripIndex}>{p.index}</span>
                <span className={styles.stripTitle}>{p.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
