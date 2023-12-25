// Test script using the Page Object Model
import { test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import { decrypt, encrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile,decryptEnvFile } from "../utils/EncryptEnvFile";

test.skip("test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  // await loginPage.fillUsername("playwright.user@qa.com");
  // await loginPage.fillPassword("playwright777");
  // await loginPage.fillUsername(process.env.userid!);
  // await loginPage.fillPassword(process.env.password!);
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));

  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
});

test("Sample env test", async ({ page }) => {
  // const plaintext = 'Hello, World!';
  // const encryptedText = encrypt(plaintext);
  // console.log('SALT:', process.env.SALT);
  // console.log('Encrypted:', encryptedText);
  // const decryptedText = decrypt(encryptedText);
  // console.log('Decrypted:', decryptedText);

  decryptEnvFile();

});
