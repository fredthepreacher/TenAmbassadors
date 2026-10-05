import Image from "next/image";
import type { Media } from "@/lib/types";
import { PhotoCredit } from "@/components/ui/PhotoCredit";

type Tile = { id: string; media: Media | null; awaiting: string };

/**
 * George's four-photo collage, directly below the hero, set as an editorial spread with a clear
 * hierarchy instead of four frames of equal weight. Geo meeting revision (2026-10-04):
 *   a  two women — the lead, dominant frame
 *   b  business-card exchange — the smaller supporting frame
 *   d  mixed group · c seated conversation — context ("the relationships that follow")
 * Frames never overlap, and every frame shape was chosen for its photograph: each crop keeps
 * all faces and the card-exchange hands (docs/PHOTO_ART_DIRECTION.md).
 */
const frame: Record<string, { cls: string; sizes: string; focus: string; narrow?: boolean }> = {
  // 1300×1625 portrait: framed from the top, so both faces, hair and shoulders stay whole at every width.
  a: { cls: "collage-frame--a", sizes: "(max-width: 1023px) 92vw, 52vw", focus: "50% 0%" },
  // 1536×1025: a square centred on the exchange keeps both faces and the hands with the card; the guest
  // at the photo's right edge (already cut by the original frame) falls fully outside the square.
  b: { cls: "collage-frame--b", sizes: "(max-width: 1023px) 46vw, 30vw", focus: "48% 50%", narrow: true },
  // 2048×1536: three people across the upper half; centred crop keeps all three.
  d: { cls: "collage-frame--d", sizes: "(max-width: 1023px) 46vw, 38vw", focus: "50% 0%", narrow: true },
  // 1024×819: four seated speakers; a wide crop from near the top keeps every head.
  c: { cls: "collage-frame--c", sizes: "(max-width: 1023px) 92vw, 54vw", focus: "50% 6%" },
};

export function Collage({ eyebrow, title, tiles }: { eyebrow: string; title: readonly string[]; tiles: readonly Tile[] }) {
  // Client direction (2026-10-02): no placeholders or stand-ins. The collage
  // appears only once all four client-selected photos are in place.
  if (tiles.some((t) => !t.media)) return null;
  const order = ["a", "b", "d", "c"];
  const sorted = order.map((id) => tiles.find((t) => t.id === id)!).filter(Boolean);

  return (
    <section id="in-the-room" aria-labelledby="collage-title" className="relative overflow-hidden bg-ivory py-14 md:py-20">
      <div className="container-x">
        <div className="collage">
          <header className="collage-head" data-reveal>
            <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
            <h2 id="collage-title" className="mt-4 text-h3 font-sans font-semibold tracking-[-0.02em] text-navy-900">
              {title[0]} <em className="text-royal-700">{title[1]}</em>
            </h2>
          </header>

          {sorted.map((t, i) => {
            const f = frame[t.id];
            return (
              <figure key={t.id} className={`collage-tile collage-tile--${t.id} group`} data-touch-lit>
                <div
                  className={`photo photo-edge relative h-full bg-stone ${f.cls}`}
                  data-reveal="image"
                  style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
                >
                  <Image src={t.media!.src} alt={t.media!.alt} fill sizes={f.sizes} className="object-cover" style={{ objectPosition: f.focus }} />
                  {/* Narrow phone frames (b, d): the label sits just below the frame instead of over the photo. */}
                  <PhotoCredit src={t.media!.src} className={f.narrow ? "max-sm:hidden" : undefined} />
                </div>
                {f.narrow ? <PhotoCredit src={t.media!.src} className="photo-credit--below hidden max-sm:block" /> : null}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
