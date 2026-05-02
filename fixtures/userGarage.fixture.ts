import { test as base } from '@playwright/test';
import { GaragePage } from '../pages/garage.page';

type Fixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<Fixtures>({
  //  ВАЖНО
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'storageState.json',
    });
    await use(context);
  },

  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.open();
    await use(garagePage);
  },
});

export { expect } from '@playwright/test';