import { ButtonLink, TextLink } from "@/components/ui/Button";

/**
 * Homepage Mentorship chapter.
 *
 * Client direction (2026-10-05): remove the current AllseeinJah mentorship photo and
 * leave the section visually complete without a placeholder. A replacement photo will
 * be added later when Geo supplies/approves one.
 */
export function MentorshipFeature({
  eyebrow,
  title,
  body,
  pillars,
}: {
  eyebrow: string;
  title: string;
  body: string;
  pillars: { title: string; body: string }[];
}) {
  const [lead, tail] = title.split(" who have ");

  return (
    <section id="mentorship" aria-labelledby="mentorship-title" className="section-y relative overflow-hidden bg-ivory">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow rule-before text-gold-ink">{eyebrow}</p>
          <h2 id="mentorship-title" className="mt-5 text-h2 text-navy-900">
            {tail ? (
              <>
                {lead} who have <em className="text-royal-700">{tail}</em>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="mt-6 text-lede text-ink-2">{body}</p>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="/mentorship#become-a-mentor" arrow>
              Become a mentor
            </ButtonLink>
            <TextLink href="/mentorship#ambassador-pathway">Future Ambassador pathway</TextLink>
          </div>

          {/* TODO: Add a new client-approved Mentorship photo here once Geo supplies the replacement.
              Do not restore ta-mentorship-2292.jpg unless the client explicitly reverses this request. */}
        </div>

        <ol className="grid content-start border-t border-line lg:col-span-6 lg:col-start-7" data-reveal>
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-5 sm:grid-cols-[2.5rem_10rem_1fr]"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className="pt-1 text-xs font-semibold tracking-[0.14em] text-gold-ink">0{i + 1}</span>
              <h3 className="text-2xl text-navy-900 transition-colors group-hover:text-royal-700">{p.title}</h3>
              <p className="col-start-2 text-ink-2 sm:col-start-3">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
