// Test script using the Page Object Model
import { test } from "@playwright/test";
import LoginPage from "../pages/loginPage";

test("test", async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername("playwright.user@qa.com");
  await loginPage.fillPassword("playwright007");
  
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
});
