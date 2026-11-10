import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerPage = new AddCustomerPage(page);
    this.customerListPage = new CustomersListPage(page);
    this.openAccountPage = new OpenAccountPage(page);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async openAddCustomerBtn() {
    await this.page.getByRole('button', { name: 'Add Customer'}).click();
  }

  async openCustomersListBtn () {
    await this.page.getByRole('button', { name: 'Customers' }).click();
  }

  async openOpenAccountBtn () {
    await this.page.getByRole('button', { name: 'Open Account' }).click();
  }
}
