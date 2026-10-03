"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroFilm as HeroFilmT, HeroFilmVariant } from "@/lib/types";
import { PauseIcon, PlayIcon } from "@/components/ui/Icons";

/**
 * Hero film layer. It sits above the art-directed poster and fades in only once
 * a real frame has been painted, so there is never a blank frame or a layout
 * shift. It does not load at all with reduced motion, Data Saver or a failed
 * autoplay — the poster simply stays. Loading starts after the window `load`
 * event so the poster stays the LCP element. Each breakpoint plays its own cut
 * (the same media queries as the poster), and a rotation/resize across a
 * breakpoint swaps the cut so the framing always matches the container.
 */
export function HeroFilm({ film }: { film: HeroFilmT }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [variant, setVariant] = useState<HeroFilmVariant | null>(null);
  const [playing, setPlaying] = useState(false);
  /** The visitor paused the film (WCAG 2.2.2): never auto-resume after that. */
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) return;
    const queries = film.variants.map((v) => window.matchMedia(v.media));
    const pick = () => {
      const v = film.variants.find((_, i) => queries[i].matches) ?? null;
      setVariant((cur) => (cur?.id === v?.id ? cur : v));
    };
    let started = false;
    const start = () => {
      started = true;
      pick();
    };
    const onChange = () => {
      if (!started) return;
      setPlaying(false);
      pick();
    };
    queries.forEach((q) => q.addEventListener("change", onChange));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      queries.forEach((q) => q.removeEventListener("change", onChange));
    };
  }, [film]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !variant) return;
    v.load();
    if (!("held" in v.dataset)) v.play().catch(() => setPlaying(false));
    // Pause off-screen to save battery; resume when the hero is back in view.
    let inView = true;
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !document.hidden && !("held" in v.dataset)) v.play().catch(() => undefined);
      else v.pause();
    });
    io.observe(v);
    // Background tab: pause; resume on return (unless the visitor paused it).
    const onVisibility = () => {
      if (document.hidden) v.pause();
      else if (inView && !("held" in v.dataset)) v.play().catch(() => undefined);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [variant]);

  /** Reveal the film only once a real frame has been painted (no black flash on iOS/Android). */
  const onPlaying = (v: HTMLVideoElement) => {
    type RVFC = HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number };
    const rv = v as RVFC;
    if (rv.requestVideoFrameCallback) rv.requestVideoFrameCallback(() => setPlaying(true));
    else setPlaying(true);
  };

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (held) {
      delete v.dataset.held;
      setHeld(false);
      v.play().catch(() => undefined);
    } else {
      v.dataset.held = "";
      setHeld(true);
      v.pause();
    }
  };

  if (!variant?.mp4) return null;
  return (
    <>
      <video
        ref={ref}
        key={variant.id}
        className="hero-film absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: variant.poster.focus }}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        data-playing={playing ? "" : undefined}
        data-cut={variant.id}
        onPlaying={(e) => onPlaying(e.currentTarget)}
        onError={() => setPlaying(false)}
      >
        <source src={variant.mp4} type="video/mp4" />
      </video>
      {playing || held ? (
        <button
          type="button"
          onClick={toggle}
          className="hero-film-toggle absolute top-4 right-4 z-[4] grid size-11 place-items-center rounded-full border border-paper/30 bg-navy-950/40 text-paper backdrop-blur-sm transition-[background-color,border-color,transform] duration-200 hover:border-paper/60 hover:bg-navy-950/70 active:scale-95"
          aria-label={held ? "Play background film" : "Pause background film"}
        >
          {held ? <PlayIcon className="ml-0.5 size-4" /> : <PauseIcon className="size-4" />}
        </button>
      ) : null}
    </>
  );
}
