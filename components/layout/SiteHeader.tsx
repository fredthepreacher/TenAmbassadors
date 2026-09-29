"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/lib/types";
import { cn } from "@/lib/cn";
import { MenuIcon } from "@/components/ui/Icons";
import { Wordmark } from "./Wordmark";

export function SiteHeader({ nav, cta, secondary }: { nav: NavItem[]; cta: NavItem; secondary: NavItem[] }) {
  const pathname = usePathname();
  const night = pathname.startsWith("/starlight");
  // Routes whose hero is dark: the transparent header uses light text until scrolled.
  const overDark = pathname === "/get-involved" || /^\/scholarship\/.+/.test(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const light = overDark && !scrolled && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500",
        night
          ? scrolled || open
            ? "bg-night-950/90 shadow-[0_1px_0_rgb(232_201_133/0.15)] backdrop-blur-md"
            : "bg-transparent"
          : scrolled || open
            ? "bg-ivory/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
            : "bg-transparent",
      )}
    >
      <div className="container-x flex h-[76px] items-center justify-between gap-6">
        <Wordmark tone={night ? "night" : light ? "light" : "dark"} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-[0.92rem] font-medium transition-colors",
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                    "aria-[current=page]:after:scale-x-100",
                    night
                      ? "text-champagne/90 hover:text-champagne"
                      : light
                        ? "text-paper/90 hover:text-paper"
                        : "text-ink-2 hover:text-evergreen-900",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={cta.href}
            className={cn(
              "hidden min-h-11 items-center rounded-full px-5 text-sm font-semibold transition-colors sm:inline-flex",
              night || light ? "bg-gold-400 text-night-950 hover:bg-gold-300" : "bg-evergreen-900 text-paper hover:bg-evergreen-800",
            )}
          >
            {cta.label}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "grid size-11 place-items-center rounded-full border lg:hidden",
              night ? "border-champagne/30 text-champagne" : light ? "border-paper/40 text-paper" : "border-line-strong text-evergreen-900",
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
          night ? "bg-night-950 text-champagne" : "bg-ivory text-ink",
        )}
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pt-4 pb-10">
          <ul className={cn("border-t", night ? "border-starlight/20" : "border-line")}>
            {nav.map((item, i) => (
              <li key={item.href} className={cn("border-b", night ? "border-starlight/20" : "border-line")}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline gap-4 py-4 font-serif text-[2rem] leading-tight"
                >
                  <span className={cn("font-sans text-xs font-semibold tracking-[0.14em]", night ? "text-starlight" : "text-gold-ink")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
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
            className={cn(
              "mt-auto flex min-h-14 items-center justify-center rounded-full font-semibold",
              night ? "bg-starlight text-night-950" : "bg-evergreen-900 text-paper",
            )}
          >
            {cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
