import { expect } from '@playwright/test';

export const PRELOADER = 'div.fixed.inset-0.z-\\[99999\\]';

export function collectRuntimeIssues(page, baseURL) {
  const issues = { pageErrors: [], consoleErrors: [], failedRequests: [], badResponses: [] };
  const origin = new URL(baseURL).origin;
  page.on('pageerror', (err) => issues.pageErrors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') issues.consoleErrors.push(msg.text());
  });
  page.on('requestfailed', (req) => {
    if (req.url().startsWith(origin)) {
      const failure = req.failure()?.errorText || '';
      // Media requests are routinely aborted by the browser once metadata is read.
      if (!/ERR_ABORTED|NS_BINDING_ABORTED|cancelled/i.test(failure)) {
        issues.failedRequests.push(`${req.url()} ${failure}`);
      }
    }
  });
  page.on('response', (res) => {
    if (res.url().startsWith(origin) && res.status() >= 400) {
      issues.badResponses.push(`${res.status()} ${res.url()}`);
    }
  });
  return issues;
}

export async function gotoHome(page) {
  await page.goto('/');
  await page.locator(PRELOADER).waitFor({ state: 'detached', timeout: 20_000 });
}

export async function scrollToSection(page, selector, settleMs = 900) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) throw new Error(`Missing ${sel}`);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  }, selector);
  await page.waitForTimeout(settleMs);
}

export async function scrollThroughPage(page, step = 600, pauseMs = 60) {
  await page.evaluate(
    async ({ step, pauseMs }) => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await sleep(pauseMs);
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
      await sleep(400);
    },
    { step, pauseMs }
  );
}

export async function clickCentered(locator) {
  // The page sets `scroll-behavior: smooth` on <html>; scroll instantly so positioning is deterministic.
  await locator.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  // Wait for scroll-triggered entrance animations (AOS) to stop moving the element.
  let previous = null;
  let stableSamples = 0;
  for (let i = 0; i < 40 && stableSamples < 3; i++) {
    await locator.page().waitForTimeout(150);
    const box = await locator.boundingBox();
    const key = box && `${Math.round(box.x)},${Math.round(box.y)}`;
    stableSamples = key && key === previous ? stableSamples + 1 : 0;
    previous = key;
  }
  const isTouch = await locator.page().evaluate(() => navigator.maxTouchPoints > 0);
  if (isTouch) await locator.tap();
  else await locator.click();
}

export function isTouchProject(testInfo) {
  return Boolean(testInfo.project.use.hasTouch);
}

export function isNarrow(testInfo) {
  return (testInfo.project.use.viewport?.width ?? 1366) < 1024;
}

export async function expectNoHorizontalOverflow(page) {
  // On mobile, overflowing content widens the layout viewport (innerWidth) itself, so compare
  // against the visual viewport, which stays at the device width.
  const { scrollWidth, limit } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    limit: Math.min(window.innerWidth, Math.round(window.visualViewport.width)),
  }));
  expect(scrollWidth, 'document should not be wider than the viewport').toBeLessThanOrEqual(limit);
}
