"use client";

import { useId, useState } from "react";
import { submitIntake } from "@/lib/forms";

/**
 * Newsletter sign-up. Delivered through the same `submitIntake` path as every form: today it opens
 * the visitor's email app with a sign-up request addressed to `site.inbox.address`. When a list
 * provider (e.g. Mailchimp, Kit, Buttondown) is chosen, point NEXT_PUBLIC_INTAKE_ENDPOINT at it.
 */
export function NewsletterForm() {
  const id = useId();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      className="grid gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const email = String(new FormData(e.currentTarget).get("email") ?? "");
        const res = await submitIntake("newsletter-signup", { email });
        setMessage(
          !res.ok ? res.message : res.via === "email" ? "Your email app should now open with your sign-up request. Press send to join the list." : "Thank you. You're on the list.",
        );
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
          className="min-h-12 cursor-pointer rounded-full border border-gold-300/95 bg-gold-500/8 px-6 font-semibold text-gold-200 transition-colors hover:border-champagne hover:bg-gold-500/14 hover:text-champagne"
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
