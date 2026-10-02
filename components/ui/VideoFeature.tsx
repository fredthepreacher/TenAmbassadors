"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { VideoAsset } from "@/lib/types";
import { cn } from "@/lib/cn";
import { PlayIcon } from "./Icons";
import { PhotoCredit } from "@/components/ui/PhotoCredit";

/**
 * Click-to-play editorial video. Only the poster (optimized by next/image)
 * loads with the page; the MP4 is fetched when the visitor presses play.
 * Captions render automatically once `video.captions` is supplied.
 *
 * Mobile/iOS: the <video> is committed synchronously and play() is called
 * inside the tap, so Safari starts playback (with sound) on the first tap.
 * The optimized poster stays on top until a frame has been painted, then
 * dissolves — no black flash and no second, unoptimized poster download.
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
  const [active, setActive] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const start = () => {
    flushSync(() => setActive(true)); // the <video> now exists — still inside the tap
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => setStarted(true)); // if refused, reveal the native controls
    // Slow network: after a moment, reveal the native player (and its loading state) anyway.
    window.setTimeout(() => setStarted(true), 1500);
    v.focus();
  };

  const onPlaying = (v: HTMLVideoElement) => {
    type RVFC = HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number };
    const rv = v as RVFC;
    if (rv.requestVideoFrameCallback) rv.requestVideoFrameCallback(() => setStarted(true));
    else setStarted(true);
  };

  return (
    <figure className={cn("relative overflow-hidden rounded-[1.25rem] bg-night-950 shadow-[0_40px_90px_-40px_rgb(0_0_0/0.55)]", className)}>
      <div className="group relative aspect-video">
        {active ? (
          <video
            ref={ref}
            className="absolute inset-0 size-full bg-night-950 object-contain"
            src={video.src}
            controls
            playsInline
            preload="auto"
            aria-label={video.title}
            onPlaying={(e) => onPlaying(e.currentTarget)}
            onEnded={() => ref.current?.blur()}
          >
            {video.captions ? <track kind="captions" src={video.captions} srcLang="en" label="English" default /> : null}
          </video>
        ) : null}

        {/* Poster layer: interactive before play; then holds until the first frame is painted. */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            active ? "pointer-events-none" : "",
            started ? "opacity-0" : "opacity-100",
          )}
          aria-hidden={active ? true : undefined}
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
          <PhotoCredit src={video.poster.src} />
        </div>

        {!active ? (
          <button
            type="button"
            onClick={start}
            className="absolute inset-0 size-full cursor-pointer text-left"
            aria-label={`Play video: ${video.title} (${video.durationLabel})`}
          >
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
        ) : null}
      </div>
    </figure>
  );
}
