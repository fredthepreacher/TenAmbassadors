import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Collage } from "@/components/home/Collage";
import { Purpose } from "@/components/home/Purpose";
import { SmsStory } from "@/components/home/SmsStory";
import { FeaturedScholarship } from "@/components/home/FeaturedScholarship";
import { MentorshipFeature } from "@/components/home/MentorshipFeature";
import { ServiceFeature } from "@/components/home/ServiceFeature";
import { StarlightFeature } from "@/components/home/StarlightFeature";
import { GlobalVision } from "@/components/home/GlobalVision";
import { WhyTen } from "@/components/home/WhyTen";
import { NetworkFeature } from "@/components/home/NetworkFeature";
import { ImpactFeature } from "@/components/home/ImpactFeature";
import { GetInvolved } from "@/components/home/GetInvolved";
import { Closing } from "@/components/home/Closing";
import { JourneyIndicator } from "@/components/home/JourneyIndicator";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getAbout, getHomepage, getImpact, getPartners, getPathways, getPrograms, getStarlight } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: site.name,
  absoluteTitle: `${site.name} | ${site.tagline}`,
  description: site.description,
  path: "/",
});

export default async function HomePage() {
  const [home, programs, starlight, partners, pathways, org, impact] = await Promise.all([
    getHomepage(),
    getPrograms(),
    getStarlight(),
    getPartners(),
    getPathways(),
    getAbout(),
    getImpact(),
  ]);

  return (
    <>
      <Hero {...home.hero} stages={home.smsStages} />
      <Collage {...home.collage} />
      <Purpose {...home.purpose} />
      <WhyTen {...org.whyTen} ecosystem={org.ecosystem} />
      <SmsStory {...home.smsIntro} stages={home.smsStages} />
      <FeaturedScholarship scholarship={home.featuredScholarship} />
      <MentorshipFeature {...home.mentorshipFeature} />
      <ServiceFeature {...home.serviceFeature} initiatives={programs.serviceInitiatives} />
      <NetworkFeature {...home.networkFeature} types={partners.networkPartnerTypes} />
      <GlobalVision {...home.globalVision} />
      <StarlightFeature {...home.starlightFeature} pillars={starlight.pillars} actions={starlight.actions} event={starlight.nextEvent} />
      <ImpactFeature {...impact} />
      <GetInvolved pathways={pathways} />
      <Closing {...home.closing} />
      <JourneyIndicator />
    </>
  );
}
