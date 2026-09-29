import { PageHero } from "@/components/pages/PageHero";
import { PendingBlock } from "@/components/ui/Pending";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAbout } from "@/lib/content";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description: `The mission, vision, and story of ${site.name} — developing future leaders through Scholarship, Mentorship, and Service.`,
  path: "/about",
});

export default async function AboutPage() {
  const { about, leadership } = await getAbout();

  return (
    <>
      <PageHero
        eyebrow="About Ten Ambassadors"
        title={
          <>
            Developing the next generation <em className="text-evergreen-700">of leaders.</em>
          </>
        }
        intro={about.origin}
        image={media.communityNetwork}
      />

      <section aria-labelledby="mission-title" className="section-y bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <p className="eyebrow rule-before text-gold-ink">Mission</p>
            <h2 id="mission-title" className="mt-5 text-h2">
              {about.mission}
            </h2>
          </div>
          <div data-reveal>
            <p className="eyebrow rule-before text-gold-ink">Vision</p>
            <p className="mt-5 font-serif text-h3 text-evergreen-900">{about.vision}</p>
            <ul className="mt-10 grid border-t border-line">
              {about.values.map((v, i) => (
                <li key={v} className="flex items-baseline gap-4 border-b border-line py-4 font-serif text-2xl">
                  <span className="font-sans text-xs font-semibold tracking-[0.14em] text-gold-ink">0{i + 1}</span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="story" aria-labelledby="story-title" className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="story-title"
            eyebrow="Our story"
            title="Rooted in a network. Built for the next generation."
            className="lg:col-span-5"
          />
          <div className="grid gap-8 lg:col-span-6 lg:col-start-7" data-reveal>
            <p className="text-lede text-ink-2">
              {site.name} is historically connected to {site.parentOrg.name}, a professional networking, events, and
              marketing organization. {site.name} carries its own identity and mission: Scholarship, Mentorship, and
              Service.
            </p>
            {about.story ? <p className="text-lede">{about.story}</p> : <PendingBlock title="The founding story">The full story of how and why Ten Ambassadors began will be published here.</PendingBlock>}
          </div>
        </div>
      </section>

      <section id="leadership" aria-labelledby="leadership-title" className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading id="leadership-title" eyebrow="Leadership" title="Founding Ambassadors" />
          <div className="mt-12">
            {leadership.length === 0 ? (
              <PendingBlock title="Leadership profiles">
                Names, roles, photographs, and biographies of the leadership team and Founding Ambassadors will appear here
                once approved.
              </PendingBlock>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section-y bg-evergreen-950 text-paper">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end" data-reveal>
          <h2 className="max-w-2xl text-h2">See how the pathway works.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#sms" variant="gold" arrow>
              The SMS pathway
            </ButtonLink>
            <ButtonLink href="/get-involved" variant="outline-light">
              Get involved
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
