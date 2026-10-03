import { ActionButton, ButtonLink } from "@/components/ui/Button";
import { StarIcon } from "@/components/ui/Icons";
import { PendingBlock, PendingNote } from "@/components/ui/Pending";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getStarlight } from "@/lib/content";
import { starlightFeature } from "@/content/home";
import { absoluteUrl, ids, jsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Starlight Awards 2026, New York",
  description:
    "Ten Ambassadors’ signature leadership awards: Friday, December 11, 2026 at Matriarch at Cachet Boutique Hotel, 512 W. 42nd Street, New York, near Times Square.",
  path: "/starlight",
});

/** Starlight — the signature annual event of Ten Ambassadors (not the whole organization). */
export default async function StarlightPage() {
  const s = await getStarlight();
  const e = s.nextEvent;

  // Event structured data — only verified fields (no time, price or performers).
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${absoluteUrl("/starlight")}#event`,
    name: e.name,
    url: absoluteUrl("/starlight"),
    image: [absoluteUrl("/opengraph-image")],
    startDate: e.dateISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: e.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: e.street,
        addressLocality: e.locality,
        addressRegion: e.region,
        postalCode: e.postalCode,
        addressCountry: "US",
      },
    },
    organizer: { "@type": "Organization", "@id": ids.organization, name: site.name, url: site.url },
    description: s.positioning,
  };

  return (
    <div className="bg-night-950 text-champagne">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(eventJsonLd)} />

      <section aria-labelledby="page-title" className="relative overflow-hidden pt-[76px]">
        <div className="starfield starfield-twinkle pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_38%,rgb(232_201_133/0.16),transparent_70%)]" aria-hidden="true" />
        <div className="container-x relative flex min-h-[82svh] flex-col items-center justify-center py-20 text-center">
          <StarIcon className="size-12 animate-rise text-starlight drop-shadow-[0_0_24px_rgb(232_201_133/0.75)]" />
          <p className="eyebrow mt-8 animate-rise self-center text-starlight">{s.tagline}</p>
          <h1 id="page-title" className="mt-6 animate-rise font-editorial text-display [animation-delay:80ms]">
            <span className="luminous-text luminous-once block">{starlightFeature.title[0]}</span>
            <em className="block">{starlightFeature.title[1]}</em>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-rise text-lede text-champagne/80 [animation-delay:160ms]">{s.positioning}</p>
          <p className="mt-8 animate-rise text-sm font-semibold tracking-[0.18em] text-starlight uppercase [animation-delay:200ms]">
            <time dateTime={e.dateISO}>{e.date}</time> · New York
          </p>
          <div className="mt-8 flex animate-rise flex-col items-center gap-4 [animation-delay:240ms] sm:flex-row sm:items-start">
            {s.actions.slice(1).map((a, i) => (
              <ActionButton key={a.label} action={a} variant={i === 0 ? "gold" : "night"} noteTone="night" />
            ))}
          </div>
        </div>
      </section>

      <section id="attend" aria-labelledby="attend-title" className="section-y scroll-mt-20 border-t border-starlight/15 bg-night-900">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading id="attend-title" tone="night" eyebrow="Attend" title={e.name} className="lg:col-span-5" />
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            <dl className="grid border-t border-starlight/20">
              {[
                ["Date", <time key="d" dateTime={e.dateISO}>{e.date}</time>],
                ["Venue", e.venue],
                ["Address", `${e.street}, ${e.city}`],
                ["Time", e.time ?? "Announced with tickets"],
                ["Tickets", s.externalUrl ? "On the event site" : "Details to come"],
              ].map(([label, value]) => (
                <div key={label as string} className="flex items-baseline justify-between gap-6 border-b border-starlight/20 py-4">
                  <dt className="text-champagne/70">{label}</dt>
                  <dd className="text-right font-serif text-xl text-champagne">{value}</dd>
                </div>
              ))}
            </dl>
            <PendingNote tone="night" className="mt-6">
              Start time, ticket link, final awards &amp; honorees pending
            </PendingNote>
            {s.externalUrl ? (
              <div className="mt-8">
                <ButtonLink href={s.externalUrl} variant="night" arrow>
                  Visit the Starlight event site
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="global-black-tie" aria-labelledby="gbt-title" className="section-y relative overflow-hidden border-t border-starlight/15">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_50%,rgb(35_88_192/0.22),transparent_70%)]" aria-hidden="true" />
        <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow rule-before text-starlight">Dress code</p>
            <h2 id="gbt-title" className="mt-5 font-editorial text-h1">
              <span className="luminous-text">{s.globalBlackTie.title}</span>
            </h2>
            <p className="mt-3 font-serif text-2xl text-champagne italic">{s.globalBlackTie.subtitle}</p>
            <p className="mt-6 max-w-xl text-lede text-champagne/80">{s.globalBlackTie.body}</p>
          </div>
          <ul className="grid gap-2 lg:col-span-4 lg:col-start-9" data-reveal aria-label="Attire inspiration">
            {["Formal & cocktail attire", "Culturally influenced formalwear", "Heritage fabrics", "Global fashion", "Modern eveningwear", "International accents"].map((t) => (
              <li key={t} className="flex items-center gap-3 border-b border-starlight/15 py-2.5 text-champagne/90">
                <span className="size-1.5 rounded-full bg-starlight" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="awards" aria-labelledby="awards-title" className="section-y border-t border-starlight/15 bg-night-900">
        <div className="container-x">
          <SectionHeading
            id="awards-title"
            tone="night"
            eyebrow="Awards"
            title="Honoring leadership and impact"
            intro="Award categories under consideration for 2026. Additional award details will be announced as the program develops."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-starlight/15 sm:grid-cols-2 lg:grid-cols-4">
            {s.awards.map((a, i) => (
              <li key={a.id} className="bg-night-900 p-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <StarIcon className="size-5 text-starlight" />
                <h3 className="mt-4 text-2xl text-champagne">{a.title}</h3>
                <p className="mt-3 text-xs font-semibold tracking-[0.14em] text-starlight/80 uppercase">{a.status === "concept" ? "Under consideration" : "Confirmed"}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            {s.honorees ? null : <PendingBlock tone="night" title="Honorees">This year&rsquo;s honorees will be announced ahead of the evening.</PendingBlock>}
          </div>
        </div>
      </section>

      <section aria-labelledby="roles-title" className="section-y border-t border-starlight/15">
        <div className="container-x">
          <SectionHeading
            id="roles-title"
            tone="night"
            eyebrow="Two brands, one evening"
            title="Distinct organizations, intentionally connected."
            intro={`Starlight is one signature program of ${site.name} — not the whole organization. ${site.parentOrg.legalName} is its ${site.parentOrg.starlightRole.replace(" for the Starlight Awards", "")}.`}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[
              { name: site.name, items: s.roles.tenAmbassadors },
              { name: site.parentOrg.legalName, items: s.roles.upmixer },
            ].map((b) => (
              <div key={b.name} className="rounded-2xl border border-starlight/25 p-6 md:p-8" data-reveal>
                <h3 className="text-2xl text-starlight">{b.name}</h3>
                <ul className="mt-4 grid gap-2 text-champagne/85">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-starlight/70" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sponsor" aria-labelledby="sponsor-title" className="section-y scroll-mt-20 border-t border-starlight/15 bg-night-900">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="sponsor-title"
            tone="night"
            eyebrow="Sponsor"
            title="Put your name behind opportunity."
            intro="Starlight Awards partnership connects your organization with an evening of excellence — and with the programs it helps support."
            className="lg:col-span-6"
          />
          <div className="grid content-start gap-6 lg:col-span-5 lg:col-start-8" data-reveal>
            <PendingBlock tone="night" title="Sponsorship opportunities">Sponsorship levels and benefits are being finalized. Reach out now to be part of the evening.</PendingBlock>
            <ButtonLink href="/get-involved/sponsor" variant="gold" arrow className="w-fit">
              Sponsorship inquiry
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
