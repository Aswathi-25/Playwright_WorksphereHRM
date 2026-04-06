export class EmployeeSearchPage {

  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page;

    // Navigation
    this.pimMenu = page.getByRole('link', { name: 'PIM' });

    // Search Fields
    this.employeeName = page.locator('input[placeholder="Type for hints..."]').first();

    this.searchBtn = page.getByRole('button', { name: 'Search' });

    // Results
    this.resultTable = page.locator('.oxd-table-card');
    this.noRecords = page.getByText('No Records Found');
  }

  async goToPIM() {
    await this.pimMenu.click();
  }

  async searchEmployee(name) {
    await this.employeeName.fill(name);
    await this.searchBtn.click();
  }

  async verifyResults() {
    // Wait for either results OR no records
    await Promise.race([
      this.resultTable.first().waitFor(),
      this.noRecords.waitFor()
    ]);
  }
}