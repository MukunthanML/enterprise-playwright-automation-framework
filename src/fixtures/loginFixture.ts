import { test as base, expect as defaultExpect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { decrypt } from "../utils/CryptojsUtil";

type UIPages = {
  homePage: HomePage;
};

export const expect = defaultExpect;
// Define a custom fixture with page
export const test = base.extend<UIPages>({
  homePage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await use(homePage);
  },
});
