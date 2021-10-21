/// <reference types="cypress" />

class TableComponentPage {
  constructor() {
    //Table Component
    this.table_header_columns = 'div[id=Table_header] [role=columnheader]';
    this.table_body_rows = 'div[id=Table_body] div[role=row]';
    this.table_body_cell_img =
      'div[id="Table_body"] div[role="row"] div[id] div[role="img"]';
    this.table_body_cell = 'div[id="Table_body"] div[role="row"] div[id]';
  }

  tablePlayground() {
    cy.get('label[role="checkbox"] input[id="1"]').should('not.be.checked');
    cy.get(this.table_header_columns).each(($e1, index) => {
      if ($e1.text().includes('Checkbox Unchecked')) {
        cy.get('input[type="checkbox"]')
          .eq(index)
          .check({ force: true })
          .should('be.checked');
      }
      if ($e1.text().includes('Column name')) {
        cy.get(this.table_body_cell_img)
          .eq(index - 1)
          .should('have.attr', 'title', 'AvatarGirl');
        cy.get(this.table_body_cell)
          .eq(index)
          .should('contain', 'Juana Laura Perez')
          .should('contain', 'email@email.com');
      }
      if ($e1.text().includes('Column text')) {
        cy.get(this.table_body_cell).eq(index).should('contain', 'Finanzas');
      }
      if ($e1.text().includes('Column money')) {
        cy.get(this.table_body_cell).eq(index).should('contain', '$3,000.00');
      }
      if ($e1.text().includes('Column status')) {
        cy.get(this.table_body_cell_img)
          .eq(index - 3)
          .should('have.attr', 'title', 'StatusOk');
      }
    });
  }

  tableCompactPlayground() {
    cy.get(this.table_header_columns).each(($e1, index) => {
      if ($e1.text().includes('Column Name')) {
        cy.get(this.table_body_cell)
          .eq(index)
          .should('contain', 'Fernando Gonzalez');
      }
      if ($e1.text().includes('Column Area')) {
        cy.get(this.table_body_cell).eq(index).should('contain', 'Finanzas');
      }
      if ($e1.text().includes('Column Amount')) {
        cy.get(this.table_body_cell).eq(index).should('contain', '$3,000.00');
      }
      if ($e1.text().includes('Column Status')) {
        cy.get(this.table_body_cell_img)
          .eq(index - 6)
          .should('have.attr', 'title', 'StatusOk');
      }
    });
  }
}
export default TableComponentPage;
