import { test, expect } from '@playwright/test';
import { gotoHome, scrollToSection } from './helpers';

const SECTIONS = ['#home', '#about', '#services', '#work', '#skills', '#process', '#why-vgl', '#compare', '#clients', '#faq', '#contact', 'footer'];

test.skip(!process.env.VISUAL, 'set VISUAL=1 to run visual comparisons');

test('sections render identically to baseline', async ({ page }, testInfo) => {
  test.skip(!['desktop-chromium', 'mobile-android'].includes(testInfo.project.name), 'visual baseline projects only');
  test.setTimeout(240_000);
  await gotoHome(page);
  for (const sel of SECTIONS) {
    await scrollToSection(page, sel, 2500);
    await expect.soft(page).toHaveScreenshot(`${sel.replace('#', '')}.png`, {
      animations: 'disabled',
      maxDiffPixelRatio: 0.03,
    });
  }
  // Absolute, instant positions: the page sets `scroll-behavior: smooth`, which makes relative scrolls nondeterministic.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(1000);
  const { start, pinLength } = await page.evaluate(() => {
    const spacer = document.querySelector('#services').parentElement;
    return { start: spacer.getBoundingClientRect().top + window.scrollY, pinLength: window.innerHeight * 5 };
  });
  for (const [i, frac] of [0.34, 0.67, 1].entries()) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(start + pinLength * frac));
    await page.waitForTimeout(2500);
    await expect.soft(page).toHaveScreenshot(`services-wheel-${i + 1}.png`, {
      animations: 'disabled',
      maxDiffPixelRatio: 0.03,
    });
  }
});
