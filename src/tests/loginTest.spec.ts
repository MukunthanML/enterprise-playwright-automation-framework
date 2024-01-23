import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { decrypt, encrypt } from "../utils/CryptojsUtil";
import logger from "../utils/LoggerUtil";
import { encryptEnvFile } from "../utils/EncryptEnvFile";

test("simple login test", async ({ page }) => {
  const loginPage= new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername("playwright.user@qa.com");
  await loginPage.fillPassword("myplaywright909");
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
  logger.info("Test for login is completed")
});



test.skip("Sample env test", async ({ }) => {
  // const plaintext = 'Hello, Mars!';
 // const encryptedText = encrypt("myplaywright909");
  //console.log('SALT:', process.env.SALT);
  // console.log('Encrypted:', encryptedText);
  // const decryptedText = decrypt(encryptedText);
  // console.log('Decrypted:', decryptedText);
  encryptEnvFile();
// console.log(decrypt("U2FsdGVkX197mBdFhci0yNUxOudsGfcL4w5q9pV2n18JctWJ3ya5USIkbuPXjyd8"));

});
