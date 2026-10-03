import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { PendingBlock } from "@/components/ui/Pending";
import { serviceFocus } from "@/content/programs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AreaList } from "@/components/pages/AreaList";
import { getPrograms } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Community Service & Leadership",
  description:
    "Service is the third stage of the Ten Ambassadors pathway — turning leadership into community impact. Explore planned service areas and volunteer interest.",
  path: "/service",
});

export default async function ServicePage() {
  const { serviceInitiatives, volunteer, serviceAreas } = await getPrograms();
  const confirmed = serviceInitiatives.filter((it) => it.title);

  return (
    <>
      <PageHero
        tone="royal"
        eyebrow="Pathway 03 · Service"
        title={
          <>
            Hold the door open <em className="text-gold-300">for someone else.</em>
          </>
        }
        intro="Leadership carries responsibility. Service completes the cycle: what an ambassador gains through scholarship and mentorship becomes opportunity for the next person — and the pathway begins again."
      >
        <ButtonLink href="#volunteer" variant="light" arrow>
          Serve with us
        </ButtonLink>
      </PageHero>

      <section id="initiatives" aria-labelledby="initiatives-title" className="section-y bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="initiatives-title"
            eyebrow="Initiatives"
            title={
              <>
                Leadership becomes <em className="text-royal-700">action.</em>
              </>
            }
            intro="Service initiatives will let ambassadors turn what they have gained into opportunity for their communities."
            className="lg:col-span-5"
          />
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-b border-line-strong pb-4">
              <h3 className="eyebrow text-royal-700">{confirmed.length ? "Initiatives" : "Where service will focus"}</h3>
            </div>
            <ol>
              {(confirmed.length ? confirmed.map((it) => ({ title: it.title!, body: it.summary ?? "" })) : serviceFocus).map((it, i) => (
                <li
                  key={it.title}
                  className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-b border-line py-6"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <span className="text-3xl font-semibold tracking-[-0.04em] text-royal-700/70">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-serif text-2xl text-navy-900">{it.title}</p>
                    {it.body ? <p className="mt-1 text-sm text-muted">{it.body}</p> : null}
                  </div>
                  <span className="h-px w-6 bg-line-strong transition-all duration-500 group-hover:w-12 group-hover:bg-green-500" aria-hidden="true" />
                </li>
              ))}
            </ol>
            {confirmed.length ? null : <p className="mt-5 text-sm text-muted">Named service initiatives will be introduced as they are confirmed.</p>}
          </div>
        </div>
      </section>

      <AreaList
        id="areas"
        tone="ivory"
        eyebrow="Areas of service"
        title="Where service may focus"
        intro="Potential future programming includes:"
        areas={serviceAreas}
      />

      <section id="volunteer" aria-labelledby="volunteer-title" className="section-y bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading id="volunteer-title" eyebrow="Volunteer" title="Give your time where it opens doors." intro={volunteer.intro} className="lg:col-span-6" />
          <div className="grid content-start gap-6 lg:col-span-5 lg:col-start-8" data-reveal>
            <PendingBlock title="Volunteer roles & sign-up">Volunteer roles and time commitments are being defined. Register your interest and we will reach out as opportunities open.</PendingBlock>
            <ButtonLink href="/get-involved/volunteer" variant="outline" arrow className="w-fit">
              Volunteer interest
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
