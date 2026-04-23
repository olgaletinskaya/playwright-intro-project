import { test } from '@playwright/test';

test('login and save storage state', async ({ page }) => {
  const email = process.env.EMAIL!;
  const password = process.env.PASSWORD!;

  if (!email || !password) {
    throw new Error('EMAIL or PASSWORD is missing');
  }

  console.log('EMAIL:', email);
  console.log('PASSWORD:', password ? '***' : 'EMPTY');

  await page.goto('/');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.locator('#signinEmail').fill(email);
  await page.locator('#signinPassword').fill(password);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL(/garage/, { timeout: 15000 });

  await page.context().storageState({ path: 'storageState.json' });
});