# Deferred domain and measurement work

| Task | Prerequisite and verification |
| --- | --- |
| Registrar, DNS and host access | Owner access and authorization. Record current records and preferred hostname before considering any changes. |
| Netlify production release | Explicit approval with owner access. On release, smoke-test homepage, restaurant, `/hi`, alias redirect, missing URL, robots, sitemap and PDF robots headers. Roll back through the host if redirects or interactions differ from the local build. |
| Google Search Console | An authorized owner and verified property. After approval, submit the live sitemap and inspect the homepage response, canonical, and rendered content. |
| Bing Webmaster Tools | An authorized property. Select a supported verification method and submit the live sitemap after approval. |
| GA4 or GTM | Approved measurement plan, real property or container and any required consent handling. Use the existing event seam. Verify in DebugView or equivalent using approved test traffic and a PII review. |
| Google Business Profile | Owner confirmation of current profile, public operating address or service-area setup and business details. Keep Pollachi as the base and Coimbatore as its district. |
| Service landing pages | Before publishing new pages, confirm service scope, actual features, screenshots and permission to use case studies. Suggested first candidates are POS/restaurant billing and WhatsApp automation. Validate distinct search intent before creating more routes. |
| Optional llms.txt | Low priority. Revisit if an approved consumer requires the file. Monitor actual crawl behavior and referrals once data access is available. |

## Conversion event contract

The homepage dispatches `vgl:conversion` on `document`. The event detail contains only an `action` string. There is no vendor script, network request or measurement identifier in this code.

| Action | Meaning |
| --- | --- |
| `phone_click` | Telephone link activation |
| `whatsapp_click` | Direct WhatsApp link activation |
| `enquiry_click` | Activation of a link to the contact section |
| `enquiry_whatsapp_handoff` | Form passed local validation and requested a WhatsApp handoff |

Treat these as intent events. A handoff does not establish a sent message, received lead or closed sale. Keep event detail free of phone numbers, email addresses, form values and WhatsApp message URLs when a vendor adapter is authorized. For the standalone restaurant concept, continue to treat order and reservation actions as demo interactions.
