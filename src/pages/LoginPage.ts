import { Page } from "@playwright/test";
import HomePage from "./homePage";
import logger from "../utils/LoggerUtil";

export default class LoginPage {
  private readonly usernameInputSelector = "#username";
  private readonly passwordInputSelector = "#password";
  private readonly loginButtonSelector = "#Login";


  constructor(private page: Page) {
    
  }

  async navigateToLoginPage() {
    await this.page.goto("https://login.salesforce.com");
    logger.info('Navigated to login.salesforce.com')
  }

  async fillUsername(username: string) {
    await this.page.locator(this.usernameInputSelector).fill(username);
    logger.info("Filled username");
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
      }).then(()=>logger.info("Clicked login button"));


      const homePage = new HomePage(this.page);
      return homePage;
  }
}
