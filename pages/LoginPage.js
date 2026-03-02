// Page object representing the Sauce Demo login page
export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // Form field and UI locators
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  /**
   * Navigate to the login page using the configured baseURL
   */
  async navigate() {
    await this.page.goto('/');
  }

  /**
   * Perform a login attempt with the given credentials
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  /**
   * Return the visible error message text (if any)
   */
  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}