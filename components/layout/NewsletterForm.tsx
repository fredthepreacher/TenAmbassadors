"use client";

import { useId, useState } from "react";
import styles from "./SiteFooter.module.css";

/**
 * Newsletter sign-up UI.
 * PENDING: no email provider is connected. Wire `onSubmit` to the chosen
 * provider (Mailchimp, ConvertKit, Supabase, etc.) or a Next.js route handler.
 */
export function NewsletterForm() {
  const id = useId();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setMessage("Thanks! Newsletter sign-up isn't connected yet — it will be live at launch.");
      }}
      noValidate={false}
    >
      <label htmlFor={`${id}-email`} className={styles.formLabel}>
        Stay close to the work
      </label>
      <div className={styles.formRow}>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className={styles.input}
          aria-describedby={`${id}-status`}
        />
        <button type="submit" className={styles.submit}>
          Subscribe
        </button>
      </div>
      <p id={`${id}-status`} className={styles.formStatus} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
