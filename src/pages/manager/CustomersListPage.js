export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchField = page.getByPlaceholder('Search Customer');
    this.customerRows = page.locator('table tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  getLastRowFromTable() {
    return this.customerRows.last();
  }

  getCustomerRows() {
    return this.customerRows;
  }

  async searchCustomer(searchTerm) {
    await this.searchField.fill(searchTerm);
  }
}
