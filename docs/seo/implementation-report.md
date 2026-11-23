# VGL technical SEO implementation

The existing React 19, Vite 6 and Tailwind portfolio now ships its homepage content in the production HTML. React hydrates that markup for existing interactions. Work is on local branch `feat/vgl-technical-seo` at base commit `93accc8`, with the changes in the working tree.

## Before and after

| Check | Before | Local production build |
| --- | --- | --- |
| Homepage delivery | Empty initial React root. Meaningful copy depended on JS | Pre-rendered React content with service cards, case studies, contact, navigation and an H1 in the response. Hydration preserves the application. |
| H1 | 0 in raw HTML, 11 in the live DOM | 1 in the initial HTML, in the hero. Animated copy and background labels use non-heading elements. |
| Title and description | 70 and 149 characters. Two code paths controlled the same values | 56-character title and 140-character description authored once for the home head. Unique concept demo metadata. |
| Canonical and social | Homepage canonical and social tags. Demo lacked both | One self-canonical per page and separate OG and X previews. Existing brand logo reused. |
| JSON-LD | 0 blocks | 1 graph with a shared Organization/LocalBusiness identity, WebSite and 4 service entities from the visible service cards. Uses published business contact details and verified locality, with no street address, geo coordinates, rating or opening hours inferred. |
| Crawl behavior | Broad rewrite returned the homepage with HTTP 200 for arbitrary routes | Current route model serves static pages directly. Unknown paths return 404 in local preview. Repository config includes Netlify's custom 404 asset and keeps redirect aliases. |
| Sitemap | Homepage, inaccurate lastmod and optional priority/changefreq | Canonical homepage only, with modification date omitted pending an accurate maintained publication date. Demo marked noindex and public PDFs have a host noindex header. |
| AI access | Permissive robots with a JS-only marketing homepage | Same crawler policy, with real homepage content in the response. No dedicated AI instructions file added. |
| Media | Existing WebP and some lazy images. Service cards requested their artwork eagerly | Sized hero, founder and service artwork from measured intrinsic dimensions. Deferred offscreen service and testimonial images. Existing font strategy retained. |
| Measurement | No confirmed GA4/GTM. Contact flow hands off to WhatsApp | Local intent event seam for WhatsApp, phone, enquiry links and valid form handoffs. No vendor calls or user-submitted fields in event detail. |

The sitemap follows [Google's guidance on canonical URLs and lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Netlify serves `404.html` for unmatched static paths according to its [redirect and 404 documentation](https://docs.netlify.com/manage/routing/redirects/redirect-options/).

## File changes

| File | Change |
| --- | --- |
| `.gitignore` | Exclude temporary SSR build directories if interrupted. |
| `package.json` | Build and prerender together. Include SEO tests in the existing E2E command. |
| `vite.config.js` | Inject homepage head, support SSR bundling of GSAP and use static route handling in preview. |
| `index.html` | Remove duplicate metadata source. Make key content readable with animations disabled when JavaScript is off. |
| `scripts/prerender.mjs` | Build a temporary SSR entry, render the homepage and remove the temporary output. |
| `src/entry-server.jsx` | Render the existing React application at build time. |
| `src/main.jsx` | Hydrate built HTML. Mount normally when serving the empty development template. |
| `src/App.jsx` | Remove client-only metadata mutation and attach/clean up contact measurement listener. |
| `src/components/SEO.jsx` | Removed the now-redundant client metadata component. |
| `src/data/seo.js` | Define homepage metadata, canonical, social preview and JSON-LD graph. |
| `src/data/portfolioData.js` | Align service and hero copy with stated offerings and expand the existing Pollachi location. Add service anchor identifiers and measured testimonial image dimensions. |
| `src/components/Hero.jsx` | Main brand H1, updated existing introduction and intrinsic portrait dimensions. |
| `src/components/About.jsx` | Semantic headings and sized/lazy portrait. |
| `src/components/ServicesWheel.jsx` | Semantic section heading, stable IDs for existing service cards and sized decorative lazy images. Existing scroll interactions retained. |
| `src/components/NetflixPreloader.jsx` | Keep preloader decoration out of headings and hide it when scripting is disabled. |
| `src/components/CustomCursor.jsx` | Defer touch detection until after hydration to avoid mismatches. Keep initial cursor overlay invisible. |
| `src/components/Portfolio.jsx` | Make the animated background label decorative. |
| `src/components/Skills.jsx` | Use text labels for marquee items. |
| `src/components/TrustStats.jsx` | Use text labels for statistics. |
| `src/components/SlideCardsSection.jsx` | Adjust testimonial heading level, lazy-load avatars and reserve space for the lazy testimonial image. The latter resolves the mobile FAQ anchor offset observed during testing. |
| `src/components/Footer.jsx` | Use footer group heading levels. |
| `src/components/ContactCTA.jsx` | Identify the contact action section for its no-script style. |
| `src/components/ContactForm.jsx` | Emit a local event after successful validation. |
| `src/utils/conversions.js` | Dispatch action-only events for contact intents. |
| `public/restaurant/index.html` | Add page-specific title, description, canonical, social preview and noindex to the existing concept demo. |
| `public/404.html` | Add a static missing-page response with a home link. |
| `netlify.toml` | Remove the legacy SPA fallback from host configuration in source. |
| `public/_redirects` | Remove the duplicate SPA fallback and retain the existing host alias and business card redirects. |
| `public/_headers` | Set noindex headers for PDF downloads and the standalone 404 asset. |
| `public/sitemap.xml` | Remove stale lastmod and unused priority/change frequency. |
| `tests/seo.spec.js` | Test no-JS content, unique tags, canonical, schema against visible copy, robots/sitemap, missing routes and contact intents. |
| `tests/regression.spec.js` | Assert the initial preloader HTML without racing the animation and verify that the validated WhatsApp flow emits only its action name. |
| `docs/seo/vgl-current-baseline.md` | Inventory and reconcile the prior VGL audit. |
| `docs/seo/gmine-vgl-gap-analysis.md` | Compare Gmine evidence with VGL and prioritize applicable work. |
| `docs/seo/seo-plugins-and-tools.md` | Record connector capability and actual results. |
| `docs/seo/deferred-domain-and-analytics-tasks.md` | Capture account prerequisites and the conversion event contract. |
| `docs/seo/implementation-report.md` | Record implementation, validation and limitations. |

## Validation

- `npm run build` passed, including the static React rendering step. A production HTML scan found one H1, one JSON-LD block and zero missing hashed asset references.
- 14 focused desktop and Android Chromium checks passed on the final build. These covered no-JavaScript content, head tags, schema, crawl routes, hydration, preloader, overflow, navigation and the WhatsApp enquiry handoff. The Android FAQ navigation was also retested independently and passed.
- Six focused SEO checks passed in Firefox and WebKit. Five additional Android Chromium checks passed for menu reachability, category filters, the services wheel, the touch cursor and required fields.
- Live and local mobile DevTools Lighthouse reported SEO 100 both times. Local accessibility scored 96, best practices 100 and agentic browsing 100. Live baseline scored 94, 100 and 50 in those categories. These were separate navigation audits. The tool did not supply a performance category or field data.
- The first mobile audit exposed a custom cursor hydration mismatch. The corrected build passed its desktop and touch hydration checks and the repeat local Lighthouse audit had no console-error finding.
- `git diff --check` passed.

## Local load comparison

The original and updated production builds were served from separate local Vite preview ports. HTML sizes came from the built files. Browser measurements are medians of three desktop Chromium runs per build.

| Measurement | Original | Updated |
| --- | ---: | ---: |
| Main HTML gzip size | 1.1 kB | 29.9 kB |
| Local transfer, 4× CPU throttle with remote font CSS stubbed | 958 kB | 830 kB |
| Time until preloader clears, unthrottled with remote font CSS stubbed | 3.11 s | 3.17 s |
| Browser load event, same unthrottled run | 0.10 s | 0.66 s |
| Layout shift through preloader clearing and load in the unthrottled run | 0 | 0 |

The browser discovers more markup and assets before its load event. In the unthrottled comparison, the visible preloader cleared about 55 ms later while the browser load event moved by about 560 ms. The throttled runs produced variable event timings and ran alongside browser QA. This is local lab evidence with limited samples. Production field performance and LCP for the revealed content remain unverified.

## Known limits

- The broad host rewrite removal and custom 404 are verified in source and by static preview status. Netlify-specific behavior and headers require smoke tests after an approved deploy.
- Existing contrast findings and the GitHub abbreviation's accessible name are outside the SEO changes. The homepage retains its preloader and its existing bundle-size warning.
- The full 275-case E2E matrix was started and interrupted after a resource-contended run exposed timeouts and a mobile anchor regression. Focused reruns exercised those checks after fixes. Visual screenshot comparison needs reference snapshots, which were absent from the checkout.
- Google rich-result eligibility and indexing are unverified. The markup intentionally provides only the factually supported locality for LocalBusiness.
- Local measurements are lab data. Authorized Search Console, Bing, field performance, analytics and production checks remain deferred.
- No dependency updates were needed. `npm audit --omit=dev` reported zero production advisories. The full dependency audit flagged an existing Vite development advisory. The existing lint command cannot run because ESLint is missing from the repository dependencies.
