/// <reference types="cypress" />

class LabelComponentAPage {
  constructor() {
    this.section_preview = 'label[id="label_1"]';
    this.sidebar_component_option =
      'div[data-testid="sidebar"] [data-testid="nav-group"] [data-testid="nav-group-links"]';
  }

  labelPlayground() {
    cy.get('label[id="label_1"]').should('contain', 'Simple text');
    cy.get('label[id="label_1.1"]').should('have.attr', 'for', 'cuatro');
    cy.get('label[id="label_2"]').should('contain', '*');
    cy.get('label[id="label_3"] div')
      .should('have.attr', 'title', 'InformationButton')
      .realHover();
    cy.get('div[data-tippy-root] span')
      .should('have.css', 'background-color', 'rgb(234, 234, 252)')
      .should('contain', 'Select Manager option to find configuration');
    cy.get('label[id="label_5"]').should('have.attr', 'disabled');
  }
}
export default LabelComponentAPage;
