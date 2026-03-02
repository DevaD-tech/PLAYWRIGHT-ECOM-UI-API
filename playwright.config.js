import { defineConfig } from '@playwright/test';

// Core Playwright configuration for this e-commerce project
export default defineConfig({
  // Root directory where all tests live
  testDir: './tests',

  // Global test timeout (in ms)
  timeout: 30000,

  // Number of retries for failing tests
  retries: 1,

  // Shared context options for every test
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Reporters used after the run finishes
  reporter: [['html'], ['list']],
});