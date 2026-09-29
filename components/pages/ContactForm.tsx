"use client";

import { useId, useState } from "react";

const topics = ["General inquiry", "Scholarship", "Mentorship", "Service & volunteering", "Partnership & sponsorship", "Starlight Awards", "Media"];

/**
 * Accessible inquiry form. PENDING: not connected to a destination.
 * Connect to a Next.js route handler + email service (e.g. Resend) or a form
 * provider once the organization's contact address is confirmed.
 */
export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<string | null>(null);
  const field =
    "mt-2 block w-full rounded-xl border border-line-strong bg-paper px-4 py-3 text-ink placeholder:text-muted/80 focus:border-royal-700 focus:outline-2 focus:outline-offset-1 focus:outline-royal-700";
  const label = "text-sm font-semibold text-ink-2";

  return (
    <form
      className="grid gap-6"
      aria-describedby={`${id}-note`}
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("Thank you. This form isn't connected yet — messages will be delivered once the contact address is confirmed.");
      }}
    >
      <p id={`${id}-note`} className="text-sm text-muted">
        All fields are required.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            Full name
          </label>
          <input id={`${id}-name`} name="name" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            Email
          </label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-topic`} className={label}>
          Topic
        </label>
        <select id={`${id}-topic`} name="topic" required className={field} defaultValue="">
          <option value="" disabled>
            Select a topic
          </option>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className={label}>
          Message
        </label>
        <textarea id={`${id}-message`} name="message" required rows={6} className={field} />
      </div>
      <div className="flex flex-col items-start gap-4">
        <button
          type="submit"
          className="inline-flex min-h-12 cursor-pointer items-center rounded-full bg-royal-700 px-7 font-semibold text-paper transition-colors hover:bg-royal-700"
        >
          Send message
        </button>
        <p role="status" aria-live="polite" className="text-sm text-royal-700 empty:hidden">
          {status}
        </p>
      </div>
    </form>
  );
}
