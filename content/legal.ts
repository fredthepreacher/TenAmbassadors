import type { LegalDoc } from "@/lib/types";
import { site } from "@/lib/site";

/*
 * Geo point 10 — Privacy, Terms and Accessibility.
 *
 * Written in plain language from what this website actually does today
 * (verified in code, 2026-10-02):
 * - forms are delivered by email: sending opens the visitor's own email app with the message
 *   addressed to site.inbox (interim: info@theupmixer.com, handled by The Upmixer team); the
 *   website itself sends and stores nothing (no form backend, no newsletter provider);
 * - no analytics, advertising or tracking scripts, and no cookies set by the site;
 * - fonts, images and films are served from this site, with no third-party embeds;
 * - Ten Ambassadors' own address is pending, so the "how to reach us" lines use the interim inbox.
 *
 * Deliberately NOT claimed: security standards, retention periods,
 * data-selling statements, regulatory compliance or accessibility certification.
 * Revisit this file whenever a form, analytics, payments or any third-party
 * service is switched on.
 */

const contactLine = site.contact.email
  ? `You can reach us at ${site.contact.email}.`
  : `You can reach us at ${site.inbox.address}. Until Ten Ambassadors has its own address, messages are handled by The Upmixer team.`;

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy",
    summary: "What information this website collects, how it is used, and how to reach us about it.",
    status: "draft",
    updated: "2026-10-04",
    sections: [
      {
        heading: "The short version",
        paragraphs: [
          `${site.name} is a leadership and impact organization being established around Scholarship, Mentorship and Service. This website shares information about that work. Today it does not ask you to create an account, it does not run advertising, and it does not use analytics or tracking tools.`,
        ],
      },
      {
        heading: "Forms on this site",
        paragraphs: [
          "Some pages have forms, such as applications, nominations, partner inquiries and newsletter sign-up. When you send one, your own email app opens with your message already written and addressed to us. Nothing is sent until you press send in your email app, and this website does not store what you type.",
          `Messages go to ${site.inbox.address}. Until Ten Ambassadors has its own address, they are handled by The Upmixer team. We use what you send only to reply to you and to follow up on the request you made. To ask us to update or delete a message, email the same address.`,
        ],
      },
      {
        heading: "Information collected automatically",
        paragraphs: [
          "This site does not set cookies and does not use analytics, advertising or social-media tracking scripts.",
          "Like most websites, the service that hosts this site may process basic technical information when you visit, such as your IP address, browser type and the pages requested. This is used to deliver the pages and protect the site from abuse.",
        ],
      },
      {
        heading: "Photos, video and links",
        paragraphs: [
          "Photographs and films on this site come from events in the Ten Ambassadors and Upmixer community. If you appear in an image and would like it reviewed or removed, please contact us so we can look at it.",
          "Links to other websites, including social-media profiles, are governed by those sites’ own privacy practices.",
        ],
      },
      {
        heading: "Students and young people",
        paragraphs: [
          "This site does not currently collect personal information from anyone, including students and young people. Before any program form opens to students, this page will explain how their information is handled.",
        ],
      },
      {
        heading: "Changes and questions",
        paragraphs: [
          "We will update this page when the website changes how it handles information. The date at the top shows the latest revision.",
          contactLine,
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary: "The simple ground rules for using this website.",
    status: "draft",
    updated: "2026-10-04",
    sections: [
      {
        heading: "About this website",
        paragraphs: [
          `This website provides general information about ${site.name}, its programs and its events. By using it, you agree to these terms. If you do not agree, please do not use the site.`,
        ],
      },
      {
        heading: "Information, programs and events",
        paragraphs: [
          `${site.formationStatus} Program details, scholarship information, event dates, venues and partnership opportunities may change, and some are still being confirmed. Please treat the information here as general, not as an offer or a guarantee. Where it matters, confirm details with us directly.`,
        ],
      },
      {
        heading: "Content and intellectual property",
        paragraphs: [
          `The text, design, graphics, photographs and films on this site belong to ${site.name} or are used with permission. You are welcome to share links to our pages. Please do not copy, republish or alter our content, or use our name or marks in a way that suggests endorsement, without written permission.`,
        ],
      },
      {
        heading: "Acceptable use",
        list: [
          "Do not attempt to disrupt, overload or gain unauthorized access to the site.",
          "Do not use the site to send spam, misleading information or harmful code.",
          "Do not misrepresent yourself or your affiliation with Ten Ambassadors.",
        ],
      },
      {
        heading: "Links to other sites",
        paragraphs: [
          "This site may link to websites run by others, such as partners, event venues or social-media platforms. We are not responsible for their content or practices.",
        ],
      },
      {
        heading: "No warranties",
        paragraphs: [
          "We work to keep the site accurate and available, but it is provided as is. We cannot promise it will always be complete, current or uninterrupted.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: ["We may update these terms as the organization and website grow. The date at the top shows the latest revision.", contactLine],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    summary: "Our commitment to a website everyone can use, and how to tell us when something gets in your way.",
    status: "draft",
    updated: "2026-10-04",
    sections: [
      {
        heading: "Our commitment",
        paragraphs: [
          `${site.name} wants everyone to be able to learn about our work and take part. We design and test this website with accessibility in mind, and we treat accessibility as ongoing work, not a finished task.`,
        ],
      },
      {
        heading: "What we have built in",
        list: [
          "Keyboard navigation throughout, with a skip-to-content link and clearly visible focus outlines.",
          "Semantic page structure: headings, landmarks and labelled navigation, so assistive technology can move through each page.",
          "Text and interface colors chosen for strong contrast, including text placed over photographs.",
          "Descriptive alternative text for meaningful images. Decorative images are hidden from screen readers.",
          "Layouts that adapt to phones, tablets and desktops, and to text zoom.",
          "Reduced motion: if your device asks for less motion, animations and autoplaying films are switched off.",
          "Films never autoplay with sound, and any film that plays on its own can be paused.",
          "Form fields are labelled for assistive technology, and required fields are marked.",
        ],
      },
      {
        heading: "Known limitations",
        paragraphs: [
          "Captions and transcripts for some films are still being prepared. Where a film has speech, we are working to add captions. Some photographs come from older event archives at limited resolution.",
        ],
      },
      {
        heading: "Tell us about a barrier",
        paragraphs: [
          "If something on this site is hard to use with your device, browser or assistive technology, we want to know. Please tell us the page, what you were trying to do and what happened.",
          contactLine,
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug) ?? null;
}
