import Image from "next/image";
import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { PendingNote } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPrograms } from "@/lib/content";
import { mentorshipFeature } from "@/content/home";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mentorship",
  description:
    "Mentorship connects emerging leaders with experienced professionals for guidance, perspective, and relationships. Become a mentor or explore the future Ambassador pathway.",
  path: "/mentorship",
});

export default async function MentorshipPage() {
  const { mentorship } = await getPrograms();

  return (
    <>
      <PageHero
        eyebrow="Pathway 02 · Mentorship"
        title={
          <>
            People help you <em className="text-evergreen-700">walk through it.</em>
          </>
        }
        intro={mentorship.intro}
        image={media.mentorshipGenerational}
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
                <h3 className="mt-2 font-serif text-h3 text-evergreen-900">{p.title}</h3>
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
                  <ButtonLink href="/contact" variant="outline" arrow>
                    Register interest
                  </ButtonLink>
                </div>
              </div>
              <div className={i === 0 ? "lg:col-span-5 lg:col-start-8" : "lg:order-1 lg:col-span-5"} data-reveal="image">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                  <Image
                    src={i === 0 ? media.mentorshipPeers.src : media.communityProfessionals.src}
                    alt={i === 0 ? media.mentorshipPeers.alt : media.communityProfessionals.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    style={{ objectPosition: i === 0 ? media.mentorshipPeers.focus : "50% 20%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
