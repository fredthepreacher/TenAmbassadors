"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Media, VideoAsset } from "@/lib/types";
import { cn } from "@/lib/cn";
import { PauseIcon, PlayIcon, SoundIcon } from "./Icons";

/**
 * Wide/cinematic art direction: tablets and landscape phones. Must match the
 * `cine` custom variant in app/globals.css.
 */
const CINE_QUERY =
  "(min-width: 640px) and (max-width: 1023.98px), (orientation: landscape) and (max-height: 540px) and (max-width: 1023.98px)";

/** First fully bright frame, after the film's opening fade from black (~0.4 s). */
const AMBIENT_START = 0.45;
/**
 * The recap's audio runs ~0.7 s past its last picture frame (plus margin for timeupdate granularity); in the muted loop
 * restart before that tail so the picture never holds on a frozen frame.
 */
const AMBIENT_TAIL = 0.8;

type Mode = "idle" | "ambient" | "paused" | "sound";

/**
 * Ambient community film — page first, video when needed.
 *
 * Art direction: 4:5 on phones (portrait) and desktop columns; 16:9 cinematic
 * on tablets and landscape phones — each with its own optimized derivative and
 * poster, chosen by the same media query (no stretching, captions stay in frame).
 *
 * Loading: only the poster (a responsive <picture>) loads with the page. The
 * MP4 is attached when the figure nears the viewport; it plays muted and
 * inline while ≥40% visible and pauses off-screen or in a background tab.
 * Reduced motion, Save-Data/prefers-reduced-data or a blocked autoplay
 * (e.g. iOS Low Power Mode): the poster stays with an obvious Play control.
 * Never autoplays audio. User-initiated playback calls play() inside the tap
 * itself so iOS Safari honours it.
 */
export function AmbientVideo({
  video,
  cinematic,
  caption,
  className,
  sizes = "(max-width: 1024px) 100vw, 40vw",
}: {
  video: VideoAsset;
  /** Optional 16:9 derivative + poster for the `cine` breakpoint range. */
  cinematic?: { src: string; poster: Media };
  caption: string;
  className?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [started, setStarted] = useState(false); // a bright frame is on screen

  const allowAuto = useRef(true);
  const userPaused = useRef(false);
  const visible = useRef(false);
  const soundOn = useRef(false);
  const near = useRef(false);

  /** The derivative that matches the current art direction. */
  const pickSrc = () => (cinematic && window.matchMedia(CINE_QUERY).matches ? cinematic.src : video.src);

  /**
   * Attach (or swap) the source synchronously — safe to call inside a tap handler.
   * Ambient playback seeks past the film's fade from black as soon as metadata
   * arrives; the poster is held until a frame beyond that point is painted.
   */
  const ensureSrc = (fromStart = false) => {
    const v = ref.current;
    if (!v) return null;
    const file = pickSrc();
    const current = v.getAttribute("src");
    if (current?.split("#")[0] !== file) {
      const t = v.currentTime;
      const wasPlaying = current !== null && !v.paused;
      if (current) setStarted(false); // show the poster again while the other derivative loads
      v.src = file;
      v.addEventListener(
        "loadedmetadata",
        () => {
          if (t > 0) v.currentTime = t;
          else if (!fromStart && !soundOn.current) v.currentTime = AMBIENT_START;
          if (wasPlaying) v.play().catch(() => undefined);
        },
        { once: true },
      );
    }
    return v;
  };

  /** Seek once metadata exists (a seek issued before that is silently dropped). */
  const seekTo = (v: HTMLVideoElement, t: number) => {
    if (v.readyState >= 1) v.currentTime = t;
    else v.addEventListener("loadedmetadata", () => (v.currentTime = t), { once: true });
  };

  /** Reveal the video only once a real (post-fade) frame has been painted — no black flash. */
  const markStartedWhenPainted = (v: HTMLVideoElement) => {
    type Meta = { mediaTime: number };
    type RVFC = HTMLVideoElement & { requestVideoFrameCallback?: (cb: (now: number, meta: Meta) => void) => number };
    const rv = v as RVFC;
    const threshold = soundOn.current ? 0 : AMBIENT_START - 0.05;
    if (rv.requestVideoFrameCallback) {
      const check = (_: number, meta: Meta) => {
        if (meta.mediaTime >= threshold) setStarted(true);
        else rv.requestVideoFrameCallback!(check);
      };
      rv.requestVideoFrameCallback(check);
    } else {
      const onTime = () => {
        if (v.currentTime >= threshold) {
          setStarted(true);
          v.removeEventListener("timeupdate", onTime);
        }
      };
      v.addEventListener("timeupdate", onTime);
      onTime();
    }
  };

  const tryAmbient = () => {
    const v = ref.current;
    if (!v || !near.current || !allowAuto.current || userPaused.current || soundOn.current || !visible.current || document.hidden) return;
    ensureSrc();
    v.muted = true;
    v.loop = false; // looped manually from AMBIENT_START (skips the fade-from-black on every loop)
    if (v.readyState >= 1 && v.currentTime < AMBIENT_START) v.currentTime = AMBIENT_START;
    v.play().then(
      () => setMode((m) => (m === "sound" ? m : "ambient")),
      () => setMode("paused"),
    );
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedData = window.matchMedia("(prefers-reduced-data: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const evaluate = () => {
      allowAuto.current = !reduce.matches && !reducedData.matches && !saveData;
      const v = ref.current;
      if (!allowAuto.current && v && !v.paused && !soundOn.current) {
        v.pause();
        setMode("paused");
      }
    };
    evaluate();
    reduce.addEventListener("change", evaluate);

    const fig = figureRef.current;
    if (!fig || !("IntersectionObserver" in window)) return () => reduce.removeEventListener("change", evaluate);

    // 1) Attach the source shortly before the film scrolls into view (only if it may autoplay).
    const nearObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && allowAuto.current) {
          near.current = true;
          ensureSrc();
          tryAmbient();
          nearObs.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    nearObs.observe(fig);

    // 2) Play only while meaningfully visible; pause (keeping its place) when it leaves.
    const visObs = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting && e.intersectionRatio >= 0.4;
        const v = ref.current;
        if (visible.current) tryAmbient();
        else if (v && !v.paused && !soundOn.current) v.pause();
      },
      { threshold: [0, 0.4] },
    );
    visObs.observe(fig);

    // 3) Background tab: pause the ambient loop; resume when the page returns.
    const onVisibility = () => {
      const v = ref.current;
      if (document.hidden) {
        if (v && !v.paused && !soundOn.current) v.pause();
      } else tryAmbient();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // 4) Rotation / resize across the art-direction breakpoint: swap to the matching derivative.
    const cine = window.matchMedia(CINE_QUERY);
    const onCine = () => {
      if (ref.current?.getAttribute("src")) ensureSrc();
    };
    cine.addEventListener("change", onCine);

    return () => {
      reduce.removeEventListener("change", evaluate);
      nearObs.disconnect();
      visObs.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      cine.removeEventListener("change", onCine);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playAmbient = () => {
    const v = ensureSrc();
    if (!v) return;
    userPaused.current = false;
    soundOn.current = false;
    v.muted = true;
    v.loop = false;
    if (v.readyState >= 1 && v.currentTime < AMBIENT_START) v.currentTime = AMBIENT_START;
    v.play().then(() => setMode("ambient"), () => setMode("paused"));
  };

  const togglePause = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused || !v.getAttribute("src")) playAmbient();
    else {
      userPaused.current = true;
      v.pause();
      setMode("paused");
    }
  };

  const playWithSound = () => {
    const v = ensureSrc(true);
    if (!v) return;
    soundOn.current = true;
    userPaused.current = false;
    v.muted = false;
    v.loop = false;
    seekTo(v, 0); // with sound, the film plays exactly as edited (fades included)
    v.controls = true;
    v.play().catch(() => undefined); // called inside the tap: iOS allows audio
    setMode("sound");
    v.focus();
  };

  const onEnded = () => {
    const v = ref.current;
    if (!v) return;
    if (soundOn.current) {
      soundOn.current = false;
      userPaused.current = true;
      v.controls = false;
      v.muted = true;
      setMode("paused");
      return;
    }
    // Seamless ambient loop from the first bright frame.
    v.currentTime = AMBIENT_START;
    v.play().catch(() => setMode("paused"));
  };

  const sound = mode === "sound";
  const playing = mode === "ambient";

  // Art-directed poster: 16:9 in the cine range, 4:5 elsewhere — one download either way.
  const posterBase = { alt: "", sizes, fill: true as const };
  const { props: posterProps } = getImageProps({ ...posterBase, src: video.poster.src });
  const cinePoster = cinematic ? getImageProps({ ...posterBase, src: cinematic.poster.src }).props : null;

  return (
    <figure ref={figureRef} className={cn("group", className)}>
      <div
        className={cn(
          "photo relative overflow-hidden bg-navy-900",
          cinematic ? "aspect-[4/5] cine:aspect-video" : "aspect-[4/5]",
        )}
        data-reveal="image"
      >
        <video
          ref={ref}
          className="absolute inset-0 size-full bg-navy-900 object-cover"
          muted
          playsInline
          preload="none"
          aria-label={`${video.title} (${video.durationLabel})`}
          onPlaying={(e) => markStartedWhenPainted(e.currentTarget)}
          onEnded={onEnded}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (!soundOn.current && !v.paused && v.duration && v.currentTime >= v.duration - AMBIENT_TAIL) {
              v.currentTime = AMBIENT_START;
            }
          }}
          tabIndex={sound ? 0 : -1}
        />
        {/* Poster: stays until a bright frame has been painted, then dissolves — no black flash. */}
        <picture>
          {cinePoster ? <source media={CINE_QUERY} srcSet={cinePoster.srcSet} sizes={cinePoster.sizes} /> : null}
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" comes from getImageProps (decorative poster) */}
          <img
            {...posterProps}
            className={cn(
              "pointer-events-none object-cover transition-opacity duration-700",
              started ? "opacity-0" : "opacity-100",
            )}
            style={{ ...posterProps.style, objectPosition: video.poster.focus }}
          />
        </picture>
        {!sound ? (
          <>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy-950/60 to-transparent" aria-hidden="true" />
            {/* 4:5 frame: one row under the burned-in captions. 16:9 (cine): stacked in the
                blurred left fill, so the centred footage and its captions stay clear. */}
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 sm:inset-x-4 sm:bottom-4 cine:inset-x-auto cine:left-3 cine:flex-col cine:items-start">
              <button
                type="button"
                onClick={togglePause}
                className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-paper/92 text-navy-900 transition-colors hover:bg-paper"
                aria-label={playing ? "Pause video" : "Play video (muted)"}
              >
                {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="ml-0.5 size-4" />}
              </button>
              <button
                type="button"
                onClick={playWithSound}
                aria-label={`Play with sound (${video.durationLabel})`}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-paper/45 bg-navy-950/50 px-4 text-sm font-semibold whitespace-nowrap text-paper transition-colors hover:border-gold-300 hover:text-gold-300"
              >
                <SoundIcon className="size-4 shrink-0" />
                <span className="cine:hidden">Play with sound</span>
                <span className="hidden cine:inline">Sound</span>
                <span className="hidden font-normal text-paper/70 min-[380px]:inline cine:hidden">· {video.durationLabel}</span>
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
