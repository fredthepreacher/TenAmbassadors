import Image from "next/image";
import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { PendingBlock } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPartners } from "@/lib/content";
import { geoPending } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Corporate & Community Partnerships",
  description:
    "Corporate sponsors, foundations, universities and community partners can invest in the next generation of leaders through Ten Ambassadors partnership pathways.",
  path: "/partners",
});

export default async function PartnersPage() {
  const { partnerCategories, partners } = await getPartners();

  return (
    <>
      <PageHero
        eyebrow="Corporate partners & sponsors"
        title={
          <>
            Invest in the next generation <em className="text-royal-700">of leaders.</em>
          </>
        }
        intro="Ten Ambassadors is preparing partnership pathways for corporations, foundations, universities and professional and community organizations that want to invest in Scholarship, Mentorship and Service. Founding partners will be introduced as partnerships are confirmed."
        /* Geo point 8: the Jopwell event photo sits on the right (copy and CTAs left). It is historical event
           imagery only — the caption says so, and no copy, alt text, metadata or schema names a sponsor. */
        image={geoPending.partnersJopwellEvent.media ?? undefined}
        imageNote="From a past community event, shown for context. No sponsorship is implied."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/get-involved/sponsor" arrow>
            Sponsorship inquiry
          </ButtonLink>
          <ButtonLink href="/network-partners" variant="outline">
            Network Partners
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="ways-title" className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading id="ways-title" eyebrow="Sponsorship & corporate partnership pathways" title="Six ways to invest in the mission." />
          <ul className="mt-12 border-t border-line-strong">
            {partnerCategories.map((c, i) => {
              const list = partners.filter((p) => p.category === c.id);
              return (
                <li key={c.id} id={c.id} className="grid gap-4 border-b border-line py-8 lg:grid-cols-12 lg:gap-6" data-reveal>
                  <p className="text-xs font-semibold tracking-[0.14em] text-gold-ink lg:col-span-1">0{i + 1}</p>
                  <div className="lg:col-span-5">
                    <h2 className="font-serif text-h3 text-royal-700">{c.title}</h2>
                    <p className="mt-2 text-ink-2">{c.description}</p>
                  </div>
                  <div className="lg:col-span-6">
                    {list.length > 0 ? (
                      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {list.map((p) => (
                          <li key={p.id} className="grid aspect-[3/2] place-items-center border border-line bg-ivory p-4">
                            {p.logo ? (
                              <Image src={p.logo.src} alt={p.logo.alt} width={p.logo.width} height={p.logo.height} className="max-h-full w-auto object-contain" />
                            ) : (
                              <span className="text-center text-sm font-semibold">{p.name}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
          {partners.length === 0 ? <p className="mt-6 text-sm text-muted">Partner recognition will appear with each pathway as partnerships are confirmed.</p> : null}
        </div>
      </section>

      <section id="sponsor" aria-labelledby="sponsor-title" className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="sponsor-title"
            eyebrow="Sponsorship"
            title="Sponsor a scholarship, a program, or Starlight."
            className="lg:col-span-6"
          />
          <div className="grid content-start gap-6 lg:col-span-5 lg:col-start-8" data-reveal>
            <PendingBlock title="Partnership & sponsorship packages">Options and recognition benefits are being prepared. Start a conversation now and we will shape a partnership around your goals.</PendingBlock>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <ButtonLink href="/get-involved/sponsor" arrow>
                Partnership inquiry
              </ButtonLink>
              <TextLink href="/starlight#sponsor">Starlight sponsorship</TextLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
