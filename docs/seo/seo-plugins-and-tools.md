# SEO tools available in Codex

The following checks ran on November 22, 2026. Connector availability reflects tools exposed in this Codex session and the responses they returned. Public live checks reflect the deployed site at the time.

| Tool | Session availability and relevant actions | Observed result or use |
| --- | --- | --- |
| SearchFit | Callable. Brand inventory, crawl runs, AI visibility, GA4 and GSC per connected brand | Brand list succeeded and returned zero accessible brands. No VGL property was available through that route. |
| SEOcrawl AI | Callable. Health, public URL fetch, audits and property-scoped GSC/GA4 reports | Health returned OK. Public fetch confirmed robots HTTP 200 and text/plain. Property listing returned `INVALID_ARGUMENT`, so property authorization was unconfirmed. |
| SEO Audit | Callable. Public page, crawl and AI instruction audits | Homepage check returned HTTP 200, 70-character title, 149-character description, canonical home URL, zero raw H1s, and no JSON-LD. AI instructions check confirmed that both llms paths served HTML, and falsely treated the catch-all response at `/ai-instructions` as a separate page. |
| OpenSEO | Callable. Project listing, crawl/Lighthouse reports, GSC/GA4 within linked projects, research | Projects call succeeded and returned zero projects. No project or tracking was created. |
| SEO Tools | Callable. Page text/HTML checker and partner report-link generator | Checker endpoint reported it had been retired. No paid or sponsor report was initiated. |
| Chrome DevTools | Browser connected. DOM, console, network, device emulation and Lighthouse tools available | Verified live rendered headings, schema and scripts. Live mobile Lighthouse output was 94 accessibility, 100 best practices, 100 SEO and 50 agentic browsing. It did not provide a numeric performance category. |
| Firecrawl | Callable public URL scrape. One fresh read used | Returned HTTP 200 with live title, description and social metadata. Query output called the heading the brand and did not report a canonical. The explicit raw head extraction is the authority for the canonical. |
| Lighthouse / PageSpeed | DevTools Lighthouse audit available. No configured VGL PageSpeed account, key or field-data pipeline observed | Used Lighthouse for live baseline and Playwright/CDP to compare local builds. No PageSpeed field or Search Console Core Web Vitals data was available. |
| Google Search Console | GSC methods exposed through connectors. No VGL project/property authorization confirmed | No private GSC report, URL inspection, sitemap submission or ownership action. |
| Playwright and direct HTTP | Installed from project lockfile with local Chromium. HTTP requests available through curl | Used for local production-build tests, HTTP status, robots, sitemap and rendered behavior. |

SEO Programático scores came from the supplied audit. No separate authenticated SEO Programático result set was available.
