import { writeFile } from 'node:fs/promises';
import axe from 'axe-core';
import { expect, test } from '@playwright/test';
import { clickCentered, gotoHome } from './helpers';

const profiles = ['desktop-chromium', 'mobile-android', 'mobile-iphone'];
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function reveal(page, selector) {
  await page.locator(selector).evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY - 108;
    window.scrollTo({ top, behavior: 'instant' });
  });
  await page.waitForTimeout(1100);
}

async function capture(page, testInfo, name) {
  if (process.env.A11Y_CAPTURE === '1') {
    await page.screenshot({ path: testInfo.outputPath(name + '.png'), scale: 'css' });
  }
}

test('homepage WCAG A and AA rules pass in default and interactive states', async ({ page }, testInfo) => {
  test.skip(!profiles.includes(testInfo.project.name), 'desktop, Android and iPhone audit profiles');
  test.setTimeout(240_000);
  await gotoHome(page);
  await page.addScriptTag({ content: axe.source });
  const reports = [];
  const reportFile = testInfo.outputPath('axe.json');

  async function audit(name, selector) {
    await capture(page, testInfo, name);
    const report = await page.evaluate(({ selector, tags }) => window.axe.run(
      selector ? { include: [selector] } : document,
      { runOnly: { type: 'tag', values: tags } },
    ), { selector, tags });
    reports.push({ name, report });
    await writeFile(reportFile, JSON.stringify(reports, null, 2));
  }

  await reveal(page, '#home');
  await capture(page, testInfo, 'hero');
  if (!testInfo.project.use.hasTouch) {
    await page.locator('header nav a[href="#work"]').hover();
    await page.waitForTimeout(350);
    await audit('navigation-hover', 'header');
  }
  await page.evaluate(async () => {
    for (let top = 0; top < document.documentElement.scrollHeight; top += window.innerHeight / 2) {
      window.scrollTo({ top, behavior: 'instant' });
      await new Promise((resolve) => setTimeout(resolve, 55));
    }
  });
  await reveal(page, 'footer');
  await audit('homepage');

  await reveal(page, '#services');
  await audit('services', '#services');

  if (testInfo.project.use.hasTouch) {
    await page.getByRole('button', { name: 'Toggle menu' }).tap();
    await page.waitForTimeout(350);
    await audit('mobile-menu', 'header');
    await page.getByRole('button', { name: 'Toggle menu' }).tap();
    await page.waitForTimeout(300);
  }

  await reveal(page, '#work');
  const filter = page.locator('#work button[aria-pressed="false"]').first();
  await clickCentered(filter);
  await page.waitForTimeout(1100);
  await audit('project-filters', '#work');
  const openProject = page.getByRole('button', { name: /Open details modal/ }).first();
  await clickCentered(openProject);
  await page.waitForTimeout(500);
  await audit('project-dialog', '[role="dialog"]');
  await page.keyboard.press('Escape');

  const faq = page.locator('#faq button').nth(1);
  await clickCentered(faq);
  await page.waitForTimeout(300);
  await audit('faq-expanded', '#faq');

  await reveal(page, '#contact');
  const form = page.locator('#contact form');
  await clickCentered(form.getByRole('button', { name: 'Retail POS', exact: true }));
  await page.waitForTimeout(350);
  await capture(page, testInfo, 'contact-project-selected');
  await clickCentered(form.getByRole('button', { name: 'Retail POS Solutions', exact: true }));
  await page.waitForTimeout(350);
  await audit('contact-selected', '#contact');

  await clickCentered(form.getByRole('button', { name: /Send Enquiry on WhatsApp/ }));
  await reveal(page, '#contact-name');
  await audit('contact-invalid', '#contact');

  await testInfo.attach('axe', { path: reportFile, contentType: 'application/json' });
  const violations = reports.flatMap(({ name, report }) => report.violations
    .map(({ id, nodes }) => ({
      state: name,
      rule: id,
      targets: nodes
        // WCAG 1.4.3 exempts brand-name logotypes. The raw report retains this node.
        .filter(({ html }) => !(name === 'mobile-menu' && id === 'color-contrast' &&
          html === '<span class="text-[#4B72E8]">GROWTH LAB</span>'))
        .map(({ target }) => target),
    }))
    .filter(({ targets }) => targets.length > 0));
  expect(violations).toEqual([]);
});

async function expectKeyboardFocus(locator) {
  await expect(locator).toBeFocused();
  await expect.poll(() => locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const target = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
    let opacity = 1;
    for (let parent = element; parent; parent = parent.parentElement) {
      opacity *= Number(getComputedStyle(parent).opacity);
    }
    return element.matches(':focus-visible') && style.outlineStyle === 'solid' &&
      parseFloat(style.outlineWidth) >= 2 && opacity >= 0.9 && element.contains(target);
  })).toBe(true);
}

test('keyboard focus follows the mobile menu, service cards and project dialog', async ({ browserName, page }, testInfo) => {
  test.skip(!profiles.includes(testInfo.project.name), 'desktop, Android and iPhone keyboard profiles');
  test.setTimeout(90_000);
  await gotoHome(page);

  if (testInfo.project.use.hasTouch) {
    const menu = page.getByRole('button', { name: 'Toggle menu' });
    await page.keyboard.press('Tab');
    if (browserName !== 'webkit') await page.keyboard.press('Tab');
    await expectKeyboardFocus(menu);
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.waitForTimeout(350);
    const firstMenuLink = page.locator('header [data-lenis-prevent] a').first();
    // This WebKit profile tabs to form controls by default. Exercise the link
    // focus handler in keyboard modality as well as native button navigation.
    if (browserName === 'webkit') await firstMenuLink.focus();
    else await page.keyboard.press('Tab');
    await expectKeyboardFocus(firstMenuLink);
    await capture(page, testInfo, 'keyboard-menu');
    await page.keyboard.press('Escape');
    await expectKeyboardFocus(menu);
  }

  const services = page.locator('#services [data-service-card] a');
  // Credential links precede the service wheel in the tab order.
  const lastCredential = page.locator('#about a').last();
  await lastCredential.evaluate((element) => element.focus());
  for (const [index, service] of (await services.all()).entries()) {
    if (browserName === 'webkit') await service.focus();
    else await page.keyboard.press('Tab');
    await expectKeyboardFocus(service);
    await capture(page, testInfo, 'keyboard-service-' + (index + 1));
  }

  const firstFilter = page.locator('#work button[aria-pressed]').first();
  if (browserName === 'webkit') {
    await reveal(page, '#work');
    await firstFilter.focus();
  } else {
    await page.keyboard.press('Tab');
  }
  await expectKeyboardFocus(firstFilter);

  const project = page.getByRole('button', { name: /Open details modal/ }).first();
  await project.evaluate((element) => element.focus());
  await expectKeyboardFocus(project);
  await page.keyboard.press('Enter');
  const close = page.getByRole('button', { name: 'Close modal' });
  const bottomClose = page.getByRole('button', { name: 'Close Overview' });
  await expectKeyboardFocus(close);
  await page.keyboard.press('Shift+Tab');
  await expectKeyboardFocus(bottomClose);
  await capture(page, testInfo, 'keyboard-dialog');
  await page.keyboard.press('Tab');
  await expectKeyboardFocus(close);
  await page.keyboard.press('Escape');
  await expectKeyboardFocus(project);

  await reveal(page, '#contact');
  const name = page.getByRole('textbox', { name: /Your Name/ });
  await name.evaluate((element) => element.focus());
  await expectKeyboardFocus(name);
  await page.keyboard.press('Tab');
  await expectKeyboardFocus(page.getByRole('textbox', { name: /WhatsApp Number/ }));
  await capture(page, testInfo, 'keyboard-contact');
});
