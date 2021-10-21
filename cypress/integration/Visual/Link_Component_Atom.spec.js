import AtomComponentAPage from './page_objects/AtomComponentAPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const LinkPage = new AtomComponentAPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const Menu = new MenuPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe('Visual Tests Link Component', () => {
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

    Menu.elementSelect('Link');
  });

  it('Link Functionality in Playground DS', () => {
    LinkPage.linkPlayground();
    cy.fixture('/DesignSystem/link.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
      LinkPage.linkPlayground2();
    });
    cy.percySnapshot('link');
  });

  it('Link Override Functionality in Playground DS', () => {
    cy.fixture('/DesignSystem/OverrideStyles/Link.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
      LinkPage.linkOverridePlayground();
    });
    cy.percySnapshot('link_override');
  });
});
