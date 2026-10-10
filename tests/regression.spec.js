import { test, expect } from '@playwright/test';
import {
  PRELOADER,
  collectRuntimeIssues,
  gotoHome,
  scrollToSection,
  scrollThroughPage,
  isTouchProject,
  isNarrow,
  expectNoHorizontalOverflow,
  clickCentered,
} from './helpers';

const MODAL = 'div.fixed.inset-0.z-\\[9999\\]';
const SERVICE_CARDS = '#services div[class*="md:w-[420px]"]';
const SECTION_IDS = ['home', 'about', 'services', 'work', 'skills', 'process', 'compare', 'faq', 'contact'];

test.describe('load & runtime', () => {
  test('preloader completes and hero renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(PRELOADER)).toBeVisible();
    await page.locator(PRELOADER).waitFor({ state: 'detached', timeout: 20_000 });
    await expect(page.locator('#home h1').first()).toBeVisible();
    const heroImgOk = await page.locator('#home img').first().evaluate((img) => img.complete && img.naturalWidth > 0);
    expect(heroImgOk).toBe(true);
  });

  test('no runtime errors, failed requests or 4xx/5xx during a full scroll', async ({ page, baseURL }) => {
    const issues = collectRuntimeIssues(page, baseURL);
    await gotoHome(page);
    await scrollThroughPage(page);
    await page.waitForTimeout(500);
    expect(issues.pageErrors, 'uncaught exceptions').toEqual([]);
    expect(issues.consoleErrors, 'console errors').toEqual([]);
    expect(issues.failedRequests, 'failed same-origin requests').toEqual([]);
    expect(issues.badResponses, '4xx/5xx same-origin responses').toEqual([]);
  });

  test('all images load after scrolling through the page', async ({ page }) => {
    await gotoHome(page);
    const broken = await page.evaluate(async () => {
      const failed = [];
      for (const img of document.images) {
        img.scrollIntoView({ block: 'center' });
        if (!img.complete || img.naturalWidth === 0) {
          await new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
            setTimeout(resolve, 15000);
          });
        }
        if (!(img.complete && img.naturalWidth > 0)) failed.push(img.currentSrc || img.src);
      }
      return failed;
    });
    expect(broken).toEqual([]);
  });

  test('videos expose poster and light preload', async ({ page }) => {
    await gotoHome(page);
    const videos = await page.$$eval('video', (els) =>
      els.map((v) => ({ src: v.getAttribute('src'), poster: v.getAttribute('poster'), preload: v.getAttribute('preload') }))
    );
    expect(videos.length).toBeGreaterThan(0);
    for (const v of videos) {
      expect(v.src).toBeTruthy();
      expect(v.poster).toBeTruthy();
      expect(['metadata', 'none']).toContain(v.preload);
    }
  });
});

test.describe('layout', () => {
  test('no horizontal overflow at load and after full scroll', async ({ page }) => {
    await gotoHome(page);
    await expectNoHorizontalOverflow(page);
    await scrollThroughPage(page);
    await expectNoHorizontalOverflow(page);
  });

  test('every nav target section exists', async ({ page }) => {
    await gotoHome(page);
    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}`), `#${id}`).toHaveCount(1);
    }
  });
});

test.describe('navigation', () => {
  test('nav links scroll to their sections', async ({ page }, testInfo) => {
    await gotoHome(page);
    const targets = ['about', 'work', 'faq', 'contact'];
    for (const id of targets) {
      if (isNarrow(testInfo)) {
        await page.getByRole('button', { name: 'Toggle menu' }).click();
        await page.locator(`header div.fixed a[href="#${id}"]`).first().click({ timeout: 8000 });
      } else {
        await page.locator(`header nav a[href="#${id}"]`).click();
      }
      const vh = await page.evaluate(() => window.innerHeight);
      await expect
        .poll(() => page.locator(`#${id}`).evaluate((el) => Math.abs(el.getBoundingClientRect().top)), {
          message: `#${id} should be scrolled into view`,
          timeout: 6000,
        })
        .toBeLessThan(vh * 0.5);
    }
  });

  test('mobile menu opens and closes', async ({ page }, testInfo) => {
    test.skip(!isNarrow(testInfo), 'mobile/tablet only');
    await gotoHome(page);
    const toggle = page.getByRole('button', { name: 'Toggle menu' });
    await toggle.click();
    const menu = page.locator('header div.fixed.inset-x-4');
    await expect(menu).toBeVisible();
    await toggle.click();
    await expect(menu).toHaveCount(0);
  });

  test('every mobile menu item is reachable within the viewport', async ({ page }, testInfo) => {
    test.skip(!isNarrow(testInfo), 'mobile/tablet only');
    await gotoHome(page);
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await page.waitForTimeout(500);
    const links = page.locator('header div.fixed.inset-x-4 a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeInViewport({ ratio: 1 });
    }
  });

  test('back to top returns to the hero', async ({ page }) => {
    await gotoHome(page);
    await scrollToSection(page, 'footer');
    await page.getByRole('button', { name: /Back to top/ }).click();
    await page.waitForTimeout(3000);
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(50);
  });
});

test.describe('portfolio', () => {
  test('category filters change the visible projects', async ({ page }) => {
    await gotoHome(page);
    await scrollToSection(page, '#work');
    const cards = page.locator('#work button[aria-label^="Open details modal for"]');
    await expect(cards).toHaveCount(7);
    await page.locator('#work button', { hasText: 'Retail POS' }).click();
    await expect(cards).toHaveCount(1);
    await page.locator('#work button', { hasText: /^All/ }).click();
    await expect(cards).toHaveCount(7);
  });

  test('project modal opens and closes via button and backdrop', async ({ page }) => {
    await gotoHome(page);
    await scrollToSection(page, '#work');
    await clickCentered(page.getByRole('button', { name: 'Open details modal for Rani Sarees & Boutique' }));
    await expect(page.locator(MODAL)).toBeVisible();
    await expect(page.locator(MODAL).getByText('CASE STUDY')).toBeVisible();
    await page.getByRole('button', { name: 'Close modal' }).click();
    await expect(page.locator(MODAL)).toHaveCount(0);

    await clickCentered(page.getByRole('button', { name: 'Open details modal for Nexus CRM Platform' }));
    await expect(page.locator(MODAL)).toBeVisible();
    await page.mouse.click(5, 5);
    await expect(page.locator(MODAL)).toHaveCount(0);
  });

  test('project modal closes with Escape', async ({ page }) => {
    await gotoHome(page);
    await scrollToSection(page, '#work');
    await clickCentered(page.getByRole('button', { name: 'Open details modal for Rani Sarees & Boutique' }));
    await expect(page.locator(MODAL)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator(MODAL)).toHaveCount(0);
  });

  test('mouse wheel scrolls the modal content, not the page behind it', async ({ page }, testInfo) => {
    test.skip(isTouchProject(testInfo), 'wheel input is desktop only');
    await gotoHome(page);
    await scrollToSection(page, '#work');
    await clickCentered(page.getByRole('button', { name: 'Open details modal for Rani Sarees & Boutique' }));
    await expect(page.locator(MODAL)).toBeVisible();
    await page.waitForTimeout(500);
    const before = await page.evaluate((sel) => {
      const outer = document.querySelector(sel);
      const panel = outer.querySelector('.max-w-4xl');
      const scrollable =
        outer.scrollHeight > outer.clientHeight + 1 || panel.scrollHeight > panel.clientHeight + 1;
      return { pageY: window.scrollY, inner: outer.scrollTop + panel.scrollTop, scrollable };
    }, MODAL);
    const vp = page.viewportSize();
    await page.mouse.move(vp.width / 2, vp.height / 2);
    for (let i = 0; i < 4; i++) {
      await page.mouse.wheel(0, 250);
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(1200);
    const after = await page.evaluate((sel) => {
      const outer = document.querySelector(sel);
      const panel = outer.querySelector('.max-w-4xl');
      return { pageY: window.scrollY, inner: outer.scrollTop + panel.scrollTop };
    }, MODAL);
    testInfo.annotations.push({ type: 'modalScrollable', description: String(before.scrollable) });
    if (before.scrollable) {
      expect(after.inner, 'modal content should scroll').toBeGreaterThan(before.inner);
    }
    expect(Math.abs(after.pageY - before.pageY), 'page behind modal should not scroll').toBeLessThanOrEqual(2);
  });
});

test.describe('animations & interactive sections', () => {
  test('services wheel advances cards as the pinned section scrolls', async ({ page }) => {
    await gotoHome(page);
    await scrollToSection(page, '#services', 1500);
    const readActive = () =>
      page.$$eval(SERVICE_CARDS, (cards) => {
        const ops = cards.map((c) => parseFloat(getComputedStyle(c).opacity));
        return ops.indexOf(Math.max(...ops));
      });
    expect(await readActive()).toBe(0);
    const count = await page.locator(SERVICE_CARDS).count();
    expect(count).toBeGreaterThan(1);
    const step = await page.evaluate((n) => (window.innerHeight * 5) / (n - 1), count);
    await page.evaluate((s) => window.scrollBy(0, s), step);
    await page.waitForTimeout(2000);
    expect(await readActive()).toBe(1);
    await page.evaluate((s) => window.scrollBy(0, s * 10), step);
    await page.waitForTimeout(2000);
    expect(await readActive()).toBe(count - 1);
  });

  test('skills marquees loop seamlessly', async ({ page }, testInfo) => {
    await gotoHome(page);
    await scrollToSection(page, '#skills');
    const results = await page.$$eval('.marquee-inner', (rows) =>
      rows.map((inner) => {
        const anim = inner.getAnimations()[0];
        const cards = inner.children;
        const n = cards.length / 3;
        const period = cards[n].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
        anim.pause();
        const dur = anim.effect.getComputedTiming().duration;
        anim.currentTime = 0;
        const x0 = cards[0].getBoundingClientRect().left;
        anim.currentTime = dur - 0.01;
        const xEnd = cards[0].getBoundingClientRect().left;
        anim.play();
        const shift = Math.abs(x0 - xEnd);
        const rem = shift % period;
        return { period, shift, mismatchPx: Math.min(rem, period - rem), durationMs: dur, pxPerSec: shift / (dur / 1000) };
      })
    );
    testInfo.annotations.push({ type: 'marquee', description: JSON.stringify(results) });
    for (const r of results) {
      expect(r.mismatchPx, `loop jump (period ${r.period}px, shift ${r.shift}px)`).toBeLessThan(6);
    }
  });

  test('FAQ accordion toggles answers', async ({ page }) => {
    await gotoHome(page);
    await scrollToSection(page, '#faq');
    const buttons = page.locator('#faq button[aria-expanded]');
    await expect(buttons.first()).toHaveAttribute('aria-expanded', 'true');
    await buttons.nth(1).click();
    await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(buttons.first()).toHaveAttribute('aria-expanded', 'false');
    await buttons.nth(1).click();
    await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'false');
  });

  test('testimonial slider arrows update state', async ({ page }) => {
    await gotoHome(page);
    await scrollToSection(page, '#clients');
    const prev = page.getByRole('button', { name: 'Previous slide' });
    const next = page.getByRole('button', { name: 'Next slide' });
    await expect(prev).toBeDisabled();
    await expect(next).toBeEnabled();
    await next.click();
    await expect(prev).toBeEnabled({ timeout: 3000 });
  });

  test('custom cursor present on desktop and absent on touch', async ({ page }, testInfo) => {
    await gotoHome(page);
    const dot = page.locator('div.fixed.z-\\[99999\\].w-3.h-3');
    if (isTouchProject(testInfo)) {
      await expect(dot).toHaveCount(0);
    } else {
      await expect(dot).toHaveCount(1);
      await page.mouse.move(400, 400);
      await page.mouse.move(420, 420);
      await page.waitForTimeout(500);
      const box = await dot.boundingBox();
      expect(Math.abs(box.x + box.width / 2 - 420)).toBeLessThan(10);
    }
  });
});

test.describe('contact form', () => {
  test('validates required fields', async ({ page }) => {
    await gotoHome(page);
    await scrollToSection(page, '#contact');
    await page.locator('#contact button[type="submit"]').click();
    await expect(page.getByText('Full Name is required')).toBeVisible();
    await expect(page.getByText('WhatsApp number is required')).toBeVisible();
    await expect(page.getByText('Email address is required')).toBeVisible();
  });

  test('submits a correctly formatted WhatsApp enquiry within the user gesture', async ({ page }, testInfo) => {
    await gotoHome(page);
    await scrollToSection(page, '#contact');
    await page.evaluate(() => {
      window.__opened = [];
      window.open = (url, target) => {
        window.__opened.push({
          url,
          target,
          userActivation: navigator.userActivation ? navigator.userActivation.isActive : 'unsupported',
        });
        return null;
      };
    });
    await page.locator('input[name="name"]').fill('Test Client');
    await page.locator('input[name="whatsapp"]').fill('+91 9000000000');
    await page.locator('input[name="email"]').fill('test@example.com');
    await clickCentered(page.locator('#contact').getByRole('button', { name: 'Retail POS', exact: true }));
    await clickCentered(page.locator('#contact button[type="submit"]'));
    await expect.poll(() => page.evaluate(() => window.__opened.length)).toBe(1);
    const opened = await page.evaluate(() => window.__opened[0]);
    testInfo.annotations.push({ type: 'userActivation', description: String(opened.userActivation) });
    expect(opened.url).toMatch(/^https:\/\/wa\.me\/918220034139\?text=/);
    const text = decodeURIComponent(opened.url.split('?text=')[1]);
    expect(text).toContain('*Client Name:* Test Client');
    expect(text).toContain('*Email:* test@example.com');
    expect(text).toContain('*Website Type:* Retail POS');
    expect(opened.target).toBe('_blank');
    expect(opened.userActivation, 'window.open must run with transient user activation').not.toBe(false);
  });

  test('budget options are keyboard operable', async ({ page }) => {
    await gotoHome(page);
    await scrollToSection(page, '#contact');
    const basic = page.locator('#contact').getByRole('button', { name: /^Basic/ });
    await expect(basic).toHaveCount(1);
    await basic.focus();
    await page.keyboard.press('Enter');
    await expect(basic).toHaveAttribute('aria-pressed', 'true');
  });
});
