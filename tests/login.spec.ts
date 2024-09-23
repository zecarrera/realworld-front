import { test, expect } from '@playwright/test';
const URL = "http://localhost:3000/";


test.describe('Given conduit login page is loaded', ()=> {
  test.beforeEach(async ({ page }) =>{
    await page.goto(`${URL}login`);
  })

  test('When entering valid credentials', async ({ page }) => {
    const email = 'jose.carrera@conduit.com';
    const password = "123456"

    await page.getByTestId('email-input').fill(email);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('signin-btn').click({force:true});

    await expect(page.locator('a[href="/profile/jose.carrera"]')).toBeVisible();
  });

  test.describe('When entering invalid credentials', () =>{
    test('Then login is not successful', async ({ page }) => {
      const email = 'invalid@conduit.com';
      const password = "123456"

      await page.getByTestId('email-input').fill(email);
      await page.getByTestId('password-input').fill(password);
      await page.getByTestId('signin-btn').click({force:true});

      await expect(page.getByTestId('error-msg')).toContainText('Internal server error');
    });
  });
});
