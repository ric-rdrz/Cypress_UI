class DateComparisonPage {
  constructor() {
    this.resultsBefore = 'p[id="before-date"]';
    this.resultsAfter = 'p[id="after-date"]';
    this.inputDatebase = 'input[id="base-date"]';
    this.inputTimebase = 'input[id="base-time"]';
    this.inputDatecomparison = 'input[id="comparison-date"]';
    this.inputTimecomparison = 'input[id="comparison-time"]';
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

  validateResults(type) {
    if (type === 'less') {
      cy.get(this.resultsBefore).should('contain', 'false');
      cy.get(this.resultsAfter).should('contain', 'true');
    }

    if (type === 'greater') {
      cy.get(this.resultsBefore).should('contain', 'true');
      cy.get(this.resultsAfter).should('contain', 'false');
    }

    if (type === 'equal') {
      cy.get(this.resultsBefore).should('contain', 'false');
      cy.get(this.resultsAfter).should('contain', 'false');
    }
  }
}
export default DateComparisonPage;
