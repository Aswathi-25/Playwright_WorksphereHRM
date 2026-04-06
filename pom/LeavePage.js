export class LeavePage {

    /**
   * @param {import('playwright').Page} page
   */


  constructor(page) {
    this.page = page;

    // Navigation
    this.leaveMenu = page.getByRole('link', { name: 'Leave' });

    // Apply Leave
    this.applyTab = page.getByRole('link', { name: 'Apply' });
    this.leaveType = page.locator('.oxd-select-text').first();
    this.leaveOption = page.locator('.oxd-select-dropdown div').nth(1);

     this.fromDate = page.getByPlaceholder("yyyy-dd-mm").first()
    this.toDate = page.locator("(//input[@placeholder='yyyy-dd-mm'])[2]")

    this.applyBtn = page.getByRole('button', { name: 'Apply' });

    // Success message
   this.toastMsg = page.locator('.oxd-toast-content-text').last();
    
  }

  async goToLeave() {
    await this.leaveMenu.click();
  }

  async openApply() {
    await this.applyTab.click({ timeout: 60000 })
  }

  async applyLeave(from, to) {

    await this.leaveType.click({ timeout: 60000 })
    await this.leaveOption.click();

  await this.fromDate.click()
  await this.fromDate.fill(from)

  await this.toDate.click()
  await this.toDate.fill(to)

  await this.applyBtn.click()
   
  }

 // Verify success
  async verifySuccess() {
    await this.successMsg.waitFor({ state: 'visible' });
  }

  // Navigate to Leave List
  async goToLeaveList() {
    await this.leaveListTab.click();
  }



// Search leave
  async searchLeave() {
    await this.searchBtn.click();
  }

  // Cancel leave
  async cancelLeave() {
    await this.cancelBtn.click();
    await this.confirmCancelBtn.click();
  }

  // Verify cancelled
  async verifyCancelled() {
    await this.statusCancelled.waitFor({ state: 'visible' });
  }




}