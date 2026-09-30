"use client";

import { ButtonLink } from "@/components/ui/Button";

/** Runtime error state — same editorial treatment as the 404, with a retry. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section aria-labelledby="err-title" className="bg-ivory pt-[76px]">
      <div className="container-x flex min-h-[70svh] flex-col items-start justify-center py-20">
        <p className="eyebrow rule-before text-gold-ink">Something went wrong</p>
        <h1 id="err-title" className="mt-6 text-h1">
          This page didn&rsquo;t load.
        </h1>
        <p className="mt-6 max-w-xl text-lede text-ink-2">Please try again. If it keeps happening, head back to the home page.</p>
        <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <ButtonLink href="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
