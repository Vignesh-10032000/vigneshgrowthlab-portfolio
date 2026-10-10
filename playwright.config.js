import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } } },
    { name: 'desktop-firefox', use: { ...devices['Desktop Firefox'], viewport: { width: 1366, height: 768 } } },
    { name: 'desktop-webkit', use: { ...devices['Desktop Safari'], viewport: { width: 1366, height: 768 } } },
    { name: 'desktop-1080p', use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } } },
    { name: 'desktop-1440p', use: { ...devices['Desktop Chrome'], viewport: { width: 2560, height: 1440 } } },
    { name: 'tablet-ipad', use: { ...devices['iPad Mini'] } },
    { name: 'tablet-chromium', use: { ...devices['iPad Mini'], defaultBrowserType: 'chromium' } },
    { name: 'mobile-android', use: { ...devices['Pixel 7'] } },
    { name: 'mobile-android-landscape', use: { ...devices['Pixel 7 landscape'] } },
    { name: 'mobile-iphone', use: { ...devices['iPhone 14'] } },
    { name: 'mobile-iphone-landscape', use: { ...devices['iPhone 14 landscape'] } },
  ],
});
