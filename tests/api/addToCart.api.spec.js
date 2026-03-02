import { test, expect } from '@playwright/test';
import { loginAndGetToken } from '../../utils/apiHelper';

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
          _id: '678a877ae2b5443b1f2839c0',
          product: {
            _id: '678a8f2ce2b5443b1f2844d5',
            productName: 'qwerty',
            productCategory: 'fashion',
            productSubCategory: 'shirts',
            productPrice: 11500,
            productDescription: 'Addias Originals chappals',
            productImage:
              'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1737133868024.png',
            productRating: '0',
            productTotalOrders: '0',
            productStatus: true,
            productFor: 'men',
            productAddedBy: '678a877ae2b5443b1f2839c0',
            __v: 0,
          },
        },
      },
    );

    // ---------- STEP 3: Assertions ----------
    expect(addToCartResponse.status()).toBe(200);

    const responseBody = await addToCartResponse.json();
    expect(responseBody.message).toContain('Product Added To Cart');
  });
});