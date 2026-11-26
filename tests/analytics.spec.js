import { expect, test } from '@playwright/test';
import { PRELOADER } from './helpers';

const homepage = 'https://vigneshgrowthlab.dev/';
const measurementId = 'G-FDQ2NEH7L1';
const tagUrl = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
const choiceKey = 'vgl:analytics-choice';

test.skip(process.env.VGL_ANALYTICS_TEST !== '1', 'requires a local build with VITE_GA4_ENABLED=true');
test.describe.configure({ timeout: 90_000 });

async function mockMarketingSite(context, baseURL, { blockTag = false } = {}) {
  const requests = [];
  const localOrigin = new URL(baseURL).origin;
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === 'www.googletagmanager.com' || url.hostname.endsWith('google-analytics.com')) {
      requests.push(url.href);
      if (blockTag || url.href !== tagUrl) return route.abort();
      return route.fulfill({ contentType: 'application/javascript', body: 'window.mockGoogleTagLoaded = true;' });
    }
    if (url.hostname === 'fonts.googleapis.com') {
      return route.fulfill({ contentType: 'text/css', body: '' });
    }
    if (url.origin === localOrigin) return route.continue();
    if (['vigneshgrowthlab.dev', 'billing.vigneshgrowthlab.dev', 'deploy-preview-4--vigneshgrowthlab.netlify.app'].includes(url.hostname)) {
      const response = await route.fetch({ url: new URL(url.pathname + url.search, localOrigin).href });
      return route.fulfill({ response });
    }
    return route.abort();
  });
  return requests;
}

async function visit(page, url = homepage) {
  await page.goto(url);
  await page.locator(PRELOADER).waitFor({ state: 'detached' });
}

function commands(page) {
  return page.evaluate(() => Array.from(window.dataLayer || [], entry => Array.from(entry)));
}

function clickWithoutNavigation(locator) {
  return locator.evaluate((element) => {
    element.addEventListener('click', event => event.preventDefault(), { once: true });
    element.click();
  });
}

test('loads once after consent and sends only allowlisted catalogue and contact events', async ({ page, context, baseURL }) => {
  const requests = await mockMarketingSite(context, baseURL);
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  await visit(page, homepage + '?email=private%40example.test#private-message');
  const allow = page.getByRole('button', { name: 'Accept Analytics' });
  await expect(allow).toBeVisible();
  expect(requests).toEqual([]);
  expect(await commands(page)).toEqual([]);

  await clickWithoutNavigation(page.locator('footer a[href^="tel:"]'));
  expect((await context.cookies()).filter(cookie => cookie.name.startsWith('_ga'))).toEqual([]);
  await allow.click();
  await expect.poll(() => requests).toEqual([tagUrl]);
  await expect.poll(() => page.evaluate(() => window.mockGoogleTagLoaded)).toBe(true);
  const init = await commands(page);
  expect(init.map(([command, action]) => command === 'js' ? 'js' : [command, action])).toEqual([
    ['consent', 'default'], ['consent', 'update'], 'js', ['set', 'url_passthrough'],
    ['config', measurementId], ['event', 'page_view'],
  ]);
  expect(init[0][2].analytics_storage).toBe('denied');
  expect(init[1][2]).toEqual({
    analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  });
  expect(init[4][2]).toMatchObject({
    page_location: homepage, page_referrer: '', send_page_view: false,
    allow_google_signals: false, allow_ad_personalization_signals: false, cookie_domain: 'none',
  });

  await clickWithoutNavigation(page.locator('footer a[href^="tel:"]'));
  await clickWithoutNavigation(page.locator('footer a[href="#contact"]'));
  await clickWithoutNavigation(page.locator('#service-pos-billing a').first());
  const filter = page.locator('#work button').filter({ hasText: /^Retail POS/ });
  await filter.click();
  await expect(filter).toHaveAttribute('aria-pressed', 'true');
  await filter.click();
  await page.getByRole('button', { name: 'Open details modal for VGL POS Software' }).click();
  const caseStudy = page.getByRole('dialog');
  await expect(caseStudy).toBeVisible();
  await clickWithoutNavigation(caseStudy.getByRole('link', { name: 'Request a POS demo', exact: true }));
  await page.keyboard.press('Escape');

  await page.locator('#contact button[type="submit"]').evaluate(button => button.click());
  await expect(page.getByText('Full Name is required')).toBeVisible();
  expect((await commands(page)).some(entry => entry[1] === 'enquiry_whatsapp_handoff')).toBe(false);
  await page.evaluate(() => {
    window.open = (url) => { window.testWhatsAppHandoff = url; return null; };
  });
  await page.locator('input[name="name"]').fill('Private Test Name');
  await page.locator('input[name="whatsapp"]').fill('+91 9000000000');
  await page.locator('input[name="email"]').fill('private@example.test');
  await page.locator('#contact button[type="submit"]').click();
  await expect.poll(() => page.evaluate(() => window.testWhatsAppHandoff)).toContain('https://wa.me/');

  await page.evaluate(() => {
    for (const detail of [
      { action: 'service_select', itemId: 'private@example.test' },
      { action: 'purchase', transaction_id: 'secret' },
    ]) {
      document.dispatchEvent(new CustomEvent('vgl:conversion', { detail }));
    }
  });

  const all = await commands(page);
  const common = { page_location: homepage, page_referrer: '', send_to: measurementId };
  expect(all.filter(([kind]) => kind === 'event')).toEqual([
    ['event', 'page_view', common],
    ['event', 'phone_click', common],
    ['event', 'enquiry_click', common],
    ['event', 'service_select', { ...common, service_id: 'pos-billing' }],
    ['event', 'whatsapp_click', common],
    ['event', 'portfolio_filter', { ...common, category_id: 'retail-pos' }],
    ['event', 'project_open', { ...common, project_id: 'vgl-pos' }],
    ['event', 'project_link_click', { ...common, project_id: 'vgl-pos' }],
    ['event', 'whatsapp_click', common],
    ['event', 'enquiry_whatsapp_handoff', common],
  ]);
  expect(JSON.stringify(all)).not.toMatch(/private|9000000000|wa\.me|billing\./i);
  expect(pageErrors).toEqual([]);
});

test('persists decline and withdrawal across page loads and sanitises the next opt-in', async ({ page, context, baseURL }) => {
  const requests = await mockMarketingSite(context, baseURL);
  await visit(page);
  await page.getByRole('button', { name: 'Reject Optional' }).click();
  await page.reload();
  const preferences = page.getByRole('button', { name: 'Cookie Settings' });
  await expect(preferences).toBeAttached();
  await expect(page.getByRole('button', { name: 'Accept Analytics' })).toHaveCount(0);
  expect(requests).toEqual([]);
  await page.locator(PRELOADER).waitFor({ state: 'detached' });

  await preferences.click();
  await expect(page.getByRole('heading', { name: 'Optional analytics' })).toBeFocused();
  await page.getByRole('button', { name: 'Accept Analytics' }).click();
  await expect.poll(() => requests).toEqual([tagUrl]);
  await expect(preferences).toBeFocused();

  await context.addCookies([{ name: '_ga', value: 'synthetic', domain: 'vigneshgrowthlab.dev', path: '/', secure: true }]);
  await preferences.click();
  await page.getByRole('button', { name: 'Reject Optional' }).click();
  await expect(preferences).toBeAttached();
  await clickWithoutNavigation(page.locator('footer a[href^="tel:"]'));
  expect(await commands(page)).toEqual([]);
  expect((await context.cookies()).filter(cookie => cookie.name.startsWith('_ga'))).toEqual([]);
  expect(requests).toHaveLength(1);

  await page.goto(homepage + 'pricing/?email=private%40example.test');
  await expect(preferences).toBeAttached();
  expect(requests).toHaveLength(1);
  await preferences.press('Enter');
  await page.getByRole('button', { name: 'Accept Analytics' }).press('Enter');
  await expect.poll(() => requests).toHaveLength(2);
  const all = await commands(page);
  expect(all.filter(entry => entry[1] === 'page_view')).toHaveLength(1);
  expect(all.find(entry => entry[1] === 'page_view')[2].page_location).toBe(homepage + 'pricing/');
  expect(JSON.stringify(all)).not.toContain('private');

});

test('excludes local serving, Netlify previews, billing and the restaurant demo', async ({ page, context, baseURL }) => {
  const requests = await mockMarketingSite(context, baseURL);
  await context.addInitScript(key => localStorage.setItem(key, 'allow'), choiceKey);
  for (const url of [baseURL, 'https://deploy-preview-4--vigneshgrowthlab.netlify.app/', 'https://billing.vigneshgrowthlab.dev/']) {
    await visit(page, url);
    await expect(page.getByRole('button', { name: 'Cookie Settings' })).toHaveCount(0);
    expect(await commands(page)).toEqual([]);
  }
  await page.goto(homepage + 'restaurant/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  expect(await commands(page)).toEqual([]);
  expect(requests).toEqual([]);
});

test('works when the Google tag is blocked and keeps the existing contact event', async ({ page, context, baseURL }) => {
  const requests = await mockMarketingSite(context, baseURL, { blockTag: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await visit(page);
  await page.getByRole('button', { name: 'Accept Analytics' }).click();
  await expect.poll(() => requests).toEqual([tagUrl]);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('VIGNESH GROWTH LAB');
  await page.evaluate(() => {
    window.testConversion = null;
    document.addEventListener('vgl:conversion', event => { window.testConversion = event.detail; });
  });
  await clickWithoutNavigation(page.locator('footer a[href^="tel:"]'));
  expect(await page.evaluate(() => window.testConversion)).toEqual({ action: 'phone_click' });
  expect(errors).toEqual([]);
});
