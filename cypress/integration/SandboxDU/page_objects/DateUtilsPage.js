class DateUtilsPage {
  constructor() {
    this.inputSecond = 'input[id="seconds"]';
    this.inputMinutes = 'input[id="minutes"]';
    this.inputHours = 'input[id="hours"]';
    this.inputDays = 'input[id="days"]';
    this.inputWeeks = 'input[id="weeks"]';
    this.inputMonths = 'input[id="months"]';
    this.inputYears = 'input[id="years"]';
    this.inputDatebase = 'input[id="base-date"]';
    this.inputTimebase = 'input[id="base-time"]';
    this.resultsDatebase = 'p[id="base-date"]';
    this.resultsDatesubtracted = 'div p[id="subtracted-date"]';
    this.resultsDateadded = 'div p[id="added-date"]';
  }

  setDateTimeBase(valuesBase) {
    cy.get(this.inputDatebase).clear().type(valuesBase.baseDate);
    cy.get(this.inputTimebase).clear().type(valuesBase.baseTime);
  }

  setValues(valuesDateTime) {
    cy.get(this.inputSecond).clear().type(valuesDateTime.seconds);
    cy.get(this.inputMinutes).clear().type(valuesDateTime.minutes);
    cy.get(this.inputHours).clear().type(valuesDateTime.hours);

    cy.get(this.inputDays).clear().type(valuesDateTime.days);
    cy.get(this.inputWeeks).clear().type(valuesDateTime.weeks);
    cy.get(this.inputMonths).clear().type(valuesDateTime.months);
    cy.get(this.inputYears).clear().type(valuesDateTime.years);

    cy.get('button[type="submit"]').click();
  }

  validateResults() {
    cy.get('p[id="start-of-locale-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', 'date');
    cy.get('p[id="end-of-locale-date"]')
      .should('be.visible')
      .and('not.have.attr', 'type', 'date');
  }
}
export default DateUtilsPage;
