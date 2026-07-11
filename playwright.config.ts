import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

export default defineConfig({
  testDir: './tests/e2e',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ...(process.env.CI ? [['junit', { outputFile: 'test-results/junit.xml' }] as const] : []),
  ],

  use: {
    baseURL: 'http://localhost:8787',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Chromium Desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'Firefox Desktop',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'WebKit Desktop',
      use: { ...devices['Desktop Safari'], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'Chromium Mobile',
      use: { ...devices['Pixel 7'] },
    },
  ],

  webServer: {
    command: process.env.CI
      ? `pnpm run preview >/dev/null 2>&1`
      : `pnpm run preview`,
    url: 'http://localhost:8787',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
    cwd: projectRoot,
  },
});