import { Page, Locator } from '@playwright/test';

export class BookingPage {
    readonly startBookingButton: Locator;
    readonly selectHotelDropdown: Locator;
    readonly selectRoomTypeDropdown: Locator;
    readonly checkInDateInput: Locator;
    readonly checkOutDateInput: Locator
    readonly selectCityDropdown: Locator;
    readonly cityOption: Locator;
    readonly hotelOption: Locator;
    readonly guestDetailsName: Locator;
    readonly nextButton: Locator;
    readonly guestDetailsEmail: Locator;
    readonly guestDetailsPhone: Locator;
    readonly paymentMethodDropdown: Locator;
    readonly paypalEmailInput: Locator;
    readonly Step2NextButton: Locator;
    readonly confirmBookingButton: Locator;
    readonly confirmBookingModal: Locator;
    readonly confirmationMessage: Locator;
    readonly creditCardNumberInput: Locator;
    readonly creditCardExpiryInput: Locator;
    readonly creditCardCVCInput: Locator;
    readonly step1errorMessage: Locator;
    readonly nameerrorMessage: Locator;
    readonly emailerrorMessage: Locator;
    readonly creditcarderrorMessage: Locator;
    readonly cvverrorMessage: Locator;
    readonly creditCardExpiryInputerror: Locator;


    constructor(private page: Page) {
        this.startBookingButton = page.locator('//*[@id="startBookingBtn"]');
        this.selectCityDropdown = page.locator('//*[@id="city"]');
        this.cityOption = page.locator('//*[@id="city"]/option[2]');
        this.selectHotelDropdown = page.locator('//*[@id="hotel"]');
        this.hotelOption = page.locator('//*[@id="hotel"]/option[2]');
        this.checkInDateInput = page.locator('//*[@id="checkIn"]');
        this.checkOutDateInput = page.locator('//*[@id="checkOut"]'); 
        this.nextButton = page.locator('//*[@id="step1"]/button');
        
        this.selectRoomTypeDropdown = page.locator('//*[@id="roomTypeSelect"]');  
        this.guestDetailsName = page.locator('//*[@id="guestName0"]');
        this.guestDetailsEmail = page.locator('//*[@id="guestFields"]/div/div/input[2]');
        this.guestDetailsPhone = page.locator('//*[@id="guestFields"]/div/div/input[3]');
        this.paymentMethodDropdown = page.locator('//*[@id="paymentMethod"]');
        this.paypalEmailInput = page.locator('//*[@id="paypalEmail"]');
        this.Step2NextButton = page.locator('//*[@id="step2"]/button[2]');

        this.confirmBookingButton = page.locator('//*[@id="step3"]/button');
        this.confirmBookingModal = page.locator('//*[@id="confirmBookingModal"]/button[1]');
        this.confirmationMessage = page.locator('//*[@id="bookingConfirmedPage"]/h2');
       
        
        this.creditCardNumberInput = page.locator('//*[@id="cardNumber"]');
        this.creditCardExpiryInput = page.locator('//*[@id="expiry"]');
        this.creditCardCVCInput = page.locator('//*[@id="cvv"]');

        this.step1errorMessage = page.locator('//*[@id="errorStep1"]');
        this.nameerrorMessage = page.locator('//*[@id="nameError0"]');
        this.emailerrorMessage = page.locator('//*[@id="errorStep2"]');
        this.creditcarderrorMessage = page.locator('//*[@id="cardError"]');
        this.cvverrorMessage = page.locator('//*[@id="cvvError"]');
        this.creditCardExpiryInputerror = page.locator('//*[@id="expiryError"]');

        

    }
    async selectCity(cityName: string) {
    await this.selectCityDropdown.selectOption({ label: cityName });
  }

 
  async selectHotel(hotelValue: string) {
    await this.selectHotelDropdown.selectOption(hotelValue);
  }

  async startBooking() {
    await this.startBookingButton.click();
  }
}

