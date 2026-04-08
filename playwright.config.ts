import * as dotenv from 'dotenv'
import { defineConfig } from '@playwright/test'

// выбираем env файл
const envFile = process.env.ENV_FILE
  ? `.env.${process.env.ENV_FILE}`
  : '.env'

dotenv.config({ path: envFile })

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  use: {
    baseURL: process.env.BASE_URL,

    httpCredentials: {
      username: process.env.HTTP_USERNAME!,
      password: process.env.HTTP_PASSWORD!,
    },

    headless: true
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});