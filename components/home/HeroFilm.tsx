"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HeroFilm as HeroFilmT, HeroFilmVariant } from "@/lib/types";
import { PauseIcon, PlayIcon } from "@/components/ui/Icons";

/**
 * Hero film layer, above the art-directed poster (`<picture>` in Hero.tsx).
 *
 * Mobile media parity pass (2026-10-05). The film used to start only after the window `load` event, kept
 * `preload="none"` until then, depended on a single signal (requestVideoFrameCallback) to become visible, and
 * turned every refusal (iOS Low Power Mode, in-app browsers, Reduced Motion, Data Saver) into a silent still
 * with at most a small corner icon. It now:
 *
 *  - starts once the poster (the LCP element) has painted and the page has loaded, never more than 1.5 s
 *    after the poster or 3 s after hydration (it used to wait for `load` with a 3.5 s fallback, before the
 *    poster check existed);
 *  - renders a real `<video autoplay muted playsinline webkit-playsinline loop preload="auto">` with the poster
 *    as its `poster`, and sets `muted` / `defaultMuted` / `playsInline` on the element before it loads (iOS
 *    checks them);
 *  - retries `play()` on loadedmetadata / loadeddata / canplay, on return to the tab, on a back/forward-cache
 *    restore and when the hero scrolls back into view (event-driven and capped, no polling), and after a
 *    refusal also on the visitor's next tap or key press while the hero is in view;
 *  - becomes visible on the first painted frame (requestVideoFrameCallback) or the first `timeupdate` with
 *    progress, whichever comes first, so one missing signal can no longer leave the film hidden;
 *  - shows a clear "Play film" control when the browser refuses autoplay, and (opt-in, nothing loads until
 *    tapped) with Reduced Motion or Data Saver; a film the visitor paused never resumes on its own (WCAG 2.2.2).
 *
 * The state is mirrored on the `<video>` as `data-state`. Add `?mediadebug=1` to the URL to see it live on a
 * phone. The film is always shown whole (`object-fit: contain`): no crop, no fill, no reframing.
 */
export type HeroFilmState =
  | "idle"
  | "still"
  | "reducedMotion"
  | "dataSaver"
  | "loading"
  | "playing"
  | "paused"
  | "blocked"
  | "error";

type Policy = "auto" | "reducedMotion" | "dataSaver";
type Run = "loading" | "playing" | "paused" | "blocked" | "error";

/** After the poster has painted, wait for the window `load` event at most this long before loading the film. */
const AFTER_POSTER_MS = 1500;
/** Hard ceiling from hydration, whatever the poster and the `load` event are doing. */
const START_CAP_MS = 3000;
/** A film still paused at 0 s this long after it was asked to play (and not buffering) offers Play. */
const WATCHDOG_MS = 6000;
/** Automatic play() attempts allowed between two successful starts. */
const MAX_AUTO_PLAYS = 8;
/** Events that carry a user activation in Safari and Chromium. */
const GESTURES = ["pointerup", "touchend", "click", "keydown"] as const;

function readPolicy(): Policy {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reducedMotion";
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return conn?.saveData ? "dataSaver" : "auto";
}

interface Snapshot {
  t: string;
  paused: boolean;
  readyState: number;
  networkState: number;
  src: string;
  size: string;
  error: number | null;
  event: string;
  attempts: number;
}

function snapshot(v: HTMLVideoElement, event: string, attempts: number): Snapshot {
  return {
    t: v.currentTime.toFixed(2),
    paused: v.paused,
    readyState: v.readyState,
    networkState: v.networkState,
    src: (v.currentSrc || "").split("/").pop() ?? "",
    size: `${v.videoWidth}×${v.videoHeight}`,
    error: v.error?.code ?? null,
    event,
    attempts,
  };
}

export function HeroFilm({ film }: { film: HeroFilmT }) {
  const anchor = useRef<HTMLSpanElement>(null);
  const ref = useRef<HTMLVideoElement | null>(null);
  const [variant, setVariant] = useState<HeroFilmVariant | null>(null);
  const [policy, setPolicy] = useState<Policy>("auto");
  const [optIn, setOptIn] = useState(false);
  const [run, setRun] = useState<Run>("loading");
  const [revealed, setRevealed] = useState(false);
  const [poster, setPoster] = useState<string>();
  const [debug, setDebug] = useState(false);
  const [snap, setSnap] = useState<Snapshot | null>(null);
  /** The visitor paused the film: never auto-resume after that. */
  const held = useRef(false);
  const plays = useRef(0);
  const inView = useRef(true);
  const retriedNetwork = useRef(false);

  const src = variant?.mp4 ?? null;
  const auto = policy === "auto" || optIn;
  const mode: HeroFilmState = !variant ? "idle" : !src ? "still" : !auto ? (policy as "reducedMotion" | "dataSaver") : run;

  // 1 · Boot: decide the policy and the breakpoint's cut, and start once the poster has painted.
  useEffect(() => {
    const posterImg = anchor.current?.parentElement?.querySelector<HTMLImageElement>("img.hero-poster") ?? null;
    const queries = film.variants.map((v) => window.matchMedia(v.media));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let started = false;
    const pick = () => {
      const v = film.variants.find((_, i) => queries[i].matches) ?? null;
      setVariant((cur) => (cur?.id === v?.id ? cur : v));
      setPoster(posterImg?.currentSrc || undefined);
    };
    const start = () => {
      if (started) return;
      started = true;
      setDebug(new URLSearchParams(window.location.search).has("mediadebug"));
      setPolicy(readPolicy());
      pick();
    };
    const onBreakpoint = () => {
      if (started) pick();
    };
    const onMotion = () => {
      if (started) setPolicy(readPolicy());
    };
    const onPosterLoad = () => {
      if (started) setPoster(posterImg?.currentSrc || undefined);
      else afterPoster();
    };
    queries.forEach((q) => q.addEventListener("change", onBreakpoint));
    motion.addEventListener("change", onMotion);
    // Start once the poster (the LCP element) has painted and the page has finished loading, or 1.5 s after
    // the poster at the latest, so the film never competes with the poster and never waits on a slow `load`.
    let soon = 0;
    const afterPoster = () => {
      if (started || soon) return;
      if (document.readyState === "complete") start();
      else {
        window.addEventListener("load", start, { once: true });
        soon = window.setTimeout(start, AFTER_POSTER_MS);
      }
    };
    const cap = window.setTimeout(start, START_CAP_MS);
    posterImg?.addEventListener("load", onPosterLoad);
    if (!posterImg || posterImg.complete) afterPoster();
    else posterImg.addEventListener("error", afterPoster, { once: true });
    return () => {
      window.clearTimeout(soon);
      window.clearTimeout(cap);
      window.removeEventListener("load", start);
      posterImg?.removeEventListener("load", onPosterLoad);
      posterImg?.removeEventListener("error", afterPoster);
      queries.forEach((q) => q.removeEventListener("change", onBreakpoint));
      motion.removeEventListener("change", onMotion);
    };
  }, [film]);

  /** iOS only plays inline and muted without a tap when these are set before the element loads. */
  const attach = useCallback((v: HTMLVideoElement | null) => {
    ref.current = v;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
  }, []);

  const onRejected = useCallback((err: unknown) => {
    const name = (err as { name?: string } | null)?.name;
    if (name === "NotAllowedError") setRun("blocked");
    else if (name === "NotSupportedError") setRun("error");
    // AbortError: a load or pause interrupted the attempt; the next media event retries.
  }, []);

  // 2 · Playback wiring for the mounted film: bounded, event-driven retries.
  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    if (!auto) {
      v.pause();
      return;
    }
    plays.current = 0;
    const tryPlay = () => {
      if (held.current || document.hidden || !inView.current || !v.paused || plays.current >= MAX_AUTO_PLAYS) return;
      plays.current += 1;
      v.play()?.catch(onRejected);
    };
    tryPlay();
    const ready = ["loadedmetadata", "loadeddata", "canplay"] as const;
    ready.forEach((e) => v.addEventListener(e, tryPlay));
    // Pause off-screen to save battery; resume when the hero is back in view.
    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting;
      if (inView.current) tryPlay();
      else if (!v.paused) v.pause();
    });
    io.observe(v);
    const onVisibility = () => {
      if (document.hidden) v.pause();
      else tryPlay();
    };
    // iOS Safari restores the page from the back/forward cache with the film paused.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    const watchdog = window.setTimeout(() => {
      if (v.paused && v.currentTime === 0 && !held.current && !document.hidden && inView.current) {
        setRun((r) => (r === "loading" ? "blocked" : r));
      }
    }, WATCHDOG_MS);
    return () => {
      window.clearTimeout(watchdog);
      ready.forEach((e) => v.removeEventListener(e, tryPlay));
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [src, auto, onRejected]);

  // 3 · After a refusal, the visitor's next tap or key press (while the hero is in view) starts the film.
  useEffect(() => {
    const v = ref.current;
    if (!v || run !== "blocked" || !auto) return;
    const onGesture = (e: Event) => {
      if (held.current || !inView.current) return;
      if (e.target instanceof Element && e.target.closest("[data-hero-control]")) return;
      v.play()?.catch(() => undefined);
    };
    GESTURES.forEach((g) => document.addEventListener(g, onGesture, { capture: true, passive: true }));
    return () => GESTURES.forEach((g) => document.removeEventListener(g, onGesture, { capture: true }));
  }, [run, auto]);

  // Debug read-out (?mediadebug=1 only): refreshed by media events, never by a timer.
  useEffect(() => {
    const v = ref.current;
    if (!debug || !v) return;
    const events = ["loadstart", "loadedmetadata", "loadeddata", "canplay", "playing", "waiting", "stalled", "pause", "timeupdate", "error", "suspend"];
    const on = (e: Event) => setSnap(snapshot(v, e.type, plays.current));
    events.forEach((e) => v.addEventListener(e, on));
    return () => events.forEach((e) => v.removeEventListener(e, on));
  }, [debug, src]);

  const reveal = useCallback(() => setRevealed(true), []);

  const onPlaying = (v: HTMLVideoElement) => {
    plays.current = 0;
    setRun("playing");
    type RVFC = HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number };
    (v as RVFC).requestVideoFrameCallback?.(reveal);
  };

  const onError = (v: HTMLVideoElement) => {
    // One quiet retry for a dropped connection; anything else keeps the poster.
    if (v.error?.code === 2 && !retriedNetwork.current) {
      retriedNetwork.current = true;
      window.setTimeout(() => v.load(), 1500);
      return;
    }
    setRun("error");
  };

  const onControl = () => {
    const v = ref.current;
    if (!v) return;
    if (mode === "playing") {
      held.current = true;
      v.pause();
      setRun("paused");
      return;
    }
    held.current = false;
    if (!auto) setOptIn(true);
    v.muted = true;
    // Called inside the tap, so every browser treats it as a user-initiated start.
    v.play()
      ?.then(() => setRun("playing"))
      .catch(onRejected);
  };

  const pill = mode === "blocked" || mode === "reducedMotion" || mode === "dataSaver";
  const round = mode === "playing" || mode === "paused";

  return (
    <>
      <span ref={anchor} hidden />
      {variant && src ? (
        <video
          ref={attach}
          key={src}
          className="hero-film absolute inset-0 h-full w-full object-contain"
          style={{ objectPosition: variant.poster.focus }}
          src={src}
          poster={poster}
          autoPlay={auto && run !== "paused"}
          muted
          playsInline
          webkit-playsinline=""
          loop
          preload={auto ? "auto" : "none"}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
          data-state={mode}
          data-playing={revealed ? "" : undefined}
          onLoadStart={() => {
            setRevealed(false);
            setRun(held.current ? "paused" : "loading");
          }}
          onPlaying={(e) => onPlaying(e.currentTarget)}
          onTimeUpdate={(e) => {
            if (!revealed && e.currentTarget.currentTime > 0 && !e.currentTarget.paused) reveal();
          }}
          onError={(e) => onError(e.currentTarget)}
        />
      ) : null}
      {pill ? (
        <button
          type="button"
          onClick={onControl}
          data-hero-control="play"
          className="hero-film-cta absolute top-1/2 left-1/2 z-[4] inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full border border-paper/35 bg-navy-950/55 py-2 pr-5 pl-2 text-[0.78rem] font-semibold tracking-[0.16em] whitespace-nowrap text-paper uppercase shadow-[0_14px_34px_-14px_rgb(0_0_0/0.7)] backdrop-blur-md transition-[background-color,border-color] duration-200 hover:border-paper/60 hover:bg-navy-950/75"
        >
          <span className="grid size-10 place-items-center rounded-full bg-gold-300 text-navy-950" aria-hidden="true">
            <PlayIcon className="ml-0.5 size-4" />
          </span>
          Play film
        </button>
      ) : null}
      {round ? (
        <button
          type="button"
          onClick={onControl}
          data-hero-control={mode === "playing" ? "pause" : "resume"}
          className="hero-film-toggle absolute top-4 right-4 z-[4] grid size-11 place-items-center rounded-full border border-paper/30 bg-navy-950/40 text-paper backdrop-blur-sm transition-[background-color,border-color,transform] duration-200 hover:border-paper/60 hover:bg-navy-950/70 active:scale-95"
          aria-label={mode === "playing" ? "Pause background film" : "Play background film"}
        >
          {mode === "playing" ? <PauseIcon className="size-4" /> : <PlayIcon className="ml-0.5 size-4" />}
        </button>
      ) : null}
      {debug ? (
        <output className="pointer-events-none fixed bottom-2 left-2 z-[100] max-w-[calc(100vw-1rem)] rounded-md bg-black/80 px-2.5 py-2 font-mono text-[10px] leading-[1.45] whitespace-pre text-white">
          {[
            `hero film: ${mode}${variant ? ` (${variant.id})` : ""}`,
            `policy ${policy}${optIn ? " +opt-in" : ""}${snap ? ` · autoplay attempts ${snap.attempts}` : ""}`,
            snap
              ? `t ${snap.t}s · ${snap.paused ? "paused" : "running"} · ready ${snap.readyState} · net ${snap.networkState}`
              : "no media events yet",
            snap ? `${snap.src} · ${snap.size} · last ${snap.event}${snap.error ? ` · error ${snap.error}` : ""}` : "",
          ]
            .filter(Boolean)
            .join("\n")}
        </output>
      ) : null}
    </>
  );
}
