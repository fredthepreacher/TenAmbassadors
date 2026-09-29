import { ContactForm } from "@/components/pages/ContactForm";
import { PageHero } from "@/components/pages/PageHero";
import { PendingNote } from "@/components/ui/Pending";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Ten Ambassadors about scholarship, mentorship, service, partnerships, or the Starlight Awards.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = site;
  return (
    <>
      <PageHero eyebrow="Contact" title="Start a conversation." intro="Questions about scholarship, mentorship, service, partnership, or Starlight — we would like to hear from you." />
      <section className="section-y bg-paper pt-12 md:pt-16">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="eyebrow text-gold-ink">Direct contact</h2>
            <div className="mt-5 grid justify-items-start gap-3">
              {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : null}
              {contact.phone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : null}
              {contact.address ? <p>{contact.address}</p> : null}
              {!contact.email && !contact.phone && !contact.address ? <PendingNote>Email, phone, and address pending</PendingNote> : null}
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="font-serif text-h3">Send a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
