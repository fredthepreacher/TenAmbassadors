"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroFilm as HeroFilmT } from "@/lib/types";
import { PauseIcon, PlayIcon } from "@/components/ui/Icons";

/**
 * Hero film layer (Geo revision point 2). It sits above the poster image and
 * fades in only once frames are actually playing, so there is never a blank
 * frame or a layout shift. It does not load at all with reduced motion,
 * Data Saver or a failed autoplay — the poster simply stays.
 * Loading starts after the window `load` event so the poster stays the LCP element.
 */
export function HeroFilm({ film, focus }: { film: HeroFilmT; focus?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<{ mp4: string; webm: string | null } | null>(null);
  const [playing, setPlaying] = useState(false);
  /** The visitor paused the film (WCAG 2.2.2): never auto-resume after that. */
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) return;
    const phone = window.matchMedia("(max-width: 767px)").matches;
    const choose = () =>
      setSrc(
        phone && film.mobileMp4
          ? { mp4: film.mobileMp4, webm: null }
          : { mp4: film.mp4, webm: phone ? null : (film.webm ?? null) },
      );
    if (document.readyState === "complete") choose();
    else window.addEventListener("load", choose, { once: true });
    return () => window.removeEventListener("load", choose);
  }, [film]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.load();
    v.play().catch(() => setPlaying(false));
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
  }, [src]);

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

  if (!src) return null;
  return (
    <>
    <video
      ref={ref}
      className="hero-film absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: focus }}
      muted
      playsInline
      loop
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      data-playing={playing ? "" : undefined}
      onPlaying={(e) => onPlaying(e.currentTarget)}
      onError={() => setPlaying(false)}
    >
      {src.webm ? <source src={src.webm} type="video/webm" /> : null}
      <source src={src.mp4} type="video/mp4" />
    </video>
    {playing || held ? (
      <button
        type="button"
        onClick={toggle}
        className="absolute top-4 right-4 z-[4] grid size-11 place-items-center rounded-full border border-paper/35 bg-navy-950/45 text-paper backdrop-blur-sm transition-[background-color,transform] duration-200 hover:bg-navy-950/70 active:scale-95"
        aria-label={held ? "Play background film" : "Pause background film"}
      >
        {held ? <PlayIcon className="ml-0.5 size-4" /> : <PauseIcon className="size-4" />}
      </button>
    ) : null}
    </>
  );
}
