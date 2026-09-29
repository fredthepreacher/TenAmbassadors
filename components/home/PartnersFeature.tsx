import type { Partner, PartnerCategory } from "@/lib/types";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { PendingNote } from "@/components/ui/Pending";

export function PartnersFeature({ categories, partners }: { categories: PartnerCategory[]; partners: Partner[] }) {
  return (
    <section id="partners" aria-labelledby="partners-title" className="section-y bg-paper">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">Partners &amp; sponsors</p>
          <h2 id="partners-title" className="mt-5 text-h2">
            Invest in the next generation of leaders.
          </h2>
          <p className="mt-6 text-lede text-ink-2">
            Ten Ambassadors is building partnerships across sectors to make scholarship, mentorship, and service possible.
          </p>
          <div className="mt-9 flex flex-col items-start gap-5">
            <ButtonLink href="/partners" arrow>
              Partner with us
            </ButtonLink>
            <TextLink href="/starlight#sponsor">Sponsor the Starlight Awards</TextLink>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <ul className="border-t border-line-strong">
            {categories.map((c) => {
              const count = partners.filter((p) => p.category === c.id).length;
              return (
                <li key={c.id} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                  <div>
                    <h3 className="font-serif text-2xl text-evergreen-900">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted">{c.description}</p>
                  </div>
                  <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">
                    {count > 0 ? `${count} partner${count === 1 ? "" : "s"}` : "Opening soon"}
                  </p>
                </li>
              );
            })}
          </ul>
          {partners.length === 0 ? <PendingNote className="mt-5">Partner names and logos will appear once confirmed</PendingNote> : null}
        </div>
      </div>
    </section>
  );
}
