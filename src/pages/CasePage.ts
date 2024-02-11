import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class CasePage {
  private readonly caseLink = "Cases";
  private readonly newButtonLocator = "New";
  private readonly caseOriginDropdownLocator = "Case Origin - Current";
  private readonly caseProductDropdownLocator = "Product - Current Selection";
  private readonly caseTypeDropdownLocator = "Type - Current Selection: --";
  private readonly saveButtonLocator = "Save";
  private readonly contactFullNameLabelLocator = "sfa-output-name-with-hierarchy-icon-wrapper";
 

  constructor(private page: Page) {}

  async createNewCaseFromContactDetailPage(caseOrigin: string, productName:string,caseType:string) {

    //test should be in Contact Detail page
    await this.page.getByLabel(this.caseLink).getByRole("button", { name: this.newButtonLocator }).click();
    await this.page.getByLabel(this.caseOriginDropdownLocator).click();
    await this.page
      .getByRole("option", { name: caseOrigin })
      .locator("span")
      .nth(1)
      .click();
    await this.page.getByLabel(this.caseProductDropdownLocator).click();
    await this.page
      .getByRole("option", { name: productName })
      .locator("span")
      .nth(1)
      .click();
    await this.page.getByLabel(this.caseTypeDropdownLocator).click();
    await this.page
      .getByRole("option", { name: caseType })
      .locator("span")
      .nth(1)
      .click();
    await this.page.getByRole("button", { name: this.saveButtonLocator, exact: true }).click();
    
    
}


}
