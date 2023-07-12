import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  protected page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  get shppingCartBtn(): Locator {
    return this.page.locator('.shopping_cart_link');
  }

  get checkoutBtn(): Locator {
    return this.page.locator('[data-test="checkout"]');
  }

  get headerLbl(): Locator {
    return this.page.locator('span.title');
  }

  get firstName(): Locator {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastname(): Locator {
    return this.page.locator('[data-test="lastName"]');
  }

  get postalCode(): Locator {
    return this.page.locator('[data-test="postalCode"]');
  }

  get btnContinue(): Locator {
    return this.page.locator('[data-test="continue"]');
  }

  get finishBtn(): Locator {
    return this.page.locator('[data-test="finish"]');
  }

  async getHeader(): Promise<string> {
    const text = await this.headerLbl.innerText();
    return text;
  }

  async clickOnCheckout(): Promise<void> {
    await this.checkoutBtn.isEnabled();
    await this.checkoutBtn.click();
  }

  async addItemToCart(productName: string): Promise<void> {
    const itemLocator = this.page.locator(
      `//div[contains(@class, "inventory_item_name") and text()="${productName}"]/ancestor::div[contains(@class, "inventory_item_description")]//button[contains(@class, "btn_inventory")]`
    );
    await itemLocator.click();
  }

  async getProductPrice(productName: string) {
    const priceLocator = this.page.locator(
      `//div[@class="inventory_item_name" and text()="${productName}"]/ancestor::div[contains(@class, "inventory_item_description")]/descendant::div[contains(@class, "inventory_item_price")]`
    );
    const text = await priceLocator.innerText();
    return text;
  }

  async navigateToCart(): Promise<void> {
    await this.shppingCartBtn.click();
  }

  async fillUserInformation(
    fname: string,
    lname: string,
    postal: string
  ): Promise<void> {
    await this.firstName.fill(fname);
    await this.lastname.fill(lname);
    await this.postalCode.fill(postal);
    await this.btnContinue.click();
  }

  async getPamentInfo(section: string): Promise<string> {
    const element = await this.page.locator(
      `div[class='summary_info'] div:nth-child(${section})`
    );
    const text = await element.innerText();
    return text;
  }

  async finishShopping(): Promise<void> {
    await this.finishBtn.click();
  }

  async getConfirmation(): Promise<string> {
    const element = await this.page.getByRole('heading', {
      name: 'Thank you for your order!',
    });
    const text = await element.innerText();
    return text;
  }
}
