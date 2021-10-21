import CurrencyUtilsPage from './page_objects/CurrencyUtilsPage.js';
import MenuPage from './page_objects/MenuPage.js';

const currency = new CurrencyUtilsPage();
const menu = new MenuPage();
const resultsCurrency = require('../../fixtures/DataUtils/ResultsCurrency.json');

describe('Validate Formatting Currency Utils', () => {
  let firstBase;
  let secondBase;
  let thirdBase;
  let fourthBase;
  let currencyCode;
  before(() => {
    cy.fixture('DataUtils/CurrencyData.json').then((data) => {
      firstBase = data[0];
      secondBase = data[1];
      thirdBase = data[2];
      fourthBase = data[3];
    });

    cy.loginSandbox();
    cy.viewport(1023, 768);
    menu.elementSelect('Currency Create');
  });
  it('TC#01 Currency + - MXN with 3 decimals', () => {
    currencyCode = 'MXN';
    currency.setCurrency(currencyCode, firstBase);
    currency.getResultsCurrencyNumber(resultsCurrency[0]);
    currency.getResultsCurrencyString(resultsCurrency[0]);
  });

  it('TC#02 Currency + + USD with 5 decimals 0 in the end', () => {
    currencyCode = 'USD';
    currency.setCurrency(currencyCode, secondBase);
    currency.getResultsCurrencyNumber(resultsCurrency[1]);
    currency.getResultsCurrencyString(resultsCurrency[1]);
  });

  it('TC#03 Currency - + BRL with 2 decimals 0 in the end', () => {
    currencyCode = 'BRL';
    currency.setCurrency(currencyCode, thirdBase);
    currency.getResultsCurrencyNumber(resultsCurrency[2]);
    currency.getResultsCurrencyString(resultsCurrency[2]);
  });
  it('TC#04 Currency - + JPY million without decimals', () => {
    currencyCode = 'JPY';
    currency.setCurrency(currencyCode, fourthBase);
    currency.getResultsCurrencyNumber(resultsCurrency[3]);
    currency.getResultsCurrencyString(resultsCurrency[3]);
  });
});
