import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  protected page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  get email(): Locator {
    return this.page.locator('[data-test="username"]');
  }

  get password(): Locator {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton(): Locator {
    return this.page.locator('[data-test="login-button"]');
  }

  async login(userEmail: string, password: string): Promise<void> {
    await this.email.fill(userEmail);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
