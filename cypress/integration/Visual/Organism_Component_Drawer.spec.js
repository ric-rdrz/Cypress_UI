import DrawerComponentPage from './page_objects/DrawerComponentPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const DrawerPage = new DrawerComponentPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const Menu = new MenuPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe('Visual Tests Drawer Component', () => {
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

    Menu.elementSelect('Drawer');
  });

  it('Validate Template Functionality Drawer Small with buttons', () => {
    cy.fixture('/DesignSystem/drawer_small_w_btns.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
      DrawerPage.drawerPlayground(data, 'small', 'buttons');
    });
    cy.percySnapshot('drawer_small_1');
  });

  it('Validate Template Functionality Drawer Large without buttons', () => {
    cy.fixture('/DesignSystem/drawer_large.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
      DrawerPage.drawerPlayground(data, 'large', 'not_buttons');
    });
  });

  it('Validate Template Functionality Drawer Small without buttons', () => {
    cy.fixture('/DesignSystem/drawer_small.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
      DrawerPage.drawerPlayground(data, 'small', 'not_buttons');
    });
  });

  it('Validate Override Functionality Drawer Large with buttons', () => {
    cy.fixture('/DesignSystem/OverrideStyles/drawer.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
      DrawerPage.drawerOverridePlayground(data, 'large', 'buttons');
    });
  });
  it('Validate Template Functionality Drawer Large with buttons', () => {
    cy.fixture('/DesignSystem/drawer_large_w_btns.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
      DrawerPage.drawerPlayground(data, 'large', 'buttons');
    });
  });
});
