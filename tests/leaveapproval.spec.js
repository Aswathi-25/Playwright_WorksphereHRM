import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import { PIMPage } from '../pom/PIMPage';
import { LeaveManagement } from '../pom/LeaveManagement';
import { LeaveApprovalPage } from '../pom/LeaveapprovalPage';
import { LogoutPage } from '../pom/LogoutPage';
import tdata from '../testdata/credentialsdata.json'

test('E2E - Apply and Approve Leave', async ({ page }) => {

  const login = new LoginPage(page);
  const pim = new PIMPage(page);
  const leave = new LeaveManagement(page);
  const approve = new LeaveApprovalPage(page);
  const logout = new LogoutPage(page);

//   const fname = 'Alex';
//   const lname = 'QA';
//   const empName = fname + ' ' + lname;

//   const today = new Date().toISOString().split('T')[0];

  // Step 1: Login
  await login.navigate();
  await login.login(tdata.username, tdata.password);

  // Step 2: Add Employee
  await pim.goToPIM();
  await pim.openAddEmployee();
  await pim.addEmployee(tdata.fname, tdata.lname);

  //  Wait for page to load
await page.waitForLoadState('networkidle');

//assertion
await expect(page.locator("//input[@name='firstName']")).toBeVisible();



  // Step 3: Apply Leave
  await leave.goToLeave();
  await leave.openApplyTab();
  await leave.applyLeave(tdata.from, tdata.to);

  // Add assertion
  //await expect(page.locator("//p[contains(text(),'Successfully')]")).toBeVisible();

  console.log('Leave applied');

  // Step 4: Approve Leave
  await approve.goToLeaveList();
  await approve.searchLeave(empName);
  await approve.approveLeave();

  // Step 5: Verify Approved
  await approve.verifyApproved();

  // Step 6: Logout
  await logout.openProfileMenu();
  await logout.clickLogout();
  await logout.verifyLogout();
});