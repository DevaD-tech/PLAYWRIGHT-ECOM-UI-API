// Page object representing the Sauce Demo inventory (products) page
export class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page Playwright page instance
   */
  constructor(page) {
    this.page = page;

    // Core UI locators
    this.pageTitle = '.title';
    this.addToCartBackpackBtn = '#add-to-cart-sauce-labs-backpack';
    this.addToCartBikeLightBtn = '#add-to-cart-sauce-labs-bike-light';
    this.removeBackpackBtn = '#remove-sauce-labs-backpack';
    this.cartIcon = '.shopping_cart_link';
    this.cartBadge = '.shopping_cart_badge';

    // Product list locators
    this.productTitle = '.inventory_item_name';
    this.productPrice = '.inventory_item_price';
    this.sortDropdown = '[data-test="product_sort_container"]';
    this.addToCartButtons = 'button.btn_inventory';
  }

  /**
   * Get the visible page title text at the top of the inventory page
   */
  async getPageTitle() {
    return await this.page.textContent(this.pageTitle);
  }

  /**
   * Add the Sauce Labs Backpack item to the cart
   */
  async addBackpackToCart() {
    await this.page.click(this.addToCartBackpackBtn);
  }

  /**
   * Add the Sauce Labs Bike Light item to the cart
   */
  async addBikeLightToCart() {
    await this.page.click(this.addToCartBikeLightBtn);
  }

  /**
   * Click every "Add to cart" button for all listed items
   */
  async addAllProductsToCart() {
    const buttons = this.page.locator(this.addToCartButtons);
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
    }
  }

  /**
   * Remove the Sauce Labs Backpack item from the cart (from inventory page)
   */
  async removeBackpackFromCart() {
    await this.page.click(this.removeBackpackBtn);
  }

  /**
   * Get the numeric value from the cart badge (returns 0 when hidden)
   */
  async getCartBadgeCount() {
    const badge = this.page.locator(this.cartBadge);

    if (!(await badge.isVisible().catch(() => false))) {
      return 0;
    }

    const text = await badge.textContent();
    return text ? Number(text) : 0;
  }

  /**
   * Return how many products are currently rendered in the list
   */
  async getProductCount() {
    return await this.page.locator(this.productTitle).count();
  }

  /**
   * Change the product sorting using the dropdown
   * @param {'az' | 'za' | 'lohi' | 'hilo'} option
   */
  async sortBy(option) {
    await this.page.selectOption(this.sortDropdown, option);
  }

  /**
   * Get all product prices as numbers
   * e.g. ['$29.99', '$9.99'] becomes [29.99, 9.99]
   */
  async getProductPrices() {
    const pricesText = await this.page
      .locator(this.productPrice)
      .allInnerTexts();

    return pricesText.map((price) => Number(price.replace('$', '')));
  }

  /**
   * Navigate from the inventory page into the cart
   */
  async goToCart() {
    await this.page.click(this.cartIcon);
  }
}