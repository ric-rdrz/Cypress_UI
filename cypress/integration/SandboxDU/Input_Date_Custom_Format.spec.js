import DateFormatPage from './page_objects/DateFormatPage.js';
import MenuPage from './page_objects/MenuPage.js';

const dateFormat = new DateFormatPage();
const menu = new MenuPage();
const localFormat = new DateFormatPage();

describe('Validate Formatting Date Custom', () => {
  let valuesBase1;
  let dateLocale;
  let dateTimeZone;
  let customFormat;
  let invalidValues;

  before(() => {
    cy.fixture('DataUtils/DateTimeBase.json').then((data) => {
      valuesBase1 = data[4];
      invalidValues = data[7];
    });
    cy.loginSandbox();
    cy.viewport(1023, 768);
    menu.elementSelect('Date Custom Format');
  });

  it('Show Formatted ISO', () => {
    dateFormat.setDateFormat(valuesBase1);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="iso-formatted-date"]').should(
      'contain',
      '2021-06-25T13:51:01-05:00',
    );
  });

  it('Show Formatted Custom Date with Timezone Default, São Paulo, Mexico City, New York ', () => {
    dateLocale = 'Default';
    dateTimeZone = 'Default';
    customFormat = 'PPPPpppp';
    dateFormat.setDateFormat(valuesBase1);
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should(
        'contain',
        'viernes, 25 de junio de 2021 a las 13:51:01 GMT-05:00',
      );

    dateTimeZone = 'São Paulo';
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should(
        'contain',
        'viernes, 25 de junio de 2021 a las 15:51:01 GMT-05:00',
      );

    dateTimeZone = 'Mexico City';
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should(
        'contain',
        'viernes, 25 de junio de 2021 a las 13:51:01 GMT-05:00',
      );

    dateTimeZone = 'New York';
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should(
        'contain',
        'viernes, 25 de junio de 2021 a las 14:51:01 GMT-05:00',
      );
  });

  it('Show Formatted Custom Date with update Date Format and Default Date Locale', () => {
    dateLocale = 'Default';
    dateTimeZone = 'Default';
    customFormat = 'PPPPpp';
    dateFormat.setDateFormat(valuesBase1);
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', 'viernes, 25 de junio de 2021 a las 13:51:01');

    customFormat = 'PPPP';
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', 'viernes, 25 de junio de 2021');

    customFormat = 'PP';
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', '25 jun 2021');
  });

  it('Show Formatted Customer Date with update Date Format and EN_US, PT_BR Date Locale', () => {
    dateLocale = 'EN_US';
    dateTimeZone = 'Default';
    customFormat = 'PPPP';

    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', 'Friday, June 25th, 2021');

    dateLocale = 'PT_BR';
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]')
      .should('be.visible')
      .should('contain', 'sexta-feira, 25 de junho de 2021');
  });

  it('TC#5: Error Invalid Day date value', () => {
    dateLocale = 'Default';
    dateTimeZone = 'Default';
    customFormat = 'PPPPpppp';
    dateFormat.setDateFormat(invalidValues.invalid.day);
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]').should('contain', 'Invalid time value');
  });

  it('TC#6: Error Invalid Month date value', () => {
    dateLocale = 'Default';
    dateTimeZone = 'Default';
    customFormat = 'PPPPpppp';
    dateFormat.setDateFormat(invalidValues.invalid.month);
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]').should('contain', 'Invalid time value');
  });

  it('TC#7: Error Invalid Year date value', () => {
    dateLocale = 'Default';
    dateTimeZone = 'Default';
    customFormat = 'PPPPpppp';
    dateFormat.setDateFormat(invalidValues.invalid.year);
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]').should('contain', 'Invalid time value');
  });

  it('TC#8: Error Invalid Hour time value', () => {
    dateLocale = 'Default';
    dateTimeZone = 'Default';
    customFormat = 'PPPPpppp';
    dateFormat.setDateFormat(invalidValues.invalid.hour);
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]').should('contain', 'Invalid time value');
  });

  it('TC#9: Error Invalid Minute time value', () => {
    dateLocale = 'Default';
    dateTimeZone = 'Default';
    customFormat = 'PPPPpppp';
    dateFormat.setDateFormat(invalidValues.invalid.minute);
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]').should('contain', 'Invalid time value');
  });

  it('TC#10: Error Invalid Second time value', () => {
    dateLocale = 'Default';
    dateTimeZone = 'Default';
    customFormat = 'PPPPpppp';
    dateFormat.setDateFormat(invalidValues.invalid.second);
    localFormat.getDateFormatDateCustom(dateLocale, dateTimeZone, customFormat);
    cy.get('p[id="formatted-date"]').should('contain', 'Invalid time value');
  });
});
