import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://login.salesforce.com/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('playwright.user@qa.com');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Password').click({
    modifiers: ['Control']
  });
  await page.getByLabel('Password').fill('myplaywright909');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.goto('https://mukunthanr2-dev-ed.lightning.force.com/lightning/page/home');
  await expect(page.getByRole('link', { name: 'Contacts' })).toBeVisible();
  await page.getByRole('link', { name: 'Contacts' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('Salutation, --None--').click();
  await page.getByRole('option', { name: 'Mr.' }).locator('span').nth(1).click();
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Ram');
  await page.getByPlaceholder('First Name').press('Tab');
  await page.getByPlaceholder('Last Name').fill('Kumar');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.locator('sfa-output-name-with-hierarchy-icon-wrapper')).toContainText('Mr. Ram Kumar');
  await page.getByRole('link', { name: 'Contacts' }).click();
});