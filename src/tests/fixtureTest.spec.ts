import { test } from "../fixtures/loginFixture";

test("Fixture test", async ({ homePage }) => {
  await homePage.expectServiceTitleToBeVisible();
});