import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./[slug]/page.module.css";

export default function NotFound() {
  return (
    <section className={`${styles.page} on-dark`} aria-labelledby="nf-title">
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">404</p>
        <h1 id="nf-title" className={styles.title}>
          This page isn&rsquo;t here.
        </h1>
        <p className={styles.summary}>The page you&rsquo;re looking for may have moved or doesn&rsquo;t exist yet.</p>
        <div className={styles.actions}>
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
