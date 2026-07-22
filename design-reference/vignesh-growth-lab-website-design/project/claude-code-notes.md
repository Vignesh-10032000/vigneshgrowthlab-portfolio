# VGL — Claude Code implementation notes

Design source of truth: the `.dc.html` files in this project + `service-routes.js` / `project-routes.js`.
Target: AstroWind (Astro). Every internal link in the designs carries `data-route` with its production route.

## ⚠ Routes are REAL pages, not one template URL
The two template designs are single files here only because this is a design project. **Claude Code MUST generate real Astro routes** — `/services/[slug]` and `/projects/[slug]` static paths from the matrices — and for EACH route populate from the selected entry:
- `<title>` (seoTitle), meta description (seoDescription)
- canonical (canonicalUrl), og:title / og:description / og:image
- twitter:title / twitter:description / twitter:image
- JSON-LD (`Service` + `BreadcrumbList` per service; `CreativeWork` + `BreadcrumbList` per case study — replace every `[per-route …]` marker)
No route may ship the template's default (Website Development / NextGen Toys) metadata or copy.

## Route map
| Design file | Route |
|---|---|
| Home.dc.html | `/` |
| About.dc.html | `/about` |
| Services.dc.html | `/services` |
| Service Template.dc.html | `/services/[slug]` × 4 — content in `service-routes.js` |
| Projects.dc.html | `/projects` |
| Case Study Template.dc.html | `/projects/[slug]` × 4 — content in `project-routes.js` |
| Contact.dc.html | `/contact` |
| PDFs | `/documents/vgl-resume.pdf`, `/documents/udyam-certificate.pdf` |

## siteUrl
No production domain is confirmed. Every canonical, OG, Twitter and schema URL uses the literal placeholder `{{siteUrl}}` — define one `siteUrl` config value and derive all absolute URLs from it. Do not ship `{{siteUrl}}` literally. All pages are `<html lang="en">`.

## Image dimensions (prevent CLS — use Astro's Image with explicit sizes)
- Case-study hero: 21:9 (e.g. 1680×720), object-fit cover
- Project card / AI poster images: 16:10 (e.g. 1280×800)
- Service hero visual: 16:11 (e.g. 1040×715)
- Gallery / workflow screenshots: 4:3 (e.g. 1200×900)
- Founder photo `vignesh`: intrinsic 1122×1402
- NextGen testimonial screenshot: intrinsic 628×786
- Video posters: 16:9 (e.g. 1280×720)
Every `<img>` gets width+height (or the container's aspect-ratio, already inline in the designs) and descriptive alt from the matrices' `*Alt` fields.

## Content matrices
- `service-routes.js` → per-service seo fields, hero, outcome, whoItIsFor, quickProof, features, technologies, startingPrice (ONLY website-development has "Starting at ₹8,000"; others intentionally blank — do not add prices), related project, CTA, WhatsApp message, heroImage(+alt).
- `project-routes.js` → per-project seo fields, facts, `challengeKicker: 'Project goal'` (the label used when the client's original challenge was not explicitly supplied — keep copy factual, never imply client statements), goal/solution, delivered, results, media (cardImage/heroImage/gallery/video/videoPoster/videoTranscript/videoCaptionsFile/labels), testimonial (NextGen only), liveUrl/label, relatedServiceRoute, WhatsApp message.
- Conditional blocks collapse when a field is empty: gallery, video, transcript (`videoTranscript`), captions track (`videoCaptionsFile`), quote, price, live URL. Transcript/captions UI must not render without content.

## Production asset map (single optimized copy each)
```
public/
  brand/      vgl-logo.svg, vgl-logo-mark.svg
  images/     vignesh.webp, nextgen-testimonial.webp,
              project-nextgen.webp, project-rani.webp, project-pos.webp,
              project-ai-automation.webp, workflow/n8n-workflow-1..4.webp,
              client-testimonial-poster.webp, og-cover.png
  videos/     client-testimonial.mp4, n8n-workflow.mp4 (+ .vtt captions when available)
  documents/  vgl-resume.pdf, udyam-certificate.pdf
```
**⚠ Do NOT copy the design-time duplicates.** This design project holds working copies under `assets/`, `documents/` and `uploads/` — several are the same file under different names. Production gets exactly ONE optimized copy of each asset at the paths above (PNG → WebP/AVIF, videos compressed). Nothing from `uploads/` ships as-is.

## ⚠ REQUIRED BEFORE LAUNCH (missing assets checklist)
1. **Client testimonial video** → `videos/client-testimonial.mp4` (on old phone; placeholder state ships until then — set Home tweak `testimonialVideoSrc`)
2. **Client testimonial poster** → `images/client-testimonial-poster.webp`
3. **n8n video poster** → poster frame for `videos/n8n-workflow.mp4`
4. **Four main project screenshots** → NextGen Toys, Rani Sarees, VGL POS, AI automation overview
5. **Four n8n workflow screenshots** → `images/workflow/`
6. **Open Graph cover image** → `images/og-cover.png`
7. **Real Instagram URL** → footer icon stays disabled "coming soon" until supplied

## Behaviours to preserve
- Formspree: endpoint `meeyzjgw`, AJAX via @formspree/ajax CDN + native POST fallback; selects use `<option value="" selected disabled>Choose a…</option>` placeholders (JS also resets them on mount); phone `pattern="[+]?[0-9\s()-]{10,16}"`; inputs/selects carry plain `data-fs-field` (no value); field-level errors are `<p data-fs-error="name|business_type|whatsapp|service|budget">`; form-level `<div data-fs-error role="alert">` + `<div data-fs-success role="status">` on BOTH forms. Submit flow: invalid → focus first invalid field; valid → disable button + "Sending…"; **re-enable ONLY when Formspree reports success or failure (no fixed timers)**; then focus the success or error message.
- Nav: skip-to-content → `#main-content`; order About, Services, Clients (`/#clients`), Projects, Why VGL (`/#why-vgl`), Resume (PDF); `aria-current="page"` active states; mobile menu: aria-expanded/controls, Escape closes, focus in/out, body scroll lock; 44px tap targets (footer social icons included).
- Anchored sections have `scroll-margin-top:84px`; FAQ anchor is `/#faq`.
- WhatsApp: +91 8220034139 via `wa.me` with per-context prefilled messages; green (#25D366 border / #3ddc74 text) is WhatsApp-only.
- All `target="_blank"` links: `rel="noopener noreferrer"`.
- Grids: `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` (320px-safe); section spacing `clamp(52px,7vw,88px)` / `clamp(44px,6vw,64px)`.
- Comparison table: real `<table>` with caption/scope + visible Yes/No on desktop; stacked cards ≤760px.
- Videos: native controls, playsinline, preload="metadata", poster, label + visible caption, optional `<track kind="captions">` + transcript `<details>`; homepage/overview never embed the n8n video — poster + "Watch the workflow" → `/projects/ai-whatsapp-automation`. Keep the Rani Sarees testimonial section with its designed missing-video state until the real file arrives; never fake footage or testimonial content.
