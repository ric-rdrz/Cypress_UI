import SandBoxAppPage from './page_objects/SandBoxAppPage.js';
import '@percy/cypress';

const SandBox = new SandBoxAppPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe('Visual Tests Component Sandbox', () => {
  beforeEach(() => {
    let { SBloginURL } = Cypress.env();
    cy.visit(SBloginURL, {
      auth: {
        username: DSuser,
        password: DSpass,
      },
    });
    cy.setCookie('username', DSuser);
    cy.setCookie('password', DSpass);
  });

  it('Validate click on About', () => {
    SandBox.validateAboutSection();
    cy.percySnapshot('aboutSB');
  });
  it('Validate click on the card option', () => {
    SandBox.validateCardsSection();
    cy.percySnapshot('cardsSB');
  });

  it('Validate show drawer component', () => {
    SandBox.validateDrawerProfile();
    cy.percySnapshot('drawerSB');
  });
});
