import { expect } from '@playwright/test';

export class LeaveApprovalPage {

  constructor(page) {
    this.page = page;

    // Navigation
    this.leaveMenu = page.locator("//span[text()='Leave']");
    this.leaveListTab = page.locator("//a[text()='Leave List']");

    // Filters
    this.searchBtn = page.getByRole('button', { name: 'Search' });

    // Approve
    this.confirmBtn = page.getByRole('button', { name: 'Yes, Approve' });

    // Status
    this.approvedStatus = page.getByText('Approved');
  }

  async goToLeaveList() {
    await this.leaveMenu.click();
    await this.leaveListTab.click();

    // Ensure page is loaded
    await expect(this.searchBtn).toBeVisible();
  }

  async searchLeave() {
    await this.searchBtn.click();
    await this.page.locator('.oxd-table-card').first().waitFor();
  }

  async approveLeave() {

    const approveBtns = this.page.getByRole('button', { name: 'Approve' });

    const count = await approveBtns.count();
    console.log('Approve buttons:', count);

    if (count === 0) {
      throw new Error('No leave found to approve');
    }

    await approveBtns.first().click();

    // Optional confirmation
    if (await this.confirmBtn.isVisible()) {
      await this.confirmBtn.click();
    }
  }

  async verifyApproved() {
    await expect(this.approvedStatus).toBeVisible();
  }
}