import AtomComponentAPage from './page_objects/AtomComponentAPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const ChipPage = new AtomComponentAPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const Menu = new MenuPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe(
  'Visual Tests Chip Component',
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

      Menu.elementSelect('Chip');
    });

    it('Chip Functionality in Playground DS', () => {
      cy.fixture('/DesignSystem/chip.txt').then((data) => {
        Menu.fillDataPlaygroundSingle(data);
        ChipPage.chipPlayground();
      });
      cy.fixture('/DesignSystem/chip.txt').then((data) => {
        Menu.fillDataPlaygroundSingle(data);
        ChipPage.chipPlayground2();
      });
      cy.percySnapshot('Chip');
    });

    it('Chip Override Functionality in Playground DS', () => {
      cy.fixture('/DesignSystem/OverrideStyles/chip.txt').then((data) => {
        Menu.fillDataPlaygroundSingle(data);
      });
      cy.percySnapshot('Chip_override');
    });
  },
);
