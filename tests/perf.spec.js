import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { PRELOADER } from './helpers';

const RUNS = 3;
const LABEL = process.env.PERF_LABEL || 'run';
const median = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

test.skip(!process.env.PERF, 'set PERF=1 to run performance measurements');

async function newMeasuredPage(browser, projectUse) {
  const { defaultBrowserType, ...ctxOptions } = projectUse;
  const context = await browser.newContext(ctxOptions);
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  return { context, page, cdp };
}

async function measureLoad(browser, projectUse, baseURL) {
  const { context, page, cdp } = await newMeasuredPage(browser, projectUse);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  const finished = [];
  page.on('requestfinished', (req) => {
    finished.push(
      req.sizes().then((s) => ({ type: req.resourceType(), url: req.url(), bytes: s.responseBodySize + s.responseHeadersSize }))
    );
  });

  await page.addInitScript(() => {
    window.__vitals = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__vitals.lcp = e.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) if (!e.hadRecentInput) window.__vitals.cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });

  await page.goto(baseURL, { waitUntil: 'load', timeout: 180_000 });
  await page.locator(PRELOADER).waitFor({ state: 'detached', timeout: 60_000 });
  await page.waitForTimeout(3000);

  const timing = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    return {
      ttfb: nav.responseStart,
      fcp: fcp ? fcp.startTime : null,
      domContentLoaded: nav.domContentLoadedEventEnd,
      loadEvent: nav.loadEventEnd,
      lcp: window.__vitals.lcp,
      cls: window.__vitals.cls,
    };
  });

  const entries = await Promise.all(finished);
  const byType = {};
  let totalBytes = 0;
  for (const e of entries) {
    totalBytes += e.bytes;
    byType[e.type] = (byType[e.type] || 0) + e.bytes;
  }
  const imageBytesBeforeScroll = entries.filter((e) => e.type === 'image').reduce((a, e) => a + e.bytes, 0);
  await context.close();
  return { ...timing, totalBytes, imageBytesBeforeScroll, requests: entries.length, byType };
}

async function measureScroll(browser, projectUse, baseURL) {
  const { context, page, cdp } = await newMeasuredPage(browser, projectUse);
  await page.goto(baseURL, { waitUntil: 'load' });
  await page.locator(PRELOADER).waitFor({ state: 'detached', timeout: 30_000 });
  await page.waitForTimeout(1500);
  await cdp.send('Performance.enable');
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  await page.evaluate(() => {
    window.__frames = [];
    let last = performance.now();
    const loop = (t) => {
      window.__frames.push(t - last);
      last = t;
      window.__rafId = requestAnimationFrame(loop);
    };
    window.__rafId = requestAnimationFrame(loop);
  });
  const metric = async () => {
    const { metrics } = await cdp.send('Performance.getMetrics');
    return Object.fromEntries(metrics.map((m) => [m.name, m.value]));
  };
  const m0 = await metric();
  const vp = page.viewportSize();
  await page.mouse.move(vp.width / 2, vp.height / 2);
  for (let i = 0; i < 120; i++) {
    await page.mouse.wheel(0, 140);
    await page.waitForTimeout(16);
  }
  await page.waitForTimeout(1500);
  const m1 = await metric();
  const frames = await page.evaluate(() => {
    cancelAnimationFrame(window.__rafId);
    return window.__frames.slice(1);
  });
  await context.close();

  const total = frames.reduce((a, b) => a + b, 0);
  return {
    scriptMs: (m1.ScriptDuration - m0.ScriptDuration) * 1000,
    layoutMs: (m1.LayoutDuration - m0.LayoutDuration) * 1000,
    recalcStyleMs: (m1.RecalcStyleDuration - m0.RecalcStyleDuration) * 1000,
    taskMs: (m1.TaskDuration - m0.TaskDuration) * 1000,
    layoutCount: m1.LayoutCount - m0.LayoutCount,
    frames: frames.length,
    avgFps: frames.length / (total / 1000),
    longFrames50ms: frames.filter((f) => f > 50).length,
  };
}

test('load metrics (local network, 4x CPU throttle)', async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium' && testInfo.project.name !== 'mobile-android', 'chromium only');
  test.setTimeout(900_000);
  const runs = [];
  for (let i = 0; i < RUNS; i++) runs.push(await measureLoad(browser, testInfo.project.use, baseURL));
  const keys = ['ttfb', 'fcp', 'lcp', 'cls', 'domContentLoaded', 'loadEvent', 'totalBytes', 'imageBytesBeforeScroll', 'requests'];
  const summary = Object.fromEntries(keys.map((k) => [k, median(runs.map((r) => r[k]))]));
  const out = path.join('audit', LABEL, `load-${testInfo.project.name}.json`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ summary, runs }, null, 2));
  console.log(LABEL, testInfo.project.name, 'load', JSON.stringify(summary));
});

test('scroll runtime cost (4x CPU throttle)', async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'desktop chromium only');
  test.setTimeout(600_000);
  const runs = [];
  for (let i = 0; i < RUNS; i++) runs.push(await measureScroll(browser, testInfo.project.use, baseURL));
  const keys = Object.keys(runs[0]);
  const summary = Object.fromEntries(keys.map((k) => [k, median(runs.map((r) => r[k]))]));
  const out = path.join('audit', LABEL, `scroll-${testInfo.project.name}.json`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ summary, runs }, null, 2));
  console.log(LABEL, testInfo.project.name, 'scroll', JSON.stringify(summary));
});
