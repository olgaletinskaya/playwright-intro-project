import { Page, expect } from '@playwright/test';

export class GaragePage {
  constructor(public page: Page) {}

  async open() {
    await this.page.goto('/panel/garage');
    await expect(this.page).toHaveURL(/garage/);
  }
}