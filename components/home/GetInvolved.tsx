import Link from "next/link";
import type { Pathway } from "@/lib/types";
import { ArrowIcon } from "@/components/ui/Icons";

export function GetInvolved({ pathways, headingLevel = "h2" }: { pathways: Pathway[]; headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <section id="get-involved" aria-labelledby="involved-title" className="section-y bg-evergreen-900 text-paper">
      <div className="container-x">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <p className="eyebrow rule-before text-gold-300">Get involved</p>
            <Heading id="involved-title" className={headingLevel === "h1" ? "mt-5 text-h1" : "mt-5 text-h2"}>
              Every pathway needs people to open it.
            </Heading>
          </div>
          <p className="text-lede text-paper/75 lg:col-span-5">
            Mentor, volunteer, partner, or give — there is a place for you in the cycle.
          </p>
        </header>

        <ol className="mt-14 border-t border-paper/20">
          {pathways.map((p, i) => (
            <li key={p.id} className="border-b border-paper/20" data-reveal>
              <Link
                href={p.action.href}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 py-6 transition-colors hover:bg-paper/[0.04] sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.2fr)_auto] sm:py-8"
              >
                <span className="text-xs font-semibold tracking-[0.14em] text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-2xl sm:text-h3">{p.title}</span>
                <span className="col-start-2 row-start-2 text-[0.95rem] text-paper/70 sm:col-start-3 sm:row-start-1">{p.summary}</span>
                <span className="col-start-3 row-span-2 row-start-1 grid size-11 place-items-center rounded-full border border-paper/25 transition-colors group-hover:border-gold-300 group-hover:bg-gold-300 group-hover:text-evergreen-950 sm:col-start-4 sm:row-span-1">
                  <ArrowIcon className="size-4" />
                  <span className="sr-only">{p.action.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
