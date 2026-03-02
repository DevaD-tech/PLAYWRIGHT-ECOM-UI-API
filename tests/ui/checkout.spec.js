import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

import users from '../../test-data/users.json';
import checkoutData from '../../test-data/checkout.json';

// Full UI journey from login to placing an order successfully
test.describe('E-Commerce End-to-End Flow', () => {
  test('User should be able to place an order successfully', async ({ page }) => {
    // -------- Login --------
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      users.validUser.username,
      users.validUser.password,
    );

    await expect(page).toHaveURL(/inventory/);

    // -------- Products --------
    const productsPage = new ProductsPage(page);
    const title = await productsPage.getPageTitle();
    expect(title).toBe('Products');

    await productsPage.addBackpackToCart();
    await productsPage.goToCart();

    // -------- Cart --------
    const cartPage = new CartPage(page);
    const isItemPresent = await cartPage.isItemPresentInCart();
    expect(isItemPresent).toBeTruthy();

    await cartPage.proceedToCheckout();

    // -------- Checkout --------
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.enterCustomerDetails(
      checkoutData.customer.firstName,
      checkoutData.customer.lastName,
      checkoutData.customer.postalCode,
    );

    await checkoutPage.finishCheckout();

    const successMessage = await checkoutPage.getSuccessMessage();
    expect(successMessage).toContain('Thank you for your order');
  });
});