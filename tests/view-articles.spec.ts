import { test, expect } from '@playwright/test';
const URL = "http://localhost:3000/";


test.describe('Given conduit home page is loaded', ()=> {
  test.beforeEach(async ({ page }) =>{
    await page.goto(URL);
  })

  test('Then Global feed displays 2 articles', async ({ page }) => {
    await expect(page.getByTestId('article-title')).toHaveCount(2);
  });

  test.describe('When clicking the first article', () => {
    test('Then article page loads', async ({ page }) => {
      await page.getByTestId('article-title').nth(1).click();
    
      await expect(page.getByTestId('article-view-slug')).toBeVisible();

      await expect(page.getByTestId('article-description-view')).toBeVisible();
    });
  });
});
