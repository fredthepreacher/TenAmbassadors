import Image from "next/image";
import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { PendingNote } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AreaList } from "@/components/pages/AreaList";
import { getPrograms } from "@/lib/content";
import { mentorshipFeature } from "@/content/home";
import { geoPending, media } from "@/content/media";

/*
 * Geo meeting revision (2026-10-04): the client-selected Mentorship photo (13 of 639, the version with
 * the two drinks removed) now leads the page, beside "Someone helps you walk through it." The Become a
 * Mentor track takes the photo the hero used before (2292), so no photo repeats on this page.
 * Geo point 5 (Future Ambassador pathway) is unchanged.
 */
const heroImage = geoPending.mentorshipTable.media ?? media.mentorshipGenerational;
const pathwayImages = [
  { ...media.mentorshipGenerational, focus: "50% 0%" },
  geoPending.futureAmbassadorStage.media ?? { ...media.communityProfessionals, focus: "50% 20%" },
];
import { pageMetadata } from "@/lib/seo";
import { PhotoCredit } from "@/components/ui/PhotoCredit";

export const metadata = pageMetadata({
  title: "Professional Mentorship for Emerging Leaders",
  description:
    "Ten Ambassadors mentorship connects emerging leaders with experienced professionals for guidance and lasting relationships. Become a mentor or learn more.",
  path: "/mentorship",
});

export default async function MentorshipPage() {
  const { mentorship, mentorshipIndustries, mentorshipFormats } = await getPrograms();

  return (
    <>
      <PageHero
        eyebrow="Pathway 02 · Mentorship"
        title={
          <>
            Someone helps you <em className="text-royal-700">walk through it.</em>
          </>
        }
        intro={mentorship.intro}
        image={heroImage}
      >
        <ButtonLink href="#become-a-mentor" arrow>
          Become a mentor
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="overview-title" className="section-y bg-paper">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <SectionHeading
            id="overview-title"
            eyebrow="Program overview"
            title={mentorshipFeature.title}
            intro={mentorshipFeature.body}
            className="lg:col-span-6"
          />
          <ol className="grid content-start border-t border-line lg:col-span-5 lg:col-start-8" data-reveal>
            {mentorshipFeature.pillars.map((p, i) => (
              <li key={p.title} className="border-b border-line py-6">
                <p className="text-xs font-semibold tracking-[0.14em] text-gold-ink">0{i + 1}</p>
                <h3 className="mt-2 font-serif text-h3 text-royal-700">{p.title}</h3>
                <p className="mt-2 text-ink-2">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
        {!mentorship.structure ? (
          <div className="container-x mt-10">
            <PendingNote>Mentorship structure (format, cohorts, duration) pending</PendingNote>
          </div>
        ) : null}
      </section>

      <AreaList
        id="industries"
        tone="ivory"
        eyebrow="Across industries"
        title={
          <>
            Accomplished professionals, <em className="text-royal-700">many fields.</em>
          </>
        }
        intro="Ten Ambassadors intends to connect emerging leaders with mentors across:"
        areas={mentorshipIndustries}
      />
      <AreaList
        id="formats"
        eyebrow="Future programming"
        title="Ways mentorship may take shape"
        intro="Potential formats include:"
        areas={mentorshipFormats}
      />

      <section aria-label="Mentorship pathways" className="bg-ivory">
        {mentorship.tracks.map((t, i) => (
          <div key={t.id} id={t.id} className="scroll-mt-24 border-b border-line">
            <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
              <div className={i === 0 ? "lg:col-span-6" : "lg:order-2 lg:col-span-6 lg:col-start-7"} data-reveal>
                <p className="eyebrow rule-before text-gold-ink">Pathway {String.fromCharCode(65 + i)}</p>
                <h2 className="mt-5 text-h2">{t.title}</h2>
                <p className="mt-6 text-lede text-ink-2">{t.body}</p>
                <PendingNote className="mt-6">{t.pending}</PendingNote>
                <div className="mt-8">
                  <ButtonLink href={t.id === "become-a-mentor" ? "/get-involved/mentor" : "/get-involved/ambassador"} variant="outline" arrow>
                    {t.id === "become-a-mentor" ? "Mentor application" : "Ambassador pathway"}
                  </ButtonLink>
                </div>
              </div>
              <div className={i === 0 ? "lg:col-span-5 lg:col-start-8" : "lg:order-1 lg:col-span-5"} data-reveal="image">
                <div className="photo photo-edge group relative aspect-[4/3] overflow-hidden bg-stone" data-touch-lit>
                  <Image
                    src={pathwayImages[i].src}
                    alt={pathwayImages[i].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    style={{ objectPosition: pathwayImages[i].focus }}
                  />
                  <PhotoCredit src={pathwayImages[i].src} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
