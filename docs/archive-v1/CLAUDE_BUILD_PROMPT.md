# TEN AMBASSADORS — V1 DIGITAL FOUNDATION BUILD PROMPT

You are taking over the first production-quality build pass for **Ten Ambassadors**, a nonprofit initiative built around **Scholarship, Mentorship, and Service (SMS)**.

## Mission / positioning
Ten Ambassadors should feel like a credible, modern leadership institution — professional, inclusive, aspirational, community-rooted, and globally minded.

Existing organization language that should be respected:
- "Launched by The Upmixer, Ten Ambassadors is an initiative focused on developing future leaders through Scholarship, Mentorship, and Service."
- "Strengthening Communities."
- "Building Leaders."
- "Expanding Opportunity."

Treat those as source language, but improve hierarchy and presentation. Do not make the website feel like a generic charity template.

## Technical direction
Build in **Next.js + TypeScript** with a clean component architecture and production-grade responsive behavior.

The included starter uses plain CSS to keep the first layer portable. You may migrate to Tailwind if the project benefits from it, but do not create needless framework churn.

Priorities:
1. SEO-ready metadata and semantic HTML
2. Excellent mobile layout
3. Fast image loading and correct `next/image` usage
4. Accessible contrast, keyboard navigation, focus states, and reduced-motion support
5. Reusable sections/components for programs, stories, impact metrics, events, partners, donations, and application flows
6. CMS-ready content architecture for a future Sanity/Supabase/Contentful/etc. connection

## Homepage V1 architecture
1. Premium image-led hero
   - headline: "Developing the next generation of leaders."
   - supporting line around Scholarship · Mentorship · Service
   - CTAs: Explore Our Mission / Get Involved
2. Origin + positioning statement
   - preserve the Upmixer origin relationship
   - transition language: Strengthening Communities / Building Leaders / Expanding Opportunity
3. SMS three-pillar section
   - Scholarship
   - Mentorship
   - Service
   - each must feel like a real future program pathway
4. Featured mentorship / participant story block
5. Community/event photo gallery
6. Future impact metrics block — use placeholders only until verified numbers arrive
7. Future programs/opportunities block
8. Future Starlight Awards feature
9. Partners/sponsors block
10. Conversion CTA: Support / Partner / Volunteer / Apply
11. Footer with contact, social, newsletter, legal, and relationship to The Upmixer

## Visual direction
Blend:
- premium editorial nonprofit
- leadership institution
- modern HBCU / scholarship organization energy
- cinematic but restrained motion
- strong typography
- large real photography
- generous whitespace
- sophisticated deep green / warm neutral / restrained gold direction unless official brand colors override it

Do not visually clone UNCF, TMCF, JRF, or the HBCU benchmark site. Use their information architecture principles, not their styling.

## Benchmark principles to absorb
- **UNCF:** scholarship + donation conversion is immediate and impact metrics are prominent.
- **TMCF:** clear pathways for students, donors, and partners; opportunity listings are actionable.
- **JRF:** scholarship is integrated with mentorship, career development, leadership training, and community service — highly relevant to SMS.

## Photo / media rules — critical
The reference images are real event/community photos from the existing Ten Ambassadors material.

**Preserve the natural appearance and identity of every person.**

Allowed final enhancement:
- exposure correction
- white balance
- denoise
- mild sharpening
- resolution improvement
- crop/framing for responsive layouts

Never:
- alter a person's face
- reshape a body
- change skin tone
- change age
- add/remove people
- fabricate a documentary moment

The included image files are screenshot-derived references. Replace them with original high-resolution files when Geo supplies them.

## Current unknowns — do not invent
Do NOT fabricate:
- scholarship dollar amounts
- eligibility rules
- application dates
- participant names
- testimonials
- impact numbers
- partner names/logos
- addresses
- donation processing details
- social URLs

Create clean placeholders/data structures where necessary and mark them clearly for replacement.

## Pending inputs from Geo
- final contract confirmation
- official logo and brand files
- original high-resolution photos
- videos
- scholarship criteria and schedule
- mentorship structure
- service initiatives
- verified impact statistics
- participant stories/testimonials
- partner/sponsor logos
- contact details
- donation destination
- social media URLs
- Starlight Awards media/details

## Naming issue to resolve
Existing material uses "10 Ambassadors" while current project direction uses "Ten Ambassadors." Keep **Ten Ambassadors** as the working presentation, but make the brand name easy to change globally once Geo confirms the official style.

## First-pass acceptance criteria
- homepage is visually complete enough to demo
- no invented claims
- reference imagery is integrated elegantly
- SMS pillars are unmistakable
- origin relationship to The Upmixer is clear but Ten Ambassadors stands as its own brand
- mobile and desktop both feel intentional
- accessible semantic structure
- no broken links; placeholder links should be visually identifiable or routed to safe placeholder targets
- app builds cleanly

When finished, report:
1. files changed
2. build/lint/typecheck status
3. unresolved content placeholders
4. what original assets are still needed
5. recommended Phase 2 work
