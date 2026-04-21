import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';


// генерация email
function generateRandomEmail() {
  const random = Math.random().toString(36).substring(2, 8);
  return `aqa-${random}@test.com`;
}

test.describe('Registration POM', () => {

  test('Positive: successful registration', async ({ page }) => {
    const regPage = new RegistrationPage(page);

    await regPage.open();

    await regPage.fillForm(
      'Olga',
      'Test',
      generateRandomEmail(),
      'Password123!',
      'Password123!'
    );

    await regPage.submit();

    await expect(page).toHaveURL(/garage/);
  });

  test('Negative: passwords do not match', async ({ page }) => {
  const regPage = new RegistrationPage(page);

  await regPage.open();

  await regPage.fillForm(
    'Olga',
    'Test',
    generateRandomEmail(),
    'Password123!',
    'Password321!'
  );

  // ❗ ТРИГГЕРИМ ВАЛИДАЦИЮ
  await regPage.nameInput.click();

  await expect(regPage.repeatPasswordInput).toHaveClass(/is-invalid/);
  await expect(regPage.registerButton).toBeDisabled();
});

  test('Negative: name is required', async ({ page }) => {
    const regPage = new RegistrationPage(page);

    await regPage.open();

    await regPage.nameInput.click();
    await regPage.lastNameInput.click();

    await expect(regPage.nameInput).toHaveClass(/is-invalid/);
  });

  test('Negative: name too short', async ({ page }) => {
    const regPage = new RegistrationPage(page);

    await regPage.open();

    await regPage.nameInput.fill('A');
    await regPage.lastNameInput.click();

    await expect(regPage.nameInput).toHaveClass(/is-invalid/);
  });

  test('Negative: invalid email', async ({ page }) => {
    const regPage = new RegistrationPage(page);

    await regPage.open();

    await regPage.emailInput.fill('invalid-email');
    await regPage.passwordInput.click();

    await expect(regPage.emailInput).toHaveClass(/is-invalid/);
  });

  test('Negative: invalid password', async ({ page }) => {
    const regPage = new RegistrationPage(page);

    await regPage.open();

    await regPage.passwordInput.fill('123');
    await regPage.repeatPasswordInput.click();

    await expect(regPage.passwordInput).toHaveClass(/is-invalid/);
  });

  test('Negative: register button disabled', async ({ page }) => {
    const regPage = new RegistrationPage(page);

    await regPage.open();

    await regPage.nameInput.fill('A');

    await expect(regPage.registerButton).toBeDisabled();
  });

});