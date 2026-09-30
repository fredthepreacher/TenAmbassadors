import Image from "next/image";
import type { Media, VideoAsset } from "@/lib/types";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { PendingNote } from "@/components/ui/Pending";
import { AmbientVideo } from "@/components/ui/AmbientVideo";

/**
 * "One Community. Many Networks." — wide cinematic photograph (IMG_4007),
 * then the network-of-networks idea. No organization is presented as a
 * partner until confirmed.
 */
export function NetworkFeature({
  eyebrow,
  title,
  lede,
  body,
  image,
  video,
  videoCinematic,
  videoCaption,
  types,
}: {
  eyebrow: string;
  title: string[];
  lede: string;
  body: string;
  image: Media;
  video?: VideoAsset;
  videoCinematic?: { src: string; poster: Media };
  videoCaption?: string;
  types: string[];
}) {
  return (
    <section id="network" aria-labelledby="network-title" className="relative bg-ivory">
      <figure className="group relative">
        <div className="photo relative aspect-[4/3] bg-navy-900 sm:aspect-[16/8] lg:aspect-[21/8.5]" data-reveal="image">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="drift object-cover"
            style={{ objectPosition: image.focus }}
          />
          {/* Base gradient only (below faces) for the title overlap. */}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(8_27_51/0.92)_0%,rgb(8_27_51/0.5)_22%,rgb(8_27_51/0)_45%)]" aria-hidden="true" />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-x pb-8 text-paper sm:pb-12" data-reveal>
            <p className="eyebrow text-gold-300">{eyebrow}</p>
            <h2 id="network-title" className="mt-3 text-h1">
              {title[0]} <em className="text-gold-300">{title[1]}</em>
            </h2>
          </div>
        </div>
      </figure>

      <div className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-y-14">
        <div className="lg:col-span-6 lg:row-start-1" data-reveal>
          <p className="font-serif text-h3 text-royal-700 italic">{lede}</p>
          <p className="mt-6 text-lede text-ink-2">{body}</p>
          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="/network-partners#apply" arrow>
              Become a Network Partner
            </ButtonLink>
            <TextLink href="/network-partners">How it works</TextLink>
          </div>
        </div>
        {video ? (
          <AmbientVideo
            video={video}
            cinematic={videoCinematic}
            caption={videoCaption ?? ""}
            sizes="(max-width: 1024px) 100vw, 36vw"
            className="w-full sm:mx-auto sm:w-4/5 cine:mx-auto cine:max-w-[calc((100svh-7rem)*16/9)] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:w-auto lg:max-w-none"
          />
        ) : null}
        <div className={video ? "lg:col-span-6 lg:row-start-2" : "lg:col-span-5 lg:col-start-8"} data-reveal>
          <h3 className="eyebrow text-gold-ink">Networks we hope to connect</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {types.map((t) => (
              <li key={t} className="rounded-full border border-line-strong bg-paper px-3.5 py-1.5 text-sm text-ink-2">
                {t}
              </li>
            ))}
          </ul>
          <PendingNote className="mt-6">No Network Partners have been announced yet</PendingNote>
        </div>
      </div>
    </section>
  );
}
