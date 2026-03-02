import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import users from '../../test-data/users.json';

// UI tests that validate core behaviour on the products (inventory) page
test.describe('Products Page Tests', () => {
  /** @type {ProductsPage} */
  let productsPage;

  test.beforeEach(async ({ page }) => {
    // -------- Login --------
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      users.validUser.username,
      users.validUser.password,
    );

    await expect(page).toHaveURL(/inventory/);

    // -------- Products Page --------
    productsPage = new ProductsPage(page);
  });

  test('@smoke User should be able to add product to cart', async () => {
    const pageTitle = await productsPage.getPageTitle();
    expect(pageTitle).toBe('Products');

    await productsPage.addBackpackToCart();

    // Assertion: cart badge should show 1 item
    const cartBadgeCount = await productsPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(1);
  });

  test('User should see all products listed', async () => {
    const productCount = await productsPage.getProductCount();

    // Basic sanity check
    expect(productCount).toBeGreaterThan(0);

    // Sauce Demo inventory page specifically has 6 products
    expect(productCount).toBe(6);
  });

  test('User can add multiple products to the cart and see correct badge count', async () => {
    await productsPage.addBackpackToCart();
    await productsPage.addBikeLightToCart();

    const cartBadgeCount = await productsPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(2);
  });

  test('User can remove a product from the cart from Products page', async () => {
    await productsPage.addBackpackToCart();

    let cartBadgeCount = await productsPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(1);

    await productsPage.removeBackpackFromCart();

    cartBadgeCount = await productsPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(0);
  });
});