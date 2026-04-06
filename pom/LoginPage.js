export class LoginPage {

    
/**
   * @param {import('playwright').Page} page
   */


  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.loginBtn = page.getByRole('button',{type:'submit'});

    this.errorMsg = page.locator('.oxd-alert-content-text');
  }

  async navigate() {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    
    await this.page.waitForLoadState("domcontentloaded")

await this.page.getByPlaceholder('Username').waitFor({ state: 'visible' });
await this.page.locator('input[name="username"]').waitFor();
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}