import { test } from '@playwright/test';

test('login and save storage state', async ({ page }) => {

  // ✅ ВОТ СЮДА добавляем fallback
  const email = process.env.EMAIL || 'abbiesun806test+1@gmail.com';
  const password = process.env.PASSWORD || 'Password123!';

  console.log('EMAIL:', email);
  console.log('PASSWORD:', password ? '***' : 'EMPTY');

  await page.goto('/');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.locator('#signinEmail').fill(email);
  await page.locator('#signinPassword').fill(password);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForLoadState('networkidle');

  await page.context().storageState({ path: 'storageState.json' });
});