// Test script using the Page Object Model
import { test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import { stringify } from "querystring";

test("test", async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateToLoginPage();
  // await loginPage.fillUsername("playwright.user@qa.com");
  // await loginPage.fillPassword("playwright777");
  await loginPage.fillUsername(process.env.userid!);
  await loginPage.fillPassword(process.env.password!);
  
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
});

test("Sample env test", async ({ page }) => { 


console.log(process.env.NODE_ENV);
console.log(process.env.userid);
console.log(process.env.password);

  

 });
