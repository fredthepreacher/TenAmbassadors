/**
 * Photo source / context attributions (Geo revision point 1).
 *
 * One registry for every photograph the site renders, keyed by the served
 * file path. Components never hardcode captions: they call `creditFor(src)`
 * (via <PhotoCredit />), so a label is corrected here once and updates
 * everywhere, including future lightboxes.
 *
 * Rules (do not relax):
 * - `label` is published only when `status` is "confirmed".
 * - Include a year only when it is known. If the event/source is known but the
 *   year is not, omit the year rather than guess.
 * - Never invent an event name or date. Leads found in file metadata go in
 *   `lead` for the client to confirm; they are never rendered.
 * - Unconfirmed photos render nothing publicly. When
 *   site.showPlaceholderNotes is true, reviewers see a small "Source pending" tag.
 */

export type CreditStatus = "confirmed" | "pending";

export interface PhotoAttribution {
  /** Public label, e.g. "Circa Upmixer Holiday Event, 2018". Rendered only when confirmed. */
  label: string | null;
  status: CreditStatus;
  /** Internal: what is known and where it came from (not rendered). */
  basis: string;
  /** Internal: an unverified lead for the client to confirm (never rendered). */
  lead?: string;
  /** Corner placement. Bottom-right by default; switch if a face sits in that corner. */
  corner?: "br" | "bl";
}

export const attributions: Record<string, PhotoAttribution> = {
  "/media/hero/ta-hero-img-3977.jpg": {
    label: null,
    status: "pending",
    basis: "Approved Assets V2 (TA_Hero_IMG_3977). No event or date metadata in the file.",
  },
  "/media/mentorship/ta-mentorship-2292.jpg": {
    label: "Photo: AllseeinJah.com",
    status: "confirmed",
    basis: "Photographer's own file naming (478-479-AllseeinJah-2292). The event name is not documented.",
    lead: "The Picasa export timestamp in the original reads 2016-07-15, so the shoot was in 2016 or earlier. Confirm the event and year.",
  },
  "/media/mentorship/ta-mentorship-2321.jpg": {
    label: "Photo: AllseeinJah.com",
    status: "confirmed",
    basis: "Photographer's own file naming (492-493-AllseeinJah-2321).",
    lead: "Same 2016 shoot as 2292. Confirm the event and year.",
  },
  "/media/community/ta-community-2342.jpg": {
    label: "Photo: AllseeinJah.com",
    status: "confirmed",
    basis: "Photographer's own file naming (499-500-AllseeinJah-2342).",
    lead: "Same 2016 shoot as 2292. Confirm the event and year.",
  },
  "/media/community/ta-community-a7r00711.jpg": {
    label: null,
    status: "pending",
    basis: "Approved Assets V2 (A7R00711).",
    lead: "Camera metadata: Sony ILCE-7RM3, 2018-12-12 19:15, which may match “Upmixer Holiday Event, 2018”. Confirm before publishing.",
  },
  "/media/community/ta-community-4004.jpg": {
    label: null,
    status: "pending",
    basis: "V2.2 handoff (IMG_4004). No metadata.",
  },
  "/media/community/ta-community-4007.jpg": {
    label: null,
    status: "pending",
    basis: "V2.2 handoff (IMG_4007). No metadata.",
  },
  "/media/mentorship/ta-mentorship-4006.jpg": {
    label: "Upmixer event",
    status: "confirmed",
    basis: "The #UPMIXER stage screen is visible in the full frame (IMG_4006). The year is unknown, so it is omitted.",
  },
  "/media/collage/ta-collage-4001.jpg": {
    label: null,
    status: "pending",
    basis: "V2.2 handoff (IMG_4001), Geo-selected for the collage. No metadata.",
  },
  "/media/community/ta-recap-community-poster.jpg": {
    label: "Upmixer event recap",
    status: "confirmed",
    basis: "Client handoff V2.4: footage from the wider Upmixer event community.",
  },
  "/media/community/ta-recap-community-poster-wide.jpg": {
    label: "Upmixer event recap",
    status: "confirmed",
    basis: "Client handoff V2.4.",
  },
  "/media/scholarship/dr-phang-30s-poster.jpg": {
    label: "Still from the Dr. Christopher A. Phang Scholarship film",
    status: "confirmed",
    basis: "Frame extracted from the approved scholarship film.",
  },
  "/media/scholarship/dr-phang-60s-poster.jpg": {
    label: "Still from the Dr. Christopher A. Phang Scholarship film",
    status: "confirmed",
    basis: "Frame extracted from the approved scholarship film.",
  },
};

/** Attribution for a served photo path, or null when the file is not a photograph we track. */
export function creditFor(src: string): PhotoAttribution | null {
  return attributions[src] ?? null;
}
