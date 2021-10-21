import AtomComponentAPage from './page_objects/AtomComponentAPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const IconsPage = new AtomComponentAPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const Menu = new MenuPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe(
  'Visual Tests Icons Component',
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

      Menu.elementSelect('Icons');
    });

    it('Icons Functionality in Playground DS', () => {
      cy.fixture('/DesignSystem/icons.txt').then((data) => {
        Menu.fillDataPlaygroundSingle(data);
        IconsPage.iconPlayground();
      });
      cy.percySnapshot('Icons');
    });

    it('Icons Override Functionality in Playground DS', () => {
      cy.fixture('/DesignSystem/OverrideStyles/icons.txt').then((data) => {
        Menu.fillDataPlaygroundSingle(data);
      });
      cy.percySnapshot('Icons_override');
    });
  },
);
