// @ts-check
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: 'dev',
  test: {
    root: '.',
    setupFiles: ['./test/setup.js'],
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      viewport: { width: 1024, height: 768 },
      headless: true,
    },
  },
});
