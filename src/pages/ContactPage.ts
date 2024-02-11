import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class ContactPage {
  private readonly contactsLink = "Contacts";
  private readonly newButtonLocator = "New";
  private readonly firstNameTextFieldLocator = "First Name";
  private readonly lastNameTextFieldLocator = "Last Name";
  private readonly saveButtonLocator = "Save";
  private readonly searchBoxLocator = "Search this list...";
  private readonly contactFullNameLabelLocator = "sfa-output-name-with-hierarchy-icon-wrapper";
  private readonly contactDisplayNameLocator = "#brandBand_2";
 

  constructor(private page: Page) {}

  async createNewContact(fname: string, lname:string) {
    await this.page.getByRole('link', { name: this.contactsLink }).click();
    await this.page.getByRole('button', { name: this.newButtonLocator }).click();
    logger.info("New button is clicked");
    await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
    await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(fname);
    logger.info(`First name is filled as ${fname}`)
    await this.page.getByPlaceholder(this.firstNameTextFieldLocator).press('Tab');
    await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(lname);
    logger.info(`Last name is filled as ${lname}`)
    await this.page.getByRole('button', { name: this.saveButtonLocator, exact: true }).click().catch((error) => {
      logger.error(`Error clicking Save button: ${error}`);
      throw error; // rethrow the error if needed
    }).then(()=>logger.info("Save Button is clicked"));
    
    
}

async expectContactLabelContainsFirstNameAndLastName(fname: string, lname:string) {
  await expect(this.page.locator(this.contactFullNameLabelLocator)).toContainText(`${fname} ${lname}` );
    logger.info(`New contact created and ${fname} ${lname} is visible`)
    await this.page.getByRole('link', { name: this.contactsLink }).click();

}

async findExistingContactByLastName(lname:string) {

  await this.page.getByRole("link", { name: this.contactsLink }).click();
  await this.page.getByPlaceholder(this.searchBoxLocator).click();
  await this.page.getByPlaceholder(this.searchBoxLocator).fill(lname);
  await this.page.getByPlaceholder(this.searchBoxLocator).press("Enter");
  await this.page.getByRole("link", { name: lname }).click(); 
}
}
