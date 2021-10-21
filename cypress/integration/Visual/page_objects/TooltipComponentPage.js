/// <reference types="cypress" />

class TooltipComponentPage {
  tooltipPlayground() {
    cy.get('div[id="icon_1"]').realHover();
    cy.get('div[data-tippy-root] span p').should(
      'contain',
      'Pst! Runa lo hace automático, asignando un código de asistencia.',
    );
    cy.get('div[data-tippy-root] span').should(
      'have.css',
      'background-color',
      'rgb(234, 234, 252)',
    );

    cy.get('div[id="icon_2"]')
      .should('not.be.enabled')
      .realHover()
      .should('have.attr', 'disabled');

    cy.get('div[id="icon_3"]')
      .should('not.be.enabled')
      .realHover()
      .should('not.have.attr', 'disabled');

    cy.get('div[id="icon_4"]').realHover();
    cy.get('div[data-tippy-root] span p').should(
      'contain',
      'No es posible asignar el usuario Juan Raul Ramirez García con Id=1234',
    );
    cy.get('div[data-tippy-root] span').should(
      'have.css',
      'background-color',
      'rgb(254, 231, 231)',
    );
    cy.percySnapshot('tooltip');
    cy.get('div[id="icon_4"]').click();

    cy.get('div[id="icon_5"]').should('be.visible').click();
    cy.get('div[data-tippy-root] span p').should(
      'contain',
      'Tu puedes validar la nomina haciendo click en...',
    );
    cy.get('div[data-tippy-root] span').should(
      'have.css',
      'background-color',
      'rgb(217, 243, 227)',
    );
    cy.get('div[id="icon_5"]').should('be.visible').click();

    cy.get('div[id="icon_6"]').should('be.visible').click();
    cy.get('div[data-tippy-root] span p').should(
      'contain',
      'Pendiente confirmación de pago',
    );
    cy.get('div[data-tippy-root] span').should(
      'have.css',
      'background-color',
      'rgb(254, 242, 222)',
    );
    cy.get('div[id="icon_6"]').should('be.visible').click();

    cy.get('div[id="icon_7"]').should('be.visible').click();
    cy.get('div[data-tippy-root] span p').should('contain', 'Pago Exitoso');
    cy.get('div[data-tippy-root] span').should(
      'have.css',
      'background-color',
      'rgb(255, 0, 0)',
    );
    cy.get('div[id="icon_7"]').should('be.visible').click();
  }
}
export default TooltipComponentPage;
