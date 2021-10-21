import selectComponentPage from './page_objects/InputsComponentPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const selectPage = new selectComponentPage();
const Menu = new MenuPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe(
  'Visual Tests Select Components',
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
      Menu.elementSelect('Select');
    });

    it('TC#01 Validate Functionality Select employees', () => {
      cy.fixture('/DesignSystem/select.txt').then((data) => {
        Menu.fillDataPlayground(data, 0);
      });
      selectPage.inputSelect();
    });

    it('TC#02 Validate Functionality Select option with subtitles', () => {
      selectPage.inputSelectwithSubtitles();
    });

    it('TC#03 Validate Functionality Select option with spinner', () => {
      selectPage.inputSelectwithSpinner();
    });

    it('TC#04 Validate Functionality Select option with Status', () => {
      selectPage.inputSelectwithStatus();
    });

    it('TC#05 Validate Functionality Select disabled', () => {
      cy.fixture('/DesignSystem/select_disabled.txt').then((data) => {
        Menu.fillDataPlayground(data, 0);
      });
      selectPage.inputSelectDisabled();
    });

    it('TC#06 Validate Functionality Select Focus and Blur', () => {
      cy.fixture('/DesignSystem/select_focus_blur.txt').then((data) => {
        Menu.fillDataPlayground(data, 0);
      });
      selectPage.inputSelectFocusBlur();
    });

    it('TC#07 Validate Functionality Select Override', () => {
      cy.fixture('/DesignSystem/OverrideStyles/select.txt').then((data) => {
        Menu.fillDataPlayground(data, 0);
      });
      cy.percySnapshot('select');
    });

  },
);
