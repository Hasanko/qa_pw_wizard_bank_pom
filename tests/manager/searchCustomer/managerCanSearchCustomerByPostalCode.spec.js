import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  const bankManagerMainPage = new BankManagerMainPage(page);

  await bankManagerMainPage.open();
  await bankManagerMainPage.openAddCustomerBtn();
  await bankManagerMainPage.addCustomerPage.fillFirstNameField(firstName);
  await bankManagerMainPage.addCustomerPage.fillLastNameField(lastName);
  await bankManagerMainPage.addCustomerPage.fillPostCodeField(postalCode);
  await bankManagerMainPage.addCustomerPage.addCustomerButton();
  await page.reload();
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Fill the postalCode to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
  const bankManagerMainPage = new BankManagerMainPage(page);

  await bankManagerMainPage.openCustomersListBtn();
  await bankManagerMainPage.customerListPage.searchCustomer(postalCode);

  const customerRows = bankManagerMainPage.customerListPage.getCustomerRows();
  await expect(customerRows).toHaveCount(1);
  await expect(customerRows.first()).toContainText(firstName);
  await expect(customerRows.first()).toContainText(lastName);
  await expect(customerRows.first()).toContainText(postalCode);
});
