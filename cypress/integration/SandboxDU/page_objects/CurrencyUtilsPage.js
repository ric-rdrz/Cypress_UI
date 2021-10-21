class CurrencyUtilsPage {
  setCurrency(currencyCode, firstBase) {
    cy.get('input[id="numeric-value"]').clear().type(firstBase.numeric);
    cy.get('input[id="string-value"]').clear().type(firstBase.string);
    cy.get('select[id="currencyCode"]').select(currencyCode);
    cy.get('button[type="submit"]').click();
  }

  getResultsCurrencyNumber(resultsCurrency) {
    cy.get('div[id="currency-from-number"]')
      .should('contain', 'Standard Value')
      .and('contain', 'Precise Value');
    cy.get('div[id="currency-from-string"]')
      .should('contain', 'Standard Value')
      .and('contain', 'Precise Value');
    cy.get('div[id="currency-from-number"] p[id="value"]').should(
      'contain',
      resultsCurrency.standardValueNumber,
    );
    cy.get('div[id="currency-from-number"] p[id="currency-code"]').should(
      'contain',
      resultsCurrency.currencyCodeNumber,
    );
    cy.get('div[id="currency-from-number"] p[id="units"]').should(
      'contain',
      resultsCurrency.unitsNumber,
    );
    cy.get('div[id="currency-from-number"] p[id="cents"]').should(
      'contain',
      resultsCurrency.centsNumber,
    );
    cy.get('div[id="currency-from-number"] p[id="precision"]').should(
      'contain',
      resultsCurrency.precisionNumber,
    );
    cy.get('div[id="currency-from-number"] p[id="sign"]').should(
      'contain',
      resultsCurrency.signNumber,
    );
  }

  getResultsCurrencyString(resultsCurrency) {
    cy.get('div[id="currency-from-string"] p[id="value"]').should(
      'contain',
      resultsCurrency.standardValueString,
    );
    cy.get('div[id="currency-from-string"] p[id="currency-code"]').should(
      'contain',
      resultsCurrency.currencyCodeString,
    );
    cy.get('div[id="currency-from-string"] p[id="units"]').should(
      'contain',
      resultsCurrency.unitsString,
    );
    cy.get('div[id="currency-from-string"] p[id="cents"]').should(
      'contain',
      resultsCurrency.centsString,
    );
    cy.get('div[id="currency-from-string"] p[id="precision"]').should(
      'contain',
      resultsCurrency.precisionString,
    );
    cy.get('div[id="currency-from-string"] p[id="sign"]').should(
      'contain',
      resultsCurrency.signString,
    );
  }

  setCurrencyRound(currencyCode, firstRounding, roundingMode) {
    cy.get('input[id="value"]').clear().type(firstRounding.value);
    cy.get('select[id="currencyCode"]').select(currencyCode);
    cy.get('input[id="precision"]').clear().type(firstRounding.precision);
    cy.get('select[id="rounding-mode"]').select(roundingMode);
    cy.get('button[type="submit"]').click();
  }

  getResultsCurrencyRounded(resultsCurrency) {
    cy.get('div[id="rounded-currency"] p[id="value"]').should(
      'contain',
      resultsCurrency.standardValueRounded,
    );
    cy.get('div[id="rounded-currency"] p[id="currency-code"]').should(
      'contain',
      resultsCurrency.currencyCodeRounded,
    );
    cy.get('div[id="rounded-currency"] p[id="units"]').should(
      'contain',
      resultsCurrency.unitsRounded,
    );
    cy.get('div[id="rounded-currency"] p[id="cents"]').should(
      'contain',
      resultsCurrency.centsRounded,
    );
    cy.get('div[id="rounded-currency"] p[id="precision"]').should(
      'contain',
      resultsCurrency.precisionRounded,
    );
    cy.get('div[id="rounded-currency"] p[id="sign"]').should(
      'contain',
      resultsCurrency.signRounded,
    );
  }
}
export default CurrencyUtilsPage;
