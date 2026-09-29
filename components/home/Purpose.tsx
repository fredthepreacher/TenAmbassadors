export function Purpose({
  eyebrow,
  statement,
  origin,
  themes,
}: {
  eyebrow: string;
  statement: string;
  origin: string;
  themes: string[];
}) {
  // Emphasize the pivot of the statement ("Access is not.") without extra markup in content.
  const [first, second, ...rest] = statement.split(". ");
  return (
    <section aria-labelledby="purpose-title" className="section-y bg-ivory">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <p className="eyebrow rule-before text-gold-ink lg:col-span-3 lg:pt-4" data-reveal>
          {eyebrow}
        </p>
        <div className="lg:col-span-9">
          <h2 id="purpose-title" className="text-h2 text-ink" data-reveal>
            {first}. <em className="text-evergreen-700">{second}.</em> {rest.join(". ")}
          </h2>

          <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-2 md:gap-16" data-reveal>
            <p className="text-lede text-ink-2">{origin}</p>
            <ul className="grid gap-3">
              {themes.map((t, i) => (
                <li key={t} className="flex items-baseline gap-4 border-b border-line pb-3 font-serif text-2xl text-evergreen-900">
                  <span className="font-sans text-xs font-semibold tracking-[0.14em] text-gold-ink">0{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
