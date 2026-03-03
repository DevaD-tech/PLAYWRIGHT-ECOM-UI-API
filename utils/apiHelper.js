import authApi from '../test-data/authApi.json';

/**
 * Helper that performs an API login and returns an auth token
 * so that other API tests can reuse the authentication logic.
 *
 * @param {import('@playwright/test').APIRequestContext} request
 * @returns {Promise<string>} JWT / auth token returned by the API
 */
export async function loginAndGetToken(request) {
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

  const responseBody = await response.json();
  return responseBody.token;
}