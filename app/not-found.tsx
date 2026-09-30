import type { Metadata } from "next";
import { ButtonLink, TextLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="bg-ivory pt-[76px]">
      <div className="container-x flex min-h-[70svh] flex-col items-start justify-center py-20">
        <p className="eyebrow rule-before text-gold-ink">404</p>
        <h1 id="nf-title" className="mt-6 text-h1">
          This page isn&rsquo;t here.
        </h1>
        <p className="mt-6 max-w-xl text-lede text-ink-2">The page you&rsquo;re looking for may have moved or doesn&rsquo;t exist yet.</p>
        <div className="mt-9">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
        </div>
        <nav aria-label="Popular pages" className="mt-10">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <TextLink href="/about">About Ten Ambassadors</TextLink>
            </li>
            <li>
              <TextLink href="/starlight">Starlight Awards</TextLink>
            </li>
            <li>
              <TextLink href="/get-involved">Get involved</TextLink>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
