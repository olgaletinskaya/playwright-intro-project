import { test, expect } from '@playwright/test';

test('Mock profile response and verify UI', async ({ page }) => {
  
  await page.route('**/api/users/profile', async (route) => {
    const response = await route.fetch();
    const body = await response.json();

    body.data.name = 'Olga';
    body.data.lastName = 'QA';

    await route.fulfill({
      response,
      body: JSON.stringify(body),
    });
  });

  await page.goto('/');

  await page.getByRole('link', { name: 'Profile' }).click();

  await expect(page.getByText('Olga QA')).toBeVisible();
});