/// <reference types="cypress" />

class MenuPage {
  constructor() {
    this.sidebar_main = 'div[id="root"]';
  }

  elementSelect(option) {
    cy.get(this.sidebar_main).should('be.visible').contains(option).click();
  }
}
export default MenuPage;
