import DesignSystemPage from './page_objects/DesignSystemPage.js';

const Playground = new DesignSystemPage();
const DSloginUrl = Cypress.env('DSloginUrl');
let snipet_hidden;
let snipet_visible;
const DSuser = Cypress.env('DSuser');
const DSpass = Cypress.env('DSpass');

describe('Responsive Tests Hidden Components', () => {
  before(() => {
    cy.fixture('/DesignSystem/hidden.txt').then((data) => {
      snipet_hidden = data;
    });
    cy.fixture('/DesignSystem/visible.txt').then((data) => {
      snipet_visible = data;
    });
    cy.visit(DSloginUrl, {
      auth: {
        username: DSuser,
        password: DSpass,
      },
    });
    cy.setCookie('username', DSuser);
    cy.setCookie('password', DSpass);
    cy.get('div[data-testid="sidebar"]')
      .should('be.visible')
      .contains('Components')
      .click();
    cy.get(
      'div[data-testid="sidebar"] [data-testid="nav-group"] [data-testid="nav-group-links"]',
    ).should('be.visible');
  });

  context('1920 Desktop Ultra Wide', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
    });
    it('Hidden xl button Component Desktop Ultra Wide', () => {
      Playground.hiddenPlayground(snipet_hidden);
      cy.get('div[data-testid="live-preview"]').should(($buttons) => {
        expect($buttons).to.contain('Should hide on xs');
        expect($buttons).to.contain('Should hide on sm');
        expect($buttons).to.contain('Should hide on md');
        expect($buttons).to.contain('Should hide on lg');
      });
      cy.percySnapshot('hidden_xl');
    });
    it('Visible xl button Component Desktop Ultra Wide', () => {
      Playground.visiblePlayground(snipet_visible);
      cy.get('div[data-testid="live-preview"]').should(($buttons) => {
        expect($buttons).to.contain('Should be visible on xl');
      });
      cy.percySnapshot('visible_xl');
    });
  });

  context('1400 Desktop HD', () => {
    beforeEach(() => {
      cy.viewport(1399, 900); //1 pixel less to 1400 resolution
    });
    it('Hidden lg button Component Desktop HD', () => {
      Playground.hiddenPlayground(snipet_hidden);
      cy.get('div[data-testid="live-preview"]').should(($buttons) => {
        expect($buttons).to.contain('Should hide on xs');
        expect($buttons).to.contain('Should hide on sm');
        expect($buttons).to.contain('Should hide on md');
        expect($buttons).to.contain('Should hide on xl');
      });
      cy.percySnapshot('hidden_lg');
    });

    it('Visible lg button Component Desktop HD', () => {
      Playground.visiblePlayground(snipet_visible);
      cy.get('div[data-testid="live-preview"]').should(($buttons) => {
        expect($buttons).to.contain('Should be visible on lg');
      });
      cy.percySnapshot('visible_lg');
    });
  });

  context('1024 Desktop', () => {
    beforeEach(() => {
      cy.viewport(1023, 768); //1 pixel less to 1024 resolution
    });
    it('Hidden md button Component Desktop', () => {
      Playground.hiddenPlayground(snipet_hidden);
      cy.get('div[data-testid="live-preview"]').should(($buttons) => {
        expect($buttons).to.contain('Should hide on xs');
        expect($buttons).to.contain('Should hide on sm');
        expect($buttons).to.contain('Should hide on lg');
        expect($buttons).to.contain('Should hide on xl');
      });
      cy.percySnapshot('hidden_md');
    });
    it('Visible md button Component Desktop', () => {
      Playground.visiblePlayground(snipet_visible);
      cy.get('div[data-testid="live-preview"]').should(($buttons) => {
        expect($buttons).to.contain('Should be visible on md');
      });
      cy.percySnapshot('visible_md');
    });
  });

  context('768 Tablet', () => {
    beforeEach(() => {
      cy.viewport(767, 768); //1 pixel less to 768 resolution
    });
    it('Hidden sm button Component Tablet', () => {
      Playground.hiddenPlaygroundMobile(snipet_hidden);
      cy.get('div[data-testid="live-preview"]').should(($buttons) => {
        expect($buttons).to.contain('Should hide on xs');
        expect($buttons).to.contain('Should hide on md');
        expect($buttons).to.contain('Should hide on xl');
        expect($buttons).to.contain('Should hide on lg');
      });
      cy.percySnapshot('hidden_sm');
    });
    it('Visible sm button Component Tablet', () => {
      Playground.visiblePlaygroundMobile(snipet_visible);
      cy.get('div[data-testid="live-preview"]').should(($buttons) => {
        expect($buttons).to.contain('Should be visible on sm');
      });
      cy.percySnapshot('visible_sm');
    });
  });

  context('320 Mobile', () => {
    beforeEach(() => {
      cy.viewport(319, 568); //1 pixel less to 320 resolution
    });
    it('Hidden xs button Component Mobile', () => {
      Playground.hiddenPlaygroundMobile(snipet_hidden);
      cy.get('div[data-testid="live-preview"]').should(($buttons) => {
        expect($buttons).to.contain('Should hide on sm');
        expect($buttons).to.contain('Should hide on md');
        expect($buttons).to.contain('Should hide on xl');
        expect($buttons).to.contain('Should hide on lg');
      });
      cy.percySnapshot('hidden_xs');
    });

    it('Visible xs button Component Mobile', () => {
      Playground.visiblePlaygroundMobile(snipet_visible);
      cy.get('div[data-testid="live-preview"]').should(($buttons) => {
        expect($buttons).to.contain('Should be visible on xs');
      });
      cy.percySnapshot('visible_xs');
    });

    it('Visual Tests Button Mobile', () => {
      cy.fixture('/DesignSystem/button.txt').then((data) => {
        Playground.buttonMobilePlayground(data);
      });
      cy.percySnapshot('buttonMobile');
    });
  });
});
