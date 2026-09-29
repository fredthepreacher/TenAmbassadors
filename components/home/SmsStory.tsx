"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SmsStage } from "@/lib/types";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/Icons";
import { SmsCycle } from "./SmsCycle";

/**
 * Editorial SMS sequence. As each stage scrolls into focus, the cycle diagram
 * advances. No scroll hijacking: this is ordinary document flow with a sticky
 * visual, and all content is readable without JavaScript.
 */
export function SmsStory({
  eyebrow,
  title,
  cycleLabel,
  stages,
}: {
  eyebrow: string;
  title: string;
  cycleLabel: string[];
  stages: SmsStage[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="sms" aria-labelledby="sms-title" className="relative bg-paper">
      <div className="container-x section-y pb-0">
        <header className="max-w-3xl" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
          <h2 id="sms-title" className="mt-5 text-h2">
            {title}
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
        <div className="container-x grid grid-cols-3">
          {stages.map((s, i) => (
            <div key={s.id} className="py-3">
              <div className={cn("h-0.5 transition-colors duration-500", i <= active ? "bg-gold-500" : "bg-line")} />
              <p className={cn("mt-2 text-xs font-semibold tracking-[0.1em] uppercase transition-colors", i === active ? "text-evergreen-900" : "text-muted")}>
                {s.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-x grid lg:grid-cols-12 lg:gap-16">
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[18vh] py-16">
            <SmsCycle stages={stages} active={active} centerLabels={cycleLabel} className="mx-auto max-w-[440px]" />
          </div>
        </div>

        <ol className="lg:col-span-7">
          {stages.map((s, i) => (
            <li
              key={s.id}
              id={`${s.id}-stage`}
              data-index={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="flex min-h-[70svh] flex-col justify-center border-b border-line py-16 last:border-b-0 lg:min-h-[82svh]"
            >
              <p className="flex items-baseline gap-4">
                <span className="text-xs font-semibold tracking-[0.16em] text-gold-ink">{s.index}</span>
                <span className="eyebrow text-evergreen-800">{s.title}</span>
              </p>
              <h3
                className={cn(
                  "mt-6 max-w-[16ch] text-h1 transition-colors duration-700",
                  i === active ? "text-evergreen-950" : "text-evergreen-950/55",
                )}
              >
                {s.line}
              </h3>
              <p className="mt-6 max-w-xl text-lede text-ink-2">{s.body}</p>
              <Link
                href={s.href}
                className="group mt-8 inline-flex w-fit items-center gap-2 font-semibold text-evergreen-900 underline decoration-evergreen-900/30 underline-offset-[6px] hover:decoration-evergreen-900"
              >
                Explore {s.title.toLowerCase()}
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
