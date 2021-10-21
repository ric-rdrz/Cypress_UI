import TableComponentPage from './page_objects/TableComponentPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const TablePage = new TableComponentPage();
const Menu = new MenuPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe('Visual Tests Table Components', () => {
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

    Menu.elementSelect('Table');
    cy.fixture('/DesignSystem/table.txt').then((data) => {
      Menu.fillDataPlayground(data, 0);
    });
    cy.fixture('/DesignSystem/table_compact.txt').then((data) => {
      Menu.fillDataPlayground(data, 1);
    });
    cy.fixture('/DesignSystem/OverrideStyles/table.txt').then((data) => {
      Menu.fillDataPlayground(data, 2);
    });
  });

  it('Validate Functionality Table component: Bulks,Avatar,1 and 2 lines label', () => {
    TablePage.tablePlayground();
  });

  it('Validate Functionality Compact Table component: without Bulks, without Avatar', () => {
    TablePage.tableCompactPlayground();
    cy.percySnapshot('table');
  });
});
