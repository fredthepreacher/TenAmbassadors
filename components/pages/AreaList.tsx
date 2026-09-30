import { SectionHeading } from "@/components/ui/SectionHeading";

/** Future-facing program areas — explicitly "intended", never presented as active. */
export function AreaList({
  id,
  eyebrow,
  title,
  intro,
  areas,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  areas: string[];
  tone?: "light" | "ivory";
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={tone === "ivory" ? "section-y bg-ivory" : "section-y bg-paper"}>
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} className="lg:col-span-5" />
        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <ul className="grid border-t border-line-strong sm:grid-cols-2 sm:gap-x-8">
            {areas.map((a, i) => (
              <li key={a} className="group flex items-baseline gap-3 border-b border-line py-3.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg text-navy-900 transition-colors group-hover:text-royal-700">{a}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">Planned areas — not yet available. Each will be announced when funded and confirmed.</p>
        </div>
      </div>
    </section>
  );
}
