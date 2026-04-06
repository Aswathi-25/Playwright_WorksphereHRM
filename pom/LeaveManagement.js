export class LeaveManagement {
  constructor(page) {
    this.page = page;

    // Navigation
    this.leaveMenu = page.getByRole('link', { name: 'Leave' });
    this.applyTab = page.getByRole('link', { name: 'Apply' });
    this.leaveListTab = page.getByRole('link', { name: 'Leave List' });

    // Apply Leave
    this.leaveType = page.locator("//label[text()='Leave Type']/following::div[contains(@class,'oxd-select-text')][1]");
    this.leaveOption = page.locator('.oxd-select-dropdown div').nth(1);

    this.fromDate = page.locator('(//input[@class="oxd-input oxd-input--active"])[1]');
    this.toDate = page.locator('(//input[@class="oxd-input oxd-input--active"])[2]');

    this.applyBtn = page.getByRole('button', { name: 'Apply' });

    // Leave List
    this.searchBtn = page.getByRole('button', { name: 'Search' });

    // Actions
    this.confirmBtn = page.getByRole('button', { name: 'Yes, Cancel' });

    // Status
    this.cancelledStatus = page.getByText('Cancelled');
  }

  async goToLeave() {
    await this.leaveMenu.waitFor({ state: 'visible' });
    await this.leaveMenu.click();
  }

  async openApplyTab() {
    await this.applyTab.waitFor({ state: 'visible' });
    await this.applyTab.click();
  }




 async applyLeave(from, to) {

  
  await this.page.locator('.oxd-form-loader').waitFor({ state: 'hidden' });

  await this.leaveType.waitFor({ state: 'visible' });
  await this.leaveType.click();

  await this.page.locator('.oxd-select-dropdown')
    .waitFor({ state: 'visible' });

  await this.leaveOption.click();

  await this.fromDate.fill(from);
  await this.toDate.fill(to);

  await this.applyBtn.waitFor({ state: 'visible' });
  await this.applyBtn.click();
}




  async openLeaveList() {
    await this.leaveListTab.waitFor({ state: 'visible' });
    await this.leaveListTab.click();
  }

  async searchLeave() {
    await this.searchBtn.click();
    await this.page.locator('.oxd-table-card').first().waitFor();
  }

  async cancelLeave() {
    const cancelBtns = this.page.getByRole('button', { name: 'Cancel' });

    await cancelBtns.first().waitFor({ state: 'visible' });

    const count = await cancelBtns.count();
    console.log('Cancel buttons found:', count);

    if (count === 0) {
      throw new Error('No leave record found. Cannot cancel');
    }

    await cancelBtns.first().click();
    await this.confirmBtn.click();
  }

  async verifyCancelled() {
    await this.cancelledStatus.waitFor({ state: 'visible' });
  }
}