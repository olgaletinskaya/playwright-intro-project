import { test, expect } from '@playwright/test'

// 🔹 helper
function generateRandomEmail() {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
  let result = 'aqa-'

  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }

  return result + '@test.com'
}

// 🔹 beforeEach
test.beforeEach(async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/')

  await page.getByRole('button', { name: 'Sign In' }).click()
  await page.getByRole('button', { name: 'Registration' }).click()
})

// ✅ позитивный тест
test('Successful registration', async ({ page }) => {
  const email = generateRandomEmail()

  await page.locator('#signupName').fill('John')
  await page.locator('#signupLastName').fill('Doe')
  await page.locator('#signupEmail').fill(email)
  await page.locator('#signupPassword').fill('Password1')
  await page.locator('#signupRepeatPassword').fill('Password1')

  await page.getByRole('button', { name: 'Register' }).click()

  await expect(page).toHaveURL(/garage/)
})

// ❌ негативные тесты
test('Name is required', async ({ page }) => {
  await page.locator('#signupName').click()
  await page.locator('#signupLastName').click()

  await expect(page.locator('#signupName')).toHaveClass(/is-invalid/)
})

test('Name too short', async ({ page }) => {
  await page.locator('#signupName').fill('A')
  await page.locator('#signupLastName').click()

  await expect(page.locator('#signupName')).toHaveClass(/is-invalid/)
})

test('Invalid email', async ({ page }) => {
  await page.locator('#signupEmail').fill('invalid-email')
  await page.locator('#signupPassword').click()

  await expect(page.locator('#signupEmail')).toHaveClass(/is-invalid/)
})

test('Invalid password', async ({ page }) => {
  await page.locator('#signupPassword').fill('123')
  await page.locator('#signupRepeatPassword').click()

  await expect(page.locator('#signupPassword')).toHaveClass(/is-invalid/)
})

test('Passwords do not match', async ({ page }) => {
  await page.locator('#signupPassword').fill('Password1')
  await page.locator('#signupRepeatPassword').fill('Password2')

  // 👇 ВАЖНО: триггерим валидацию
  await page.locator('#signupName').click()

  await expect(page.locator('.invalid-feedback'))
  .toContainText('Passwords do not match')
})

// ➕ дополнительный 
test('Register button disabled', async ({ page }) => {
  await page.locator('#signupName').fill('A')

  await expect(page.getByRole('button', { name: 'Register' }))
    .toBeDisabled()
})