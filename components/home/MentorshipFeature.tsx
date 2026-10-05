import Image from "next/image";
import type { Media } from "@/lib/types";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { site } from "@/lib/site";

/**
 * Hidden, not deleted (Geo meeting revision): the mentor-story caption labels on the two portraits.
 * Set to true, or wire to a confirmed mentor story in content, when Geo supplies one.
 */
const showMentorStory = site.showPlaceholderNotes;

/** Mentorship — the chapter that breathes: human scale, overlapping portraits, a connecting line. */
export function MentorshipFeature({
  eyebrow,
  title,
  body,
  pillars,
  images,
}: {
  eyebrow: string;
  title: string;
  body: string;
  pillars: { title: string; body: string }[];
  images: { generational: Media; conversation: Media };
}) {
  const [lead, tail] = title.split(" who have ");
  return (
    <section id="mentorship" aria-labelledby="mentorship-title" className="section-y relative overflow-hidden bg-ivory">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="relative self-start lg:col-span-6">
          <figure className="group relative w-full max-w-[34rem]" data-touch-lit>
            <div className="photo photo-edge relative aspect-[4/5] bg-stone" data-reveal="image">
              <Image
                src={images.generational.src}
                alt={images.generational.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                style={{ objectPosition: images.generational.focus }}
              />
              {/* TODO: Restore mentor story/testimonial when Geo supplies a confirmed mentor and approved copy.
                  (Geo meeting, 2026-10-04: the caption label below told a mentor story about people who are not
                  confirmed mentors, so it is hidden from the public site, not deleted.) */}
              {showMentorStory ? (
                <span className="photo-caption absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-royal-800 uppercase">
                  Across generations
                </span>
              ) : null}
              <PhotoCredit src={images.generational.src} />
            </div>
          </figure>

          {/* Client reminder, 2026-10-05: the secondary red-lit Upmixer event image was explicitly
              requested to be deleted from this homepage section. Keep the source asset in the repo
              for archival/reference purposes, but do not render it publicly. */}
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:pl-6">
          <div data-reveal>
            <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
            <h2 id="mentorship-title" className="mt-5 text-h2 text-navy-900">
              {tail ? (
                <>
                  {lead} who have <em className="text-royal-700">{tail}</em>
                </>
              ) : (
                title
              )}
            </h2>
            <p className="mt-6 text-lede text-ink-2">{body}</p>
          </div>
          <ol className="mt-8 grid border-t border-line">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-4 sm:grid-cols-[2.5rem_10rem_1fr]"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <span className="pt-1 text-xs font-semibold tracking-[0.14em] text-gold-ink">0{i + 1}</span>
                <h3 className="text-2xl text-navy-900 transition-colors group-hover:text-royal-700">{p.title}</h3>
                <p className="col-start-2 text-ink-2 sm:col-start-3">{p.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="/mentorship#become-a-mentor" arrow>
              Become a mentor
            </ButtonLink>
            <TextLink href="/mentorship#ambassador-pathway">Future Ambassador pathway</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
