import DateFormatPage from './page_objects/DateFormatPage.js';
import MenuPage from './page_objects/MenuPage.js';

const dateFormat = new DateFormatPage();
const menu = new MenuPage();

describe('Validate Formatting Date Inputs', () => {
  let firstBase;
  let dateLocale;
  let dateParse;
  let firstResult;
  let secondResult;
  let invalidValues;

  before(() => {
    cy.fixture('DataUtils/DateTimeBase.json').then((data) => {
      firstBase = data[0];
      invalidValues = data[7];
    });
    cy.fixture('DataUtils/ResultsFormat.json').then((data) => {
      firstResult = data[0];
      secondResult = data[1];
    });
    cy.loginSandbox();
    cy.viewport(1023, 768);
    menu.elementSelect('Date Parse');
  });

  it('Show Date Parse Default Locale', () => {
    dateLocale = 'Default';
    dateParse = 'Date';

    dateFormat.setDateParse(firstBase);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').should('contain', 'Fri Jun 11 2021 00:00:00');
  });

  it('Show Long Date Parse ES, EN_US PT_BR Locale', () => {
    dateLocale = 'ES';
    dateParse = 'Long Date';

    cy.get('input[id="date-string"]').clear().type(firstResult.longDateES);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').should('contain', secondResult.longDate);

    dateLocale = 'EN_US';
    cy.get('input[id="date-string"]').clear().type(firstResult.longDateEN);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').should('contain', secondResult.date);

    dateLocale = 'PT_BR';
    cy.get('input[id="date-string"]').clear().type(firstResult.longDatePT);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').should('contain', secondResult.date);
  });

  it('Show Date Parse ES Locale', () => {
    dateLocale = 'ES';
    dateParse = 'Date';

    cy.get('input[id="date-string"]').clear().type(firstResult.dateES);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').should('contain', secondResult.longDate);
  });

  it('Show Date Parse EN_US Locale', () => {
    dateLocale = 'EN_US';
    dateParse = 'Date';

    cy.get('input[id="date-string"]').clear().type(firstResult.dateEN);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').should('contain', secondResult.date);
  });

  it('Show Date Parse PT_BR Locale', () => {
    dateLocale = 'PT_BR';
    dateParse = 'Date';

    cy.get('input[id="date-string"]').clear().type(firstResult.dateES);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').should('contain', secondResult.longDate);
  });

  it('TC#6: Error Invalid Day date value', () => {
    dateLocale = 'ES';
    dateParse = 'Date';
    dateFormat.setDateParse(invalidValues.invalid.day);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').contains('parsedateerror: invalid argument', {
      matchCase: false,
    });
  });

  it('TC#7: Error Invalid Month date value', () => {
    dateLocale = 'ES';
    dateParse = 'Date';
    dateFormat.setDateParse(invalidValues.invalid.month);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').contains('parsedateerror: invalid argument', {
      matchCase: false,
    });
  });

  it('TC#8: Error Invalid Year date value', () => {
    dateLocale = 'ES';
    dateParse = 'Date';
    dateFormat.setDateParse(invalidValues.invalid.year);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').contains('parsedateerror: invalid argument', {
      matchCase: false,
    });
  });

  it('TC#9: Error Invalid Month Long date value', () => {
    dateLocale = 'ES';
    dateParse = 'Long Date';
    dateFormat.setDateParse(invalidValues.invalid.month);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').contains('parsedateerror: invalid argument', {
      matchCase: false,
    });
  });

  it('TC#10: Error Invalid Year Long date value', () => {
    dateLocale = 'ES';
    dateParse = 'Long Date';
    dateFormat.setDateParse(invalidValues.invalid.year);
    dateFormat.getDateFormateParse(dateLocale, dateParse);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="parsed-date"]').contains('parsedateerror: invalid argument', {
      matchCase: false,
    });
  });
});
