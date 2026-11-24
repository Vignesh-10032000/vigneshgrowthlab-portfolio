# VGL homepage contrast and release candidate

23 November 2026 · `feat/vgl-technical-seo`

This candidate includes the earlier technical SEO work and the homepage contrast follow-up. The [previous release-readiness report](release-readiness-report.md) records the pre-contrast baseline, including 58 desktop and 50 mobile contrast findings. Its reports and the earlier QA evidence are retained.

## Homepage changes

| Area | Change |
| --- | --- |
| Color system | Kept VGL blue `#4B72E8` in the brand marks, gradients, borders, glows and service backdrops. Added related shades `#779BFF` for text and `#3B60D4` for blue surfaces that carry white text. Raised the contrast of small secondary labels and placeholders. |
| Navigation and controls | Added a high-contrast keyboard focus indicator and clearer form and control borders. Mobile menu expansion is exposed through `aria-expanded`. Escape closes the panel and returns focus to its toggle. Portfolio filters expose their pressed state. |
| Hero and services | Kept the hero entrance, badge glow, marquee and pinned wheel. Removed overlapping entrance transforms that clipped the hero badge. Darkened service card text backing and added dark backing for the scroll hint and progress markers. Keyboard focus brings the relevant service card into view after native focus scrolling. |
| Cards and overlays | Kept the decorative watermarks in CSS and out of the accessibility tree. Reduced the opacity of the skills marquee edge overlays so moving labels stay readable. Project dialogs keep keyboard focus inside and restore it to the trigger on close. |
| Forms and conversion controls | Increased contrast for placeholder text, required markers, selected options and contact links. The existing functional suite exercises validation and the WhatsApp handoff with synthetic input. |

Representative ratios from the authored foreground and background colors are 5.17:1 at the weaker blue CTA gradient stop, 5.05:1 for readable blue on a dark blue tint, 7.19:1 for muted text on the form card, and 4.05:1 for control boundaries against the dark card. The blue and black focus treatment gives 3.88:1 against the action blue and 14.34:1 against the dark keyline. These pairs use the 4.5:1 threshold for normal text and 3:1 for large text and required control indicators. [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) and [WCAG non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast).

## Browser and accessibility results

- The complete Playwright matrix exercised 275 cases across 11 Chromium, Firefox and WebKit profiles. It recorded 250 passes, 16 expected skips and nine failures on the first complete pass. The eight runtime failures were Google Fonts DNS errors, confirmed in the traces. All eight passed with live fonts on the focused rerun. The desktop Projects anchor missed its section once and passed three consecutive focused reruns. Altogether, all 259 runnable cases passed on the same frozen build.
- Axe-core 4.14.1 ran eight states each on desktop Chromium at 1366 × 768, Pixel 7 at 412 × 839 and iPhone 14 at 390 × 664. The scopes covered the homepage, services, navigation hover or the open mobile menu, project filters and dialog, expanded FAQ, selected form options and validation errors. The only automated contrast flags were the unchanged navbar wordmark over the green services backdrop at 4.14:1 and 4.18:1. WCAG 1.4.3 exempts brand-name logotypes. The test retains these findings in the raw reports and allows only that exact wordmark in that state.
- Manual checks covered the hero and badge, the pinned service cards, mobile menu, portfolio dialog, form controls, and focus visibility. Keyboard checks passed on all three profiles. They cover the menu, service cards, dialog focus containment and return, and contact fields. Playwright’s iPhone WebKit profile exercised link focus programmatically in keyboard modality because its default Tab behavior skips links. These checks used emulated phone viewports.
- Axe left 143 desktop, 115 Android and 112 iPhone homepage contrast nodes for manual interpretation, primarily gradients, overlap and animated or clipped content. Screenshots and representative color checks support the reviewed states. Full manual WCAG conformance, including video captions, remains open.

New reports, screenshots, traces and benchmarks are under `test-results/contrast-rc/`. `matrix-verified.json`, `navigation-rerun.json`, and `runtime-rerun.json` contain the functional accounting. `accessibility-verified/` holds desktop axe results and all three keyboard runs. `mobile-axe-final/` holds the mobile scans with the wordmark finding preserved. `netlify-http.json` records the local HTTP probes.

The locked `axe-core` dependency and `npm run test:a11y` add repeatable accessibility coverage. Set `A11Y_CAPTURE=1` to save screenshots. Set `BASE_URL` to the tested origin and use `--output` with `PLAYWRIGHT_JSON_OUTPUT_FILE` to retain a separate set of evidence for each run.

## Local hosting evidence

Netlify CLI 27.20.1 served the frozen build in offline mode. The root returned HTTP 200, prerendered content with one H1, and the expected frame, MIME-sniffing and referrer headers. `/hi` and `/hi/` returned HTTP 302 to the expected WhatsApp destination. The simulated production alias returned HTTP 301 with the path and query intact. An unknown nested URL returned the custom HTTP 404. Both PDF downloads and the direct 404 document returned `X-Robots-Tag: noindex`. The robots and sitemap endpoints returned their expected content.

Netlify Dev served `/restaurant` and `/restaurant/` as HTTP 200 and returned `Cache-Control: public, max-age=0` on a hashed JS asset. The Netlify edge still needs verification for slash normalization, cache policy and the response headers on the actual candidate. The root HTML SHA-256 from the local Netlify response was `7b86ae4dfd31522e6021656cc482d2b699983ffe2dca31f82cdaa119878feacc`.

## Hosted preview gate

Production sign-off is pending an authorized Deploy Preview. Verify its deployed revision and test redirects, response and indexing headers, slash behavior, prerendered HTML with JavaScript off, hydration, accessibility in the exercised states, canonical and social metadata, JSON-LD, and contact conversions at the actual preview URL. External WhatsApp navigation can be intercepted while checking its destination and payload.

The video caption audit identified the Rani Sarees testimonial and the n8n workflow demo for manual review. Both MP4s have an audio track, and the player markup has no caption track. Verify the audible content and caption coverage before claiming full WCAG conformance.

## Local performance

The repository benchmark ran three fresh mobile Chromium sessions per build at 4× CPU throttling, with the same Google Fonts stub for each build. Times are medians against the saved pre-contrast build.

| Metric | Pre-contrast | Candidate |
| --- | ---: | ---: |
| First contentful paint | 700 ms | 620 ms |
| Largest contentful paint | 700 ms | 620 ms |
| Preloader cleared | 7.89 s | 7.33 s |
| DOM content loaded | 4.12 s | 3.76 s |
| Load event | 6.67 s | 6.07 s |
| Cumulative layout shift | 0 | 0 |
| Local response bytes | 614,650 | 615,689 |
| Image bytes before scroll | 372,335 | 372,335 |

The measured load times showed no regression in this sample. The response byte count increased by 1,039 bytes. Vite still reports one minified chunk above its 500 kB warning threshold. Hosted timing, font delivery and field performance remain open.

## Frozen build

The two-phase Vite production build, ESLint and whitespace checks passed. A second build reproduced all 51 files in the tree used for browser and Netlify testing. The static archive is `test-results/contrast-rc/vgl-deploy-preview.zip`. Its SHA-256 is `20c7e7d8aa47b3e476d85c952476c9ca864084268094306a9c7dab54280c30a9`. The adjacent `deployment-artifact.json` records individual file digests.
