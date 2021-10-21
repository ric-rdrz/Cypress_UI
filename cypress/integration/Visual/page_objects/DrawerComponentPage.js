/// <reference types="cypress" />

class DrawerComponentPage {
  constructor() {
    //Drawer Component
    this.drawer_component = 'div[data-testid="drawer"]';
    this.drawer_header = 'div[id="drawer_actions"] div[role="img"]';
    this.drawer_close_button = 'div[title="Close"]';
    this.drawer_footer = 'div[id="drawer_footer"]';
    this.section_overlay = 'div[data-testid="overlay"]';
    this.sidebar_component_option =
      'div[data-testid="sidebar"] [data-testid="nav-group"] [data-testid="nav-group-links"]';
    this.text_area_playground = '.npm__react-simple-code-editor__textarea';
  }

  drawerPlayground(data, size, type) {
    cy.get('button').contains('Deducciones').should('be.visible').click();
    cy.get(this.drawer_component).should('contain', 'Crear Deducciones');
    cy.get(this.drawer_header).eq(0).should('have.attr', 'title', 'Edit');
    cy.get(this.drawer_header).eq(1).should('have.attr', 'title', 'Trash');
    cy.get(this.drawer_close_button).click();
    cy.get(this.drawer_component).should('not.be.visible');

    if (type === 'buttons') {
      cy.get('button').contains('Deducciones').click();
      cy.get(this.drawer_component).should('contain', 'Crear Deducciones');
      cy.get(this.drawer_footer).should('be.visible');
      cy.get(this.section_overlay).click({ force: true });
      cy.get(this.drawer_component).should('not.be.visible');
      cy.get('button').contains('Deducciones').click();
      cy.get(this.drawer_component).should('contain', 'Crear Deducciones');
      if (size === 'large') {
        cy.percySnapshot('drawer_large');
      }
      cy.get(this.drawer_footer)
        .contains('cancelar')
        .should('be.visible')
        .click({ force: true });
    }

    if (size === 'small') {
      cy.get('button').contains('Deducciones').click();
      if (type === 'buttons') {
        cy.percySnapshot('drawer_small');
      }
      cy.get(this.section_overlay).type('{esc}');
    }
  }

  drawerOverridePlayground(data) {
    cy.get(this.sidebar_component_option)
      .should('be.visible')
      .contains('Drawer')
      .click();
    cy.get(this.text_area_playground).fill(data);
    cy.get(this.errorSection).should('not.exist');
    cy.get(this.text_area_playground).eq(0).fill(data);
    cy.get('button').contains('show drawer').should('be.visible').click();
    cy.percySnapshot('drawer_override');
    cy.get(this.drawer_close_button).click();
  }
}
export default DrawerComponentPage;
