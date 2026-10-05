import Link from "next/link";
import type { Pathway } from "@/lib/types";
import { ArrowIcon } from "@/components/ui/Icons";

/** Five pathways — each row answers immediately on hover/tap (fill, line, arrow). */
export function GetInvolved({ pathways, headingLevel = "h2" }: { pathways: Pathway[]; headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <section id="get-involved" aria-labelledby="involved-title" className="section-y bg-paper">
      <div className="container-x">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <p className="eyebrow rule-before text-gold-ink">Get involved</p>
            <Heading id="involved-title" className={headingLevel === "h1" ? "mt-5 text-h1 text-navy-900" : "mt-5 text-h2 text-navy-900"}>
              Every pathway needs <em className="text-royal-700">people to open it.</em>
            </Heading>
          </div>
          <p className="text-lede text-ink-2 lg:col-span-5">Lead, nominate, mentor, partner, volunteer, sponsor or give: there is a place for you in the cycle.</p>
        </header>

        <ol className="mt-10 border-t border-line-strong">
          {pathways.map((p, i) => (
            <li key={p.id} className="border-b border-line" data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
              <Link
                href={p.action.href}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-0.5 py-4 transition-colors duration-300 hover:bg-gold-200/35 active:bg-gold-200/60 sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.2fr)_auto] sm:py-5"
              >
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-500 transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                <span className="pl-1 text-xs font-semibold tracking-[0.14em] text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xl font-semibold tracking-[-0.025em] text-navy-900 transition-colors group-hover:text-gold-ink sm:text-[1.75rem]">
                  {p.title}
                </span>
                <span className="col-start-2 row-start-2 text-[0.9rem] leading-snug text-ink-2 sm:col-start-3 sm:row-start-1 sm:text-[0.95rem]">{p.summary}</span>
                <span className="col-start-3 row-span-2 row-start-1 mr-1 grid size-11 place-items-center rounded-full border border-line-strong text-gold-ink transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-navy-950 sm:col-start-4 sm:row-span-1">
                  <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
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
