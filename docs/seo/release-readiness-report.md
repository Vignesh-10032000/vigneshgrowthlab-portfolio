# VGL technical SEO release-readiness review

November 22, 2026. Local branch `feat/vgl-technical-seo` at base `93accc8962dc21d5630ed9f9e7a84e91025ec129`. The candidate includes the working-tree diff. The release decision applies to this exact candidate and its local build.

**Recommendation: hold production sign-off.** The local functional and Netlify Dev checks passed. Homepage contrast failures remain, and the candidate's hosted edge behavior and production field performance are unverified.

## Review scope

The candidate builds the existing React portfolio as a Vite static site and hydrates that HTML for interaction. I reviewed the diff from the original commit across build and hydration, head and structured data, interaction changes, static response configuration and tracking events. All form values were synthetic. The browser handoff checks stubbed or intercepted WhatsApp, and HTTP redirect probes left the external target unfollowed.

See [the implementation report](implementation-report.md) for the original SEO files and before-and-after inventory. The sections below track the follow-up QA gates.

## Reproduced defects and fixes

| Observation | Resolution |
| --- | --- |
| Firefox reported `NS_ERROR_PARSED_DATA_CACHED` on local MP4 requests during the full-scroll test. | Treat that exact status as an intentional media-channel cancellation only on media requests. Gecko uses it to release a media channel whose parsed data can be reused. Other failed requests and bad responses still fail the test. [Mozilla media resource source](https://github.com/mozilla/gecko-dev/blob/master/dom/media/ChannelMediaResource.cpp) |
| Desktop WebKit scrolled the underlying page by 500 px when wheel input reached the end of a project modal. This reproduced on the original and SEO builds. | Lock document scrolling while the project modal is open, then restore the previous inline value and focus on closure. The wheel regression test checks the dialog itself and the restoration. |
| Touch WebKit menu tests reached the default timeout during per-item stability checks, and anchor tests timed out clicking during the menu entrance animation. | Verify panel and viewport clipping for every menu item in a single browser-side pass. Wait for each menu transition before sending the next real tap. The anchor position and link reachability assertions still run. |
| `npm run lint` could not resolve an ESLint executable. | Install ESLint 10 with the recommended flat configuration, JSX parsing, scoped browser/Node globals and generated-directory exclusions. Retain the project's deliberate standard React import spelling in JSX. ESLint 10 tracks JSX references natively. [ESLint migration guide](https://eslint.org/docs/latest/use/migrate-to-10.0.0) |
| axe detected unnamed restaurant cart-close control, homepage social-label mismatches and a scroller outside the tab order. | Name the control, include the visible social labels in their accessible names and give the testimonial carousel a focusable named region. Adjusted two reproduced dark-theme contrast failures in the restaurant demo. |

## Reproduction commands

Use the locked dependencies and the Playwright browser versions selected by the repository. This run used Windows, Node 24.12.0, npm 11.6.2 and Playwright 1.64.0. ESLint 10 requires a supported modern Node runtime. Windows examples below run from the repository root.

```powershell
npm ci
npm run lint
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

With the preview running, use the existing E2E command once per configured project and keep each report separate. There are 25 selected cases per project and 11 profiles. Touch profiles skip the desktop wheel case, and desktop profiles skip two mobile-menu cases.

```powershell
$env:BASE_URL = 'http://127.0.0.1:4173'
$env:PLAYWRIGHT_JSON_OUTPUT_FILE = 'test-results/final-matrix/desktop-webkit.json'
npm run test:e2e -- --project=desktop-webkit --workers=2 --reporter=list,json --output=test-results/final-matrix/desktop-webkit
```

For host-specific checks, build first and run Netlify CLI 27.20.1 with `dev --offline --dir dist --framework '#static' --port 8888 --no-open --skip-gitignore`. Use HTTP probes with redirect following disabled. For the HTTPS alias simulation, send `Host: vigneshgrowthlab.netlify.app` and `scheme: https` to loopback. Local Vite preview verifies application responses. Netlify Dev additionally parses the candidate's Netlify headers and redirects. Hosted-edge behavior has a separate verification gate.

For the repeatable mobile lab, set `PERF=1`, optionally set `PERF_OFFLINE_FONTS=1` to stub Google font CSS on both builds, set a distinct `PERF_LABEL` per build and run:

```powershell
npx playwright test tests/perf.spec.js -g 'load metrics' --project=mobile-android --workers=1
```

## Follow-up QA files

| File | Purpose |
| --- | --- |
| `package.json`, `package-lock.json`, `eslint.config.js` | Restore and lock the existing lint command. |
| `src/components/Services.jsx`, `src/components/TrustStats.jsx` | Remove unused motion imports flagged by lint. |
| `src/components/ProjectModal.jsx` | Hold and restore the native page scroll lock while the dialog is open. |
| `src/components/Footer.jsx`, `src/components/SlideCardsSection.jsx` | Repair accessible names and keyboard access without altering public links or carousel actions. |
| `public/restaurant/index.html` | Name the cart-close control and correct targeted contrast issues. |
| `tests/helpers.js`, `tests/regression.spec.js` | Classify the Gecko media cancellation, guard modal scroll restoration and check mobile navigation with hit-tested input and per-link viewport geometry. |
| `tests/perf.spec.js` | Track when the preloader clears and support an optional deterministic font-fixture mode. |
| `docs/seo/release-readiness-report.md` | Record the review, evidence, release blockers and rollback. |

## Netlify and crawl checks

All of the following passed against Netlify CLI 27.20.1 in offline static mode, serving the candidate `dist`:

| Check | Observed result |
| --- | --- |
| Root response | HTTP 200 and the prerendered H1 in the HTML body. |
| HTTPS Netlify alias | HTTP 301 to the custom domain with the path and query intact, using the alias Host and HTTPS scheme on loopback. The target was inspected without following it. |
| `/hi` and `/hi/` | Both HTTP 302 with the expected WhatsApp host and business-card text. The redirects were left unfollowed. |
| Unknown nested URL and `/llms.txt` | HTTP 404 and the site's custom missing-page HTML with noindex. |
| Restaurant concept | `/restaurant/` returns HTTP 200 with `noindex, follow` and its own slash-form canonical. Netlify Dev also serves `/restaurant` with HTTP 200. The hosted slash redirect needs a separate candidate-edge check. |
| Public PDF downloads | Both HEAD responses return HTTP 200, `application/pdf` and `X-Robots-Tag: noindex`. |
| Robots and sitemap | HTTP 200 with the expected text/XML types. Robots points to the sitemap and the sitemap lists only the canonical root. |

The local CLI exercises the candidate's configuration. An authorized hosted preview is still needed to verify the production edge, including slash normalization and the actual deployed artifact.

## Playwright matrix

**Final accounting: 259 passed, 16 expected skips, zero unresolved failures across 275 planned cases.** The completed project batches initially recorded 255 passes, 16 skips and four failed test attempts. All four were test automation timeouts in Apple-emulated menu checks. The latest focused run passed all 12 menu navigation and reachability checks across the six touch profiles, including those four cases. The final accounting replaces their failed attempts with the passing reruns.

| Profile | Passed after reruns | Expected skips |
| --- | ---: | ---: |
| Desktop Chromium, 1366 × 768 | 23 | 2 |
| Desktop Firefox | 23 | 2 |
| Desktop WebKit | 23 | 2 |
| Desktop Chromium, 1080p | 23 | 2 |
| Desktop Chromium, 1440p | 23 | 2 |
| iPad WebKit | 24 | 1 |
| iPad Chromium | 24 | 1 |
| Android portrait | 24 | 1 |
| Android landscape | 24 | 1 |
| iPhone portrait | 24 | 1 |
| iPhone landscape | 24 | 1 |

The four failed attempts were menu reachability on iPhone portrait and landscape, and anchor navigation on iPhone landscape and iPad WebKit. Earlier diagnostic passes also exposed the Gecko cache classification and the genuine WebKit modal scroll leak. The fixed candidate passed those cases in their completed desktop batches.

The suite checks prerendered metadata and content, hydration errors and contact-intent payloads, preloader exit, responsive overflow, menu reachability and section landing, project filters and dialog behavior, GSAP service cards, marquee continuity, FAQ, testimonial controls, validation, and the WhatsApp URL and transient user activation. Reports and failure traces are under `test-results/final-matrix/` and `test-results/chromium-matrix/`. The final replacement cases are in `test-results/final-matrix/touch-nav-final.json`.

## Prerender, hydration and structured data

- Production builds emitted six identified JSON-LD graph nodes. An offline JSON-LD expansion used the official Schema.org JSON-LD context. The resulting types were Organization, LocalBusiness, WebSite and four Service entries. The address matches Pollachi, Tamil Nadu, India and has no street address or coordinates.
- The E2E checks assert the initial H1 with JavaScript off, one metadata tag per slot, canonical URLs, linked graph entities and consistency with visible service copy. The hydrated test checks for runtime errors and verifies contact intent payloads.
- Schema vocabulary validation does not establish Google rich-result eligibility. No hosted URL inspection or search reindexing was performed. [Google structured data testing guidance](https://developers.google.com/search/docs/appearance/structured-data)

## Accessibility

axe-core ran the WCAG A/AA rules available in the installed engine after opening the built homepage and scrolling its sections, and on the mobile restaurant entry state.

| Scenario | Original | Candidate |
| --- | --- | --- |
| Homepage desktop | 59 contrast nodes, 2 accessible-name mismatches, 1 scroller outside tab order | 58 contrast nodes. The two other rules passed. |
| Homepage mobile | 50 contrast nodes, 2 accessible-name mismatches, 1 scroller outside tab order | 50 contrast nodes. The two other rules passed. |
| Restaurant mobile | 1 unnamed button, 2 contrast nodes | Zero automatic violations in this state, with one rule still requiring manual review. |

The existing homepage color system still needs focused contrast remediation. Automatic accessibility coverage is limited to the exercised states. Keyboard, screen-reader and contrast review remain relevant to release sign-off.

## Mobile performance

The repository's Playwright load benchmark ran three fresh Pixel 7 Chromium contexts per build with 4× CPU throttling. Both runs served local static builds and used the same Google Fonts CSS stub. The original is the archived production build from `93accc8`. Test workers shared the machine during this lab run.

| Median metric | Original | Candidate |
| --- | ---: | ---: |
| Bytes transferred | 1,090,552 | 614,650 |
| Image bytes before scroll | 877,855 | 372,335 |
| Time until preloader clears | 9.49 s | 9.29 s |
| First contentful paint | 5.74 s | 3.75 s |
| Observed largest contentful paint | 5.74 s | 3.75 s |
| Cumulative layout shift | 0 | 0 |
| DOMContentLoaded | 0.59 s | 4.89 s |
| Browser load event | 0.60 s | 6.38 s |

In this lab the candidate sent less data and reached the end of the preloader slightly sooner, despite later document lifecycle events. The paint may reflect the loading UI. This is not sufficient to conclude production Core Web Vitals meet targets. Three raw samples per build are in `test-results/mobile-performance-original/` and `test-results/mobile-performance-candidate/`.

## Build and lint

- The final two-stage Vite production build passed. The client chunk-size warning remained. The built homepage SHA-256 was `3282e3584a3845ffae12cb0f93d506099adbd85a2d8ee82ca5241fedfa44f350`.
- `npm run lint` and `git diff --check` passed. An invalid JSX stdin sample failed as expected for an unused value and an undefined component.
- The production dependency audit returned zero advisories. The full audit still flagged the existing Vite development dependency. ESLint 10 requires Node 20.19+, 22.13+ or 24+ within supported Node lines.

## Rollback

1. Before any approval, preserve the current working tree and its QA evidence. Use commit `93accc8` as the known pre-SEO source baseline in a separate checkout when comparison is needed.
2. If a later approved release needs rollback, the authorized Netlify operator should select the most recent confirmed-good published deploy and restore that exact immutable artifact. Record which candidate and previous deploy were involved.
3. After restoring, verify home status and content, project and contact behavior, the WhatsApp short-link response, restaurant reachability, robots and sitemap. Compare any redirect and indexing behavior against the restored build's expected behavior.
4. Revert the reviewed commit or commit range on a new recovery branch after the candidate has actual commits. Preserve unrelated changes and rerun verification before another approval.
