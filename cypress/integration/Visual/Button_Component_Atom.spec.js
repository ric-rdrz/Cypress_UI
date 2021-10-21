import AtomComponentAPage from './page_objects/AtomComponentAPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const ButtonPage = new AtomComponentAPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const Menu = new MenuPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe('Visual Tests Button Component', () => {
  before(() => {
    cy.viewport(1023, 768); //1 pixel less to 1024 resolution
    cy.visit(DSloginUrl, {
      auth: {
        username: DSuser,
        password: DSpass,
      },
    });
    cy.setCookie('username', DSuser);
    cy.setCookie('password', DSpass);

    Menu.elementSelect('Button');
    cy.fixture('/DesignSystem/button.txt').then((data) => {
      Menu.fillDataPlayground(data, 0);
    });
    cy.fixture('/DesignSystem/OverrideStyles/button.txt').then((data) => {
      Menu.fillDataPlayground(data, 1);
    });
  });

  it('Button Functionality in Playground DS', () => {
    ButtonPage.buttonPlayground();
  });

  it('Button Override Functionality in Playground DS', () => {
    ButtonPage.buttonOverridePlayground();
    cy.percySnapshot('Button');
  });
});
