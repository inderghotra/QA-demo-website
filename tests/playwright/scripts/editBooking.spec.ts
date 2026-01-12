import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BookingPage } from '../pages/createbooking.page';
import { editBookingPage } from '../pages/editBooking.page';
import dotenv from 'dotenv';        

dotenv.config();
test('User can edit and cancel a booking', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    await expect(page).toHaveURL(/dashboard/);
    const bookingPage = new BookingPage(page);
    await bookingPage.startBookingButton.click();
    await bookingPage.selectCityDropdown.click();
    await bookingPage.selectCity('Calgary'); 
    await bookingPage.selectHotelDropdown.click();
    await bookingPage.selectHotel('Bow River Suites');
    await bookingPage.checkInDateInput.fill('2026-12-01');
    await bookingPage.checkOutDateInput.fill('2026-12-05');
    await bookingPage.nextButton.click();
    
    await bookingPage.guestDetailsName.fill('John Doe');
    await bookingPage.guestDetailsEmail.fill('john.doe@example.com');
    await bookingPage.guestDetailsPhone.fill('1234567890');
    await bookingPage.paymentMethodDropdown.selectOption('PayPal');
    await bookingPage.paypalEmailInput.fill('john.doe@example.com');
    await bookingPage.Step2NextButton.click();

    await bookingPage.confirmBookingButton.click();
    await bookingPage.confirmBookingModal.click();
    await expect(bookingPage.confirmationMessage).toHaveText('Booking Confirmed!');

    // Edit Booking
    const editBookingPageInstance = new editBookingPage(page);
    await editBookingPageInstance.editBookingButton.click();
    await bookingPage.paymentMethodDropdown.selectOption('Credit Card');
    await bookingPage.creditCardNumberInput.fill('1234567890123456');
    await bookingPage.creditCardExpiryInput.fill('12/26');
    await bookingPage.creditCardCVCInput.fill('123');
    await bookingPage.Step2NextButton.click();
    await bookingPage.confirmBookingButton.click();
    await bookingPage.confirmBookingModal.click();
    await expect(bookingPage.confirmationMessage).toHaveText('Booking Confirmed!');


// cancel and restore booking test can be added similarly

await editBookingPageInstance.cancelBookingButton.click();
await editBookingPageInstance.confirmCancelButton.click();
await expect(page.locator('//*[@id="cancelPage"]/h2')).toHaveText('Booking has been cancelled');
await editBookingPageInstance.restoreBookingButton.click();
await editBookingPageInstance.confirmRestoreButton.click();
await expect(bookingPage.confirmationMessage).toHaveText('Booking Confirmed!');
await expect(page.locator('//*[@id="confirmationDetails"]/p[1]')).toHaveText('Booking has been restored successfully');


// cancel and start new booking
await editBookingPageInstance.cancelBookingButton.click();
await editBookingPageInstance.confirmCancelButton.click();
await expect(page.locator('//*[@id="cancelPage"]/h2')).toHaveText('Booking has been cancelled');
await editBookingPageInstance.startNewBookingButtonCancelPage.click();
await editBookingPageInstance.confirmStartNewBookingButton.click();
await expect(page).toHaveURL(/dashboard.html/);

});

