import { test } from "@playwright/test";
import { decrypt } from "../utils/CryptojsUtil";
import logger from "../utils/LoggerUtil";
import cdata from "../testdata/datademo.json";
import { convertCsvFileToJsonFile } from "../utils/CsvtoJsonUtil";
import { exportToCsv, exportToJson, generateTestData } from "../utils/FakerDataUtil";
import { demoOutput } from "../utils/fakersample";
import LoginPage from "../pages/LoginPage";

for (const contact of cdata) {
  test.skip(`Advance DD test for ${contact.firstName} `, async ({ page }) => {
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
  const fname = "Shiva";
  const lname = "Rudra";
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
  convertCsvFileToJsonFile("data.csv", "datademo.json");
});


test.skip("demo faker", async () => { 

  console.log(demoOutput)

 });

test.skip("Faker", async ({ page }) => { 

  // Generate test data
const testData = generateTestData(20);

// Export data to JSON file
exportToJson(testData, 'testData_en.json');

// Export data to CSV file
exportToCsv(testData, 'testData_en.csv');

 });
