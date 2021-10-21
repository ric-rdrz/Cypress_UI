import DateArithPage from './page_objects/DateUtilsPage.js';
import MenuPage from './page_objects/MenuPage.js';

const dateUtil = new DateArithPage();
const menu = new MenuPage();

describe('Validate Date Inputs Arithmehic', () => {
  let valuesBase;
  let valuesDatetime;
  let valuesBaseleap;
  let valuesDatetimeleap;
  let invalidValues;

  before(() => {
    cy.fixture('DataUtils/DateTimeBase.json').then((data) => {
      valuesBase = data[0];
      valuesBaseleap = data[1];
      invalidValues = data[7];
    });

    cy.fixture('DataUtils/DateTimeValues.json').then((data) => {
      valuesDatetime = data[0];
      valuesDatetimeleap = data[1];
    });

    cy.loginSandbox();

    menu.elementSelect('Date Arithmetic');
  });

  it('Validate Addition Results', () => {
    dateUtil.setDateTimeBase(valuesBase);
    dateUtil.setValues(valuesDatetime);
    cy.get('p[id="base-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', 'date');
    cy.get('p[id="subtracted-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', 'date');
    cy.get('p[id="added-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', 'date');
  });

  it('Validate edge cases', () => {
    dateUtil.setDateTimeBase(valuesBaseleap);
    dateUtil.setValues(valuesDatetimeleap);
    cy.get('p[id="base-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', 'date');
    cy.get('p[id="subtracted-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', 'date');
    cy.get('p[id="added-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', 'date');
  });
  it('TC#3: Error Invalid Day date value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.day);
    dateUtil.setValues(valuesDatetime);
    cy.get('p[id="base-date"]').contains('invalid date', { matchCase: false });
    cy.get('p[id="subtracted-date"]').contains('invalid argument', {
      matchCase: false,
    });
    cy.get('p[id="added-date"]').contains('invalid date', { matchCase: false });
  });

  it('TC#4: Error Invalid Month date value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.month);
    dateUtil.setValues(valuesDatetime);
    cy.get('p[id="base-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="subtracted-date"]').contains('invalid argument', {
      matchCase: false,
    });
    cy.get('p[id="added-date"]').contains('invalid date', { matchCase: false });
  });

  it('TC#5: Error Invalid Year date value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.year);
    dateUtil.setValues(valuesDatetime);
    cy.get('p[id="base-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="subtracted-date"]').contains('invalid argument', {
      matchCase: false,
    });
    cy.get('p[id="added-date"]').contains('invalid date', { matchCase: false });
  });

  it('TC#6: Error Invalid Hour time value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.hour);
    dateUtil.setValues(valuesDatetime);
    cy.get('p[id="base-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="subtracted-date"]').contains('invalid argument', {
      matchCase: false,
    });
    cy.get('p[id="added-date"]').contains('invalid date', { matchCase: false });
  });

  it('TC#7: Error Invalid Minute time value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.minute);
    dateUtil.setValues(valuesDatetime);
    cy.get('p[id="base-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="subtracted-date"]').contains('invalid argument', {
      matchCase: false,
    });
    cy.get('p[id="added-date"]').contains('invalid date', { matchCase: false });
  });

  it('TC#8: Error Invalid Second time value', () => {
    dateUtil.setDateTimeBase(invalidValues.invalid.second);
    dateUtil.setValues(valuesDatetime);
    cy.get('p[id="base-date"]').contains('invalid date', {
      matchCase: false,
    });
    cy.get('p[id="subtracted-date"]').contains('invalid argument', {
      matchCase: false,
    });
    cy.get('p[id="added-date"]').contains('invalid date', { matchCase: false });
  });
});
