import { test } from '@playwright/test';
import * as dotenv from 'dotenv';

test('login and save storage state', async ({ page }) => {
  // Теперь код берет данные из ворклоу или .env файла
  const email = process.env.EMAIL || 'abbiesun806test+1@gmail.com'; 
  const password = process.env.PASSWORD || 'Password123!';

  await page.goto('/');

  await page.getByRole('button', { name: 'Sign In' }).click();

  // Используем переменные вместо текста
  await page.locator('#signinEmail').fill(email);
  await page.locator('#signinPassword').fill(password);

  await page.getByRole('button', { name: 'Login' }).click();

  // Ждем перехода, это подтвердит успешный вход
  await page.waitForURL(/garage/);

  await page.context().storageState({ path: 'storageState.json' });
});