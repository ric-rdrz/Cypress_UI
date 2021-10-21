import CurrencyUtilsPage from './page_objects/CurrencyUtilsPage.js';
import MenuPage from './page_objects/MenuPage.js';

const currency = new CurrencyUtilsPage();
const menu = new MenuPage();
const resultsCurrency = require('../../fixtures/DataUtils/ResultsCurrency.json');

describe('Validate Rounding Currency Utils', () => {
  let firstRounding;
  let secondRounding;
  let thirdRounding;
  let currencyCode;
  let roundingMode;
  before(() => {
    cy.fixture('DataUtils/CurrencyData.json').then((data) => {
      firstRounding = data[4];
      secondRounding = data[5];
      thirdRounding = data[6];
    });

    cy.loginSandbox();
    cy.viewport(1023, 768);
    menu.elementSelect('Currency Round');
  });
  it('TC#01 HalfUp + 2 Precision MXN', () => {
    currencyCode = 'MXN';
    roundingMode = 'Half Up';
    currency.setCurrencyRound(currencyCode, firstRounding, roundingMode);
    currency.getResultsCurrencyRounded(resultsCurrency[4]);
  });

  it('TC#02 Up/Down - 3 precision USD', () => {
    currencyCode = 'USD';
    roundingMode = 'Up';
    currency.setCurrencyRound(currencyCode, secondRounding, roundingMode);
    currency.getResultsCurrencyRounded(resultsCurrency[5]);
    roundingMode = 'Down';
    currency.setCurrencyRound(currencyCode, secondRounding, roundingMode);
    currency.getResultsCurrencyRounded(resultsCurrency[6]);
  });

  it('TC#03 Keep value + 1 precision BRL', () => {
    currencyCode = 'BRL';
    roundingMode = 'Up';
    currency.setCurrencyRound(currencyCode, thirdRounding, roundingMode);
    currency.getResultsCurrencyRounded(resultsCurrency[7]);
    roundingMode = 'Down';
    currency.setCurrencyRound(currencyCode, thirdRounding, roundingMode);
    currency.getResultsCurrencyRounded(resultsCurrency[7]);
    roundingMode = 'Half Up';
    currency.setCurrencyRound(currencyCode, thirdRounding, roundingMode);
    currency.getResultsCurrencyRounded(resultsCurrency[7]);
  });
});
