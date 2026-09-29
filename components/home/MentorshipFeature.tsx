import Image from "next/image";
import type { Media } from "@/lib/types";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { PendingNote } from "@/components/ui/Pending";

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
  images: { generational: Media; peers: Media };
}) {
  const [lead, tail] = title.split(" who have ");
  return (
    <section id="mentorship" aria-labelledby="mentorship-title" className="section-y relative overflow-hidden bg-ivory">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="relative self-start pb-20 sm:pb-28 lg:col-span-6 lg:pb-24">
          <figure className="group relative w-[82%] sm:w-[70%] lg:w-[78%]">
            <div className="photo relative aspect-[4/5] bg-stone" data-reveal="image">
              <Image
                src={images.generational.src}
                alt={images.generational.alt}
                fill
                sizes="(max-width: 1024px) 80vw, 38vw"
                className="object-cover"
                style={{ objectPosition: images.generational.focus }}
              />
              <span className="photo-caption absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-royal-800 uppercase">
                Across generations
              </span>
            </div>
          </figure>

          {/* Connecting line between the two relationships */}
          <svg viewBox="0 0 200 200" className="pointer-events-none absolute right-[4%] bottom-[34%] z-10 w-[26%]" aria-hidden="true">
            <path d="M10 10 C 120 10, 190 80, 180 190" fill="none" stroke="var(--color-gold-500)" strokeWidth="1.5" strokeDasharray="3 6" />
            <circle cx="10" cy="10" r="4" fill="var(--color-gold-500)" />
            <circle cx="180" cy="190" r="4" fill="var(--color-gold-500)" />
          </svg>

          <figure className="group absolute right-0 bottom-0 w-[62%] sm:w-[52%] lg:w-[58%]">
            <div
              className="photo relative aspect-[1150/820] border-[6px] border-ivory bg-stone shadow-[0_30px_60px_-30px_rgb(8_27_51/0.5)] sm:border-8"
              data-reveal="image"
              style={{ ["--reveal-delay" as string]: "140ms" }}
            >
              <Image
                src={images.peers.src}
                alt={images.peers.alt}
                fill
                sizes="(max-width: 1024px) 60vw, 28vw"
                className="object-cover"
                style={{ objectPosition: images.peers.focus }}
              />
              <span className="photo-caption absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-royal-800 uppercase">
                Among peers
              </span>
            </div>
          </figure>
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
          <ol className="mt-10 grid border-t border-line">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-5 sm:grid-cols-[2.5rem_10rem_1fr]"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <span className="pt-1 text-xs font-semibold tracking-[0.14em] text-gold-ink">0{i + 1}</span>
                <h3 className="text-2xl text-navy-900 transition-colors group-hover:text-royal-700">{p.title}</h3>
                <p className="col-start-2 text-ink-2 sm:col-start-3">{p.body}</p>
              </li>
            ))}
          </ol>

          {/* Future mentor stories — architecture only; no invented quotes. */}
          <figure className="mt-10 rounded-2xl border border-dashed border-line-strong bg-paper/70 p-6" data-reveal>
            <span className="block font-serif text-5xl leading-none text-gold-500" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="-mt-2 font-serif text-xl text-ink-2 italic">A mentor&rsquo;s story, in their own words, will appear here.</blockquote>
            <figcaption className="mt-4">
              <PendingNote>Approved mentor and mentee stories pending</PendingNote>
            </figcaption>
          </figure>

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
