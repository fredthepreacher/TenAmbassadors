import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";
import { PendingBlock } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getScholarships } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Scholarship",
  description:
    "Scholarship is where the Ten Ambassadors pathway begins — opportunity that opens the door. Explore the Dr. Christopher A. Phang Scholarship and future scholarships.",
  path: "/scholarship",
});

const statusLabel = { "in-development": "In development", open: "Applications open", closed: "Applications closed" } as const;

export default async function ScholarshipPage() {
  const scholarships = await getScholarships();

  return (
    <>
      <PageHero
        eyebrow="Pathway 01 · Scholarship"
        title={
          <>
            Opportunity <em className="text-royal-700">opens the door.</em>
          </>
        }
        intro="Scholarship removes barriers — so talent and ambition can meet education, access, and possibility. It is the first stage of the Ten Ambassadors pathway, designed to connect with mentorship and service."
      />

      <section aria-labelledby="scholarships-title" className="section-y bg-paper">
        <div className="container-x">
          <SectionHeading id="scholarships-title" eyebrow="Scholarships" title="Every scholarship carries a story." />
          <ul className="mt-12 grid gap-10">
            {scholarships.map((s) => (
              <li key={s.slug} data-reveal>
                <Link href={`/scholarship/${s.slug}`} className="group grid gap-8 border-t border-line-strong pt-8 lg:grid-cols-12 lg:gap-12">
                  {s.video ? (
                    <div className="relative aspect-video overflow-hidden bg-night-950 lg:col-span-7">
                      <Image
                        src={s.video.featured.poster.src}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col justify-center lg:col-span-5">
                    <p className="eyebrow text-gold-ink">{statusLabel[s.status]}</p>
                    <h3 className="mt-4 text-h2 text-navy-900">{s.name}</h3>
                    {s.honoree.years ? <p className="mt-2 font-serif text-xl text-muted italic">{s.honoree.name} · {s.honoree.years}</p> : null}
                    <p className="mt-5 text-ink-2">{s.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-royal-700">
                      View scholarship <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="future" aria-labelledby="future-title" className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="future-title"
            eyebrow="Future scholarships"
            title="Room for more names on the door."
            intro="Additional scholarships — named, sponsored, or partner-funded — can be added using the same scholarship template."
            className="lg:col-span-6"
          />
          <div className="grid content-start gap-6 lg:col-span-5 lg:col-start-8" data-reveal>
            <PendingBlock title="Additional scholarships">No additional scholarships have been announced yet.</PendingBlock>
            <ButtonLink href="/partners" variant="outline" arrow className="w-fit">
              Fund a scholarship
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
