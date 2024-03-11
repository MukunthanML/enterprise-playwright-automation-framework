import { Page, expect } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtil";
import findValidElement from "../utils/SelfHealingUtill";

export default class LoginPage {
  private readonly usernameInputSelector = "#username";
  private readonly usernameInputSelectors = ["#username",'input[name="username"]', ".username", "//*[@id='username]"];
  private readonly passwordInputSelector = "#password";
  private readonly loginButtonSelector = "#Login";

  constructor(private page: Page) {}

  async quickLogin(username: string, password: string) {
    await this.navigateToLoginPage();
    await this.fillUsername(username);
    await this.fillPassword(password);
    return await this.clickLoginButton();
  }

  async navigateToLoginPage() {
    await this.page.goto("https://login.salesforce.com");
    logger.info("Navigated to login.salesforce.com");
  }

  async fillUsername(username: string) {
    await this.page.locator(this.usernameInputSelector).fill(username);
    logger.info("Filled username");
  }

  async fillUsername_selfheal(username: string) {
    let usernameInputLocator = await findValidElement(this.page,this.usernameInputSelectors );
    await usernameInputLocator?.fill(username);
    const enteredValue = await usernameInputLocator?.inputValue();
    expect(enteredValue).toBe(username);
   
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInputSelector).fill(password);
    logger.info("Filled pasword");
  }

  async clickLoginButton() {
    await this.page
      .locator(this.loginButtonSelector)
      .click()
      .catch((error) => {
        logger.error(`Error clicking login button: ${error}`);
        throw error; // rethrow the error if needed
      })
      .then(() => logger.info("Clicked login button"));

    const homePage = new HomePage(this.page);
    return homePage;
  }
}
