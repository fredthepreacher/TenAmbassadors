import { IntakeForm } from "@/components/forms/IntakeForm";
import { PageHero } from "@/components/pages/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Ten Ambassadors about scholarship, mentorship, service, partnerships, or the Starlight Awards.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact, inbox } = site;
  return (
    <>
      <PageHero eyebrow="Contact" title="Start a conversation." intro="Questions about scholarship, mentorship, service, partnership or Starlight? We would like to hear from you." />
      <section className="section-y bg-paper pt-12 md:pt-16">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="eyebrow text-gold-ink">Direct contact</h2>
            <div className="mt-5 grid justify-items-start gap-3">
              <a href={`mailto:${contact.email ?? inbox.address}`} className="font-semibold text-green-700 underline decoration-green-500/40 underline-offset-4 hover:decoration-green-500">
                {contact.email ?? inbox.address}
              </a>
              {!contact.email && inbox.interim ? (
                <p className="max-w-xs text-sm text-muted">Messages to Ten Ambassadors are currently handled by The Upmixer team.</p>
              ) : null}
              {contact.phone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : null}
              {contact.address ? <p>{contact.address}</p> : null}
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="sr-only">Send a message</h2>
            <IntakeForm formId="general-contact" />
            <div className="mt-12 border-t border-line pt-10">
              <IntakeForm formId="media-inquiry" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
