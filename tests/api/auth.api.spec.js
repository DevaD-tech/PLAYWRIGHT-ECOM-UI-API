import { test, expect } from '@playwright/test';
import authApi from '../../test-data/authApi.json';

// Basic authentication smoke test for the e-commerce API
test.describe('API - Authentication Tests', () => {
  test('@smoke User should be able to login via API', async ({ request }) => {
    const response = await request.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          userEmail: authApi.validUser.userEmail,
          userPassword: authApi.validUser.userPassword,
        },
      },
    );

    // Assertion 1: request succeeds
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Assertion 2: token is returned for subsequent calls
    expect(responseBody.token).toBeTruthy();

    // Assertion 3: response message indicates success
    expect(responseBody.message).toBe('Login Successfully');
  });
});