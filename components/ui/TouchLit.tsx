"use client";

import { useEffect } from "react";

/**
 * Touch equivalent of hover (mobile parity). On devices without hover, any
 * element marked `data-touch-lit` gets `data-lit` while it crosses the middle
 * band of the screen, so the gold edge light, image depth and label emphasis
 * still play on phones. On pointer devices and with reduced motion it does nothing.
 */
export function TouchLit() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) (e.target as HTMLElement).dataset.lit = "";
          else delete (e.target as HTMLElement).dataset.lit;
        }
      },
      { rootMargin: "-34% 0px -34% 0px", threshold: 0 },
    );
    const observeAll = () => document.querySelectorAll("[data-touch-lit]").forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
