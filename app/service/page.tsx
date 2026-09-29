import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { PendingBlock, PendingNote } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPrograms } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Service",
  description:
    "Service is the third stage of the Ten Ambassadors pathway — turning development into impact for someone else. Explore future initiatives and volunteer.",
  path: "/service",
});

export default async function ServicePage() {
  const { serviceInitiatives, volunteer } = await getPrograms();

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
        intro="Service completes the cycle. What an ambassador gains through scholarship and mentorship becomes opportunity for the next person — and the pathway begins again."
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
            <div className="flex items-center justify-between gap-4 border-b border-line-strong pb-4">
              <h3 className="eyebrow text-royal-700">Planned initiatives</h3>
              <PendingNote>To be announced</PendingNote>
            </div>
            <ol>
              {serviceInitiatives.map((it, i) => (
                <li
                  key={it.id}
                  className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-b border-line py-7"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <span className="text-3xl font-semibold tracking-[-0.04em] text-royal-700/70">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-serif text-2xl text-navy-900">{it.title ?? "Initiative to be announced"}</p>
                    <p className="mt-1 text-sm text-muted">{it.summary ?? "Details will be published as service programs are confirmed."}</p>
                  </div>
                  <span className="h-px w-6 bg-line-strong transition-all duration-500 group-hover:w-12 group-hover:bg-gold-500" aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="volunteer" aria-labelledby="volunteer-title" className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading id="volunteer-title" eyebrow="Volunteer" title="Give your time where it opens doors." intro={volunteer.intro} className="lg:col-span-6" />
          <div className="grid content-start gap-6 lg:col-span-5 lg:col-start-8" data-reveal>
            <PendingBlock title="Volunteer roles & sign-up">Volunteer roles, time commitments, and the sign-up form will be published here.</PendingBlock>
            <ButtonLink href="/contact" variant="outline" arrow className="w-fit">
              Register interest
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
