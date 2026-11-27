import { expect, test } from '@playwright/test';
import { gotoHome } from './helpers';

const sizes = [[320, 568], [375, 667], [390, 664], [393, 852], [430, 932],
  [568, 320], [667, 375], [844, 390], [932, 430]];
const points = ['center', 'left', 'right', 'top', 'bottom'];
const chat = 'https://wa.me/918220034139?text=' + encodeURIComponent("Hi Vignesh, I'd like to discuss a project.");
const chatURL = new URL(chat).href;
const actions = {
  Home: '#home', About: '#about', Services: '#services', Projects: '#work', Skills: '#skills',
  Process: '#process', Compare: '#compare', FAQ: '#faq', Contact: '#contact',
  'Start Project': '#contact', 'Direct WhatsApp': chat,
};
const toggle = page => page.getByRole('button', { name: 'Toggle menu' });
const floating = page => page.locator('a[aria-label="Chat with Vignesh on WhatsApp"]');
const menu = page => page.locator('#mobile-navigation');

async function intercept(context) {
  const requests = [];
  await context.route(/^https?:\/\/([^/]+\.)?(wa\.me|whatsapp\.com)\//i, route => {
    requests.push(route.request().url());
    return route.fulfill({ contentType: 'text/html', body: '<title>Intercepted</title>' });
  });
  return requests;
}

async function coordinate(link, position) {
  return link.evaluate((element, position) => {
    const getPoint = () => {
      const r = element.getBoundingClientRect();
      const x = { left: r.left + 2, right: r.right - 2, '96%': r.left + 0.96 * r.width };
      const y = { top: r.top + 2, bottom: r.bottom - 2 };
      return { x: x[position] ?? r.left + r.width / 2, y: y[position] ?? r.top + r.height / 2 };
    };
    const panel = element.closest('#mobile-navigation').getBoundingClientRect();
    let point = getPoint();
    // Preserve the original scroll position whenever the requested point is exposed.
    if (point.y < panel.top + 3 || point.y > panel.bottom - 3) {
      element.scrollIntoView({ block: 'center', behavior: 'instant' });
      point = getPoint();
    }
    const hit = document.elementFromPoint(point.x, point.y)?.closest('a');
    return { ...point, intended: hit === element, hit: hit?.textContent.trim() || hit?.ariaLabel };
  }, position);
}

for (const [width, height] of sizes) {
  test(`mobile menu hit targets at ${width}x${height}`, async ({ page, context }, info) => {
    test.setTimeout(300_000);
    const touch = info.project.use.hasTouch;
    const input = (x, y) => touch ? page.touchscreen.tap(x, y) : page.mouse.click(x, y);
    const requests = await intercept(context);
    const rows = [];
    let expectedRequests = 0;
    await page.setViewportSize({ width, height });
    await gotoHome(page);
    await page.evaluate(() => document.addEventListener('click', event => {
      const a = event.target.closest('a');
      window.lastMenuClick = { text: a?.textContent.trim(), trusted: event.isTrusted };
    }, true));
    const open = async () => {
      if (touch) await toggle(page).tap();
      else await toggle(page).click();
      await page.waitForFunction(() => {
        const panel = document.querySelector('#mobile-navigation');
        return panel && getComputedStyle(panel).opacity === '1';
      });
      await expect(floating(page)).toBeHidden();
    };

    async function check(name, position) {
      const href = actions[name];
      await page.evaluate(() => {
        history.replaceState(null, '', location.pathname);
        window.lastMenuClick = null;
      });
      await open();
      const link = menu(page).getByRole('link', { name, exact: true });
      const point = await coordinate(link, position);
      expect(point.intended, `${name} ${position} hit ${point.hit} at ${point.x},${point.y}`).toBe(true);
      await expect(link).toHaveAttribute('href', href);
      if (name === 'Start Project' && position === '96%' && width === 390) {
        await info.attach('open-menu', { body: await page.screenshot(), contentType: 'image/png' });
      }
      if (href === chat) {
        const [popup] = await Promise.all([page.waitForEvent('popup'), input(point.x, point.y)]);
        await popup.waitForURL(chatURL, { timeout: 10_000 });
        await popup.close();
        expectedRequests++;
        expect(await page.evaluate(() => window.lastMenuClick)).toEqual({ text: name, trusted: true });
        await expect(toggle(page)).toHaveAttribute('aria-expanded', 'true');
        await toggle(page).click();
      } else {
        await input(point.x, point.y);
        await page.waitForURL(url => url.hash === href, { timeout: 10_000 });
        await expect(page.locator(href)).toHaveCount(1);
      }
      await menu(page).waitFor({ state: 'detached' });
      const click = await page.evaluate(() => window.lastMenuClick);
      // The toggle click used to dismiss a Direct WhatsApp menu has no anchor.
      if (href !== chat) expect(click).toEqual({ text: name, trusted: true });
      await expect(floating(page)).toBeVisible();
      expect(requests).toEqual(Array(expectedRequests).fill(chatURL));
      expect(context.pages()).toHaveLength(1);
      rows.push({ name, position, ...point, href, input: touch ? 'touch' : 'mouse' });
    }

    try {
      // First tap from a fresh page, before any scroll or other menu interaction.
      await check('Start Project', '96%');
      await open();
      const labels = await menu(page).getByRole('link').allTextContents();
      expect(labels.map(text => text.trim())).toEqual(Object.keys(actions));
      await toggle(page).click();
      await menu(page).waitFor({ state: 'detached' });
      for (const name of Object.keys(actions)) {
        for (const position of points) await check(name, position);
      }
    } finally {
      await info.attach('observations', { body: JSON.stringify(rows), contentType: 'application/json' });
    }
  });
}

test('menu focus, rotation, desktop breakpoint and restored chat', async ({ page, context }, info) => {
  const requests = await intercept(context);
  await page.setViewportSize({ width: 390, height: 664 });
  await gotoHome(page);
  await toggle(page).focus();
  await page.keyboard.press('Enter');
  await expect(menu(page)).toBeVisible();
  await floating(page).evaluate(el => el.focus());
  await expect(toggle(page)).toBeFocused();
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(menu(page)).toBeVisible();
  await expect(floating(page)).toBeHidden();
  await page.setViewportSize({ width: 1366, height: 768 });
  await expect(menu(page)).toBeHidden();
  await expect(floating(page)).toBeVisible();
  await expect(page.locator('header nav')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 664 });
  await menu(page).getByRole('link', { name: 'Start Project' }).focus();
  await page.keyboard.press('Escape');
  await menu(page).waitFor({ state: 'detached' });
  await expect(toggle(page)).toBeFocused();
  await expect(toggle(page)).toHaveAttribute('aria-expanded', 'false');
  await expect(floating(page)).toBeVisible();
  await info.attach('closed-menu', { body: await page.screenshot(), contentType: 'image/png' });
  await floating(page).focus();
  await expect(floating(page)).toBeFocused();
  for (const activate of [
    () => page.keyboard.press('Enter'),
    () => info.project.use.hasTouch ? floating(page).tap() : floating(page).click(),
  ]) {
    const [popup] = await Promise.all([page.waitForEvent('popup'), activate()]);
    await popup.waitForURL(chatURL, { timeout: 10_000 });
    await popup.close();
  }
  expect(requests).toEqual([chatURL, chatURL]);
});
