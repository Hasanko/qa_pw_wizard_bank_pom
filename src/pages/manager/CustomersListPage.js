import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async getLastRowFromTable () {
    await this.page.locator('table tbody tr').last()
  }
}
