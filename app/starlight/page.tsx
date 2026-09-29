import { ActionButton, ButtonLink } from "@/components/ui/Button";
import { StarIcon } from "@/components/ui/Icons";
import { PendingBlock, PendingNote } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getStarlight } from "@/lib/content";
import { starlightFeature } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Starlight Awards",
  description:
    "The Starlight Awards — celebrate excellence, fund opportunity. A signature evening honoring achievement while supporting scholarship, mentorship, and service.",
  path: "/starlight",
});

/** Starlight integration page. The page itself shifts into the night environment. */
export default async function StarlightPage() {
  const starlight = await getStarlight();
  const { nextEvent } = starlight;

  return (
    <div className="bg-night-950 text-champagne">
      <section aria-labelledby="page-title" className="relative overflow-hidden pt-[76px]">
        <div className="starfield starfield-twinkle pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_38%,rgb(232_201_133/0.16),transparent_70%)]" aria-hidden="true" />
        <div className="container-x relative flex min-h-[80svh] flex-col items-center justify-center py-20 text-center">
          <StarIcon className="size-12 animate-rise text-starlight drop-shadow-[0_0_24px_rgb(232_201_133/0.75)]" />
          <p className="eyebrow mt-8 animate-rise self-center text-starlight">{starlightFeature.eyebrow}</p>
          <h1 id="page-title" className="mt-6 animate-rise font-editorial text-display [animation-delay:80ms]">
            <span className="luminous-text luminous-once block">{starlightFeature.title[0]}</span>
            <em className="block">{starlightFeature.title[1]}</em>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lede text-champagne/80 animate-rise [animation-delay:160ms]">{starlightFeature.body}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-start animate-rise [animation-delay:240ms]">
            {starlight.actions.slice(1).map((a, i) => (
              <ActionButton key={a.label} action={a} variant={i === 0 ? "gold" : "night"} noteTone="night" />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="purpose-title" className="section-y border-t border-starlight/15">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="purpose-title"
            tone="night"
            eyebrow="Why Starlight"
            title="An evening that funds the pathway."
            intro="Starlight is envisioned as the signature event of the Ten Ambassadors universe: a night to honor achievement — and an engine that helps fund the programs behind it."
            className="lg:col-span-6"
          />
          <ul className="grid content-start border-t border-starlight/20 lg:col-span-5 lg:col-start-8" data-reveal>
            {starlight.pillars.map((p) => (
              <li key={p.title} className="border-b border-starlight/20 py-6">
                <h3 className="font-serif text-h3 text-starlight">{p.title}</h3>
                <p className="mt-2 text-champagne/75">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="attend" aria-labelledby="attend-title" className="section-y scroll-mt-20 border-t border-starlight/15 bg-night-900">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading id="attend-title" tone="night" eyebrow="Attend" title="The next Starlight Awards" className="lg:col-span-5" />
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <dl className="grid border-t border-starlight/20">
              {[
                ["Date", nextEvent.date],
                ["Venue", nextEvent.venue],
                ["City", nextEvent.city],
                ["Tickets", null],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-6 border-b border-starlight/20 py-4">
                  <dt className="text-champagne/70">{label}</dt>
                  <dd className="font-serif text-xl text-champagne">{value ?? "To be announced"}</dd>
                </div>
              ))}
            </dl>
            <PendingNote tone="night" className="mt-6">
              Event details, honorees, and ticketing pending
            </PendingNote>
            {starlight.externalUrl ? (
              <div className="mt-8">
                <ButtonLink href={starlight.externalUrl} variant="night" arrow>
                  Visit the Starlight event site
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="sponsor" aria-labelledby="sponsor-title" className="section-y scroll-mt-20 border-t border-starlight/15">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="sponsor-title"
            tone="night"
            eyebrow="Sponsor"
            title="Put your name behind opportunity."
            intro="Sponsorship connects your organization with an evening of excellence — and with the scholarships, mentorship, and service it helps fund."
            className="lg:col-span-6"
          />
          <div className="grid content-start gap-6 lg:col-span-5 lg:col-start-8" data-reveal>
            <PendingBlock tone="night" title="Sponsorship opportunities">
              Sponsorship levels and benefits will be published here. In the meantime, sponsors can reach the team directly.
            </PendingBlock>
            <ButtonLink href="/contact" variant="gold" arrow className="w-fit">
              Sponsorship inquiry
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="honorees-title" className="section-y border-t border-starlight/15 bg-night-900">
        <div className="container-x">
          <SectionHeading id="honorees-title" tone="night" eyebrow="Honorees" title="Celebrating excellence" />
          <div className="mt-12" data-reveal>
            {starlight.honorees ? null : (
              <PendingBlock tone="night" title="Honorees & highlights">
                Honorees, award categories, and photography from past and upcoming Starlight evenings will be featured here.
              </PendingBlock>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
