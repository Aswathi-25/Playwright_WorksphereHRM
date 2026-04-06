import { expect } from '@playwright/test';

export class MyInfoPage {
    constructor(page) {
        this.page = page;

        this.myInfoMenu = page.locator("//span[text()='My Info']");
        this.firstName = page.locator("//input[@name='firstName']");
        this.saveBtn = page.locator("//button[@type='submit']");
    }

    async updateName(name) {

        // Ensure page is loaded
        await this.page.waitForLoadState('networkidle');

        //  Click My Info
        await expect(this.myInfoMenu).toBeVisible();
        await this.myInfoMenu.click();

        //  Wait for form
        await expect(this.firstName).toBeVisible();

        // Update name
        await this.firstName.fill(name);

        //  Save
        await this.saveBtn.click();
    }
}