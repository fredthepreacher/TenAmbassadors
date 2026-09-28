import { Hero } from "@/components/sections/Hero";
import { Origin } from "@/components/sections/Origin";
import { Pillars } from "@/components/sections/Pillars";
import { FeaturedStory } from "@/components/sections/FeaturedStory";
import { Gallery } from "@/components/sections/Gallery";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { Opportunities } from "@/components/sections/Opportunities";
import { Starlight } from "@/components/sections/Starlight";
import { Partners } from "@/components/sections/Partners";
import { GetInvolved } from "@/components/sections/GetInvolved";
import { getHomepage } from "@/lib/content";

export default async function HomePage() {
  const home = await getHomepage();

  return (
    <>
      <Hero {...home.hero} pillars={home.pillars} />
      <Origin {...home.origin} />
      <Pillars pillars={home.pillars} />
      <FeaturedStory story={home.featuredStory} />
      <Gallery items={home.gallery} />
      <ImpactMetrics metrics={home.metrics} />
      <Opportunities items={home.opportunities} />
      <Starlight block={home.starlight} />
      <Partners partners={home.partners} />
      <GetInvolved pathways={home.pathways} />
    </>
  );
}
