import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("Verify Logo Placement and Size", async ({ page }) => {
  await page.goto("/");
  const logo = await page.getByAltText('Salesforce');
  const boundingBox = await logo?.boundingBox();
  if (boundingBox) {
    expect(boundingBox.width).toBe(160.890625);
    expect(boundingBox.height).toBe(112.984375);
    
  }
});

test("Confirm logo Color", async ({ page }) => {
    await page.goto("/");
    const logo = await page.getByAltText('Salesforce');

  // Get the computed style of the button
  const logoStyle = await logo.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return {
      color: style.color,
      // Add other styles you want to validate here
    };
  });
  // Assert the background color of the button
  expect(logoStyle.color).toBe("rgb(22, 50, 92)"); 
  // Replace with your expected background color
});


test('Screenshot compare test', async ({ page}) => {
  await page.goto('/');
  const loginPage = new LoginPage(page);
  await loginPage.fillUsername("demo");
  await expect(page).toHaveScreenshot();
});
