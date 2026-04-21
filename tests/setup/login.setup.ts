import { test } from '@playwright/test';
import * as dotenv from 'dotenv';



test('login and save storage state', async ({ page }) => {
  console.log('EMAIL:');
  console.log('PASSWORD:');

  await page.goto('/');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.locator('#signinEmail').fill('abbiesun806test+1@gmail.com');
  await page.locator('#signinPassword').fill('Password123!');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL(/garage/);

  await page.context().storageState({ path: 'storageState.json' });
});