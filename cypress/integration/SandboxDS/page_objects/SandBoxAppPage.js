/// <reference types="cypress" />

class SandBoxAppPage {
  constructor() {
    //Cards
    this.sidebar = 'div[id="root"]';
    this.icon_money = 'div[role="img"][title="Money"]';
    this.cards = 'div[id="root"]';
    this.img_card = 'div[id="test"] img';
    //Drawer
    this.drawer_option = 'div[role="img"][title="AvatarBoy"]';
    this.drawer = 'div[data-testid="drawer"]';
    this.drawer_header = 'div[data-testid="drawer"] div';
    this.drawer_content = 'div[data-testid="drawer"]';
    this.drawer_content_avatar = 'div div[role="img"][title="AvatarGirl"]';
    this.drawer_footer = 'div[title="drawerFooter"]';
    this.drawer_close_button =
      'div[data-testid="drawer"] button div[title="Close"]';
  }

  validateAboutSection() {
    cy.get(this.sidebar).should('be.visible').contains('About').click();
  }

  validateCardsSection() {
    cy.get(this.sidebar).should('be.visible').contains('Cards').click();
    cy.url().should('include', '/cards');
    cy.get(this.icon_money).should('have.attr', 'title', 'Money');
    cy.get(this.cards).contains('Revenue');
    cy.get(this.img_card).should('have.attr', 'src', '/chart.png');
  }

  validateDrawerProfile() {
    cy.get(this.drawer_option).click();
    cy.get(this.drawer).should('be.visible');
    cy.get(this.drawer_header).eq(0).should('contain', 'Perfil');
    cy.get(this.drawer_content).contains('Angel David Zavala Bartolome');
    cy.get(this.drawer_content_avatar).should(
      'have.attr',
      'title',
      'AvatarGirl',
    );
    cy.get(this.drawer_footer).should('contain', 'cerrar');
    cy.get(this.drawer_close_button).should('be.visible').click();
  }
}
export default SandBoxAppPage;
