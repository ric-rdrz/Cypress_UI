import DateCreationPage from './page_objects/DateUtilsPage.js';
import DateComparisonPage from './page_objects/DateComparisonPage.js';
import MenuPage from './page_objects/MenuPage.js';

const dateResults = new DateCreationPage();
const dateUtil = new DateComparisonPage();
const menu = new MenuPage();

describe('Validate Date Inputs Creation', () => {
  let valuesBase;
  let invalidValues;

  before(() => {
    cy.fixture('DataUtils/DateTimeBase.json').then((data) => {
      valuesBase = data[0];
      invalidValues = data[7];
    });
    cy.loginSandbox();
    cy.viewport(1023, 768);
    menu.elementSelect('Date Creation');
  });

  it('Creation Unit Second', () => {
    dateUtil.setDateTimeBase(valuesBase);
    cy.get('select[id="unit-of-time"]')
      .select('Second')
      .should('have.value', 'second');
    cy.get('button[type="submit"]').click();
    dateResults.validateResults();
  });

  it('Creation Unit Minute', () => {
    dateUtil.setDateTimeBase(valuesBase);
    cy.get('select[id="unit-of-time"]')
      .select('Minute')
      .should('have.value', 'minute');
    cy.get('button[type="submit"]').click();
    dateResults.validateResults();
  });

  it('Creation Unit Hour', () => {
    dateUtil.setDateTimeBase(valuesBase);
    cy.get('select[id="unit-of-time"]')
      .select('Hour')
      .should('have.value', 'hour');
    cy.get('button[type="submit"]').click();
    dateResults.validateResults();
  });

  it('Creation Unit Day', () => {
    dateUtil.setDateTimeBase(valuesBase);
    cy.get('select[id="unit-of-time"]')
      .select('Day')
      .should('have.value', 'day');
    cy.get('button[type="submit"]').click();
    dateResults.validateResults();
  });

  it('Creation Unit Week starting on Sunday', () => {
    dateUtil.setDateTimeBase(valuesBase);
    cy.get('select[id="unit-of-time"]')
      .select('Week starting on Sunday')
      .should('have.value', 'week-start-on-sunday');
    cy.get('button[type="submit"]').click();
    dateResults.validateResults();
  });

  it('Creation Unit Week starting on Monday', () => {
    dateUtil.setDateTimeBase(valuesBase);
    cy.get('select[id="unit-of-time"]')
      .select('Week starting on Monday')
      .should('have.value', 'week-start-on-monday');
    cy.get('button[type="submit"]').click();
    dateResults.validateResults();
  });

  it('Creation Unit Month', () => {
    dateUtil.setDateTimeBase(valuesBase);
    cy.get('select[id="unit-of-time"]')
      .select('Month')
      .should('have.value', 'month');
    cy.get('button[type="submit"]').click();
    dateResults.validateResults();
  });

  it('Creation Unit Quarter', () => {
    dateUtil.setDateTimeBase(valuesBase);
    cy.get('select[id="unit-of-time"]')
      .select('Quarter')
      .should('have.value', 'quarter');
    cy.get('button[type="submit"]').click();
    dateResults.validateResults();
  });

  it('Creation Unit Year', () => {
    dateUtil.setDateTimeBase(valuesBase);
    cy.get('select[id="unit-of-time"]')
      .select('Year')
      .should('have.value', 'year');
    cy.get('button[type="submit"]').click();
    dateResults.validateResults();
  });

  it('TC#9: Error Invalid Day date value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.day);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="start-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="end-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
  });

  it('TC#10: Error Invalid Month date value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.month);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="start-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="end-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
  });

  it('TC#11: Error Invalid Year date value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.year);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="start-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="end-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
  });

  it('TC#12: Error Invalid Hour time value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.hour);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="start-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="end-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
  });

  it('TC#13: Error Invalid Minute time value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.minute);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="start-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="end-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
  });

  it('TC#14: Error Invalid Second time value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.second);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="start-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="end-of-locale-date"]').contains('invalid date', {
      matchCase: false,
    });
  });
});
