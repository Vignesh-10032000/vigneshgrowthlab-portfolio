import { expect, test } from '@playwright/test';
import { gotoHome } from './helpers';

const site = 'https://vigneshgrowthlab.dev';

test('production homepage exposes its content and metadata without JavaScript', async ({ browser, viewport }) => {
  const page = await browser.newPage({ javaScriptEnabled: false, viewport });
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText('VIGNESH GROWTH LAB');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-site-preloader]')).toBeHidden();
    await expect(page.locator('#service-pos-billing')).toContainText('retailers and restaurants');
    await expect(page.locator('#service-pos-billing')).toBeVisible();
    await expect(page.locator('#work')).toBeVisible();
    await expect(page.locator('footer a[href^="tel:"]')).toBeVisible();

    for (const selector of [
      'title', 'meta[name="description"]', 'link[rel="canonical"]',
      'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:image"]',
      'meta[name="twitter:card"]', 'meta[name="twitter:title"]', 'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
    ]) {
      await expect(page.locator(selector)).toHaveCount(1);
    }
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', site + '/');
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', site + '/');
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);

    const schemaScript = page.locator('script[type="application/ld+json"]');
    await expect(schemaScript).toHaveCount(1);
    const graph = JSON.parse(await schemaScript.textContent())['@graph'];
    const business = graph.find(node => node['@type'].includes('LocalBusiness'));
    expect(business.address).toMatchObject({ addressLocality: 'Pollachi', addressCountry: 'IN' });
    expect(graph.find(node => node['@type'] === 'WebSite').publisher['@id']).toBe(business['@id']);
    const services = graph.filter(node => node['@type'] === 'Service');
    expect(services).toHaveLength(4);
    for (const service of services) {
      const id = new URL(service.url).hash;
      await expect(page.locator(id)).toContainText(service.name);
      await expect(page.locator(id)).toContainText(service.description);
      expect(service.provider['@id']).toBe(business['@id']);
    }
  } finally {
    await page.close();
  }
});

test('crawl endpoints list the homepage and exclude the concept demo and missing routes', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  expect((await sitemap.text()).match(/<loc>(.*?)<\/loc>/g)).toEqual([`<loc>${site}/</loc>`]);
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toMatch(/User-agent: \*\s+Allow: \//);
  expect(await robots.text()).toContain(`Sitemap: ${site}/sitemap.xml`);
  const demo = await request.get('/restaurant/');
  expect(demo.ok()).toBeTruthy();
  const html = await demo.text();
  expect(html).toContain('<meta name="robots" content="noindex, follow">');
  expect(html).toContain(`<link rel="canonical" href="${site}/restaurant/">`);
  expect(html).toContain('Restaurant Ordering Website Demo | Vignesh Growth Lab');
  expect((await request.get('/vgl-missing-seo-check')).status()).toBe(404);
  expect((await request.get('/llms.txt')).status()).toBe(404);
});

test('hydration retains one heading and emits contact intents without personal data', async ({ page }) => {
  const hydrationErrors = [];
  page.on('pageerror', error => hydrationErrors.push(error.message));
  await gotoHome(page);
  await expect(page.locator('h1')).toHaveCount(1);
  const intents = await page.evaluate(() => {
    const intents = [];
    document.addEventListener('vgl:conversion', event => intents.push(event.detail));
    for (const selector of ['footer a[href^="tel:"]', 'a[href^="https://wa.me/"]', 'a[href="#contact"]']) {
      const link = document.querySelector(selector);
      link.addEventListener('click', event => event.preventDefault(), { once: true });
      link.click();
    }
    return intents;
  });
  expect(intents).toEqual([
    { action: 'phone_click' }, { action: 'whatsapp_click' }, { action: 'enquiry_click' },
  ]);
  expect(hydrationErrors).toEqual([]);
});
