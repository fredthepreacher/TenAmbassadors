"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const STEPS = [
  { id: "featured-scholarship", label: "Scholarship" },
  { id: "mentorship", label: "Mentorship" },
  { id: "service", label: "Service" },
];

/**
 * A quiet editorial progress marker for the three program chapters.
 * Appears only while the visitor is inside those chapters; each stage lights
 * as it is reached, and leaving Service completes the loop ("New opportunity").
 * Desktop: a small vertical rail at the right edge. Mobile: a 3-segment
 * hairline under the header. Decorative (aria-hidden) — headings carry meaning.
 */
export function JourneyIndicator() {
  const [state, setState] = useState({ visible: false, active: -1, complete: false });

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const els = STEPS.map((s) => document.getElementById(s.id));
      if (els.some((e) => !e)) return;
      const probe = window.innerHeight * 0.45;
      const tops = els.map((e) => e!.getBoundingClientRect().top);
      const lastBottom = els[2]!.getBoundingClientRect().bottom;
      let active = -1;
      tops.forEach((t, i) => {
        if (t <= probe) active = i;
      });
      const complete = lastBottom <= window.innerHeight * 0.7;
      const visible = active >= 0 && lastBottom > window.innerHeight * 0.25;
      setState((prev) =>
        prev.visible === visible && prev.active === active && prev.complete === complete ? prev : { visible, active, complete },
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const { visible, active, complete } = state;

  return (
    <div aria-hidden="true">
      {/* Desktop rail */}
      <div
        className={cn(
          "fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 rounded-full py-3 transition-[opacity,transform] duration-500 xl:flex",
          visible ? "opacity-100" : "pointer-events-none translate-x-3 opacity-0",
        )}
      >
        {STEPS.map((s, i) => {
          const reached = complete || i <= active;
          const current = i === active && !complete;
          return (
            <div key={s.id} className="flex items-center gap-3">
              <span
                className={cn(
                  "hidden rounded-full bg-paper/90 px-2.5 py-1 text-[0.7rem] min-[1600px]:inline font-semibold tracking-[0.12em] uppercase shadow-sm backdrop-blur transition-all duration-500",
                  current ? "text-royal-700 opacity-100" : complete ? "text-gold-ink opacity-100" : "text-muted opacity-0",
                )}
              >
                {s.label}
              </span>
              <span
                className={cn(
                  "block rounded-full border transition-all duration-500",
                  current ? "size-3.5" : "size-2.5",
                  complete ? "border-gold-500 bg-gold-500" : reached ? "border-royal-700 bg-royal-700" : "border-muted/60 bg-paper",
                )}
              />
            </div>
          );
        })}
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "hidden rounded-full bg-navy-900 px-2.5 py-1 text-[0.7rem] min-[1600px]:inline font-semibold tracking-[0.12em] text-gold-300 uppercase transition-all duration-700",
              complete ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0",
            )}
          >
            New opportunity
          </span>
          <span
            className={cn(
              "grid size-5 place-items-center rounded-full border transition-all duration-700",
              complete ? "border-gold-500 bg-gold-500 text-navy-950" : "border-muted/50 text-muted",
            )}
          >
            <svg viewBox="0 0 20 20" className="size-3">
              <path d="M15.5 6.5A6.5 6.5 0 1 0 16.5 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 2.5v4.3h-4.3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Mobile hairline */}
      <div
        className={cn(
          "fixed inset-x-0 top-[76px] z-40 grid grid-cols-3 gap-1 px-1 transition-opacity duration-500 xl:hidden",
          visible ? "opacity-100" : "opacity-0",
        )}
      >
        {STEPS.map((s, i) => (
          <span
            key={s.id}
            className={cn(
              "h-[3px] rounded-full transition-colors duration-500",
              complete ? "bg-gold-500" : i <= active ? "bg-royal-600" : "bg-navy-900/15",
            )}
          />
        ))}
      </div>
    </div>
  );
}
