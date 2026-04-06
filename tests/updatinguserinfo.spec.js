import { test, expect } from '@playwright/test'
import { LoginPage } from '../pom/LoginPage'
import { MyInfoPage } from '../pom/MyInfoPage'
import { LogoutPage } from '../pom/LogoutPage'
import tdata from '../testdata/credentialsdata.json';

test('Updating user profile', async ({ page }) => {

    const login = new LoginPage(page)
    const myInfo = new MyInfoPage(page) 
    const logout = new LogoutPage(page)

    // Login
    await login.navigate();
    await login.login(tdata.username, tdata.password);

    // Update profile name
    await myInfo.updateName('Anuvarshini');

    // Assertion 
    //await expect(myInfo.firstName).toHaveValue('Anuvarshini');

    // Logout
    await logout.openProfileMenu();
    await logout.clickLogout();
    await logout.verifyLogout();
});