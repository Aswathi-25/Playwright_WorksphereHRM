import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import tdata from '../testdata/credentialsdata.json'



  test('Valid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(tdata.username, tdata.password);

    //Assertion
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
  });

  test('Invalid Login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(tdata.wronguser, tdata.wrongpass);

    //Assertion
    await expect(loginPage.errorMsg).toBeVisible();
  });

