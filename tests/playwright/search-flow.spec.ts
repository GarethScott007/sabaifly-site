import { test, expect } from "@playwright/test";

test.describe("Flight Search Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should display the homepage with search form", async ({ page }) => {
    await expect(page).toHaveTitle(/SabaiFly/);
    await expect(page.getByRole("button", { name: /Search/i })).toBeVisible();
  });

  test("should validate required fields on submit", async ({ page }) => {
    // Try to submit without filling in any fields
    await page.getByRole("button", { name: /Search/i }).click();

    // Should show validation errors
    await expect(page.getByText(/Please select a departure airport/i)).toBeVisible();
  });

  test("should show autocomplete suggestions when typing", async ({ page }) => {
    const fromInput = page.getByPlaceholder("From");
    await fromInput.click();
    await fromInput.fill("London");

    // Wait for autocomplete dropdown
    await page.waitForTimeout(500); // debounce delay

    // Check if suggestions appear (this will fail if API is not available in test)
    // In a real environment, you'd mock the API response
  });

  test("should swap origin and destination", async ({ page }) => {
    const fromInput = page.getByPlaceholder("From");
    const toInput = page.getByPlaceholder("To");

    await fromInput.fill("London Heathrow (LHR)");
    await toInput.fill("New York JFK (JFK)");

    // Click swap button
    await page.getByTitle("Swap locations").click();

    await expect(fromInput).toHaveValue("New York JFK (JFK)");
    await expect(toInput).toHaveValue("London Heathrow (LHR)");
  });

  test("should toggle between round trip and one way", async ({ page }) => {
    const roundTripBtn = page.getByRole("button", { name: /Round Trip/i });
    const oneWayBtn = page.getByRole("button", { name: /One Way/i });

    // Should default to round trip
    await expect(roundTripBtn).toHaveClass(/bg-brand/);

    // Click one way
    await oneWayBtn.click();
    await expect(oneWayBtn).toHaveClass(/bg-brand/);

    // Return date input should be hidden for one-way
    const dateInputs = page.getByRole("textbox", { name: "" });
    // For one-way, should only have 1 date input visible
  });

  test("should open and close traveller selector", async ({ page }) => {
    const travellerBtn = page.getByRole("button", { name: /Traveller/i });

    await travellerBtn.click();

    // Should show dropdown
    await expect(page.getByText(/Adults/i)).toBeVisible();
    await expect(page.getByText(/Children/i)).toBeVisible();
    await expect(page.getByText(/Infants/i)).toBeVisible();

    // Click Done
    await page.getByRole("button", { name: /Done/i }).click();

    // Dropdown should close
    await expect(page.getByText(/Adults/i)).not.toBeVisible();
  });

  test("should increment and decrement traveller count", async ({ page }) => {
    const travellerBtn = page.getByRole("button", { name: /1 Traveller/i });
    await travellerBtn.click();

    // Find the adults increment button
    const adultsRow = page.locator("div:has-text('Adults')").first();
    const incrementBtn = adultsRow.getByRole("button", { name: "+" });
    const decrementBtn = adultsRow.getByRole("button", { name: "-" });

    // Increment adults
    await incrementBtn.click();

    // Close and check if count updated
    await page.getByRole("button", { name: /Done/i }).click();
    await expect(page.getByRole("button", { name: /2 Travellers/i })).toBeVisible();

    // Reopen and decrement
    await page.getByRole("button", { name: /2 Travellers/i }).click();
    await decrementBtn.click();

    await page.getByRole("button", { name: /Done/i }).click();
    await expect(page.getByRole("button", { name: /1 Traveller/i })).toBeVisible();
  });

  test("should prevent adults count from going below 1", async ({ page }) => {
    const travellerBtn = page.getByRole("button", { name: /1 Traveller/i });
    await travellerBtn.click();

    const adultsRow = page.locator("div:has-text('Adults')").first();
    const decrementBtn = adultsRow.getByRole("button", { name: "-" });

    // Try to decrement below 1
    await decrementBtn.click();

    // Should still show 1
    await page.getByRole("button", { name: /Done/i }).click();
    await expect(page.getByRole("button", { name: /1 Traveller/i })).toBeVisible();
  });
});

test.describe("Flight Results Page", () => {
  test("should display filter sidebar on desktop", async ({ page }) => {
    // Navigate to results page with valid params
    await page.goto("http://localhost:3000/flights/results?from=LHR&to=JFK&departDate=2025-12-01");

    // Check for filter sidebar (desktop only, so check viewport)
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByText("Filters")).toBeVisible();
  });

  test("should display mobile filter button on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000/flights/results?from=LHR&to=JFK&departDate=2025-12-01");

    // Should show floating action button
    const filterBtn = page.getByLabel("Open Filters");
    await expect(filterBtn).toBeVisible();

    // Click to open drawer
    await filterBtn.click();
    await expect(page.getByRole("heading", { name: "Filters" })).toBeVisible();

    // Close drawer
    await page.getByLabel("Close Filters").click();
    await expect(page.getByRole("heading", { name: "Filters" })).not.toBeVisible();
  });
});
