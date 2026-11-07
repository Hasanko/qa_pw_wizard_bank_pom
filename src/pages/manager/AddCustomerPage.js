import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstNameField(firstName) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
  }

  async fillFirstNameField(firstName) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
  }

  async fillLastNameField(lastName) {
    await this.page.getByPlaceholder('Last Name').fill(lastName);
  }

  async fillPostCodeField(postCode) {
    await this.page.getByPlaceholder('Post Code').fill(postCode);
  }

  async addCustomerButton() {
    await this.page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
  }
}
