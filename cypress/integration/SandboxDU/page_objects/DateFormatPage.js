class DateFormatPage {
  constructor() {
    this.inputDatebase = 'input[id="base-date"]';
    this.inputTimebase = 'input[id="base-time"]';
    this.resultsDatebase = 'p[id="base-date"]';
    this.resultsDatesubtracted = 'div p[id="subtracted-date"]';
    this.resultsDateadded = 'div p[id="added-date"]';
  }

  setDateFormat(valuesBase) {
    cy.get('input[id="base-date"]').clear().type(valuesBase.baseDate);
    cy.get('input[id="base-time"]').clear().type(valuesBase.baseTime);
  }

  getDateFormat(dateLocale, typeFormat, dateTimeZone) {
    cy.get('select[name="dateTimezone"]').select(dateTimeZone);
    cy.get('select[id="date-locale"').select(dateLocale);
    cy.get('select[id="date-format"')
      .select(typeFormat)
      .should('have.value', typeFormat.toLowerCase());
    cy.get('button[type="submit"]').click();
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', typeFormat);
  }

  getDateFormatDate(dateLocale, typeFormat, dateTimeZone) {
    cy.get('select[name="dateTimezone"]').select(dateTimeZone);
    cy.get('select[id="date-locale"').select(dateLocale);
    cy.get('select[id="date-format"').select(typeFormat);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', 'date');
  }

  getDateFormatDateCustom(dateLocale, dateTimeZone, CustomFormat) {
    cy.get('select[name="dateTimezone"]').select(dateTimeZone);
    cy.get('select[id="date-locale"').select(dateLocale);
    cy.get('input[id="date-format"]').clear().type(CustomFormat);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', 'date');
  }

  setDateParse(valuesBase) {
    cy.get('input[id="date-string"]').clear().type(valuesBase.baseDate);
  }

  getDateFormateParse(dateLocale, dateParse) {
    cy.get('select[name="dateLocale"]').select(dateLocale);
    cy.get('select[id="date-parse-format"').select(dateParse);
  }
}
export default DateFormatPage;
