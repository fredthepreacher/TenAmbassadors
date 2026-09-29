import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Purpose } from "@/components/home/Purpose";
import { SmsStory } from "@/components/home/SmsStory";
import { InMotion } from "@/components/home/InMotion";
import { FeaturedScholarship } from "@/components/home/FeaturedScholarship";
import { MentorshipFeature } from "@/components/home/MentorshipFeature";
import { ServiceFeature } from "@/components/home/ServiceFeature";
import { StarlightFeature } from "@/components/home/StarlightFeature";
import { GlobalVision } from "@/components/home/GlobalVision";
import { PartnersFeature } from "@/components/home/PartnersFeature";
import { GetInvolved } from "@/components/home/GetInvolved";
import { Closing } from "@/components/home/Closing";
import { JourneyIndicator } from "@/components/home/JourneyIndicator";
import { getHomepage, getPartners, getPathways, getPrograms, getStarlight } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [home, programs, starlight, partners, pathways] = await Promise.all([
    getHomepage(),
    getPrograms(),
    getStarlight(),
    getPartners(),
    getPathways(),
  ]);

  return (
    <>
      <Hero {...home.hero} stages={home.smsStages} />
      <Purpose {...home.purpose} />
      <SmsStory {...home.smsIntro} stages={home.smsStages} />
      <InMotion {...home.inMotion} />
      <FeaturedScholarship scholarship={home.featuredScholarship} />
      <MentorshipFeature {...home.mentorshipFeature} />
      <ServiceFeature {...home.serviceFeature} initiatives={programs.serviceInitiatives} />
      <GlobalVision {...home.globalVision} />
      <StarlightFeature {...home.starlightFeature} pillars={starlight.pillars} actions={starlight.actions} />
      <PartnersFeature categories={partners.partnerCategories} partners={partners.partners} />
      <GetInvolved pathways={pathways} />
      <Closing {...home.closing} />
      <JourneyIndicator />
    </>
  );
}
