import DateComparisonPage from './page_objects/DateComparisonPage.js';
import MenuPage from './page_objects/MenuPage.js';

const dateUtil = new DateComparisonPage();
const menu = new MenuPage();

describe('Validate Date Inputs Comparison', () => {
  let valuesBase;
  let valuesComparisonless;
  let valuesComparisongreater;
  let valuesComparisonequal;
  let invalidValues;

  before(() => {
    cy.fixture('DataUtils/DateTimeBase.json').then((data) => {
      valuesBase = data[0];
      invalidValues = data[7];
    });
    cy.fixture('DataUtils/ComparisonBase.json').then((data) => {
      valuesComparisonless = data[0];
      valuesComparisongreater = data[1];
      valuesComparisonequal = data[2];
    });

    cy.loginSandbox();
    cy.viewport(1023, 768);
    menu.elementSelect('Date Comparison');
  });

  it('Base Date < Comparison Date', () => {
    dateUtil.setDateTimeBase(valuesBase);
    dateUtil.setDateTimeComparison(valuesComparisonless);
    cy.get('button[type="submit"]').click();
    dateUtil.validateResults('less');
  });

  it('Base Date > Comparison Date', () => {
    dateUtil.setDateTimeBase(valuesBase);
    dateUtil.setDateTimeComparison(valuesComparisongreater);
    cy.get('button[type="submit"]').click();
    dateUtil.validateResults('greater');
  });

  it('Base Date = Comparison Date', () => {
    dateUtil.setDateTimeBase(valuesBase);
    dateUtil.setDateTimeComparison(valuesComparisonequal);
    cy.get('button[type="submit"]').click();
    dateUtil.validateResults('equal');
  });

  it('TC#4: Error Invalid Day date value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.day);
    dateUtil.setDateTimeComparison(valuesComparisonless);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="before-date"]').contains('invalid arguments', {
      matchCase: false,
    });
    cy.get('p[id="after-date"]').contains('invalid date', { matchCase: false });
  });

  it('TC#5: Error Invalid Month date value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.month);
    dateUtil.setDateTimeComparison(valuesComparisonless);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="before-date"]').contains('invalid arguments', {
      matchCase: false,
    });
    cy.get('p[id="after-date"]').contains('invalid date', { matchCase: false });
  });

  it('TC#6: Error Invalid Year date value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.year);
    dateUtil.setDateTimeComparison(valuesComparisonless);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="before-date"]').contains('invalid arguments', {
      matchCase: false,
    });
    cy.get('p[id="after-date"]').contains('invalid date', { matchCase: false });
  });

  it('TC#7: Error Invalid Hour time value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.hour);
    dateUtil.setDateTimeComparison(valuesComparisonless);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="before-date"]').contains('invalid arguments', {
      matchCase: false,
    });
    cy.get('p[id="after-date"]').contains('invalid date', { matchCase: false });
  });

  it('TC#8: Error Invalid Minute time value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.minute);
    dateUtil.setDateTimeComparison(valuesComparisonless);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="before-date"]').contains('invalid arguments', {
      matchCase: false,
    });
    cy.get('p[id="after-date"]').contains('invalid date', { matchCase: false });
  });

  it('TC#9: Error Invalid Second time value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.second);
    dateUtil.setDateTimeComparison(valuesComparisonless);
    cy.get('button[type="submit"]').click();
    cy.get('p[id="before-date"]').contains('invalid arguments', {
      matchCase: false,
    });
    cy.get('p[id="after-date"]').contains('invalid date', { matchCase: false });
  });
});
