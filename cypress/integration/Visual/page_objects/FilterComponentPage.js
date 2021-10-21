/// <reference types="cypress" />

class FilterComponentPage {
  filterPlayground() {
    cy.get('div[id="filter_id"]').should(
      'have.css',
      'border-color',
      'rgb(122, 111, 240)',
    );

    cy.get('div[id="filter_id"] [id="section_1"]')
      .should('contain', 'Filtros(2)')
      .and('contain', 'Limpiar filtros');
    cy.get('div[id="filter_id"] [id="section_1"] button').should('be.visible');

    cy.get('div[id="filter_id"] [id="section_2"]').should(
      'contain',
      'Orden ascendente',
    );

    cy.get('div[id="filter_id"] [id="section_2"] button div').should(
      'have.attr',
      'title',
      'SortAscending',
    );

    cy.get('div[id="filter_id"] [id="section_3"] div div')
      .eq(0)
      .should('have.attr', 'title', 'Search');

    cy.get('div[id="content_1"] button').should(
      'contain',
      'Primer categoria(1)',
    );
    cy.get('div[id="content_1"] button div').should(
      'have.attr',
      'title',
      'ChevronUp',
    );
    cy.get('div[id="content_1"] div label[role="checkbox"]')
      .should('contain', 'Option 1')
      .and('contain', 'Option 2');

    cy.get('div[id="filter_id"] div[id=footer]')
      .should('contain', 'Cancelar')
      .should('contain', 'Apply');

    cy.get('div[id="cat_2"] button').should('be.visible').click();
    cy.get('input[id="check1-collapsed"][type="checkbox"]').check({
      force: true,
    });
    cy.get('div[id="cat_2"] button').click();
    cy.get('div[id="footer"] button div[title="Checked"]')
      .realHover()
      .should('have.css', 'color', 'rgb(122, 111, 240)') //Purple #7A6FF0
      .click();

    cy.get('div[id="footer"] button div[title="Close"]')
      .click()
      .realHover()
      .should('have.css', 'color', 'rgb(247, 95, 95)') //Red Error ##F75F5F
      .click();
  }

  filterPlaygroundRunaPop() {
    cy.get(
      'div[data-testid="live-preview"] button div[title="Filter"]',
    ).click();
    cy.get('div[data-tippy-root]').should('contain', 'Filters (1)');
    cy.get('div[data-tippy-root] div[title="Close"]').eq(1).click();
    cy.get(
      'div[data-testid="live-preview"] button div[title="Filter"]',
    ).click();
    cy.get('div[data-testid="live-preview"]').eq(1).click();
  }
}
export default FilterComponentPage;
