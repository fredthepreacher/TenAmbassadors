"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { VideoAsset } from "@/lib/types";
import { cn } from "@/lib/cn";
import { PlayIcon } from "./Icons";

/**
 * Click-to-play editorial video. Only the poster (optimized by next/image)
 * loads with the page; the MP4 is fetched when the visitor presses play.
 * Captions render automatically once `video.captions` is supplied.
 */
export function VideoFeature({
  video,
  className,
  sizes = "(max-width: 1024px) 100vw, 60vw",
  priority = false,
}: {
  video: VideoAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <figure className={cn("relative overflow-hidden rounded-[1.25rem] bg-night-950 shadow-[0_40px_90px_-40px_rgb(0_0_0/0.55)]", className)}>
      <div className="relative aspect-video">
        {playing ? (
          <video
            ref={ref}
            className="absolute inset-0 size-full bg-black object-contain"
            src={video.src}
            poster={video.poster.src}
            controls
            autoPlay
            playsInline
            preload="auto"
            aria-label={video.title}
            onEnded={() => ref.current?.blur()}
          >
            {video.captions ? <track kind="captions" src={video.captions} srcLang="en" label="English" default /> : null}
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full cursor-pointer text-left"
            aria-label={`Play video: ${video.title} (${video.durationLabel})`}
          >
            <Image
              src={video.poster.src}
              alt=""
              fill
              sizes={sizes}
              preload={priority}
              className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
              style={{ objectPosition: video.poster.focus }}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-night-950/75 via-night-950/10 to-transparent" aria-hidden="true" />
            <span className="absolute bottom-5 left-5 flex items-center gap-4 md:bottom-7 md:left-7">
              <span className="grid size-16 place-items-center rounded-full bg-paper/95 text-royal-700 transition-transform duration-500 group-hover:scale-105 md:size-20">
                <PlayIcon className="ml-1 size-6 md:size-7" />
              </span>
              <span className="text-paper">
                <span className="block text-sm font-semibold">Watch the film</span>
                <span className="block text-sm text-paper/75">{video.durationLabel}</span>
              </span>
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}
