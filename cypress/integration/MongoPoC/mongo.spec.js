describe('TEST SCENARIO: Conncect Cypress with Mongo DB', () => {
  it('TC#01: Get all documents from github_prs collection', () => {
    cy.task('getAllDocuments', 'github_prs').then((data) => {
      expect(data).not.to.be.empty;
      cy.log(data[16].baseRefName);
    });
  });

  it('TC#02: Get all documents from github_repos collection', () => {
    cy.task('getAllDocuments', 'github_repos').then((data) => {
      expect(data).not.to.be.empty;
      cy.log(data[16].description);
    });
  });

  it('TC#03: Get specific document from github_repos collection', () => {
    const condition = {
      name: 'frontend-apps',
    };
    cy.task('getSpecificDocument', {
      collection_name: 'github_repos',
      condition: condition,
    }).then((data) => {
      expect(data).not.to.be.empty;
      cy.log(data);
    });
  });

  after(() => {
    cy.task('closeMongoConexion');
  });
});
