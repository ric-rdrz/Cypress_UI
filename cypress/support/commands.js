// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-localstorage-commands';
import 'cypress-file-upload';
require('cypress-downloadfile/lib/downloadFileCommand');

Cypress.Commands.add('getToken', (api, subdomain, user, password) => {
  cy.request({
    method: 'POST',
    url: `${api}/sessions`,
    body: {
      email: user,
      password: password,
      subdomain: subdomain,
    },
  })
    .its('body.access_token')
    .should('not.be.empty')
    .then((accessToken) => accessToken);
});

Cypress.Commands.add('getRandomValue', (valueLength) => {
  let value = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < valueLength; i++) {
    value += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return value;
});

Cypress.Commands.add('getRandomArbitrary', (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
});

Cypress.Commands.add('form_request', (method, url, token, formData, done) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open(method, url, true);
  xhr.onload = function () {
    done(xhr);
  };
  xhr.setRequestHeader('Authorization', token);
  xhr.send(formData);
});

Cypress.Commands.add('deleteCypressFile', (path) => {
  if (Cypress.platform === 'win32') cy.exec(`DEL /F cypress/${path}`);
  else cy.exec(`rm -f cypress/${path}`);
});

Cypress.Commands.add(
  'fill',
  {
    prevSubject: 'element',
  },
  ($subject, value) => {
    const el = $subject[0];
    el.value = value;
    return cy.wrap($subject).type('t{backspace}', { force: true });
  },
);

Cypress.Commands.add('loginSandbox', () => {
  const SBloginURL = Cypress.env('SBloginURL');
  const DSuser = Cypress.env('DSuser');
  const DSpass = Cypress.env('DSpass');

  cy.visit(SBloginURL, {
    auth: {
      username: DSuser,
      password: DSpass,
    },
  });
  cy.setCookie('username', DSuser);
  cy.setCookie('password', DSpass);
});
