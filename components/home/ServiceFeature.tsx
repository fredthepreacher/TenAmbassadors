import type { Initiative } from "@/lib/types";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { PendingNote } from "@/components/ui/Pending";

export function ServiceFeature({
  eyebrow,
  title,
  body,
  initiatives,
}: {
  eyebrow: string;
  title: string;
  body: string;
  initiatives: Initiative[];
}) {
  return (
    <section id="service" aria-labelledby="service-title" className="section-y bg-paper">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
          <h2 id="service-title" className="mt-5 text-h1 text-evergreen-950">
            {title}
          </h2>
          <p className="mt-8 max-w-lg text-lede text-ink-2">{body}</p>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="/service#volunteer" arrow>
              Volunteer
            </ButtonLink>
            <TextLink href="/service">How service works</TextLink>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-4" data-reveal>
          <div className="flex items-center justify-between gap-4 border-b border-line-strong pb-4">
            <h3 className="eyebrow text-evergreen-900">Service initiatives</h3>
            <PendingNote>To be announced</PendingNote>
          </div>
          <ol>
            {initiatives.map((it, i) => (
              <li key={it.id} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-2 border-b border-line py-7">
                <span className="font-serif text-4xl text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-serif text-2xl text-ink/80">{it.title ?? "Initiative to be announced"}</p>
                  <p className="mt-1 text-sm text-muted">{it.summary ?? "Details will be published as service programs are confirmed."}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
