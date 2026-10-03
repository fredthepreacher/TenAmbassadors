"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SmsStage } from "@/lib/types";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/Icons";
import { OutlineNumeral } from "@/components/ui/Motifs";
import { SmsCycle } from "./SmsCycle";

/**
 * Signature interaction: the SMS cycle draws itself as you read.
 * Ordinary document flow (no scroll hijacking) with a sticky diagram on
 * desktop and a compact progress rail on mobile. Reaching the finale closes
 * the circle with a single gold pulse. All content is readable without JS.
 */
export function SmsStory({
  eyebrow,
  title,
  cycleLabel,
  stages,
  finale,
}: {
  eyebrow: string;
  title: string;
  cycleLabel: string[];
  stages: SmsStage[];
  finale: { line: string; body: string };
}) {
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;
    let inView = false;

    const measure = () => {
      frame = 0;
      const items = list.querySelectorAll<HTMLElement>("[data-stage]");
      if (items.length < 2) return;
      // Piecewise progress: each stage owns a third of the ring; the finale's
      // arrival at mid-screen closes the circle.
      const mid = window.innerHeight * 0.5;
      const stagesCount = items.length - 1;
      let p = 0;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top <= mid) {
          const frac = i === stagesCount ? 1 : Math.min(1, (mid - r.top) / r.height);
          p = Math.max(p, (i + frac) / stagesCount);
        }
      });
      // Quantized (0.1% of the ring) so React skips renders when nothing visible changes.
      setProgress(Math.round(Math.max(0, Math.min(1, p)) * 1000) / 1000);
    };
    const onScroll = () => {
      if (inView && !frame) frame = requestAnimationFrame(measure);
    };
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView) onScroll();
    });
    io.observe(list);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const complete = progress >= 0.98;
  const active = complete ? 2 : Math.min(2, Math.floor(progress * 3));

  return (
    <section id="sms" aria-labelledby="sms-title" className="relative bg-paper">
      <div className="container-x section-y pb-2">
        <header className="max-w-3xl" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
          <h2 id="sms-title" className="mt-5 text-h2 text-navy-900">
            {title.split(". ")[0]}. <em className="text-royal-700">{title.split(". ")[1]}</em>
          </h2>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold tracking-[0.12em] text-muted uppercase">
            {cycleLabel.map((l, i) => (
              <span key={l} className="inline-flex items-center gap-3">
                {l}
                {i < cycleLabel.length - 1 ? <ArrowIcon className="size-4 text-gold-500" /> : null}
              </span>
            ))}
          </p>
        </header>
      </div>

      {/* Mobile / tablet progress rail */}
      <div className="sticky top-[76px] z-20 border-y border-line bg-paper/95 backdrop-blur lg:hidden" aria-hidden="true">
        <div className="container-x grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2 py-3">
          {stages.map((s, i) => {
            const segStart = i / 3;
            const fill = Math.max(0, Math.min(1, (progress - segStart) * 3));
            return (
              <div key={s.id}>
                <p
                  className={cn(
                    "text-[0.7rem] font-semibold tracking-[0.1em] uppercase transition-colors",
                    complete ? "text-gold-ink" : i === active ? "text-royal-700" : "text-muted",
                  )}
                >
                  {s.title}
                </p>
                <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-line">
                  <div
                    className={cn("h-full origin-left rounded-full", complete ? "bg-gold-500" : "bg-royal-700")}
                    style={{ transform: `scaleX(${fill})`, transition: "transform 0.2s linear, background-color 0.5s" }}
                  />
                </div>
              </div>
            );
          })}
          <span
            className={cn(
              "grid size-7 place-items-center rounded-full border transition-colors duration-500",
              complete ? "border-gold-500 bg-gold-500 text-navy-950" : "border-line-strong text-muted",
            )}
          >
            <svg viewBox="0 0 20 20" className="size-3.5">
              <path d="M15.5 6.5A6.5 6.5 0 1 0 16.5 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M16 2.5v4.3h-4.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      <div className="container-x grid lg:grid-cols-12 lg:gap-16">
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[14vh] py-8">
            <SmsCycle
              stages={stages}
              progress={progress}
              active={active}
              complete={complete}
              centerLabels={cycleLabel}
              finaleLabel="Begins again"
              className="mx-auto max-w-[460px]"
            />
          </div>
        </div>

        <ol ref={listRef} className="lg:col-span-7">
          {stages.map((s, i) => {
            const isActive = i === active && !complete;
            return (
              <li
                key={s.id}
                id={`${s.id}-stage`}
                data-stage
                className="relative flex flex-col justify-center overflow-hidden border-b border-line py-10 lg:min-h-[34svh] lg:py-11"
              >
                <OutlineNumeral className="absolute right-0 bottom-4 text-[clamp(6rem,13vw,11rem)] opacity-60">{s.index}</OutlineNumeral>
                <p className="relative flex items-baseline gap-4">
                  <span className="text-xs font-semibold tracking-[0.16em] text-gold-ink">{s.index}</span>
                  <span className="eyebrow text-royal-700">{s.title}</span>
                </p>
                <h3
                  className={cn(
                    "relative mt-5 max-w-[15ch] font-sans text-[clamp(2rem,1.25rem+2.5vw,3.5rem)] leading-[1] font-semibold tracking-[-0.035em] transition-colors duration-500",
                    isActive || complete ? "text-navy-900" : "text-navy-900/55",
                  )}
                >
                  {s.line}
                </h3>
                <p className="relative mt-5 max-w-xl text-lede text-ink-2">{s.body}</p>
                <Link href={s.href} className="link-reward relative mt-6 w-fit text-green-700">
                  Explore {s.title.toLowerCase()}
                  <ArrowIcon className="link-arrow" />
                </Link>
              </li>
            );
          })}

          {/* Finale: the circle closes */}
          <li
            id="cycle-complete"
            data-stage
            className="relative flex flex-col justify-center py-10 lg:min-h-[30svh] lg:py-12"
          >
            <p className="relative flex items-center gap-3">
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-full border transition-colors duration-700",
                  complete ? "border-gold-500 bg-gold-500 text-navy-950" : "border-line-strong text-muted",
                )}
                aria-hidden="true"
              >
                <svg viewBox="0 0 20 20" className="size-3.5">
                  <path d="M15.5 6.5A6.5 6.5 0 1 0 16.5 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M16 2.5v4.3h-4.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="eyebrow text-gold-ink">New opportunity</span>
            </p>
            <h3 className="mt-5 max-w-[14ch] font-serif text-[clamp(2rem,1.25rem+2.5vw,3.5rem)] leading-[1] text-navy-900 italic">{finale.line}</h3>
            <p className="mt-6 max-w-xl text-lede text-ink-2">{finale.body}</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
