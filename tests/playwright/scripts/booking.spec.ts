import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BookingPage } from '../pages/createbooking.page';
import dotenv from 'dotenv';        
import { editBookingPage } from '../pages/editBooking.page';

dotenv.config();
  
  
  test('User can create a booking', async ({ page }) => {
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
    
    // start new booking flow can be added similarly
    
    const editBookingPageInstance = new editBookingPage(page);
    await editBookingPageInstance.startNewBookingButton.click();
    await editBookingPageInstance.confirmStartNewBookingButton.click();
    await expect(page).toHaveURL(/dashboard.html/);

})