import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import { PIMPage } from '../pom/PIMPage';
import { LogoutPage } from '../pom/LogoutPage';
import tdata from '../testdata/credentialsdata.json'

test('Add Employee - WorkSphere HRM', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const pimPage = new PIMPage(page);
   const logout = new LogoutPage(page);

  // Login
  await loginPage.navigate();
  await loginPage.login(tdata.username, tdata.password);

  // Navigate to PIM
  await pimPage.goToPIM();

  // Add Employee
  await pimPage.clickAddEmployee();
  await pimPage.addEmployee(tdata.fname, tdata.lname);

  // Assertion
  await expect(page.getByText('Successfully Saved')).toBeVisible();


  //Logout
  await logout.openProfileMenu();
  await logout.clickLogout();
  await logout.verifyLogout();
});