import Image from "next/image";
import type { Media } from "@/lib/types";
import { ButtonLink, TextLink } from "@/components/ui/Button";

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
  return (
    <section id="mentorship" aria-labelledby="mentorship-title" className="section-y overflow-hidden bg-ivory">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="relative self-start pb-20 sm:pb-28 lg:col-span-6 lg:pb-24">
          <figure className="relative w-[82%] sm:w-[70%] lg:w-[78%]">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone" data-reveal="image">
              <Image
                src={images.generational.src}
                alt={images.generational.alt}
                fill
                sizes="(max-width: 1024px) 80vw, 38vw"
                className="object-cover"
                style={{ objectPosition: images.generational.focus }}
              />
            </div>
          </figure>
          <figure className="absolute right-0 bottom-0 w-[62%] sm:w-[52%] lg:w-[58%]">
            <div className="relative aspect-[1150/820] overflow-hidden border-[6px] border-ivory bg-stone shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] sm:border-8" data-reveal="image">
              <Image
                src={images.peers.src}
                alt={images.peers.alt}
                fill
                sizes="(max-width: 1024px) 60vw, 28vw"
                className="object-cover"
                style={{ objectPosition: images.peers.focus }}
              />
            </div>
          </figure>
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:pl-6">
          <div data-reveal>
            <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
            <h2 id="mentorship-title" className="mt-5 text-h2">
              {title}
            </h2>
            <p className="mt-6 text-lede text-ink-2">{body}</p>
          </div>
          <ol className="mt-10 grid border-t border-line" data-reveal>
            {pillars.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-5 sm:grid-cols-[2.5rem_10rem_1fr]">
                <span className="pt-1 text-xs font-semibold tracking-[0.14em] text-gold-ink">0{i + 1}</span>
                <h3 className="font-serif text-2xl text-evergreen-900">{p.title}</h3>
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
