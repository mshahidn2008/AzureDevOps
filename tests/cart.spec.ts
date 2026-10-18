import { test, expect } from '@playwright/test';

test('add backpack to cart, remove it, and log out', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
  const cartList = page.locator('[data-test="cart-list"]');
  await expect(cartList.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(cartList.locator('[data-test="inventory-item"]')).toHaveCount(0);

  await page.locator('[data-test="continue-shopping"]').click();
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');

  await page.getByRole('button', { name: 'Open Menu' }).click();
  const logout = page.locator('[data-test="logout-sidebar-link"]');
  await expect(logout).toBeVisible();
  await logout.click();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
