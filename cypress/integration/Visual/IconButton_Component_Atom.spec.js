import AtomComponentAPage from './page_objects/AtomComponentAPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const IconsButtonPage = new AtomComponentAPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const Menu = new MenuPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe('Visual Tests IconButton Component', () => {
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

    Menu.elementSelect('Icon Button');
  });

  it('IconButton Functionality in Playground DS', () => {
    cy.fixture('/DesignSystem/iconB.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
      IconsButtonPage.iconButtonPlayground();
    });
    cy.percySnapshot('Icon Button');
  });

  it('IconButton Override Functionality in Playground DS', () => {
    cy.fixture('/DesignSystem/OverrideStyles/iconB.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
    });
    cy.percySnapshot('IconButton_override');
  });
});
