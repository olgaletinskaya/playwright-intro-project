import * as dotenv from 'dotenv';
import { defineConfig } from '@playwright/test';

const envFile = process.env.ENV_FILE
  ? `.env.${process.env.ENV_FILE}`
  : '.env';

dotenv.config({ path: envFile, override: false });

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
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        storageState: 'storageState.json',
      },
      dependencies: ['setup'],
    },
  ],
});