# Magellan CRE Redesign

A founder-led redesign concept for The Magellan Group / Magellan CRE, centered on
J. Max Hamidi, CCIM as a seasoned commercial real estate advisor for serious owners,
investors, borrowers, and referral partners in Germantown, Memphis, and the Mid-South.

## Design

Editorial-advisory design system: warm parchment canvas, deep navy grounding, antique
brass accent, Playfair Display headlines with gold italic accent words, DM Sans body,
scroll-reveal animations, cinematic full-viewport video hero, and a sticky header with
mobile navigation.

Approved palette: `#141E28` ink, `#F7F2E9` parchment, `#B08A3C` brass, `#6F8178` sage.

## Pages

- `index.html` — homepage: video hero, stats band, four advisory lanes, Max quote,
  about teaser, services teaser, deal-matrix preview, team preview, CTA
- `about.html` — Max's story as a timeline, principles, proof points
- `services.html` — service directory and how-Max-works process
- Detail pages: `investment-sales`, `seller-representation`, `buyer-representation`,
  `landlord-representation`, `tenant-representation`, `business-brokerage`,
  `property-management`, `loan-packaging`
- `asset-types.html` — broader property categories
- `deal-matrix.html` — qualified-opportunity fit guide
- `listings.html`, `sale-listings.html`, `commercial-lease-listings.html`
- `team.html` — Max, Ginny Shea Dunn, and the advisor/mentee network
- `contact.html` — contact details, embedded map, and an inquiry form that opens the
  visitor's email app addressed to max@ccim.net
- `terms-conditions.html`, `privacy-policy.html`
- `styles.css` — design system
- `main.js` — mobile nav, sticky header, scroll reveals, contact form
- `sitemap.xml`, `robots.txt` — SEO. The preview is intentionally noindexed; at launch
  on magellancre.com flip robots.txt to `Allow: /`, re-add the Sitemap line, and update
  the base URLs in sitemap.xml and the Open Graph tags.
- `vercel.json` — clean URLs (`/about` instead of `/about.html`) and redirects from the
  old site's paths
- `404.html` — custom not-found page

## Notes

This is a concept site. The contact form is not wired to a backend or CRM — it opens
the visitor's email client prefilled. Before production launch on magellancre.com,
update the base URL in `sitemap.xml`, the Open Graph URLs, and have counsel review the
legal pages.
