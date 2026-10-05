"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/lib/types";
import { cn } from "@/lib/cn";
import { MenuIcon } from "@/components/ui/Icons";
import { Wordmark } from "./Wordmark";

/** Routes whose first screen is dark: the header starts transparent with light text. */
function isDarkTop(pathname: string) {
  return pathname === "/" || pathname === "/service" || pathname === "/network-partners" || /^\/scholarship\/.+/.test(pathname);
}

export function SiteHeader({ nav, cta, secondary }: { nav: NavItem[]; cta: NavItem; secondary: NavItem[] }) {
  const pathname = usePathname();
  const night = pathname.startsWith("/starlight");
  const darkTop = isDarkTop(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = [toggleRef.current, ...Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href]"))].filter(
          Boolean,
        ) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Tone: transparent + light text over dark first screens; clean white once scrolled.
  const solid = scrolled || open;
  const light = !night && darkTop && !solid;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500",
        // Note: no backdrop-filter while the menu is open — it would become the
        // containing block for the fixed menu panel and collapse it.
        night
          ? open
            ? "bg-night-950"
            : solid
              ? "bg-night-950/90 shadow-[0_1px_0_rgb(233_205_134/0.15)] backdrop-blur-md"
              : "bg-transparent"
          : open
            ? "bg-paper shadow-[0_1px_0_var(--color-line)]"
            : solid
              ? "bg-paper/92 shadow-[0_1px_0_var(--color-line),0_10px_30px_-20px_rgb(8_27_51/0.35)] backdrop-blur-md"
              : "bg-transparent",
      )}
    >
      <div className="container-x flex h-[76px] items-center justify-between gap-6">
        <Wordmark tone={night ? "night" : light ? "light" : "dark"} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex py-2 text-[0.92rem] font-medium transition-colors duration-300",
                      night
                        ? "text-champagne/85 hover:text-champagne"
                        : light
                          ? "text-paper/85 hover:text-paper"
                          : "text-ink-2 hover:text-gold-ink",
                      active && (night ? "text-champagne" : light ? "text-paper" : "text-navy-900"),
                    )}
                  >
                    {item.label}
                    {/* Underline grows from the left on hover; active page keeps a gold marker. */}
                    <span
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100",
                        active && (night ? "scale-x-100 bg-starlight" : light ? "scale-x-100 bg-gold-300" : "scale-x-100 bg-gold-500"),
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={cta.href}
            className={cn(
              "btn hidden min-h-11 px-5 text-sm sm:inline-flex",
              night ? "btn-gold" : light ? "btn-glass" : "btn-primary",
            )}
          >
            {cta.label}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "grid size-11 place-items-center rounded-full border transition-colors lg:hidden",
              night
                ? "border-champagne/30 text-champagne"
                : light
                  ? "border-paper/40 text-paper"
                  : "border-line-strong text-royal-700",
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} className="size-5" />
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className={cn(
          "fixed inset-x-0 top-[76px] bottom-0 overflow-y-auto lg:hidden",
          night ? "bg-night-950 text-champagne" : "bg-paper text-ink",
        )}
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pt-4 pb-10">
          <ul className={cn("border-t", night ? "border-starlight/20" : "border-line")}>
            {nav.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li
                  key={item.href}
                  className={cn("menu-item border-b", night ? "border-starlight/20" : "border-line")}
                  style={{ ["--i" as string]: i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-baseline gap-4 py-4 text-[1.9rem] leading-tight font-semibold tracking-[-0.03em] transition-colors active:text-gold-ink",
                      active && (night ? "text-starlight" : "text-royal-700"),
                    )}
                  >
                    <span className={cn("font-sans text-xs font-semibold tracking-[0.14em]", night ? "text-starlight" : "text-gold-ink")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                    {active ? <span className="ml-auto size-2 self-center rounded-full bg-gold-500" aria-hidden="true" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            {secondary.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="underline underline-offset-4">
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className={cn("btn mt-auto min-h-14 w-full", night ? "btn-gold" : "btn-primary")}
          >
            {cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
