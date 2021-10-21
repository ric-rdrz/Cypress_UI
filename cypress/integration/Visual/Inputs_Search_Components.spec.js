import inputsComponentPage from './page_objects/InputsComponentPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const searchPage = new inputsComponentPage();
const Menu = new MenuPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe('Visual Tests Search Components', () => {
  Cypress.config('pageLoadTimeout', 100000);
  before(() => {
    cy.viewport(1023, 768); //1 pixel less to 1024 resolution
    cy.visit(DSloginUrl, {
      auth: {
        username: DSuser,
        password: DSpass,
      },
    });
    cy.setCookie('username', 'DSuser');
    cy.setCookie('password', 'DSpass');

    Menu.elementSelect('Search');
  });

  it('Validate Functionality Search', () => {
    cy.fixture('/DesignSystem/search.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
    });
    searchPage.inputSearchPlayground();
    cy.percySnapshot('search');
  });

  it('Validate Functionality Search Focus and Blur', () => {
    cy.fixture('/DesignSystem/search_focus.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
    });
    searchPage.inputSearchFocusBlurPlayground();
  });

  it('Validate Functionality Search Override', () => {
    cy.fixture('/DesignSystem/OverrideStyles/search.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
    });
  });

  it('Validate Functionality Search Disabled', () => {
    cy.fixture('/DesignSystem/search_disabled.txt').then((data) => {
      Menu.fillDataPlaygroundSingle(data);
    });
    searchPage.inputSearchDisabledPlayground();
  });
});
