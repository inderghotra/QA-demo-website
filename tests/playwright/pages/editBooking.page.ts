import { Page, Locator } from '@playwright/test';
export class editBookingPage {
    readonly editBookingButton: Locator;
    readonly cancelBookingButton: Locator;
    readonly confirmCancelButton: Locator;
    readonly restoreBookingButton: Locator;
    readonly confirmRestoreButton: Locator;
    readonly startNewBookingButton: Locator;
    readonly startNewBookingButtonCancelPage: Locator;
    readonly confirmStartNewBookingButton: Locator;

    constructor(private page: Page) {
        this.editBookingButton = page.locator('//*[@id="bookingConfirmedPage"]/button[1]');
        this.cancelBookingButton = page.locator('//*[@id="bookingConfirmedPage"]/button[2]');
        this.confirmCancelButton = page.locator('//*[@id="cancelModal"]/button[1]');
        this.restoreBookingButton = page.locator('//*[@id="cancelPage"]/button[1]');
        this.confirmRestoreButton = page.locator('//*[@id="restoreModal"]/button[1]');
        this.startNewBookingButton = page.locator('//*[@id="bookingConfirmedPage"]/button[3]');
        this.startNewBookingButtonCancelPage = page.locator('//*[@id="cancelPage"]/button[2]');
        this.confirmStartNewBookingButton = page.locator('//*[@id="startNewBookingModal"]/button[1]');
    }
}