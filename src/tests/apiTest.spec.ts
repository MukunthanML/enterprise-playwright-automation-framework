import { test, expect } from "@playwright/test";

test("API test with existing context", async ({ page }) => {
  const context = page.request;

  const response = await (await context.get("/api/users?page=2")).json();
  console.log(response);
  expect(response).toHaveProperty("page");
  expect(response).toHaveProperty("per_page");
 
  // Assert data type and value for each property
  expect(typeof response.page).toBe("number");
  expect(response.page).toEqual(2);

  expect(typeof response.per_page).toBe("number");
  expect(response.per_page).toEqual(6);

  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toEqual(6);

  expect(typeof response.support).toBe("object");
  expect(typeof response.support.url).toBe("string");
  expect(typeof response.support.text).toBe("string");

  // Assert properties of each object in the "data" array
  for (const item of response.data) {
    expect(typeof item.id).toBe("number");
    expect(typeof item.email).toBe("string");
    expect(typeof item.first_name).toBe("string");
    expect(typeof item.last_name).toBe("string");
    expect(typeof item.avatar).toBe("string");
  }
});

test("API test with new context", async ({ playwright }) => {
  const apirequest = playwright.request;

  const newcontext = await apirequest.newContext({
    baseURL: "https://cat-fact.herokuapp.com",
  });

  
  const apiResponse = await newcontext.get("/facts/");
  const apiResponseJson = await apiResponse.json();
  for (const obj of apiResponseJson) {
    // Assert properties of each object
    expect(obj).toHaveProperty("status44");
    expect(obj).toHaveProperty("_id");
  
    // Specific assertions for nested properties
    expect(obj.status).toHaveProperty("verified");
    expect(obj.status).toHaveProperty("sentCount");

    // Example assertions for specific values
    expect(obj.status.verified).toBe(true);
    expect(obj._id).toMatch(/^\w{24}$/); // Matches ObjectId format
    expect(obj.user).toMatch(/^\w{24}$/); // Matches ObjectId format
    expect(obj.text).toContain("cat");
    expect(obj.source).toBe("user");
    expect(obj.deleted).toBe(false);
  }
});


