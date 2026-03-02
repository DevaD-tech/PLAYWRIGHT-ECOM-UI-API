// Page object representing the multi-step checkout flow
export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // Step 1 – Your Information
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalCodeInput = '#postal-code';
    this.continueButton = '#continue';

    // Step 2 – Overview
    this.finishButton = '#finish';

    // Step 3 – Complete
    this.successMessage = '.complete-header';
  }

  /**
   * Fill customer information on step one and continue to the overview
   */
  async enterCustomerDetails(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  /**
   * Click the final button to complete the order
   */
  async finishCheckout() {
    await this.page.click(this.finishButton);
  }

  /**
   * Retrieve the success banner text from the complete page
   */
  async getSuccessMessage() {
    return await this.page.textContent(this.successMessage);
  }
}