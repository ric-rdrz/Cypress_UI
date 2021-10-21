import TooltipComponentPage from './page_objects/TooltipComponentPage.js';
import MenuPage from './page_objects/MenuPage.js';
import '@percy/cypress';

const TooltipPage = new TooltipComponentPage();
const DSloginUrl = Cypress.env('DSloginUrl');
const Menu = new MenuPage();
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe(
  'Visual Tests Tooltip Component',
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
      Menu.elementSelect('Tooltip');
    });

    it('Tooltip Functionality in Playground DS', () => {
      cy.fixture('/DesignSystem/tooltip.txt').then((data) => {
        Menu.fillDataPlaygroundSingle(data);
        TooltipPage.tooltipPlayground();
      });
    });
  },
);
