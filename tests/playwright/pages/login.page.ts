import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly showPassword: Locator ;

  constructor(private page: Page) {
    this.email = page.locator('//*[@id="email"]');
    this.password = page.locator('//*[@id="password"]');
    this.loginButton = page.locator('//*[@id="loginBtn"]');
    this.showPassword = page.locator('//*[@id="showPassword"]');
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL! + '/login.html');
  }

  async login() {
    await this.email.fill(process.env.LOGIN_EMAIL!);
    await this.password.fill(process.env.LOGIN_PASSWORD!);

    await this.loginButton.click();
  }
}
