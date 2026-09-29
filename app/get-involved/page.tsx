import { GetInvolved } from "@/components/home/GetInvolved";
import { ButtonLink } from "@/components/ui/Button";
import { PendingBlock } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPathways } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get Involved",
  description: "Become a mentor, volunteer, partner with us, support the mission, or explore scholarship opportunities with Ten Ambassadors.",
  path: "/get-involved",
});

export default async function GetInvolvedPage() {
  const pathways = await getPathways();

  return (
    <>
      <div className="bg-paper pt-[76px]">
        <GetInvolved pathways={pathways} headingLevel="h1" />
      </div>

      <section id="support" aria-labelledby="support-title" className="section-y scroll-mt-20 bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="support-title"
            eyebrow="Support the mission"
            title="Invest in opportunity."
            intro="Gifts will help fund scholarships, mentorship programming, and service initiatives."
            className="lg:col-span-6"
          />
          <div className="grid content-start gap-6 lg:col-span-5 lg:col-start-8" data-reveal>
            {site.donation.url ? (
              <ButtonLink href={site.donation.url} arrow>
                Give now
              </ButtonLink>
            ) : (
              <PendingBlock title="Online giving is being set up">
                A secure donation option will be connected here once the organization selects its giving provider. For
                major gifts or partnership support, please get in touch.
              </PendingBlock>
            )}
            <ButtonLink href="/contact" variant="outline" arrow className="w-fit">
              Contact the team
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
