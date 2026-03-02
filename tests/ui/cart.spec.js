import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import users from '../../test-data/users.json';

// UI tests that validate behaviour specific to the cart page
test.describe('Cart Page Tests', () => {
  /** @type {ProductsPage} */
  let productsPage;

  /** @type {CartPage} */
  let cartPage;

  test.beforeEach(async ({ page }) => {
    // -------- Login --------
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      users.validUser.username,
      users.validUser.password,
    );

    await expect(page).toHaveURL(/inventory/);

    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test('@regression User should see added item in cart', async ({ page }) => {
    await productsPage.addBackpackToCart();
    await productsPage.goToCart();

    await expect(page).toHaveURL(/cart/);

    const isItemPresent = await cartPage.isItemPresentInCart();
    expect(isItemPresent).toBeTruthy();

    const itemName = await cartPage.getCartItemName();
    expect(itemName).toContain('Sauce Labs Backpack');
  });

  test('User should see correct number of items in cart', async ({ page }) => {
    await productsPage.addBackpackToCart();
    await productsPage.addBikeLightToCart();
    await productsPage.goToCart();

    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(2);
  });

  test('User should be able to remove item from cart', async ({ page }) => {
    await productsPage.addBackpackToCart();
    await productsPage.goToCart();

    let itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(1);

    await cartPage.removeBackpackFromCart();

    itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(0);
  });

  test('User can continue shopping from cart page', async ({ page }) => {
    await productsPage.addBackpackToCart();
    await productsPage.goToCart();

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);
  });

  test('User can proceed to checkout from cart page', async ({ page }) => {
    await productsPage.addBackpackToCart();
    await productsPage.goToCart();

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
  });
});

