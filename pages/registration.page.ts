import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  readonly signUpButton: Locator;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signUpButton = page.locator('button:has-text("Sign up")');
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('button:has-text("Register")');
  }

  async open() {
  await this.page.goto('/');

  const signUpBtn = this.page.getByRole('button', { name: 'Sign up' });

  await signUpBtn.waitFor({ state: 'visible', timeout: 10000 });
  await signUpBtn.click();

  await this.nameInput.waitFor();
}

  async fillForm(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async submit() {
    await this.registerButton.click();
  }
}