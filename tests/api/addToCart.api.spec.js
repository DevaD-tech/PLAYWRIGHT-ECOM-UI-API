import { test, expect } from '@playwright/test';
import { loginAndGetToken } from '../../utils/apiHelper';
import addToCartApi from '../../test-data/addToCartApi.json';

// End-to-end API test for adding a product to the cart using an auth token
test.describe('API - Add To Cart Tests', () => {
  test('User should be able to add product to cart using auth token', async ({ request }) => {
    // ---------- STEP 1: Get Auth Token ----------
    const token = await loginAndGetToken(request);
    expect(token).toBeTruthy();

    // ---------- STEP 2: Add Product To Cart ----------
    const addToCartResponse = await request.post(
      'https://rahulshettyacademy.com/api/ecom/user/add-to-cart',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {
          _id: addToCartApi.cart.userId,
          product: addToCartApi.cart.product,
        },
      },
    );

    // ---------- STEP 3: Assertions ----------
    expect(addToCartResponse.status()).toBe(200);

    const responseBody = await addToCartResponse.json();
    expect(responseBody.message).toContain('Product Added To Cart');
  });
});