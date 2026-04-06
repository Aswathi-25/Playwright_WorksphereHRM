import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import { LeaveManagement } from '../pom/LeaveManagement';

test('Negative - Apply Leave without dates', async ({ page }) => {

  const login = new LoginPage(page);
  const leave = new LeaveManagement(page);

  // Login
  await login.navigate();
  await login.login('Admin', 'admin123');

  // Navigate
  await leave.goToLeave();
  await leave.openApplyTab();

  // Select leave type only
  await leave.leaveType.click();
  await leave.leaveOption.click();

  // Do NOT enter dates
  await leave.applyBtn.click();

  // Assertion
  const error = page.locator('.oxd-input-field-error-message').first();
  await expect(error).toBeVisible();
});