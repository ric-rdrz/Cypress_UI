describe('TEST SCENARIO: Validate Collections GitHub repos', () => {
  it('TC#01: Get total repos from github_repos collection', () => {
    cy.task('countDocument', 'github_repos').then((data) => {
      cy.log(data).should('greaterThan', 39);
    });
  });

  it('TC#02: Get params from github_repos collection', () => {
    const condition = {
      name: 'engops-metric-aggregator',
    };
    cy.task('getSpecificDocument', {
      collection_name: 'github_repos',
      condition: condition,
    }).then((data) => {
      expect(data[0]).property('description');
      expect(data[0]).property('name');
      expect(data[0]).property('pushedAt');
      expect(data[0]).property('updatedAt');
      expect(data[0]).property('url');
      expect(data[0].name).to.equal('engops-metric-aggregator');
    });
  });

  it('TC#03: Get params from github_prs collection', () => {
    const condition = {
      repositoryName: 'engops-metric-aggregator',
      id: 'MDExOlB1bGxSZXF1ZXN0NjI0NDc1NjQ0',
    };
    cy.task('getSpecificDocument', {
      collection_name: 'github_prs',
      condition: condition,
    }).then((data) => {
      expect(data[0]).property('baseRefName');
      expect(data[0]).property('commitToMergeTime');
      expect(data[0]).property('commitToMergeTimeRaw');
      expect(data[0]).property('publishToReviewTime');
      expect(data[0]).property('publishToReviewTimeRaw');
      expect(data[0].commitToMergeTime).to.equal(13);
      expect(data[0].commitToMergeTimeRaw).to.equal(1206426);
      expect(data[0].publishToReviewTime).to.equal(3);
      expect(data[0].publishToReviewTimeRaw).to.equal(263188);
      expect(data[0].state).to.equal('MERGED');
    });
  });

  after(() => {
    cy.task('closeMongoConexion');
  });
});
