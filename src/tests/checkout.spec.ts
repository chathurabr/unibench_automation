import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import ENV from '../utils/env';
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';
import { ProductsPage } from '../pages/ProductsPage';

const config: Config = {
  dictionaries: [names],
};

test.describe.serial('Checkout Process', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let userName: string;
  let password: string;
  let fname: string;
  let lname: string;
  let postalCode: string;
  let totalPrice: number;

  let item_1 = 'Sauce Labs Bolt T-Shirt';
  let item_2 = 'Sauce Labs Fleece Jacket';
  let item_3 = 'Sauce Labs Backpack';

  test('getting started ', async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await test.step('go to login page', async () => {
      await loginPage.goto(ENV.LOGIN_LINK);
      const userData = await loginPage.getUserDataFromFile(1);
      ({ userName, password } = userData ?? {});
    });

    await test.step('log in with valid credentials', async () => {
      await loginPage.login(userName, password);
      await page.waitForURL(ENV.HOME_PAGE_LINK);
      await expect(page).toHaveURL(ENV.HOME_PAGE_LINK);
    });

    await test.step('Add First Item to cart', async () => {
      expect(await productsPage.getHeader()).toBe('Products');

      const itemPrice1 = await productsPage.getProductPrice(item_1);
      await productsPage.addItemToCart(item_1);
      const itemPrice2 = await productsPage.getProductPrice(item_2);
      await productsPage.addItemToCart(item_2);
      const itemPrice3 = await productsPage.getProductPrice(item_3);
      await productsPage.addItemToCart(item_3);

      const total = itemPrice1 + itemPrice2 + itemPrice3;

      const priceWithoutDollarSign = itemPrice1.replace('$', '');
      const price_1 = parseFloat(priceWithoutDollarSign);
      const priceWithoutDollarSign2 = itemPrice2.replace('$', '');
      const price_2 = parseFloat(priceWithoutDollarSign2);
      const priceWithoutDollarSign3 = itemPrice3.replace('$', '');
      const price_3 = parseFloat(priceWithoutDollarSign3);

      totalPrice = price_1 + price_2 + price_3;

      await productsPage.navigateToCart();
    });

    await test.step('Checkout', async () => {
      expect(await productsPage.getHeader()).toBe('Your Cart');
      await productsPage.clickOnCheckout();
    });

    await test.step('fill information', async () => {
      fname = uniqueNamesGenerator(config);
      lname = uniqueNamesGenerator(config);
      postalCode = Math.floor(1000 + Math.random() * 9000).toString();

      expect(await productsPage.getHeader()).toBe('Checkout: Your Information');
      await productsPage.fillUserInformation(fname, lname, postalCode);
    });

    await test.step('Checkout Overview', async () => {
      expect(await productsPage.getHeader()).toBe('Checkout: Overview');
      expect(await productsPage.getPamentInfo('1')).toBe('Payment Information');
      expect(await productsPage.getPamentInfo('2')).toBe('SauceCard #31337');
      expect(await productsPage.getPamentInfo('3')).toBe(
        'Shipping Information'
      );
      expect(await productsPage.getPamentInfo('4')).toBe(
        'Free Pony Express Delivery!'
      );
      expect(await productsPage.getPamentInfo('5')).toBe('Price Total');
      expect(await productsPage.getPamentInfo('6')).toBe(
        'Item total: $' + totalPrice
      );

      let tax_value = Number(((totalPrice * 8) / 100).toFixed(2));
      expect(await productsPage.getPamentInfo('7')).toBe('Tax: $' + tax_value);

      let totalWithTax = totalPrice + tax_value;
      expect(await productsPage.getPamentInfo('8')).toBe(
        'Total: $' + totalWithTax
      );
      await productsPage.finishShopping();
    });

    await test.step('confirmation page', async () => {
      expect(await productsPage.getConfirmation()).toBe(
        'Thank you for your order!'
      );
    });
  });
});
