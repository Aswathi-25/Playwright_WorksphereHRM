import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import { EmployeeSearchPage } from '../pom/EmployeeSearchPage';
import { LogoutPage } from '../pom/LogoutPage';
import tdata from '../testdata/credentialsdata.json'

test('E2E - Search Employee and Verify', async ({ page }) => {

  const login = new LoginPage(page);
  const search = new EmployeeSearchPage(page);
  const logout = new LogoutPage(page);

  // Step 1: Login
  await login.navigate();
  await login.login(tdata.username, tdata.password);

  // Step 2: Go to PIM
  await search.goToPIM();

  // Step 3: Search Employee
  await search.searchEmployee(tdata.empName); // existing demo user

  // Step 4: Verify Results
  await search.verifyResults();

  // Assertion 
  const resultsCount = await search.resultTable.count();

  if (resultsCount > 0) {
    console.log('Employee found');
    await expect(search.resultTable.first()).toBeVisible();
  } else {
    console.log('No employee found');
    await expect(search.noRecords).toBeVisible();
  }

  // Step 5: Logout
  await logout.openProfileMenu();
  await logout.clickLogout();
  await logout.verifyLogout();
});