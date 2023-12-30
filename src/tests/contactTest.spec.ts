import { test } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import { decrypt } from "../utils/CryptojsUtil";
import logger from "../utils/LoggerUtil";
import cdata from "../testdata/dataop.json";
import { convertCsvFileToJsonFile } from "../utils/CSVtoJSONUtil";

for (const contact of cdata) {
  test(`Advance DD test for ${contact.firstName} `, async ({ page }) => {
    logger.info("Test for Contact Creation is started...");
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
    const contactsPage = await homePage.navigateToContactTab();
    await contactsPage.createNewContact(contact.firstName, contact.lastName);
    await contactsPage.expectContactLabelContainsFirstNameAndLastName(
      contact.firstName,
      contact.lastName
    );
    logger.info("Test for Contact Creation is completed");
  });
}

test.skip("simple DD test", async ({ page }) => {
  logger.info("Test for Contact Creation is started...");
  const fname = "Abirami";
  const lname = "M";
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
  const contactsPage = await homePage.navigateToContactTab();
  await contactsPage.createNewContact(fname, lname);
  await contactsPage.expectContactLabelContainsFirstNameAndLastName(
    fname,
    lname
  );
  logger.info("Test for Contact Creation is completed");
});

test.skip("csv to json", async () => {
  convertCsvFileToJsonFile("data.csv", "dataop.json");
});
