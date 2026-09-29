import type { Action } from "@/lib/types";

/**
 * Starlight Awards. The event experience currently lives separately; this is
 * the integration layer. Dates, venue, honorees and ticketing are pending.
 */
export const starlight = {
  /** PENDING: URL of the existing Starlight event experience. */
  externalUrl: null as string | null,
  nextEvent: {
    date: null as string | null,
    venue: null as string | null,
    city: null as string | null,
  },
  honorees: null as { name: string; award: string; year: string }[] | null,
  actions: [
    { label: "Explore Starlight", href: "/starlight", available: true },
    { label: "Attend", href: "/starlight#attend", available: false, pendingNote: "Event date and tickets to be announced." },
    { label: "Sponsor", href: "/starlight#sponsor", available: true },
  ] satisfies Action[],
  pillars: [
    { title: "Celebrate", body: "Honor achievement, leadership, and service across the community." },
    { title: "Gather", body: "Bring together the professionals, partners, and supporters behind the mission." },
    { title: "Fund", body: "Direct the evening's support toward scholarship, mentorship, and service." },
  ],
};
