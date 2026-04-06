export class DeleteEmployeePage {

  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page;

    // Navigation
    this.pimMenu = page.getByRole('link', { name: 'PIM' });

    // Search
    
    this.empNameInput = page.locator("//label[text()='Employee Name']/following::input[1]");
    this.searchBtn = page.getByRole('button', { name: 'Search' });

    // Table
    this.firstRow = page.locator('.oxd-table-card').first();

    // Delete
    this.deleteBtn = this.firstRow.getByRole('button', { name: 'Delete' });

    // Popup
    this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes, Delete' });

    // No Records message
    this.noRecordText = page.getByText('No Records Found');
  }

  async goToPIM() {
    await this.pimMenu.click();
  }

 async searchEmployee(name) {
  await this.empNameInput.fill(name);
  await this.searchBtn.click();
}

 async deleteEmployee() {

  await this.firstRow.waitFor({ state: 'visible' });

  await this.page.waitForTimeout(2000);

  // click delete
  await this.deleteBtn.click({ force: true });

  //  wait for popup
  await this.confirmDeleteBtn.waitFor();

  await this.confirmDeleteBtn.click();
}





  async verifyDeleted() {
    await this.noRecordText.waitFor({ state: 'visible' });
  }
}