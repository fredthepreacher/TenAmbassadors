import type { Link as LinkT } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";
import { RingOfTen } from "@/components/ui/Motifs";

export function Closing({ title, primary, secondary }: { title: string; primary: LinkT; secondary: LinkT }) {
  const [a, b] = title.split(". ");
  return (
    <section aria-labelledby="closing-title" className="section-y relative overflow-hidden bg-royal-700 text-paper">
      <RingOfTen tone="light" className="absolute top-1/2 left-1/2 w-[120vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2" strokeOpacity={0.14} highlight={0} />
      <div className="container-narrow relative text-center" data-reveal>
        <span className="mx-auto block h-12 w-px bg-gold-300" aria-hidden="true" />
        <h2 id="closing-title" className="mt-10 text-h1">
          {b ? (
            <>
              {a}. <em className="text-gold-300">{b}</em>
            </>
          ) : (
            title
          )}
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={primary.href} variant="gold" arrow>
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="outline-light">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
