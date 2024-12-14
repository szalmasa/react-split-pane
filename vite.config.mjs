// @ts-check
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
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
