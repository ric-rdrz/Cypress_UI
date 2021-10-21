import DateDiffPage from './page_objects/DateDiffPage.js';
import MenuPage from './page_objects/MenuPage.js';

const dateDiff = new DateDiffPage();
const menu = new MenuPage();

describe('Validate Difference between 2 dates by Unit Time', () => {
  let firstBase;
  let firstComparison;
  let valuesResults;
  let secondValue;
  let secondComparison;
  let thirdComparison;
  let lessDate;
  let invalidValues;

  before(() => {
    cy.fixture('DataUtils/DateTimeBase.json').then((data) => {
      firstBase = data[5];
      secondValue = data[6];
      invalidValues = data[7];
    });
    cy.fixture('DataUtils/ComparisonBase.json').then((data) => {
      firstComparison = data[3];
      secondComparison = data[4];
      thirdComparison = data[5];
      lessDate = data[2];
    });
    cy.fixture('DataUtils/ResultDiff.json').then((data) => {
      valuesResults = data[0];
    });

    cy.loginSandbox();
    cy.viewport(1023, 768);
    menu.elementSelect('Date Diff');
  });

  it('Show difference in Days', () => {
    dateDiff.setDateTimeBase(firstBase);
    dateDiff.setDateTimeComparison(firstComparison);
    cy.get('select[id="unit-of-time"]')
      .select('Day')
      .should('have.value', 'day');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]').should('contain', 'Difference');
    cy.get('p[id="diff"]').should('contain', valuesResults.days);
  });

  it('Show difference in Hours', () => {
    dateDiff.setDateTimeBase(firstBase);
    dateDiff.setDateTimeComparison(firstComparison);
    cy.get('select[id="unit-of-time"]')
      .select('Hour')
      .should('have.value', 'hour');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]').should('contain', 'Difference');
    cy.get('p[id="diff"]').should('contain', valuesResults.hours);
  });

  it('Show difference in Minutes', () => {
    dateDiff.setDateTimeBase(firstBase);
    dateDiff.setDateTimeComparison(firstComparison);
    cy.get('select[id="unit-of-time"]')
      .select('Minute')
      .should('have.value', 'minute');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]').should('contain', 'Difference');
    cy.get('p[id="diff"]').should('contain', valuesResults.minutes);
  });

  it('Show difference in Seconds', () => {
    dateDiff.setDateTimeBase(firstBase);
    dateDiff.setDateTimeComparison(firstComparison);
    cy.get('select[id="unit-of-time"]')
      .select('Second')
      .should('have.value', 'second');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]').should('contain', 'Difference');
    cy.get('p[id="diff"]').should('contain', valuesResults.seconds);
  });

  it('Show difference in Weeks starting on Sunday', () => {
    dateDiff.setDateTimeBase(secondValue);
    dateDiff.setDateTimeComparison(secondComparison);
    cy.get('select[id="unit-of-time"]')
      .select('Week starting on Sunday')
      .should('have.value', 'week-start-on-sunday');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]').should('contain', 'Difference');
    cy.get('p[id="diff"]').should('contain', valuesResults.weeksSunday);
  });

  it('Show difference in Weeks starting on Monday', () => {
    dateDiff.setDateTimeBase(secondValue);
    dateDiff.setDateTimeComparison(thirdComparison);
    cy.get('select[id="unit-of-time"]')
      .select('Week starting on Monday')
      .should('have.value', 'week-start-on-monday');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]').should('contain', 'Difference');
    cy.get('p[id="diff"]').should('contain', valuesResults.weeksMonday);
  });

  it('Show difference in Months', () => {
    dateDiff.setDateTimeBase(secondValue);
    dateDiff.setDateTimeComparison(thirdComparison);
    cy.get('select[id="unit-of-time"]')
      .select('Month')
      .should('have.value', 'month');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]').should('contain', 'Difference');
    cy.get('p[id="diff"]').should('contain', valuesResults.months);
  });

  it('Show difference in Quarters', () => {
    dateDiff.setDateTimeBase(secondValue);
    dateDiff.setDateTimeComparison(thirdComparison);
    cy.get('select[id="unit-of-time"]')
      .select('Quarter')
      .should('have.value', 'quarter');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]').should('contain', 'Difference');
    cy.get('p[id="diff"]').should('contain', valuesResults.quarters);
  });

  it('Show difference in Years', () => {
    dateDiff.setDateTimeBase(secondValue);
    dateDiff.setDateTimeComparison(thirdComparison);
    cy.get('select[id="unit-of-time"]')
      .select('Year')
      .should('have.value', 'year');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]').should('contain', 'Difference');
    cy.get('p[id="diff"]').should('contain', valuesResults.years);
  });

  it('Show absolute difference in Days', () => {
    dateDiff.setDateTimeBase(firstBase);
    dateDiff.setDateTimeComparison(lessDate);
    cy.get('select[id="unit-of-time"]')
      .select('Day')
      .should('have.value', 'day');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]').should('contain', 'Difference');
    cy.get('p[id="diff"]').should('contain', valuesResults.absDays);
  });

  it('TC#11: Error Invalid Day date value', () => {
    dateDiff.setDateTimeBase(invalidValues.invalid.day);
    dateDiff.setDateTimeComparison(lessDate);
    cy.get('select[id="unit-of-time"]')
      .select('Day')
      .should('have.value', 'day');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]')
      .contains('invalid date', { matchCase: false })
      .contains('invalid argument', { matchCase: false });
  });

  it('TC#12: Error Invalid Month date value', () => {
    dateDiff.setDateTimeBase(invalidValues.invalid.month);
    dateDiff.setDateTimeComparison(lessDate);
    cy.get('select[id="unit-of-time"]')
      .select('Month')
      .should('have.value', 'month');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]')
      .contains('invalid date', { matchCase: false })
      .contains('invalid argument', { matchCase: false });
  });

  it('TC#13: Error Invalid Year date value', () => {
    dateDiff.setDateTimeBase(invalidValues.invalid.year);
    dateDiff.setDateTimeComparison(lessDate);
    cy.get('select[id="unit-of-time"]')
      .select('Year')
      .should('have.value', 'year');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]')
      .contains('invalid date', { matchCase: false })
      .contains('invalid argument', { matchCase: false });
  });

  it('TC#14: Error Invalid Hour date value', () => {
    dateDiff.setDateTimeBase(invalidValues.invalid.hour);
    dateDiff.setDateTimeComparison(lessDate);
    cy.get('select[id="unit-of-time"]')
      .select('Hour')
      .should('have.value', 'hour');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]')
      .contains('invalid date', { matchCase: false })
      .contains('invalid argument', { matchCase: false });
  });

  it('TC#15: Error Invalid Minute date value', () => {
    dateDiff.setDateTimeBase(invalidValues.invalid.minute);
    dateDiff.setDateTimeComparison(lessDate);
    cy.get('select[id="unit-of-time"]')
      .select('Minute')
      .should('have.value', 'minute');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]')
      .contains('invalid date', { matchCase: false })
      .contains('invalid argument', { matchCase: false });
  });

  it('TC#16: Error Invalid Second date value', () => {
    dateDiff.setDateTimeBase(invalidValues.invalid.second);
    dateDiff.setDateTimeComparison(lessDate);
    cy.get('select[id="unit-of-time"]')
      .select('Second')
      .should('have.value', 'second');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]')
      .contains('invalid date', { matchCase: false })
      .contains('invalid argument', { matchCase: false });
  });

  it('TC#17: Error Invalid Second date value', () => {
    dateDiff.setDateTimeBase(invalidValues.invalid.second);
    dateDiff.setDateTimeComparison(lessDate);
    cy.get('select[id="unit-of-time"]')
      .select('Quarter')
      .should('have.value', 'quarter');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]')
      .contains('invalid date', { matchCase: false })
      .contains('invalid argument', { matchCase: false });
  });

  it('TC#18: Error Invalid Day Week Sunday date value', () => {
    dateDiff.setDateTimeBase(invalidValues.invalid.day);
    dateDiff.setDateTimeComparison(lessDate);
    cy.get('select[id="unit-of-time"]')
      .select('Week starting on Sunday')
      .should('have.value', 'week-start-on-sunday');
    cy.get('button[type="submit"]').click();
    cy.get('p[id="diff"]')
      .contains('invalid date', { matchCase: false })
      .contains('invalid argument', { matchCase: false });
  });
});
