/// <reference types="cypress" />

class MenuPage {
  constructor() {
    this.sidebar_component_option =
      'div[data-testid="nav-group-links"] a[href]';
    this.sidebar_main = 'div[data-testid="sidebar"]';
    this.errorSection = 'pre[data-testid="live-error"]';
    this.text_area_playground = '.npm__react-simple-code-editor__textarea';
  }

  elementSelect(option) {
    cy.get(this.sidebar_main)
      .should('be.visible')
      .contains('Components')
      .click();
    cy.get(this.sidebar_main).should('be.visible').contains(option).click();
  }

  fillDataPlayground(data, e1) {
    cy.get(this.text_area_playground).eq(e1).fill(data);
    cy.get(this.errorSection).should('not.exist');
  }

  fillDataPlaygroundSingle(data) {
    cy.get(this.text_area_playground).fill(data);
    cy.get(this.errorSection).should('not.exist');
  }
}
export default MenuPage;
