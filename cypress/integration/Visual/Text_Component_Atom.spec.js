import AtomComponentAPage from './page_objects/AtomComponentAPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const TextPage = new AtomComponentAPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const Menu = new MenuPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe('Visual Tests Text Component', () => {
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
    Menu.elementSelect('Text');
  });

  it('Text Component in Playground DS', () => {
    cy.fixture('/DesignSystem/text.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
      TextPage.textPlayground();
      cy.percySnapshot('text');
    });
  });
});
