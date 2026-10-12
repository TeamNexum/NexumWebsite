import { defineConfig, devices } from '@playwright/test';
import { FORM_ENDPOINT } from './tests/helpers';

// Les tests construisent le site dans dist-test/ (jamais dans dist/) avec un faux point d'accès de formulaire,
// puis le servent en local. Les appels vers ce faux point d'accès sont interceptés dans les tests : rien ne sort du poste.
const PORT = 4331;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `npx astro build && npx astro preview --port ${PORT}`,
    url: `http://localhost:${PORT}/NexumWebsite/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: { OUT_DIR: 'dist-test', PUBLIC_FORM_ENDPOINT: FORM_ENDPOINT },
  },
});
