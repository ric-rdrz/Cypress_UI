import inputsComponentPage from './page_objects/InputsComponentPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const InputsPage = new inputsComponentPage();
const Menu = new MenuPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe(
  'Visual Tests Inputs Components',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
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

      Menu.elementSelect('Inputs');

      cy.fixture('/DesignSystem/inputs.txt').then((data) => {
        Menu.fillDataPlayground(data, 1);
      });

      cy.fixture('/DesignSystem/inputs_focus_blur.txt').then((data) => {
        Menu.fillDataPlayground(data, 2);
      });

      cy.fixture('/DesignSystem/OverrideStyles/inputs.txt').then((data) => {
        Menu.fillDataPlayground(data, 4);
      });
    });

    it('Validate Functionality Inputs simple', () => {
      InputsPage.inputPlayground();
    });
  },
);
