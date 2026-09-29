"use client";

import { useId, useState } from "react";

/**
 * Newsletter sign-up UI.
 * PENDING: no email provider is connected. Wire `onSubmit` to the chosen
 * provider (e.g. Mailchimp, Kit, Buttondown) or a Next.js route handler.
 */
export function NewsletterForm() {
  const id = useId();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage("Thank you. Newsletter sign-up isn't connected yet — it will be live before launch.");
      }}
    >
      <label htmlFor={`${id}-email`} className="font-serif text-2xl text-paper">
        News from Ten Ambassadors
      </label>
      <p id={`${id}-hint`} className="text-sm text-paper/70">
        Scholarship announcements, mentorship opportunities, and Starlight news.
      </p>
      <div className="mt-1 flex flex-col gap-2 rounded-2xl border border-paper/20 bg-paper/[0.04] p-1.5 transition-colors focus-within:border-gold-300 sm:flex-row sm:rounded-full">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          aria-describedby={`${id}-hint ${id}-status`}
          className="min-h-12 min-w-0 flex-1 bg-transparent px-4 text-paper placeholder:text-paper/55 focus:outline-none"
        />
        <button
          type="submit"
          className="min-h-12 cursor-pointer rounded-full bg-gold-400 px-6 font-semibold text-evergreen-950 transition-colors hover:bg-gold-300"
        >
          Subscribe
        </button>
      </div>
      <p id={`${id}-status`} role="status" aria-live="polite" className="text-sm text-gold-300 empty:hidden">
        {message}
      </p>
    </form>
  );
}
