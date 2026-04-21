import * as dotenv from 'dotenv';
import { defineConfig } from '@playwright/test';

const envFile = process.env.ENV_FILE
  ? `.env.${process.env.ENV_FILE}`
  : '.env';

dotenv.config({ path: envFile });

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_USERNAME!,
      password: process.env.HTTP_PASSWORD!,
    },
    headless: true,
  },

  projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.ts/,
  },

  // 🔹 ТЕСТЫ С ЛОГИНОМ
  {
    name: 'auth',
    testMatch: /.*garage\.spec\.ts/,
    use: {
      browserName: 'chromium',
      storageState: 'storageState.json',
    },
    dependencies: ['setup'],
  },

  // 🔹 ТЕСТЫ БЕЗ ЛОГИНА (регистрация)
  {
    name: 'no-auth',
    testMatch: /.*registration\.spec\.ts/,
    use: {
      browserName: 'chromium',
      storageState: undefined,
    },
  },
],
});