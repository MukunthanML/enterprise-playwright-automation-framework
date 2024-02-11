import { test, Page } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import { decrypt } from "../utils/CryptojsUtil";
import ContactPage from "../pages/ContactPage";
import testdata from "../testdata/contactCaseFlow.json";
import CasePage from "../pages/CasePage";

test.describe.configure({ mode: "serial" });

let page: Page;

// Define a beforeAll hook to set up the browser context

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  const loginPage = new LoginPage(page);
  const homePage = await loginPage.quickLogin(decrypt(process.env.userid!),decrypt(process.env.password!));
  await homePage.expectServiceTitleToBeVisible();
  logger.info("login is completed");
});

test("Create Contact and Open", async () => {
  const contactpage = new ContactPage(page);
  await contactpage.createNewContact(testdata.contactFName,testdata.contactLName);
  await contactpage.expectContactLabelContainsFirstNameAndLastName(testdata.contactFName,testdata.contactLName);
  await contactpage.findExistingContactByLastName(testdata.contactLName);
});

test("Create Case Test", async () => {
  const casePage = new CasePage(page);
  await casePage.createNewCaseFromContactDetailPage(testdata.caseOrigin,testdata.caseProduct,testdata.caseType);
});

test.afterAll(async () => {
  await page.close();
});



//https://playwright.dev/docs/test-retries#reuse-single-page-between-tests
