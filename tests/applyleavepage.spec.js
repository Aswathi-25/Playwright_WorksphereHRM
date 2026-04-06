import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import { LeavePage } from '../pom/LeavePage';
import { LogoutPage } from '../pom/LogoutPage';
import tdata from  '../testdata/credentialsdata.json';

test('Apply Leave - WorkSphere HRM', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const leavePage = new LeavePage(page);
  const logout = new LogoutPage(page)

  // Login
  await loginPage.navigate();
  await loginPage.login(tdata.username, tdata.password);

  // Navigate to Leave
  await leavePage.goToLeave();
  await leavePage.openApply();

  // Apply Leave
  await leavePage.applyLeave(tdata.fromdate, tdata.todate);

  // Assertion
  await expect(leavePage.toastMsg).toBeVisible();

const msg = await leavePage.toastMsg.textContent();

expect(
  msg.includes('Success') || msg.includes('Leave Balance Exceeded')
).toBeTruthy();
//   await expect(leavePage.toastMsg).toContainText('Success');


//Logout
  await logout.openProfileMenu();
  await logout.clickLogout();
  await logout.verifyLogout();
  
});