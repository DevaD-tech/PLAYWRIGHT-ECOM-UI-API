import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';

// UI regression tests that cover valid and invalid login flows
test.describe('Login Page Tests', () => {
  test('@regression Valid user should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      users.validUser.username,
      users.validUser.password,
    );

    // Assertion: user should land on inventory page after successful login
    await expect(page).toHaveURL(/inventory/);
  });

  test('Invalid user should see error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(
      users.invalidUser.username,
      users.invalidUser.password,
    );

    // Assertion: error banner should show a failure message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface');
  });
});