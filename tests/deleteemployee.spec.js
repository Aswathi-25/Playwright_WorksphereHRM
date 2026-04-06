import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import { PIMPage } from '../pom/PIMPage';
import { DeleteEmployeePage } from '../pom/DeleteEmployeePage';

test('E2E - Add and Delete Employee', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const pim = new PIMPage(page);
  const del = new DeleteEmployeePage(page);

  const fname = 'Michael';
  const lname = 'James';

  // Step 1: Login
  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');

  // Step 2: Add Employee
  await pim.goToPIM();
  await pim.openAddEmployee();
  await pim.addEmployee(fname, lname);

  // Step 3: Search Employee
  await del.goToPIM();
  await page.waitForTimeout(2000);

  await del.searchEmployee(fname);

  // Step 4: Delete Employee
  await del.deleteEmployee();

  // Step 5: Verify Deletion
  await del.searchEmployee(fname);
  await del.verifyDeleted();

});