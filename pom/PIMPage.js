export class PIMPage {

  constructor(page) {
    this.page = page;

    // Navigation
    this.pimMenu = page.getByRole('link', { name: 'PIM' });

    // Add Employee
    this.addBtn = page.locator("//button[text()=' Add ']");
    this.firstName = page.locator("[name='firstName']");
    this.lastName = page.getByPlaceholder('Last Name');

  
    this.saveBtn = page.getByRole('button', { name: 'Save' });

    // Validation
    this.successMsg = page.locator('.oxd-toast-content-text');
  }

  async goToPIM() {
    await this.pimMenu.click();

     await this.page.waitForLoadState('networkidle');
  }

  async clickAddEmployee() {
   await this.addBtn.waitFor({ state: 'visible' });
  await this.addBtn.click();
  }

   async openAddEmployee() {

     await this.page.waitForLoadState('networkidle');
     
    await this.addBtn.click();
  }


  async addEmployee(fname, lname) {
    await this.firstName.fill(fname);
    await this.lastName.fill(lname);
      //WAIT FOR LOADER TO DISAPPEAR
     this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden' });
    await this.saveBtn.click();
  }


// async searchEmployee(name) {
//   await this.empNameSearch.fill(name);
//   await this.searchBtn.click();
// }


async getResultText() {
  return await this.resultTable.textContent();
}

async editEmployee() {
  // add later
}

async deleteEmployee() {
  // add later
}







}