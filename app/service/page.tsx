import { PageHero } from "@/components/pages/PageHero";
import { ServiceFeature } from "@/components/home/ServiceFeature";
import { ButtonLink } from "@/components/ui/Button";
import { PendingBlock } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPrograms } from "@/lib/content";
import { serviceFeature } from "@/content/home";
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
        eyebrow="Pathway 03 · Service"
        title={
          <>
            Hold the door open <em className="text-evergreen-700">for someone else.</em>
          </>
        }
        intro="Service completes the cycle. What an ambassador gains through scholarship and mentorship becomes opportunity for the next person — and the pathway begins again."
      >
        <ButtonLink href="#volunteer" arrow>
          Volunteer
        </ButtonLink>
      </PageHero>

      <div id="initiatives">
        <ServiceFeature {...serviceFeature} eyebrow="Initiatives" title="Service initiatives" initiatives={serviceInitiatives} />
      </div>

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
