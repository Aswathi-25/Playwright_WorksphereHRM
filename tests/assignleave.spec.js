import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import { AssignLeavePage } from '../pom/AssignLeavePage';
import { LogoutPage } from '../pom/LogoutPage';
import tdata from '../testdata/credentialsdata.json'

test('E2E - Assign Leave to Employee', async ({ page }) => {

  const login = new LoginPage(page);
  const assign = new AssignLeavePage(page);
  const logout = new LogoutPage(page);

  // Step 1: Login as Admin
  await login.navigate();
  await login.login(tdata.username, tdata.password);

  // Step 2: Go to Assign Leave
  await assign.goToAssignLeave();

  // Step 3: Assign Leave
  await assign.assignLeave(tdata.empName, tdata.from, tdata.to);

  // Step 4: Validate 
  let msg = '';

  const toast = page.locator('.oxd-toast-content-text').last();

  if (await toast.isVisible({ timeout: 5000 }).catch(() => false)) {
    msg = await toast.textContent();
    console.log('Toast:', msg);
  } else {
    console.log('No toast appeared');
  }

  if (msg && !msg.includes('Success')) {
    throw new Error('Leave assignment failed: ' + msg);
  }

  // Step 5: Logout
  await logout.openProfileMenu();
  await logout.clickLogout();
  await logout.verifyLogout();
});