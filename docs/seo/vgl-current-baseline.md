# VGL SEO baseline

Checked on November 22, 2026 against VGL source commit `93accc8`, the live site and Chrome's rendered DOM. Implementation baseline was `origin/main`. VGL is a React 19 and Vite 6 static site with Tailwind, GSAP, AOS and Framer Motion. Netlify publish configuration serves `dist`. Playwright is the repository's regression, visual and optional performance test runner.

## URL inventory before changes

| URL | Baseline behavior | Evidence |
| --- | --- | --- |
| `/` | HTTP 200, self-canonical, indexable. Root HTML contains an empty React mount. | `index.html`, `src/main.jsx`, [homepage](https://vigneshgrowthlab.dev/) |
| `/restaurant/` | HTTP 200 standalone concept demo. No canonical, description or robots meta. Existing demo functionality uses independent HTML/JS. | `public/restaurant/index.html`, [demo](https://vigneshgrowthlab.dev/restaurant/) |
| `/restaurant` | HTTP 301 to slash URL on production. | Direct HTTP GET |
| `/hi`, `/hi/` | Configured temporary WhatsApp redirects for business cards. | `netlify.toml`, `public/_redirects` |
| Unknown path, `/llms.txt` | HTTP 200 and `text/html` from the generic SPA rewrite. The latter was not an actual text file. | Direct HTTP GET, `netlify.toml`, `public/_redirects` |
| `/robots.txt` | HTTP 200 text, generic allow and sitemap reference. | [robots.txt](https://vigneshgrowthlab.dev/robots.txt), `public/robots.txt` |
| `/sitemap.xml` | HTTP 200 XML. Homepage only. September 24, 2026 date did not represent later homepage changes. | [sitemap.xml](https://vigneshgrowthlab.dev/sitemap.xml), `public/sitemap.xml`, Git log |

Home navigation routes are fragments, including service, work and contact sections. There is no React Router and no distinct blog, course, service or case-study page in the repository. The demo, public downloads, asset paths and redirect aliases serve separate purposes.

## SEO Programático reconciliation

| Reported | Verified baseline |
| --- | --- |
| Overall 60, content 47, structure 70, speed 88, measurement 45, AI visibility 55 | Supplied tool scores. Its exact scoring inputs and methodology were unavailable. These values are not Google ranking or Core Web Vitals measurements. DevTools' separate live mobile audit reported 100 SEO, 94 accessibility, 100 best practices and 50 agentic browsing. Its output did not include a performance score. |
| Homepage title ~70 characters | Confirmed 70 in source, raw HTTP audit and rendered DOM. Concision is editorial guidance. |
| Description ~149 characters | Confirmed 149 in raw HTML. The client rewrote the title/description from duplicate source configuration even though their initial values matched. |
| Missing H1 | Confirmed in raw HTML at the time. The rendered page had 11 H1s after the preloader disappeared and ~2,555 words in its main element. The blanket claim that the page lacked an H1 was a render-dependent false positive. Excess H1s and dependence on JavaScript were actual issues. |
| Missing homepage structured data | Confirmed in source, HTTP audit and DevTools. |
| No GA4 or GTM | No tags, IDs, package/config references or matching script URLs in the inspected source and rendered session. Account-side history and alternate deployment configurations are unknown. The enquiry flow opened WhatsApp directly. |
| Four of four AI assistants could access the site | Public fetches and permissive robots policy independently verified. The original assistant identities, fetch logs and actual use in answers were unavailable. |
| No llms.txt | Confirmed absent in source. Live HTTP 200 at that path returned HTML from the catch-all. |

Existing homepage metadata included a title, description, canonical, generic Open Graph and Twitter tags plus a redundant meta title and meta keywords. Existing strengths included local contact copy, internal links, WebP images, some lazy-loaded media and Google Fonts preconnects with `display=swap`. The repository already contained project counts, testimonials and commercial claims. Their independent verification was outside the source audit. The new metadata and schema exclude those claims.

## Prioritized implementation plan

1. Give production crawlers the same React content as browser users and retain client interactions via hydration.
2. Consolidate homepage metadata, give the hero one meaningful H1 and add an entity graph tied to existing visible facts.
3. Make unknown URLs return 404, keep the restaurant concept available with noindex and maintain a canonical-only sitemap.
4. Refine existing service copy and load below-fold images lazily while preserving layout. Provide local, vendor-neutral enquiry events.
5. Verify source, build output and behavior with Playwright and record external account boundaries.
