export class AssignLeavePage {

  /**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page;

    // Navigation
    this.leaveMenu = page.getByRole('link', { name: 'Leave' });
    this.assignLeaveTab = page.getByRole('link', { name: 'Assign Leave' });

    // Form fields
    this.employeeName = page.locator('input[placeholder="Type for hints..."]');
    this.leaveType = page.locator('.oxd-select-text').first();
    this.leaveOption = page.locator('.oxd-select-dropdown div').nth(1);

    this.fromDate = page.locator('(//input[@class="oxd-input oxd-input--active"])[1]');
    this.toDate = page.locator('(//input[@class="oxd-input oxd-input--active"])[2]');

    this.assignBtn = page.getByRole('button', { name: 'Assign' });

    // Confirmation popup
    this.confirmBtn = page.getByRole('button', { name: 'Ok' });

    // Toast (optional)
    this.toastMsg = page.locator('.oxd-toast-content-text').last();
  }

  async goToAssignLeave() {
    await this.leaveMenu.click();
    await this.assignLeaveTab.click();
  }

  async assignLeave(empName, from, to) {

    // Enter employee name
    await this.employeeName.fill(empName);

    // Select leave type
    await this.leaveType.click();
    await this.leaveOption.click();

    // Fill dates
    await this.fromDate.fill(from);
    await this.toDate.fill(to);

    // Click Assign
    await this.assignBtn.click();

    // Confirm popup
    if (await this.confirmBtn.isVisible().catch(() => false)) {
      await this.confirmBtn.click();
    }
  }
}