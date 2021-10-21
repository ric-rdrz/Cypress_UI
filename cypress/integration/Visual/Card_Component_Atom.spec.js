import AtomComponentAPage from './page_objects/AtomComponentAPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const CardPage = new AtomComponentAPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const Menu = new MenuPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe(
  'Visual Tests Card Component',
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
      cy.setCookie('username', DSuser);
      cy.setCookie('password', DSpass);

      Menu.elementSelect('Card');
      cy.fixture('/DesignSystem/card_basic.txt').then((data) => {
        Menu.fillDataPlayground(data, 0);
      });
      cy.fixture('/DesignSystem/card_grid.txt').then((data) => {
        Menu.fillDataPlayground(data, 1);
      });
    });

    it('Card Functionality in Playground DS', () => {
      CardPage.cardPlaygroundBasic();

      cy.percySnapshot('Card');
    });

    it('Card Override Functionality in Playground DS', () => {
      cy.fixture('/DesignSystem/OverrideStyles/card.txt').then((data) => {
        Menu.fillDataPlayground(data, 0);
      });
    });

    it('Text and Container Override Functionality in Playground DS', () => {
      cy.fixture('/DesignSystem/OverrideStyles/container.txt').then((data) => {
        Menu.fillDataPlayground(data, 1);
      });
      cy.percySnapshot('Card_override');
    });
  },
);
