import { Page, Locator } from '@playwright/test';
import * as fs from 'fs';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getUserDataFromFile(userNumber: number): Promise<{
    userName: string;
    password: string;
  } | null> {
    const filePath = 'src/utils/data.json';
    try {
      const jsonData = await fs.promises.readFile(filePath, 'utf8');
      const users = JSON.parse(jsonData);

      if (userNumber < 1 || userNumber > users.length) {
        console.error('Invalid user number');
        return null;
      }

      const user = users[userNumber - 1];
      const { userName, password } = user;
      return { userName, password };
    } catch (error) {
      console.error('Error reading user data from file:', error);
      return null;
    }
  }
}
