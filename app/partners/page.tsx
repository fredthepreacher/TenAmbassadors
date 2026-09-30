import Image from "next/image";
import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { PendingBlock } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPartners } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partners",
  description:
    "Partner with Ten Ambassadors — corporate sponsors, universities, foundations, community partners, and professional associations investing in the next generation of leaders.",
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
        intro="Ten Ambassadors is preparing partnership pathways for organizations that want to invest in Scholarship, Mentorship and Service. These are pathways — no sponsors have been announced yet."
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
                <li key={c.id} id={c.id} className="grid gap-6 border-b border-line py-10 lg:grid-cols-12" data-reveal>
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
                    ) : (
                      <p className="text-sm text-muted">Partner recognition will appear here once partnerships are confirmed.</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
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
            <PendingBlock title="Partnership & sponsorship packages">Partnership options and recognition benefits will be published here.</PendingBlock>
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
