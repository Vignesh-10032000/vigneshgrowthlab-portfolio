import { expect, test } from '@playwright/test';
import { pages } from '../src/data/marketingPages.js';
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
    const business = graph.find(node => node['@type'] === 'Organization');
    expect(business.areaServed[0].name).toContain('Pollachi');
    expect(business.address).toBeUndefined();
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
  expect((await sitemap.text()).match(/<loc>(.*?)<\/loc>/g)).toEqual(['/', ...pages.map(page => page.path)].map(path => `<loc>${site}${path}</loc>`));
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

test('every public route has unique prerendered metadata, content and valid internal links', async ({ request }) => {
  const titles = new Set();
  const descriptions = new Set();
  const paths = new Set(['/', ...pages.map(page => page.path)]);
  for (const page of pages) {
    const response = await request.get(page.path);
    expect(response.status(), page.path).toBe(200);
    const html = await response.text();
    for (const pattern of [/<h1[ >]/g, /<title>/g, /rel="canonical"/g, /name="description"/g,
      /property="og:title"/g, /name="twitter:description"/g, /type="application\/ld\+json"/g]) {
      expect(html.match(pattern), page.path).toHaveLength(1);
    }
    expect(html).toContain('href="' + site + page.path + '"');
    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).not.toContain('billing.vigneshgrowthlab.dev');
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
    expect(graph.some(node => node['@type'] === 'BreadcrumbList')).toBe(true);
    for (const match of html.matchAll(/href="(\/[^"#?]*)(?:#[^"]*)?"/g)) {
      if (!match[1].includes('.')) expect(paths.has(match[1]), match[1]).toBe(true);
    }
    titles.add(html.match(/<title>(.*?)<\/title>/s)[1]);
    descriptions.add(html.match(/name="description" content="([^"]+)"/)[1]);
  }
  expect(titles.size).toBe(pages.length);
  expect(descriptions.size).toBe(pages.length);
  for (const path of ['/documents/udyam-certificate.pdf', '/documents/vgl-resume.pdf', '/videos/client-testimonial.mp4',
    '/videos/n8n-workflow.mp4']) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test('verified registration and the POS enquiry are available in static HTML', async ({ request }) => {
  const registration = await (await request.get('/msme/')).text();
  for (const value of ['UDYAM-TN-03-0328658', 'Micro Enterprise, 2026–27', '1 December 2025',
    '7 June 2026', '62012 (Web-page designing)']) expect(registration).toContain(value);
  const project = await (await request.get('/projects/vgl-pos/')).text();
  expect(project).toContain('Request a POS demo');
  expect(project).toMatch(/https:\/\/wa\.me\/918220034139\?text=/);
  const homepage = await (await request.get('/')).text();
  expect(homepage).not.toContain('billing.vigneshgrowthlab.dev');
});
