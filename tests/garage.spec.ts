import { test, expect } from '../fixtures/userGarage.fixture';

test('User is already logged in', async ({ userGaragePage }) => {
  await expect(userGaragePage.page).toHaveURL(/garage/);
});