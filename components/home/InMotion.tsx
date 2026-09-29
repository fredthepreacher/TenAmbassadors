import Image from "next/image";
import type { Media } from "@/lib/types";

/**
 * Photography-led chapter. Frames lift into view, drift 2–3% with scroll
 * (CSS scroll-driven, off for reduced motion), and reveal a label on hover.
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
  const [t1, t2] = title.split(" through ");
  return (
    <section aria-labelledby="motion-title" className="section-y relative overflow-hidden bg-ivory">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <header className="lg:col-span-4" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
          <h2 id="motion-title" className="mt-5 text-h2 text-navy-900">
            {t2 ? (
              <>
                {t1} through <em className="text-royal-700">{t2}</em>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="mt-6 max-w-md text-lede text-ink-2">{body}</p>
        </header>

        <div className="relative pb-[34%] sm:pb-[22%] lg:col-span-8 lg:pb-[16%] lg:pl-[14%]">
          {/* Connective line — the SMS geometry linking the two frames */}
          <svg
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-[6%] left-[20%] z-10 hidden h-[40%] w-[30%] lg:block"
            aria-hidden="true"
          >
            <path d="M0 300 C 120 300, 180 60, 400 20" fill="none" stroke="var(--color-gold-500)" strokeWidth="1.5" strokeDasharray="3 6" />
          </svg>

          <figure className="group">
            <div className="photo relative aspect-[3/2] bg-stone" data-reveal="image">
              <Image
                src={images.lead.src}
                alt={images.lead.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="drift object-cover"
                style={{ objectPosition: images.lead.focus }}
              />
              <span className="photo-caption absolute right-4 bottom-4 rounded-full bg-navy-900/80 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-paper uppercase backdrop-blur">
                Connection
              </span>
            </div>
          </figure>

          <figure className="group absolute bottom-0 left-0 w-[46%] sm:w-[34%] lg:w-[32%]">
            <div
              className="photo relative aspect-[4/5] border-[6px] border-ivory bg-stone shadow-[0_30px_60px_-30px_rgb(8_27_51/0.55)] sm:border-8"
              data-reveal="image"
              style={{ ["--reveal-delay" as string]: "140ms" }}
            >
              <Image
                src={images.side.src}
                alt={images.side.alt}
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 34vw, 22vw"
                className="drift object-cover"
                style={{ objectPosition: images.side.focus }}
              />
              <span className="photo-caption absolute bottom-3 left-3 rounded-full bg-navy-900/80 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-paper uppercase backdrop-blur">
                Community
              </span>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
