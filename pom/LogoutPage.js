export class LogoutPage {

  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page;

    // Profile dropdown (top right)
    this.profileIcon = page.locator('.oxd-userdropdown-tab');

    // Logout option
    this.logoutBtn = page.getByRole('menuitem', { name: 'Logout' });

    // Login page element (for verification)
    this.loginUsername = page.locator('input[name="username"]');
  }

  // Click profile icon
  async openProfileMenu() {
    await this.profileIcon.click();
  }

  // Click logout
  async clickLogout() {
    await this.logoutBtn.click();
  }

  // Verify logout success (redirect to login page)
  async verifyLogout() {
    await this.loginUsername.waitFor({ state: 'visible' });
  }
}