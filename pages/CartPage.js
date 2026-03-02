export class CartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
  
      // Locators
      this.cartItem = '.cart_item';
      this.cartItemName = '.inventory_item_name';
      this.checkoutButton = '#checkout';
      this.cartItems = '.cart_item';
      this.removeBackpackButton = '#remove-sauce-labs-backpack';
      this.continueShoppingButton = '#continue-shopping';
    }
  
    /**
     * Check if any item is present in cart
     */
    async isItemPresentInCart() {
      return await this.page.isVisible(this.cartItem);
    }
  
    /**
     * Get cart item name
     */
    async getCartItemName() {
      return await this.page.textContent(this.cartItemName);
    }

    /**
     * Get number of items present in the cart
     */
    async getItemCount() {
      return await this.page.locator(this.cartItems).count();
    }

    /**
     * Remove Sauce Labs Backpack from cart
     */
    async removeBackpackFromCart() {
      await this.page.click(this.removeBackpackButton);
    }

    /**
     * Click on Continue Shopping button
     */
    async continueShopping() {
      await this.page.click(this.continueShoppingButton);
    }
  
    /**
     * Proceed to checkout
     */
    async proceedToCheckout() {
      await this.page.click(this.checkoutButton);
    }
  }