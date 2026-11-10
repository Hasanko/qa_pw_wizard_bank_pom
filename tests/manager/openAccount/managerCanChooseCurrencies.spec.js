import { expect, test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  /* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-dwon has value Dollar
  4. Select currency Pound
  5. Assert the drop-dwon has value Pound
  6. Select currency Rupee
  7. Assert the drop-dwon has value Rupee
  */

  const bankManagerMainPage = new BankManagerMainPage(page);

  await bankManagerMainPage.open();
  await bankManagerMainPage.openOpenAccountBtn();

  for (const currency of ['Dollar', 'Pound', 'Rupee']) {
    await bankManagerMainPage.openAccountPage.selectCurrency(currency);
    await expect(bankManagerMainPage.openAccountPage.currencySelect).toHaveValue(currency);
  }
});
