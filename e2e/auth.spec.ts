import { expect, test } from "@playwright/test";

test("redirects unauthenticated users to the login page", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login/);
});

test("shows validation errors on invalid credentials", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("invalid@example.com");
  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page.getByText(/invalid/i)).toBeVisible();
});
