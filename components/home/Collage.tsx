import Image from "next/image";
import type { Media } from "@/lib/types";
import { PhotoCredit } from "@/components/ui/PhotoCredit";

type Tile = { id: string; media: Media | null; awaiting: string };

/** Frame shape per tile: chosen for each client photo's natural framing so no one is cropped out. */
const aspect: Record<string, string> = {
  a: "aspect-[4/3]",
  b: "aspect-[4/5]",
  c: "aspect-[4/5] lg:aspect-[3/2]",
  d: "aspect-[4/3]",
};

const sizes: Record<string, string> = {
  a: "(max-width: 1024px) 100vw, 56vw",
  b: "(max-width: 1024px) 50vw, 30vw",
  c: "(max-width: 1024px) 50vw, 38vw",
  d: "(max-width: 1024px) 92vw, 38vw",
};

/**
 * Geo point 2 — the editorial collage below the hero. Four client-selected
 * photos at varied scale, with one overlapping inset for depth. The frames
 * reveal in sequence. Hover (or mid-screen on touch) adds depth and a gold edge.
 */
export function Collage({ eyebrow, title, tiles }: { eyebrow: string; title: readonly string[]; tiles: readonly Tile[] }) {
  // Client direction (2026-10-02): no placeholders or stand-ins. The collage
  // appears only once all four client-selected photos are in place.
  if (tiles.some((t) => !t.media)) return null;

  return (
    <section id="in-the-room" aria-labelledby="collage-title" className="relative overflow-hidden bg-ivory pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="container-x">
        <div className="mb-10 max-w-2xl md:mb-14" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
          <h2 id="collage-title" className="mt-4 text-h3 font-sans font-semibold tracking-[-0.02em] text-navy-900">
            {title[0]} <em className="text-royal-700">{title[1]}</em>
          </h2>
        </div>

        <div className="collage">
          {tiles.map((t, i) => (
            <figure key={t.id} className={`collage-tile collage-tile--${t.id} group`} data-touch-lit>
              <div
                className={`photo photo-edge relative ${aspect[t.id]} bg-stone`}
                data-reveal="image"
                style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
              >
                {t.media ? (
                  <>
                    <Image
                      src={t.media.src}
                      alt={t.media.alt}
                      fill
                      sizes={sizes[t.id]}
                      className="object-cover"
                      style={{ objectPosition: t.media.focus }}
                    />
                    <PhotoCredit src={t.media.src} />
                  </>
                ) : (
                  <div className="collage-pending" role="note">
                    <span className="mx-auto size-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                    <p className="text-xs font-semibold tracking-[0.14em] text-gold-ink uppercase">Awaiting client photo</p>
                    <p className="mx-auto max-w-[26ch] text-sm leading-snug">{t.awaiting}</p>
                  </div>
                )}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
