# Forms, CRM & Analytics Architecture (V2.2)

## Forms — one registry, one submission path

- **Registry:** `lib/forms.ts` defines all 10 forms:
  - ambassador application
  - ambassador nomination
  - mentor application
  - Network Partner application
  - volunteer interest
  - sponsor inquiry
  - general contact
  - scholarship interest
  - newsletter
  - media inquiry
- **Rendering:** `components/forms/IntakeForm.tsx` renders any registered form, with labels, hints, required markers and a live status region.
- **Submission:** every form, including the footer newsletter, calls `submitIntake(formId, data)`.
- **Status:** intake is **off**. `site.intake.enabled` is false, so forms show as labelled previews ("Preview · not collecting yet") with disabled fields. **Nothing is collected**, and no paid service has been added.

**Ambassador application fields:**

- name, email, organization, title, LinkedIn, location
- background, community involvement, mentorship/service experience
- motivation, affiliation
- referral/nominator

### Turning intake on (needs approval)

1. Choose one destination: a CRM or database. See the options below.
2. Add `app/api/intake/route.ts`. It should:
   - validate the payload server-side against `forms[formId]`
   - add spam protection (a honeypot plus rate limiting, or Turnstile)
   - write a **Contact** (person or organization) and an **Interaction** `{formId, pathway, referral, createdAt}`.
3. Set `site.intake = { enabled: true, endpoint: "/api/intake" }`.
4. Publish the privacy policy (`/privacy`) first, and add consent text for the newsletter.

**Low-cost CRM options** (verify current pricing before choosing):

- Airtable, or a HubSpot free CRM (contacts, pipeline, forms API).
- A Postgres table on Supabase or Neon (free tiers), paired with a simple admin.
- Avoid separate email inboxes per form. Every record should land in one place, tagged by `formId`.

## Network Partner referral tracking

- The `referral` field is on the relevant forms.
- For links, give each partner a code (for example `?ref=alumni-nyc`). Read it client-side, prefill `referral`, and send it with the submission.
- Report submissions per partner from the CRM.

## Analytics (not installed)

No tracking was added, because consent and privacy requirements come first. When approved:

- **Google Analytics 4** or a privacy-light alternative (Plausible or Vercel Web Analytics). Load it only after consent where required.
- **Google Search Console:** verify the domain at launch and submit `/sitemap.xml`.
- **Conversion events to define:**
  - `apply_ambassador`, `nominate`, `apply_mentor`, `apply_network_partner`
  - `volunteer_interest`, `sponsor_inquiry`, `newsletter_signup`
  - `donate_click` (to the processor), `starlight_ticket_click` (outbound event link)
  - `video_play` (Dr. Phang film)
- **Donations:** use processor-side reporting. No processor has been chosen.
- **Event links:** add UTM parameters to outbound Starlight ticket links once a ticketing URL exists.

## SEO semantics in place

- Page copy naturally covers: leadership development, mentorship programs, professional mentorship, young professional leadership, scholarship, community service, global leadership, the Starlight Awards, and New York events.
- `Organization` JSON-LD (with slogan and knowsAbout) and `Event` JSON-LD on `/starlight`.
  - The Event data includes only verified fields: name, date, venue and address. There is no start time or ticket offer.
- Pathway and form pages are indexable. Legal placeholder pages remain `noindex`.
