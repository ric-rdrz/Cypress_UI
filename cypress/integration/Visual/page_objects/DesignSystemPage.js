/// <reference types="cypress" />

class DesignSystemPage {
  constructor() {
    this.errorSection = 'pre[data-testid="live-error"]';
    this.sidebar_component_option =
      'div[data-testid="sidebar"] [data-testid="nav-group"] [data-testid="nav-group-links"]';
    this.sidebar_mobile = 'div[data-testid="sidebar"]';
    this.text_area_playground = '.npm__react-simple-code-editor__textarea';
    //Hidden and Visible button component Mobile
    this.button_hid_vis = 'div[data-testid="header"] button';
  }

  hiddenPlayground(data) {
    cy.get(this.sidebar_component_option)
      .should('be.visible')
      .contains('Hidden')
      .click();
    cy.get(this.text_area_playground).fill(data);
    cy.get(this.errorSection).should('not.exist');
    cy.get(this.text_area_playground).click().clear().fill(data);
    cy.get(this.errorSection).should('not.exist');
  }

  hiddenPlaygroundMobile() {
    cy.get(this.button_hid_vis).eq(0).should('be.visible').click();
    cy.get(this.sidebar_mobile).should('be.visible').contains('Hidden').click();
  }

  visiblePlayground(data) {
    cy.get(this.sidebar_component_option)
      .should('be.visible')
      .contains('Visible')
      .click();
    cy.get(this.text_area_playground).fill(data);
    cy.get(this.errorSection).should('not.exist');
  }

  visiblePlaygroundMobile() {
    cy.get(this.button_hid_vis).eq(0).should('be.visible').click();
    cy.get(this.sidebar_mobile)
      .should('be.visible')
      .contains('Visible')
      .click();
  }

  buttonMobilePlayground() {
    cy.get(this.button_hid_vis).eq(0).should('be.visible').click();
    cy.get(this.sidebar_mobile).should('be.visible').contains('Button').click();
  }
}
export default DesignSystemPage;
