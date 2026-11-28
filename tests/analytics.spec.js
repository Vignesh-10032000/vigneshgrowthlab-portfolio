import { expect, test } from '@playwright/test';
import { PRELOADER } from './helpers';

const homepage = 'https://vigneshgrowthlab.dev/';
const measurementId = 'G-FDQ2NEH7L1';
const tagUrl = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
const choiceKey = 'vgl:analytics-choice';
const collector = 'https://www.google-analytics.com/g/collect';
function mockGoogleTag(measurementId, collectorUrl) {
  window.mockGoogleTagLoaded = true;
  const send = (entry) => {
    if (entry[0] !== 'event' || window['ga-disable-' + measurementId]) return;
    document.cookie = '_ga=mock; Path=/; Secure; SameSite=Lax';
    document.cookie = '_ga_' + measurementId.slice(2) + '=mock; Path=/; Secure; SameSite=Lax';
    fetch(collectorUrl, {
      method: 'POST',
      body: JSON.stringify({ name: entry[1], parameters: entry[2] }),
    });
  };
  const push = window.dataLayer.push.bind(window.dataLayer);
  window.dataLayer.push = (...entries) => {
    entries.forEach(send);
    return push(...entries);
  };
  window.dataLayer.forEach(send);
}
const mockTag = '(' + mockGoogleTag.toString() + ')(' + [measurementId, collector].map(value => JSON.stringify(value)).join(',') + ')';

const disabledBuild = process.env.VGL_ANALYTICS_TEST === 'disabled';
test.skip(!disabledBuild && process.env.VGL_ANALYTICS_TEST !== '1', 'requires an analytics test build');
test.describe.configure({ timeout: 90_000 });

async function mockMarketingSite(context, baseURL, { blockTag = false } = {}) {
  const requests = [];
  const events = [];
  const localOrigin = new URL(baseURL).origin;
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === 'www.googletagmanager.com' || url.hostname.endsWith('google-analytics.com')) {
      if (url.href === collector) {
        events.push(JSON.parse(route.request().postData()));
        return route.fulfill({ status: 204 });
      }
      requests.push(url.href);
      if (blockTag || url.href !== tagUrl) return route.abort();
      return route.fulfill({ contentType: 'application/javascript', body: mockTag });
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
  return { requests, events };
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
  test.skip(disabledBuild, 'analytics-enabled fixture only');
  const { requests, events } = await mockMarketingSite(context, baseURL);
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
  await clickWithoutNavigation(page.locator('footer a[href^="mailto:"]').first());
  await clickWithoutNavigation(page.locator('footer a[href="#contact"]'));
  await clickWithoutNavigation(page.locator('#service-pos-billing a').first());
  await page.getByRole('button', { name: /Open details modal for VGL POS/ }).click();
  const caseStudy = page.getByRole('dialog');
  await expect(caseStudy).toBeVisible();
  await clickWithoutNavigation(caseStudy.getByRole('link', { name: 'Ask about VGL POS on WhatsApp', exact: true }));
  await page.keyboard.press('Escape');

  await page.locator('#contact button[type="submit"]').evaluate(button => button.click());
  await expect(page.getByText('Full Name is required')).toBeVisible();
  expect((await commands(page)).some(entry => entry[1] === 'project_enquiry')).toBe(false);
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
  const expectedEvents = [
    ['page_view', common],
    ['contact_click', { ...common, contact_method: 'phone' }],
    ['contact_click', { ...common, contact_method: 'email' }],
    ['contact_click', { ...common, contact_method: 'contact_section' }],
    ['whatsapp_click', common],
    ['whatsapp_click', common],
    ['project_enquiry', common],
  ];
  expect(all.filter(([kind]) => kind === 'event').map(([, ...event]) => event)).toEqual(expectedEvents);
  await expect.poll(() => events).toEqual(expectedEvents.map(([name, parameters]) => ({ name, parameters })));
  expect(JSON.stringify({ all, events })).not.toMatch(/private|9000000000|wa\.me|billing\./i);
  expect(requests).toEqual([tagUrl]);
  expect(pageErrors).toEqual([]);
});

test('persists decline and withdrawal across page loads and sanitises the next opt-in', async ({ page, context, baseURL }) => {
  test.skip(disabledBuild, 'analytics-enabled fixture only');
  const { requests, events } = await mockMarketingSite(context, baseURL);
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

  await expect.poll(() => events.map(({ name }) => name)).toEqual(['page_view']);
  await expect.poll(async () => (await context.cookies()).filter(cookie => cookie.name.startsWith('_ga')).length).toBe(2);
  await context.addCookies([{ name: '_ga', value: 'synthetic', domain: '.vigneshgrowthlab.dev', path: '/', secure: true }]);
  await preferences.click();
  await page.getByRole('button', { name: 'Reject Optional' }).click();
  await expect(preferences).toBeAttached();
  await clickWithoutNavigation(page.locator('footer a[href^="tel:"]'));
  expect(await commands(page)).toEqual([]);
  expect((await context.cookies()).filter(cookie => cookie.name.startsWith('_ga'))).toEqual([]);
  expect(requests).toHaveLength(1);
  expect(events.map(({ name }) => name)).toEqual(['page_view']);

  await page.goto(homepage + 'pricing/?email=private%40example.test');
  await expect(preferences).toBeAttached();
  expect(requests).toHaveLength(1);
  await preferences.press('Enter');
  await page.getByRole('button', { name: 'Accept Analytics' }).press('Enter');
  await expect.poll(() => requests).toHaveLength(2);
  const all = await commands(page);
  expect(all.filter(entry => entry[1] === 'page_view')).toHaveLength(1);
  expect(all.find(entry => entry[1] === 'page_view')[2].page_location).toBe(homepage + 'pricing/');
  await expect.poll(() => events.map(({ name }) => name)).toEqual(['page_view', 'page_view', 'pricing_view']);
  expect(JSON.stringify({ all, events })).not.toContain('private');
});

test('keeps withdrawal in effect when local storage cannot be updated', async ({ page, context, baseURL }) => {
  test.skip(disabledBuild, 'analytics-enabled fixture only');
  const { requests, events } = await mockMarketingSite(context, baseURL);
  await visit(page);
  await page.getByRole('button', { name: 'Accept Analytics' }).click();
  await expect.poll(() => events.map(({ name }) => name)).toEqual(['page_view']);
  await page.evaluate(key => {
    const setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (name, value) {
      if (this === localStorage && name === key) throw new Error('Storage unavailable');
      return setItem.call(this, name, value);
    };
  }, choiceKey);
  const preferences = page.getByRole('button', { name: 'Cookie Settings' });
  await preferences.click();
  await page.getByRole('button', { name: 'Reject Optional' }).click();
  await expect(preferences).toBeAttached();
  expect(await page.evaluate(key => sessionStorage.getItem(key), choiceKey)).toBe('deny');
  expect(await commands(page)).toEqual([]);
  expect(requests).toEqual([tagUrl]);
  expect((await context.cookies()).filter(cookie => cookie.name.startsWith('_ga'))).toEqual([]);
});

test('returning allow records each canonical document once and emits only its matching view event', async ({ page, context, baseURL }) => {
  test.skip(disabledBuild, 'analytics-enabled fixture only');
  const { requests, events } = await mockMarketingSite(context, baseURL);
  await context.addInitScript(key => localStorage.setItem(key, 'allow'), choiceKey);
  const paths = [
    ['services/pos-billing-software/', 'service_view', { service_id: 'pos-billing-software' }],
    ['projects/vgl-pos/', 'case_study_view', { project_id: 'vgl-pos' }],
    ['projects/', null, {}],
  ];
  const expected = [];
  for (const [path, name, identifier] of paths) {
    await page.goto(homepage + path + '?q=private%40example.test#private-message');
    await expect.poll(() => page.evaluate(() => window.mockGoogleTagLoaded)).toBe(true);
    const parameters = { page_location: homepage + path, page_referrer: '', send_to: measurementId };
    expected.push({ name: 'page_view', parameters });
    if (name) expected.push({ name, parameters: { ...parameters, ...identifier } });
    await page.evaluate(() => history.pushState({}, '', '#changed'));
    await expect.poll(() => events).toEqual(expected);
    await expect(page.getByRole('button', { name: 'Accept Analytics' })).toHaveCount(0);
  }
  expect(requests).toEqual(paths.map(() => tagUrl));
});

test('excludes local serving, Netlify previews, billing and the restaurant demo', async ({ page, context, baseURL }) => {
  const { requests, events } = await mockMarketingSite(context, baseURL);
  await context.addInitScript(key => localStorage.setItem(key, 'allow'), choiceKey);
  const excluded = [baseURL, 'https://deploy-preview-4--vigneshgrowthlab.netlify.app/', 'https://billing.vigneshgrowthlab.dev/'];
  if (disabledBuild) excluded.push(homepage);
  for (const url of excluded) {
    await visit(page, url);
    await expect(page.getByRole('button', { name: 'Cookie Settings' })).toHaveCount(0);
    expect(await commands(page)).toEqual([]);
  }
  await page.goto(homepage + 'restaurant/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  expect(await commands(page)).toEqual([]);
  expect(requests).toEqual([]);
  expect(events).toEqual([]);
});

test('works when the Google tag is blocked and keeps the existing contact event', async ({ page, context, baseURL }) => {
  test.skip(disabledBuild, 'analytics-enabled fixture only');
  const { requests, events } = await mockMarketingSite(context, baseURL, { blockTag: true });
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
  expect(events).toEqual([]);
  expect(errors).toEqual([]);
});
