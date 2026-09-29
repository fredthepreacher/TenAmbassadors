import Image from "next/image";
import type { Media } from "@/lib/types";

/**
 * Editorial collage of community imagery. A slow scroll-linked drift (CSS
 * scroll-driven animation, disabled for reduced motion) gives the frames life
 * without JavaScript.
 */
export function InMotion({
  eyebrow,
  title,
  body,
  images,
}: {
  eyebrow: string;
  title: string;
  body: string;
  images: { lead: Media; side: Media };
}) {
  return (
    <section aria-labelledby="motion-title" className="section-y overflow-hidden bg-ivory">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <header className="lg:col-span-4" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
          <h2 id="motion-title" className="mt-5 text-h2">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-lede text-ink-2">{body}</p>
        </header>

        <div className="relative pb-[34%] sm:pb-[22%] lg:col-span-8 lg:pb-[16%] lg:pl-[14%]">
          <figure>
            <div className="relative aspect-[3/2] overflow-hidden bg-stone" data-reveal="image">
              <Image
                src={images.lead.src}
                alt={images.lead.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="drift object-cover"
                style={{ objectPosition: images.lead.focus }}
              />
            </div>
            <figcaption className="mt-3 text-right text-sm text-muted">Connection</figcaption>
          </figure>

          <figure className="absolute bottom-0 left-0 w-[46%] sm:w-[34%] lg:w-[32%]">
            <div
              className="relative aspect-[4/5] overflow-hidden border-[6px] border-ivory bg-stone shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] sm:border-8"
              data-reveal="image"
            >
              <Image
                src={images.side.src}
                alt={images.side.alt}
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 34vw, 22vw"
                className="drift object-cover"
                style={{ objectPosition: images.side.focus }}
              />
            </div>
            <figcaption className="mt-2 text-sm text-muted">Community</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
