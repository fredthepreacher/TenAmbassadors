import type { Link as LinkT } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";

export function Closing({ title, primary, secondary }: { title: string; primary: LinkT; secondary: LinkT }) {
  return (
    <section aria-labelledby="closing-title" className="section-y bg-ivory">
      <div className="container-narrow text-center" data-reveal>
        <span className="mx-auto block h-12 w-px bg-gold-500" aria-hidden="true" />
        <h2 id="closing-title" className="mt-10 text-h1 text-evergreen-950">
          {title}
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={primary.href} arrow>
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="outline">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
