import FilterComponentPage from './page_objects/FilterComponentPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const FilterPage = new FilterComponentPage();
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

    Menu.elementSelect('Filter');
  });

  it('Validate Functionality Filter Plane Solo', () => {
    cy.fixture('/DesignSystem/filter.txt').then((data) => {
      Menu.fillDataPlayground(data, 0);
      FilterPage.filterPlayground(data);
    });
  });

  it('Validate Functionality Filter RunaPop', () => {
    FilterPage.filterPlaygroundRunaPop();
    cy.percySnapshot('filter');
  });

  it('Validate Override Functionality Filter Plane', () => {
    cy.fixture('/DesignSystem/OverrideStyles/filter.txt').then((data) => {
      Menu.fillDataPlayground(data, 0);
      cy.percySnapshot('filter_1');
    });
  });
});
