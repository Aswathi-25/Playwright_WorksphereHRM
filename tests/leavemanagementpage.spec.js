import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import { LeaveManagement } from '../pom/LeaveManagement';
import { LogoutPage } from '../pom/LogoutPage';

test('E2E - Apply, Verify, and Cancel Leave', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const leave = new LeaveManagement(page);
  const logout = new LogoutPage(page);

  // Step 1: Login
  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');

  // Step 2: Navigate to Leave → Apply
  await leave.goToLeave();
  await leave.openApplyTab();

  // Step 3: Apply Leave
  await leave.applyLeave('2025-04-01', '2025-04-01');

  // Toast Validation
  const toastContainer = page.locator('.oxd-toast');
  await toastContainer.waitFor({ state: 'visible', timeout: 10000 });

  const msg = await page.locator('.oxd-toast-content-text').last().textContent();
  console.log('Toast message:', msg);

  if (!msg.includes('Success')) {
    throw new Error(' Leave NOT applied: ' + msg);
  }

  // Step 4: Navigate to Leave List
  await leave.openLeaveList();

  // Step 5: Search Leave
  await leave.searchLeave();

  // Step 6: Cancel Leave
  await leave.cancelLeave();

  // Step 7: Verify Status
  await leave.verifyCancelled();
  await expect(leave.cancelledStatus).toBeVisible();

  // Step 8: Logout
  await logout.openProfileMenu();
  await logout.clickLogout();
  await logout.verifyLogout();
});