"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { VideoAsset } from "@/lib/types";
import { cn } from "@/lib/cn";
import { PauseIcon, PlayIcon, SoundIcon } from "./Icons";

type Mode = "idle" | "ambient" | "paused" | "sound";

/**
 * Ambient community film — page first, video when needed.
 *
 * - Nothing but the optimized poster loads with the page. The MP4 source is
 *   attached only when the figure approaches the viewport.
 * - Plays muted, inline and looping while at least ~40% visible; pauses
 *   off-screen. There is never autoplay audio.
 * - Reduced motion or Save-Data: no autoplay — the poster stays, with a
 *   play control.
 * - A visible Pause/Play control (WCAG 2.2.2) and a "Play with sound" option
 *   that restarts the film with native controls.
 */
export function AmbientVideo({
  video,
  caption,
  className,
  sizes = "(max-width: 1024px) 100vw, 40vw",
}: {
  video: VideoAsset;
  caption: string;
  className?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [attached, setAttached] = useState(false);
  const [started, setStarted] = useState(false); // first frame is on screen
  const allowAuto = useRef(true);
  const userPaused = useRef(false);
  const visible = useRef(false);
  const soundOn = useRef(false);

  const tryAmbient = () => {
    const v = ref.current;
    if (!v || !v.src || !allowAuto.current || userPaused.current || soundOn.current || !visible.current) return;
    v.muted = true;
    v.play().then(
      () => setMode((m) => (m === "sound" ? m : "ambient")),
      () => setMode("paused"),
    );
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    allowAuto.current = !reduce && !saveData;
    const fig = figureRef.current;
    if (!fig || !allowAuto.current || !("IntersectionObserver" in window)) return;

    // 1) Attach the source shortly before the film scrolls into view.
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setAttached(true);
          near.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    near.observe(fig);

    // 2) Play only while meaningfully visible; pause (without losing place) when it leaves.
    const vis = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting && e.intersectionRatio >= 0.4;
        const v = ref.current;
        if (visible.current) tryAmbient();
        else if (v && !v.paused && !soundOn.current) v.pause();
      },
      { threshold: [0, 0.4] },
    );
    vis.observe(fig);
    return () => {
      near.disconnect();
      vis.disconnect();
    };
  }, []);

  // Once the source is attached, start if the figure is already in view.
  useEffect(() => {
    if (attached) tryAmbient();
  }, [attached]);

  const playAmbient = () => {
    const v = ref.current;
    if (!v) return;
    userPaused.current = false;
    soundOn.current = false;
    v.loop = true;
    v.muted = true;
    v.play().then(() => setMode("ambient"), () => setMode("paused"));
  };

  const togglePause = () => {
    const v = ref.current;
    if (!attached) {
      setAttached(true);
      requestAnimationFrame(playAmbient);
      return;
    }
    if (!v) return;
    if (v.paused) playAmbient();
    else {
      userPaused.current = true;
      v.pause();
      setMode("paused");
    }
  };

  const playWithSound = () => {
    setAttached(true);
    soundOn.current = true;
    setMode("sound");
    requestAnimationFrame(() => {
      const v = ref.current;
      if (!v) return;
      v.muted = false;
      v.loop = false;
      v.currentTime = 0;
      v.play().catch(() => undefined);
      v.focus();
    });
  };

  const sound = mode === "sound";
  const playing = mode === "ambient";

  return (
    <figure ref={figureRef} className={cn("group", className)}>
      <div className="photo relative aspect-[4/5] overflow-hidden bg-navy-900" data-reveal="image">
        <video
          ref={ref}
          className="absolute inset-0 size-full object-cover"
          src={attached ? video.src : undefined}
          muted={!sound}
          loop={!sound}
          playsInline
          preload="none"
          controls={sound}
          aria-label={`${video.title} (${video.durationLabel})`}
          onPlaying={() => setStarted(true)}
          onEnded={() => {
            soundOn.current = false;
            userPaused.current = true;
            setMode("paused");
          }}
          tabIndex={sound ? 0 : -1}
        />
        {/* Optimized poster (next/image). Fades once the first frame plays, so there is no duplicate poster request. */}
        <Image
          src={video.poster.src}
          alt=""
          fill
          sizes={sizes}
          className={cn(
            "pointer-events-none object-cover transition-opacity duration-700",
            started ? "opacity-0" : "opacity-100",
          )}
          style={{ objectPosition: video.poster.focus }}
        />
        {!sound ? (
          <>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/70 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-2 sm:inset-x-4 sm:bottom-4">
              <button
                type="button"
                onClick={togglePause}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-paper/92 px-4 text-sm font-semibold text-navy-900 transition-colors hover:bg-paper"
                aria-label={playing ? "Pause video" : "Play video (muted)"}
              >
                {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
                {playing ? "Pause" : "Play"}
              </button>
              <button
                type="button"
                onClick={playWithSound}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-paper/45 bg-navy-950/45 px-4 text-sm font-semibold text-paper transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <SoundIcon className="size-4" />
                Play with sound
                <span className="font-normal text-paper/70">· {video.durationLabel}</span>
              </button>
            </div>
          </>
        ) : null}
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-muted">
        {caption}
        {video.transcript ? <span className="sr-only"> Video description: {video.transcript}</span> : null}
      </figcaption>
    </figure>
  );
}
