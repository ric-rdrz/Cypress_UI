class DateComparisonPage {
  constructor() {
    this.resultsDiff = 'p[id="diff"]';
    this.inputDatebase = 'input[id="first-date"]';
    this.inputTimebase = 'input[id="first-time"]';
    this.inputDatecomparison = 'input[id="second-date"]';
    this.inputTimecomparison = 'input[id="second-time"]';
  }

  setDateTimeBase(valuesBase) {
    cy.get(this.inputDatebase).clear().type(valuesBase.baseDate);
    cy.get(this.inputTimebase).clear().type(valuesBase.baseTime);
  }

  setDateTimeComparison(valuesComparison) {
    cy.get(this.inputDatecomparison)
      .clear()
      .type(valuesComparison.ComparisonDate);
    cy.get(this.inputTimecomparison)
      .clear()
      .type(valuesComparison.ComparisonTime);
  }
}
export default DateComparisonPage;
