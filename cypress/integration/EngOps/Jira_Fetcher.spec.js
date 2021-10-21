describe('TEST SCENARIO: Validate jira_issues Collections ', () => {
  let firstProj;
  let secondProj;
  let thirdProj;
  let fourthProj;
  let fifthProj;
  let sixthProj;

  before(() => {
    cy.fixture('EngOps/ProjectsJira.json').then((project) => {
      firstProj = project[0];
      secondProj = project[1];
      thirdProj = project[2];
      fourthProj = project[3];
      fifthProj = project[4];
      sixthProj = project[5];
    });
  });
  it('TC#01: Get projects in jira issues', () => {
    cy.task('distinctDocument', {
      collection_name: 'jira_issues',
      field: 'projectName',
    }).then((data) => {
      cy.log(data)
        .should('contain', 'CS Engineering')
        .should('contain', 'Desarrollo Customer Support')
        .should('contain', 'Employees V2')
        .should('contain', 'Events 2.0')
        .should('contain', 'Payroll 1.0')
        .should('contain', 'Payroll 2.0')
        .should('contain', 'Runa Core Platform')
        .should('contain', 'SRE and Release')
        .should('contain', 'Tech Area Improvement and Innovation');
    });
  });

  it('TC#02: Validate Delta and DeltaRaw params from jira_issues collection', () => {
    const condition = {
      project: firstProj.project,
      key: 'PT-1607',
      type: 'Story',
      'changelog.to': 'Open',
      status: 'Done',
    };

    const viewers = {
      projectName: 1,
      key: 1,
      squads: 1,
      status: 1,
      changelog: 1,
      type: 1,
    };
    cy.task('getSpecificDocumentViewer', {
      collection_name: 'jira_issues',
      condition: condition,
      viewers: viewers,
    }).then((data) => {
      expect(data[0]).property('projectName');
      expect(data[0]).property('squads');
      expect(data[0]).property('status');

      expect(data[0].squads[0]).to.equal('DevX');
      expect(data[0].changelog[0].delta).to.equal(1.9); //From Open to In Progress
      expect(data[0].changelog[0].deltaRaw).to.equal(164419828);
      expect(data[0].changelog[6].delta).to.equal(0.71); // From Review to Ready for QA
      expect(data[0].changelog[6].deltaRaw).to.equal(61071112);
      expect(data[0].changelog[11].delta).to.equal(4.92); //from Ready for QA to Done
      expect(data[0].changelog[11].deltaRaw).to.equal(425076426);
      expect(data[0].changelog[13].delta).to.equal(1.2); //from Done to Done
      expect(data[0].changelog[13].deltaRaw).to.equal(103675494);
      cy.log(data[0].key);
    });
  });

  it('TC#03: Validate Status params from Jira issues', () => {
    const condition = {
      project: firstProj.project,
      key: 'PT-1397',
      type: 'Story',
      status: 'Done',
    };

    const viewers = {
      projectName: 1,
      key: 1,
      squads: 1,
      status: 1,
      changelog: 1,
      type: 1,
    };
    cy.task('getSpecificDocumentViewer', {
      collection_name: 'jira_issues',
      condition: condition,
      viewers: viewers,
    }).then((data) => {
      expect(data[0].changelog[0].from).to.contain('Open');
      expect(data[0].changelog[1].from).to.contain('In Progress');
      expect(data[0].changelog[2].from).to.contain('Review');
      expect(data[0].changelog[3].from).to.contain('Ready for QA');
      expect(data[0].changelog[4].from).to.contain('In QA');
      expect(data[0].changelog[5].from).to.contain('Ready for Production');
      expect(data[0].changelog[6].from).to.contain('Done');
      cy.log(data[0].key);
    });
  });

  it('TC#04: Get total squads for Platform and Tools project', () => {
    const projectName = {
      project: firstProj.project,
    };
    cy.task('distinctDocument', {
      collection_name: 'jira_issues',
      field: 'squads',
      condition: projectName,
    }).then((data) => {
      cy.log(data).should('contain', 'BFF');
      cy.log(data).should('contain', 'DevX');
    });
  });

  it('TC#05: Get total squads for SRE project', () => {
    const projectName = {
      project: secondProj.project,
    };
    cy.task('distinctDocument', {
      collection_name: 'jira_issues',
      field: 'squads',
      condition: projectName,
    }).then((data) => {
      cy.log(data).should('contain', 'Ultron');
      cy.log(data).should('contain', 'Sentinels');
    });
  });

  it('TC#06: Get total squads for Events project', () => {
    const projectName = {
      project: fifthProj.project,
    };
    cy.task('distinctDocument', {
      collection_name: 'jira_issues',
      field: 'squads',
      condition: projectName,
    }).then((data) => {
      cy.log(data).should('contain', 'Hela');
    });
  });

  it('TC#07: Get total squads for PayrollV2 project', () => {
    const projectName = {
      project: thirdProj.project,
    };
    cy.task('distinctDocument', {
      collection_name: 'jira_issues',
      field: 'squads',
      condition: projectName,
    }).then((data) => {
      cy.log(data).should('contain', 'Mystique');
      cy.log(data).should('contain', 'Thanos');
    });
  });

  it('TC#08: Get total squads for PayrollV1 project', () => {
    const projectName = {
      project: fourthProj.project,
    };
    cy.task('distinctDocument', {
      collection_name: 'jira_issues',
      field: 'squads',
      condition: projectName,
    }).then((data) => {
      cy.log(data).should('contain', '4 Fantasticos');
      cy.log(data).should('contain', 'Skeletor');
    });
  });

  it('TC#09: Get squad for SUPPORT project', () => {
    const projectName = {
      project: sixthProj.project,
    };
    cy.task('distinctDocument', {
      collection_name: 'jira_issues',
      field: 'squads',
      condition: projectName,
    }).then((data) => {
      cy.log(data).should('contain', 'Customer Support');
    });
  });

  after(() => {
    cy.task('closeMongoConexion');
  });
});
