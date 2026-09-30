import Image from "next/image";
import { PageHero } from "@/components/pages/PageHero";
import { WhyTen } from "@/components/home/WhyTen";
import { ButtonLink } from "@/components/ui/Button";
import { PendingBlock, PendingNote } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAbout } from "@/lib/content";
import { media } from "@/content/media";
import { TextLink } from "@/components/ui/Button";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  absoluteTitle: "About Ten Ambassadors | A Leadership & Impact Organization",
  description:
    "What Ten Ambassadors is: a leadership and impact organization in formation, built on Scholarship, Mentorship and Service. Mission, why “Ten”, roles and outlook.",
  path: "/about",
});

export default async function AboutPage() {
  const { about, leadership, whyTen, ecosystem, horizon, globalDirection, faqs } = await getAbout();

  // FAQPage mirrors the visible "Questions, answered" list word for word.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <PageHero
        eyebrow="About Ten Ambassadors"
        title={
          <>
            A leadership and <em className="text-royal-700">impact organization.</em>
          </>
        }
        intro={about.positioning}
        image={media.communityNetwork}
      />

      <section id="mission" aria-labelledby="mission-title" className="section-y bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <p className="eyebrow rule-before text-gold-ink">Mission</p>
            <h2 id="mission-title" className="mt-5 text-h3 font-sans font-semibold tracking-[-0.02em] text-navy-900">
              {about.mission}
            </h2>
            <PendingNote className="mt-6">Proposed mission · final approval pending</PendingNote>
          </div>
          <div data-reveal>
            <p className="eyebrow rule-before text-gold-ink">Vision</p>
            <p className="mt-5 font-serif text-h3 text-royal-700">{about.vision}</p>
            <ul className="mt-10 grid border-t border-line">
              {about.values.map((v, i) => (
                <li key={v} className="flex items-baseline gap-4 border-b border-line py-4 text-2xl font-semibold tracking-[-0.02em] text-navy-900">
                  <span className="text-xs font-semibold tracking-[0.14em] text-gold-ink">0{i + 1}</span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-x mt-14 text-sm text-muted">
          <p>{site.formationStatus}</p>
        </div>
      </section>

      <WhyTen {...whyTen} />

      <section id="ecosystem" aria-labelledby="ecosystem-title" className="section-y scroll-mt-20 bg-ivory">
        <div className="container-x">
          <SectionHeading
            id="ecosystem-title"
            eyebrow="The founding ecosystem"
            title={
              <>
                Built with many hands, <em className="text-royal-700">held by one mission.</em>
              </>
            }
            intro="Ten Ambassadors is being organized around a set of connected roles. Each will be introduced as it is confirmed."
          />
          <figure className="photo relative mt-12 aspect-[1250/435] overflow-hidden bg-stone" data-reveal="image">
            <Image src={media.communityPortrait.src} alt={media.communityPortrait.alt} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
          </figure>
          <ol className="mt-12 grid border-t border-line-strong md:grid-cols-2 md:gap-x-12">
            {ecosystem.map((r, i) => (
              <li key={r.id} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-5" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 60}ms` }}>
                <span className="pt-1 text-xs font-semibold tracking-[0.14em] text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl text-navy-900">{r.title}</h3>
                  <p className="mt-1 text-ink-2">{r.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="vision" aria-labelledby="horizon-title" className="section-y scroll-mt-20 bg-navy-900 text-paper">
        <div className="container-x">
          <SectionHeading
            id="horizon-title"
            tone="dark"
            eyebrow="Global outlook · development horizon"
            title={
              <>
                Local roots. <em className="text-gold-300">Global horizon.</em>
              </>
            }
            intro={globalDirection}
          />
          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <span className="absolute top-[11px] right-0 left-0 hidden h-px bg-gradient-to-r from-gold-400 via-gold-400/60 to-gold-400/10 md:block" aria-hidden="true" />
            {horizon.map((h, i) => (
              <li key={h.period} className="relative" data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
                <span className={i === 0 ? "block size-6 rounded-full border-2 border-gold-400 bg-gold-400" : "block size-6 rounded-full border-2 border-gold-400/70 bg-navy-900"} aria-hidden="true" />
                <p className="mt-5 text-sm font-semibold tracking-[0.16em] text-gold-300">{h.period}</p>
                <h3 className="mt-1 text-h3">{h.title}</h3>
                <ul className="mt-4 grid gap-1.5 text-paper/80">
                  {h.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-2xl border-l-2 border-gold-400 pl-4 text-sm text-paper/70 italic">
            A development horizon, not a record of accomplishments. Ten Ambassadors does not yet operate internationally.
          </p>
        </div>
      </section>

      <section id="story" aria-labelledby="story-title" className="section-y scroll-mt-20 bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading id="story-title" eyebrow="Our story" title="Rooted in relationships. Built for impact." className="lg:col-span-5" />
          <div className="grid gap-8 lg:col-span-6 lg:col-start-7" data-reveal>
            <p className="text-lede text-ink-2">{about.origin}</p>
            {about.story ? (
              <p className="text-lede">{about.story}</p>
            ) : (
              <PendingBlock title="The founding story">The full story of how and why Ten Ambassadors began will be published here.</PendingBlock>
            )}
          </div>
        </div>
      </section>

      <section id="leadership" aria-labelledby="leadership-title" className="section-y scroll-mt-20 bg-ivory">
        <div className="container-x">
          <SectionHeading id="leadership-title" eyebrow="Leadership" title="Founding Ambassadors, Board & Host Committee" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {leadership.length === 0 ? (
              <>
                <PendingBlock title="Founding Ambassadors">The ten founding Ambassadors will be introduced here once confirmed.</PendingBlock>
                <PendingBlock title="Board & leadership">Board members and organizational leadership will be listed once governance is finalized.</PendingBlock>
                <PendingBlock title="Institutional Host Committee">Host Committee members will be listed once confirmed.</PendingBlock>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <section id="questions" aria-labelledby="questions-title" className="section-y scroll-mt-20 bg-paper">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />
        <div className="container-x">
          <SectionHeading
            id="questions-title"
            eyebrow="In brief"
            title={
              <>
                Questions, <em className="text-royal-700">answered.</em>
              </>
            }
            intro="Short, factual answers about who we are, how the pieces fit together, and what is still being established."
          />
          <div className="mt-12 grid border-t border-line-strong md:grid-cols-2 md:gap-x-12">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-line py-6" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 60}ms` }}>
                <h3 className="text-2xl text-navy-900">{f.q}</h3>
                <p className="mt-3 text-ink-2">{f.a}</p>
                {f.link ? (
                  <p className="mt-3">
                    <TextLink href={f.link.href}>{f.link.label}</TextLink>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-royal-700 text-paper">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end" data-reveal>
          <h2 className="max-w-2xl text-h2">
            Find your place <em className="text-gold-300">in the circle.</em>
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/get-involved" variant="gold" arrow>
              Get involved
            </ButtonLink>
            <ButtonLink href="/network-partners" variant="outline-light">
              Network Partners
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
