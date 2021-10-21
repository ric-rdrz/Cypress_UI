import DateFormatPage from './page_objects/DateFormatPage.js';
import MenuPage from './page_objects/MenuPage.js';

const dateFormat = new DateFormatPage();
const menu = new MenuPage();
const localFormat = new DateFormatPage();

describe('Validate Formatting Date Inputs', () => {
  let valuesBase1;
  let valuesBase2;
  let dateLocale;
  let typeFormat;
  let dateTimeZone;
  let firstResult;
  let invalidValues;

  before(() => {
    cy.fixture('DataUtils/DateTimeBase.json').then((data) => {
      valuesBase1 = data[2];
      valuesBase2 = data[3];
      invalidValues = data[7];
    });
    cy.fixture('DataUtils/ResultsFormat.json').then((data) => {
      firstResult = data[0];
    });
    cy.loginSandbox();
    cy.viewport(1023, 768);
    menu.elementSelect('Date Format');
  });

  it('Show Formatted ISO', () => {
    dateFormat.setDateFormat(valuesBase1);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="iso-formatted-date"]').should(
      'contain',
      '2021-04-25T15:32:01-05:00',
    );
  });

  it('Show Formatted Date with Type Date and Local ES and TimeZone Mex_City', () => {
    dateLocale = 'ES';
    typeFormat = 'Date';
    dateTimeZone = 'Mexico City';
    dateFormat.setDateFormat(valuesBase1);
    localFormat.getDateFormat(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should('contain', firstResult.dateES);
  });

  it('Show Formatted Date with Type Time and Locale ES', () => {
    dateLocale = 'ES';
    typeFormat = 'Time';
    dateTimeZone = 'Mexico City';
    dateFormat.setDateFormat(valuesBase1);
    localFormat.getDateFormat(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', '15:32');
  });

  it('Show Formatted Date with Type Time and Timezone Default, São Paulo, Mexico City, New York ', () => {
    dateLocale = 'Default';
    typeFormat = 'Time';
    dateTimeZone = 'Default';
    dateFormat.setDateFormat(valuesBase1);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', '15:32');

    dateTimeZone = 'São Paulo';
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', '17:32');

    dateTimeZone = 'Mexico City';
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', '15:32');

    dateTimeZone = 'New York';
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', '16:32');
  });

  it('Show Formatted Long Date with Timezone Mexico City and Locale ES', () => {
    dateLocale = 'ES';
    typeFormat = 'Long Date';
    dateTimeZone = 'Mexico City';
    dateFormat.setDateFormat(valuesBase1);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should('contain', firstResult.longDateES);
  });

  it('Show Formatted Day-Month Date with Timezone Mexico City and Locale ES', () => {
    dateLocale = 'ES';
    typeFormat = 'Day and Month';
    dateTimeZone = 'Mexico City';
    dateFormat.setDateFormat(valuesBase1);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should('contain', '25 abr');
  });
  it('Show Formatted Month and Year with Timezone Mexico City and Locale ES', () => {
    dateLocale = 'ES';
    typeFormat = 'Month and Year';
    dateTimeZone = 'Mexico City';
    dateFormat.setDateFormat(valuesBase1);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should('contain', 'abr 2021');
  });

  it('Show Formatted Date with Timezone Hermosillo and Locale EN', () => {
    dateLocale = 'EN_US';
    typeFormat = 'Date';
    dateTimeZone = 'Hermosillo';
    dateFormat.setDateFormat(valuesBase2);
    localFormat.getDateFormat(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should('contain', firstResult.dateEN);
  });

  it('Show Formatted Time with Timezone New York and Locale EN', () => {
    dateLocale = 'EN_US';
    typeFormat = 'Time';
    dateTimeZone = 'New York';
    dateFormat.setDateFormat(valuesBase2);
    localFormat.getDateFormat(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', '4:31');
  });

  it('Show Formatted Long Date with Timezone São Paulo and Locale EN', () => {
    dateLocale = 'EN_US';
    typeFormat = 'Long Date';
    dateTimeZone = 'São Paulo';
    dateFormat.setDateFormat(valuesBase2);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    //cy.get('p[id="formatted-date"]').should('contain', 'Dec 25, 2021');
    cy.get('p[id="formatted-date"]').should('contain', firstResult.longDateEN);
  });

  it('Show Formatted Day and Month with Timezone Paris and Locale EN', () => {
    dateLocale = 'EN_US';
    typeFormat = 'Day and Month';
    dateTimeZone = 'Paris';
    dateFormat.setDateFormat(valuesBase2);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should('contain', 'Dec 25');
  });
  it('Show Formatted Full Date with Timezone São Paulo and Locale EN', () => {
    dateLocale = 'EN_US';
    typeFormat = 'Month and Year';
    dateTimeZone = 'Istanbul';
    dateFormat.setDateFormat(valuesBase2);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should('contain', 'Dec 2021');
  });

  it('Show Formatted Long Date with Timezone São Paulo and Locale PT_BR', () => {
    dateLocale = 'PT_BR';
    typeFormat = 'Long Date';
    dateTimeZone = 'São Paulo';
    dateFormat.setDateFormat(valuesBase2);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should('contain', firstResult.longDatePT);
  });

  it('TC#14: Error Invalid Day date value', () => {
    dateLocale = 'PT_BR';
    typeFormat = 'Long Date';
    dateTimeZone = 'São Paulo';
    dateFormat.setDateFormat(invalidValues.invalid.day);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should(
      'contain',
      'FormatDateError: Invalid time value',
    );
  });

  it('TC#15: Error Invalid Month date value', () => {
    dateLocale = 'EN_US';
    typeFormat = 'Time';
    dateTimeZone = 'Mexico City';
    dateFormat.setDateFormat(invalidValues.invalid.month);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should(
      'contain',
      'FormatDateError: Invalid time value',
    );
  });

  it('TC#16: Error Invalid Year date value', () => {
    dateLocale = 'ES';
    typeFormat = 'Date';
    dateTimeZone = 'Hermosillo';
    dateFormat.setDateFormat(invalidValues.invalid.year);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should(
      'contain',
      'FormatDateError: Invalid time value',
    );
  });

  it('TC#17: Error Invalid Hour time value', () => {
    dateLocale = 'ES';
    typeFormat = 'Date';
    dateTimeZone = 'Hermosillo';
    dateFormat.setDateFormat(invalidValues.invalid.hour);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should(
      'contain',
      'FormatDateError: Invalid time value',
    );
  });

  it('TC#18: Error Invalid Minute time value', () => {
    dateLocale = 'ES';
    typeFormat = 'Date';
    dateTimeZone = 'Hermosillo';
    dateFormat.setDateFormat(invalidValues.invalid.minute);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should(
      'contain',
      'FormatDateError: Invalid time value',
    );
  });

  it('TC#19: Error Invalid Second time value', () => {
    dateLocale = 'ES';
    typeFormat = 'Date';
    dateTimeZone = 'Hermosillo';
    dateFormat.setDateFormat(invalidValues.invalid.second);
    localFormat.getDateFormatDate(dateLocale, typeFormat, dateTimeZone);
    cy.get('p[id="formatted-date"]').should(
      'contain',
      'FormatDateError: Invalid time value',
    );
  });
});
