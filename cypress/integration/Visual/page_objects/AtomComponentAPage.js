/// <reference types="cypress" />

class AtomComponentAPage {
  constructor() {
    this.section_preview = 'div[data-testid="live-preview"]';
    this.sidebar_component_option =
      'div[data-testid="sidebar"] [data-testid="nav-group"] [data-testid="nav-group-links"]';
    //Avatar Component
    this.avatar_id = 'div[role="img"][id]';
    //Chip Component
    this.svg_preview = 'div[data-testid="live-preview"] svg';
    //Button Component
    this.button_with_icons = 'button[id][color="orange"] div[role="img"]';
    //Switch Component
    this.first_toggle_label = 'label[for="switchTest1"]';
    this.first_toggle_input =
      'input[type="checkbox"][role="switch"][name="switchTest"][value="1"]';
    this.second_toggle_label = 'label[for="switchTest2"]';
    this.second_toggle_input =
      'input[type="checkbox"][role="switch"][name="switchTest"][value="2"]';
    this.third_toggle_label = 'label[for="switchTest3"]';
    this.fourth_toggle_label = 'label[for="switchTest4"]';
    this.five_toggle_input = 'input[id="switchTestDisabled1"]';
    this.six_toggle_input = 'input[id="switchTestDisabled2"]';
  }

  avatarPlayground() {
    cy.get(this.avatar_id).eq(5).should('contain', 'Girl-1');
    cy.get(this.avatar_id).eq(14).should('contain', 'Boy-1');
  }

  linkPlayground() {
    cy.contains('Simple link without icon')
      .invoke('removeAttr', 'target')
      .click();
    cy.url().should('contain', '/Link');
  }

  linkPlayground2() {
    cy.contains('Si necesita ayuda haga clic aqui')
      .invoke('removeAttr', 'target')
      .click();
    cy.url().should('contain', '/Link#');
    cy.contains('ACCESO A LA INFORMACION')
      .invoke('removeAttr', 'target')
      .should('have.attr', 'href', 'https://www.google.com/');
  }

  linkOverridePlayground() {
    cy.contains('Simple link without icon')
      .invoke('removeAttr', 'target')
      .click();
  }

  chipPlayground() {
    cy.get(this.svg_preview).eq(0).click().click();
    cy.get(this.section_preview).should('contain', '2');
  }

  chipPlayground2() {
    cy.get(this.svg_preview).eq(3).click();
    cy.get(this.section_preview).should('contain', '0');
  }

  cardPlaygroundBasic() {
    cy.get(this.sidebar_component_option)
      .should('be.visible')
      .contains('Card')
      .click();
  }

  buttonPlayground() {
    cy.get(this.section_preview)
      .contains('BUTTON_1')
      .should('be.visible')
      .trigger('mouseover', { bubbles: false });
    cy.get(this.section_preview).contains('BUTTON_2').should('be.disabled');
    cy.get(this.button_with_icons).eq(0).should('be.visible');
    cy.get(this.button_with_icons).eq(1).should('be.visible');
    cy.get('button[id="4"][color="orange"]').should('be.visible');
    cy.get('button[id="5"][color="orange"]')
      .should('be.visible')
      .should('be.disabled');
  }

  buttonOverridePlayground() {
    cy.get(this.section_preview)
      .contains('Increase')
      .should('be.visible')
      .trigger('mouseover', { bubbles: false });
  }

  checkPlayground() {
    cy.get('label[role="checkbox"] input[id="2"][value="1"]').should(
      'not.be.checked',
    );
    cy.get('label[role="checkbox"][aria-checked="false"]').eq(0).contains('*');
    cy.get('label[role="checkbox"] input[id="3"][value="2"]').should(
      'be.checked',
    );
    cy.get('label[role="checkbox"] input[id="4"][value="3"]').should(
      'not.be.checked',
    );
    cy.get('label[role="checkbox"]')
      .eq(2)
      .should('contain', 'Nombre del Empleado');
    cy.get('label[role="checkbox"] input[id="4"]').eq(1).should('be.checked');
    cy.get(
      'label[role="checkbox"][aria-checked="mixed"] svg[data-testid="checkbox-incomplete-img"]',
    )
      .contains('Checkbox Incomplete')
      .should('contain', 'Checkbox Incomplete');
    cy.get('label[role="checkbox"][aria-checked="false"]')
      .contains('Pre-aprobar solicitud')
      .should('not.be.disabled');
    cy.get('label[role="checkbox"][aria-checked="mixed"]')
      .contains('Aprobar solicitud')
      .should('not.be.disabled');
    cy.get('label[role="checkbox"][aria-checked="true"]')
      .contains('Cancelar solicitud')
      .should('not.be.disabled');
    cy.get('input[id="2"][type="checkbox"][name="employees_names"]').check(
      { force: true },
      '1',
    );
    cy.get('input[id="3"][type="checkbox"][name="employees_names"]').uncheck(
      { force: true },
      '2',
    );
    cy.get('input[id="4"][type="checkbox"][name="employees_names"]').check(
      { force: true },
      '3',
    );
  }

  iconPlayground() {
    cy.get('div[id][role="img"]')
      .eq(0)
      .should('have.attr', 'title', 'AbsenceAlt');
  }

  iconButtonPlayground() {
    cy.get('button[id] div[role="img"]')
      .eq(4)
      .should('have.attr', 'title', 'Add')
      .should('be.visible')
      .trigger('mouseover', { bubbles: false });
  }

  radioPlayground() {
    cy.get('input[type="radio"][id="radio-test1"]').should('not.be.checked');
    cy.get('input[type="radio"][id="radio-test2"]').should('not.be.checked');
    cy.get('input[type="radio"][id="radio-test2-5"]').should('not.be.checked');
    cy.get('input[type="radio"][id="radio-test3"]').should('be.disabled');
    cy.get('input[type="radio"][id="radio-test4"]')
      .should('be.checked')
      .should('be.disabled');

    cy.get('input[type="radio"][id="radio-test1"]')
      .check({ force: true }, 'test1')
      .should('be.checked');
    cy.get('input[type="radio"][id="radio-test2"]').check(
      { force: true },
      'test2',
    );
    cy.get('input[type="radio"][id="radio-test2-5"]')
      .check({ force: true }, 'test2-5')
      .should('be.checked');
    cy.get(this.section_preview).contains('FECHA de antigüedad de contrato');
  }

  switchPlayground() {
    cy.get(this.first_toggle_label)
      .should('be.visible')
      .should('not.be.checked');
    cy.get(this.second_toggle_label).should('be.visible');
    cy.get(this.second_toggle_input).should('be.checked');
    cy.get(this.third_toggle_label)
      .should('be.visible')
      .should('not.be.checked');
    cy.get(this.fourth_toggle_label).should('be.visible');
    cy.get(this.five_toggle_input)
      .should('be.disabled')
      .should('not.be.checked');
    cy.get(this.six_toggle_input).should('be.disabled').should('be.checked');
    cy.get(this.first_toggle_input)
      .check({ force: true }, '1')
      .should('be.checked');
    cy.get(this.second_toggle_input).check({ force: true }, '2');
  }

  actionPlayground() {
    cy.get(this.section_preview).contains('Icon left').should('be.visible');

    cy.get('button[id="action_2"]')
      .should('contain', 'Icon left')
      .should('have.css', 'color', 'rgb(122, 111, 240)') //Purple #7A6FF0
      .realHover()
      .should('have.css', 'color', 'rgb(246, 166, 35)') //Orange #F6A623
      .click();
    cy.get('button[id="action_3"] div')
      .should('have.attr', 'title', 'Company')
      .click();

    cy.get('button[id="action_5"]')
      .should('contain', 'Comprobantes')
      .should('have.attr', 'href', '/Action');
    cy.get('button[id="action_5"] div')
      .should('have.attr', 'title', 'DownloadXml')
      .realHover();

    cy.get('a[id="action_4"]')
      .should('contain', 'DOWNLOAD')
      .should('have.attr', 'href', '/Action');
    cy.get('a[id="action_4"] div')
      .should('have.attr', 'title', 'DownloadZip')
      .realHover();

    cy.get('button[id="action_8"]')
      .should('contain', 'Custom Action')
      .should('have.css', 'color', 'rgb(246, 166, 35)') //Orange #F6A623
      .realHover()
      .should('have.css', 'color', 'rgb(2, 206, 255)') //Blue #02CEFF
      .click();
    cy.get('button[id="action_8"] div').should('have.attr', 'title', 'Trash');
  }

  textPlayground() {
    cy.get('div[data-testid="live-preview"] h1')
      .should('have.css', 'font-size', '56px')
      .and('have.css', 'line-height', '64px')
      .and('have.css', 'font-weight', '700');

    cy.get('h2[id="2"]')
      .should('have.css', 'font-size', '48px')
      .and('have.css', 'line-height', '56px')
      .and('have.css', 'font-weight', '700')
      .and('have.attr', 'for', 'dos');

    cy.get('h3[id="3"]')
      .should('have.css', 'font-size', '32px')
      .and('have.css', 'line-height', '40px')
      .and('have.css', 'font-weight', '500')
      .and('have.attr', 'for', 'tres')
      .and('have.css', 'text-overflow', 'ellipsis');

    cy.get('div[data-testid="live-preview"] h4')
      .should('have.css', 'font-size', '24px')
      .and('have.css', 'line-height', '32px')
      .and('have.css', 'font-weight', '500');

    cy.get('div[data-testid="live-preview"] h5')
      .should('have.css', 'font-size', '18px')
      .and('have.css', 'line-height', '24px')
      .and('have.css', 'font-weight', '700');

    cy.get('div[data-testid="live-preview"] h6')
      .should('have.css', 'font-size', '16px')
      .and('have.css', 'line-height', '24px')
      .and('have.css', 'font-weight', '700');

    cy.get('div[data-testid="live-preview"] p')
      .eq(0)
      .should('have.css', 'font-size', '16px')
      .and('have.css', 'line-height', '24px')
      .and('have.css', 'font-weight', '400');

    cy.get('p[id="4"]')
      .should('have.css', 'font-size', '14px')
      .and('have.css', 'line-height', '16px')
      .and('have.css', 'font-weight', '700')
      .and('have.css', 'letter-spacing', '0.3px')
      .and('have.attr', 'for', 'subtitulo');

    cy.get('div[data-testid="live-preview"] span')
      .should('have.css', 'font-size', '14px')
      .and('have.css', 'line-height', '16px')
      .and('have.css', 'font-weight', '500')
      .and('have.css', 'letter-spacing', '0.15px')
      .and('have.css', 'text-transform', 'uppercase');

    cy.get('div[data-testid="live-preview"] p')
      .eq(2)
      .should('have.css', 'font-size', '14px')
      .and('have.css', 'line-height', '16px')
      .and('have.css', 'font-weight', '400');

    cy.get('div[data-testid="live-preview"] p')
      .eq(3)
      .should('have.css', 'font-size', '12px')
      .and('have.css', 'line-height', '16px')
      .and('have.css', 'font-weight', '500')
      .and('have.css', 'letter-spacing', '0.25px');

    cy.get('div[data-testid="live-preview"] p')
      .eq(4)
      .should('have.css', 'font-size', '10px')
      .and('have.css', 'line-height', '16px')
      .and('have.css', 'font-weight', '400')
      .and('have.css', 'letter-spacing', '1.25px')
      .and('have.css', 'text-transform', 'uppercase');
  }

  spinnerPlayground() {
    cy.get('span[id="0"]').should('have.css', 'height', '8px');
    cy.get('span[id="1"]').should('have.css', 'height', '16px');
    cy.get('span[id="2"]')
      .should('have.css', 'height', '24px')
      .and('have.css', 'background-color', 'rgb(0, 128, 0)');
    cy.get('span[id="3"]').should('have.css', 'height', '32px');
    cy.get('span[id="4"]').should('have.css', 'height', '40px');
    cy.get('span[id="5"]').should('have.css', 'height', '120px');
    cy.get('span[id="5"] svg g path')
      .eq(1)
      .should('have.css', 'fill', 'rgb(122, 111, 240)');
    cy.get('span[id="5"] svg g path')
      .eq(2)
      .should('have.css', 'fill', 'rgb(122, 111, 240)');
  }
}
export default AtomComponentAPage;
