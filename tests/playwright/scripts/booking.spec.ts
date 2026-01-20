import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BookingPage } from '../pages/createbooking.page';
import dotenv from 'dotenv';        
import { editBookingPage } from '../pages/editBooking.page';
import { beforeEach } from 'node:test';

dotenv.config();
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    await expect(page).toHaveURL(/dashboard/);
}
)
  
  test('User can create a booking', async ({ page }) => {
    
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

test ('Negative test scenarios', async ({ page }) => {
// Attempt to create a booking without filling mandatory fields
const bookingPage = new BookingPage(page);
    await bookingPage.startBookingButton.click();
    await bookingPage.checkInDateInput.fill('2026-12-01');
    await bookingPage.checkOutDateInput.fill('2026-12-05');
    await bookingPage.nextButton.click();  
    await expect(bookingPage.step1errorMessage).toHaveText('All fields are mandatory');
})

test ('Guest details page', async ({ page }) => {

// name cannot have special characters
    const bookingPage = new BookingPage(page);
    await bookingPage.startBookingButton.click();
    await bookingPage.selectCityDropdown.click();
    await bookingPage.selectCity('Calgary'); 
    await bookingPage.selectHotelDropdown.click();
    await bookingPage.selectHotel('Bow River Suites');
    await bookingPage.checkInDateInput.fill('2026-12-01');
    await bookingPage.checkOutDateInput.fill('2026-12-05');
    await bookingPage.nextButton.click();   
    await bookingPage.guestDetailsName.fill('123');
    await expect(bookingPage.nameerrorMessage).toHaveText('Name cannot contain numbers');
    await bookingPage.guestDetailsName.press('Control+A'); 
    await bookingPage.guestDetailsName.press('Backspace');
    await bookingPage.guestDetailsName.fill('JohnDoe');
    await bookingPage.guestDetailsEmail.fill('12345');
    await bookingPage.guestDetailsPhone.fill('abcd');
    await bookingPage.Step2NextButton.click(); 
    await expect(bookingPage.emailerrorMessage).toHaveText('Invalid email format for Guest 1'); 
    await bookingPage.guestDetailsEmail.press('Control+A'); 
    await bookingPage.guestDetailsEmail.press('Backspace');
    await bookingPage.guestDetailsEmail.fill('john.doe@example.com');
    await bookingPage.Step2NextButton.click();
    await expect(bookingPage.emailerrorMessage).toHaveText('Phone number must be exactly 10 digits for Guest 1'); 
    await bookingPage.guestDetailsPhone.press('Control+A'); 
    await bookingPage.guestDetailsPhone.press('Backspace');
    await bookingPage.guestDetailsPhone.fill('1234567890');
    await bookingPage.Step2NextButton.click();
    
    await expect(bookingPage.emailerrorMessage).toHaveText('Select payment method'); 
    await bookingPage.paymentMethodDropdown.selectOption('Credit Card');
    await bookingPage.Step2NextButton.click();
    await expect(bookingPage.emailerrorMessage).toHaveText('All credit card fields are required'); 
    await bookingPage.creditCardNumberInput.fill('1234');
   await bookingPage.creditCardExpiryInput.fill('12/2');
    await bookingPage.creditCardCVCInput.fill('12');
    await bookingPage.Step2NextButton.click();
    await expect(bookingPage.creditcarderrorMessage).toHaveText('Card number must be 16 digits');
    await expect(bookingPage.creditCardExpiryInputerror).toHaveText('Invalid or expired date');
    await expect(bookingPage.cvverrorMessage).toHaveText('CVV must be 3 digits');
    await bookingPage.creditCardNumberInput.fill('4111111111111111');
    await bookingPage.creditCardExpiryInput.fill('12/26');
    await bookingPage.creditCardCVCInput.fill('123');
    await bookingPage.Step2NextButton.click();
    await bookingPage.confirmBookingButton.click();
    await bookingPage.confirmBookingModal.click();
    await expect(bookingPage.confirmationMessage).toHaveText('Booking Confirmed!');
     })