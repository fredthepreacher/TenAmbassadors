import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { getGiving } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Donate & Support the Mission",
  description: "Ways to support Ten Ambassadors’ Scholarship, Mentorship and Service work, including the Scholarship Fund and corporate giving. Online giving is being prepared.",
  path: "/donate",
});

export default async function DonatePage() {
  const giving = await getGiving();
  const live = Boolean(site.donation.url);

  return (
    <>
      <PageHero
        eyebrow="Support the mission"
        title={
          <>
            Invest in the <em className="text-royal-700">next generation.</em>
          </>
        }
        intro="Giving will help build Scholarship, Mentorship and Service programs from the ground up. Online giving is being prepared."
      >
        {live ? (
          <ButtonLink href={site.donation.url!} variant="glass" arrow>
            Give now
          </ButtonLink>
        ) : (
          <p className="max-w-md text-[0.95rem] text-muted">Online giving will open once the giving platform is in place.</p>
        )}
      </PageHero>

      <section aria-labelledby="ways-title" className="section-y bg-paper">
        <div className="container-x">
          <h2 id="ways-title" className="text-h2 text-navy-900">
            Ways to <em className="text-royal-700">give</em>
          </h2>
          <ul className="mt-10 grid border-t border-line-strong sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
            {giving.map((g, i) => (
              <li key={g.id} className="border-b border-line py-6" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 60}ms` }}>
                <p className="text-xs font-semibold tracking-[0.14em] text-gold-ink">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-2xl text-navy-900">{g.title}</h3>
                <p className="mt-1 text-ink-2">{g.summary}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 max-w-2xl rounded-2xl border border-line-strong bg-ivory p-6">
            <h3 className="text-xl text-navy-900">About tax treatment</h3>
            <p className="mt-2 text-ink-2">
              {site.formationStatus} Information about giving — including any tax treatment — will be published once confirmed.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/get-involved/sponsor" arrow>
              Corporate & program sponsorship
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Talk to the team
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
