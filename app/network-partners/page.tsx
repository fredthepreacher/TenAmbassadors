import Image from "next/image";
import { IntakeForm } from "@/components/forms/IntakeForm";
import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { PendingNote } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPartners } from "@/lib/content";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Network Partners: A Network of Networks",
  description:
    "Network Partners are organizations — associations, alumni groups, universities, community groups — that collaborate with Ten Ambassadors to develop leaders.",
  path: "/network-partners",
  image: media.communityGroup,
});

export default async function NetworkPartnersPage() {
  const { networkPartnerTypes, networkPartnerRoles, networkPartners } = await getPartners();

  return (
    <>
      <PageHero
        tone="navy"
        eyebrow="Network Partners"
        title={
          <>
            One community. <em className="text-gold-300">Many networks.</em>
          </>
        }
        intro="Leadership becomes more powerful when networks collaborate. Ten Ambassadors is being designed as a network of networks — connecting organizations that already develop leaders so their members can share opportunities, mentorship and service."
      >
        <ButtonLink href="#apply" variant="gold" arrow>
          Become a Network Partner
        </ButtonLink>
      </PageHero>

      <figure className="relative bg-navy-900">
        <div className="relative aspect-[4/3] sm:aspect-[16/7]">
          <Image src={media.communityGroup.src} alt={media.communityGroup.alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: media.communityGroup.focus }} />
        </div>
      </figure>

      <section aria-labelledby="who-title" className="section-y bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="who-title"
            eyebrow="Who can partner"
            title={
              <>
                Organizations that <em className="text-royal-700">already build leaders.</em>
              </>
            }
            intro="Network Partners may eventually include:"
            className="lg:col-span-5"
          />
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <ul className="grid border-t border-line-strong sm:grid-cols-2 sm:gap-x-8">
              {networkPartnerTypes.map((t, i) => (
                <li key={t} className="flex items-baseline gap-3 border-b border-line py-3.5">
                  <span className="text-xs font-semibold tracking-[0.14em] text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg text-navy-900">{t}</span>
                </li>
              ))}
            </ul>
            {networkPartners.length === 0 ? <PendingNote className="mt-6">No Network Partners have been announced yet</PendingNote> : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="roles-title" className="section-y bg-royal-700 text-paper">
        <div className="container-x">
          <SectionHeading
            id="roles-title"
            tone="dark"
            eyebrow="What partnership could look like"
            title={
              <>
                Shared networks, <em className="text-gold-300">shared impact.</em>
              </>
            }
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-paper/15 sm:grid-cols-2 lg:grid-cols-5">
            {networkPartnerRoles.map((r, i) => (
              <li key={r.title} className="bg-royal-700 p-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                <p className="text-xs font-semibold tracking-[0.14em] text-gold-300">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-2xl">{r.title}</h3>
                <p className="mt-2 text-sm text-paper/80">{r.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-paper/70">Draft framework — responsibilities will be defined with each partner.</p>
        </div>
      </section>

      <section id="apply" aria-labelledby="apply-title" className="section-y scroll-mt-20 bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="apply-title"
            eyebrow="Become a Network Partner"
            title="Bring your network into the circle."
            intro="Tell us about your organization and how you'd like to collaborate."
            className="lg:col-span-4"
          />
          <div className="lg:col-span-7 lg:col-start-6">
            <IntakeForm formId="network-partner-application" />
          </div>
        </div>
      </section>
    </>
  );
}
