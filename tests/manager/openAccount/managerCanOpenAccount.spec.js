import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  const bankManagerMainPage = new BankManagerMainPage(page);

  await bankManagerMainPage.open();
  await bankManagerMainPage.openAddCustomerBtn();
  await bankManagerMainPage.addCustomerPage.fillFirstNameField(firstName);
  await bankManagerMainPage.addCustomerPage.fillLastNameField(lastName);
  await bankManagerMainPage.addCustomerPage.fillPostCodeField(postCode);
  await bankManagerMainPage.addCustomerPage.addCustomerButton();
  await page.reload();
});

test('Assert manager can open account', async ({ page }) => {
  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.

  Tips:
  1. Do not rely on the customer row id for the step 13. 
    Use the ".last()" locator to get the last row.
  */
  const bankManagerMainPage = new BankManagerMainPage(page);

  await bankManagerMainPage.openOpenAccountBtn();
  await bankManagerMainPage.openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await bankManagerMainPage.openAccountPage.selectCurrency('Dollar');
  await bankManagerMainPage.openAccountPage.clickProcess();
  await page.reload();
  await bankManagerMainPage.openCustomersListBtn();

  const lastRowCells = bankManagerMainPage.customerListPage.getLastRowFromTable().getByRole('cell');

  await expect(lastRowCells.nth(0)).toHaveText(firstName);
  await expect(lastRowCells.nth(1)).toHaveText(lastName);
  await expect(lastRowCells.nth(2)).toHaveText(postCode);
  await expect(lastRowCells.nth(3)).not.toBeEmpty();
});
