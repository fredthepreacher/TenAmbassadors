import type { Initiative } from "@/lib/types";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { serviceFocus as focus } from "@/content/programs";


/**
 * Service — strong blue, forward motion. The composition moves left → right:
 * a directional rule runs through the chapter toward the initiatives.
 * No service projects are invented: the list names the focus areas from the brief, and named
 * initiatives are added (content/programs.ts → serviceInitiatives) once confirmed.
 */
export function ServiceFeature({
  eyebrow,
  title,
  body,
  headingLevel = "h2",
}: {
  eyebrow: string;
  title: string;
  body: string;
  /** Kept for API compatibility; named initiatives render on /service once confirmed. */
  initiatives?: Initiative[];
  headingLevel?: "h2" | "h1";
}) {
  const Heading = headingLevel;
  const [a, b] = title.split(" becomes ");
  return (
    <section id="service" aria-labelledby="service-title" className="section-y relative overflow-hidden bg-royal-700 text-paper">
      {/* Directional geometry: forward momentum */}
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-1/2 h-[60%] w-full -translate-y-1/2 opacity-60" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M-40 ${320 - i * 50} C 420 ${300 - i * 40}, 900 ${140 - i * 20}, 1480 ${80 + i * 18}`} fill="none" stroke="rgb(255 255 255 / 0.09)" strokeWidth="1" />
        ))}
      </svg>

      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow rule-before text-gold-300">{eyebrow}</p>
          <Heading id="service-title" className="mt-5 text-h1">
            {b ? (
              <>
                {a} <span className="block">becomes</span> <em className="text-gold-300">{b}</em>
              </>
            ) : (
              title
            )}
          </Heading>
          <p className="mt-6 max-w-lg text-lede text-paper/85">{body}</p>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="/service#volunteer" variant="light" arrow>
              Serve with us
            </ButtonLink>
            <TextLink href="/service" tone="light">
              How service works
            </TextLink>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <div className="border-b border-paper/25 pb-4" data-reveal>
            <h3 className="eyebrow text-paper">Where service will focus</h3>
          </div>
          <ol>
            {focus.map((f, i) => (
              <li
                key={f.title}
                className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border-b border-paper/15 py-5"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <span className="font-sans text-3xl font-semibold tracking-[-0.04em] text-paper/60">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-serif text-2xl text-paper">{f.title}</p>
                  <p className="mt-1 text-sm text-paper/75">{f.body}</p>
                </div>
                <span
                  className="h-px w-6 bg-paper/40 transition-all duration-500 group-hover:w-12 group-hover:bg-green-300"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-paper/70">Named service initiatives will be introduced as they are confirmed.</p>
        </div>
      </div>
    </section>
  );
}
