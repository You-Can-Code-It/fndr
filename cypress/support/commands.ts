/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
  namespace Cypress {
    interface Chainable {
      // Add type for our custom command so we can call cy.login() without TS errors
      login(): Chainable<void>;
    }
  }
}

import { encode } from "next-auth/jwt";

// Add a custom command to login
Cypress.Commands.add("login", () => {
  // Intercept the request to the backend for a session, respond with s fake session
  // It can be found in /fixtures/session.json
  cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session");
  // Generate and set a valid cookie from the fixture that next-auth can decrypt
  cy.fixture("session")
    .then((session) => {
      return encode({
        token: session.user,
        secret: Cypress.env("NEXTAUTH_SECRET"),
      });
    })
    .then((encryptedToken) =>
      cy.setCookie("next-auth.session-token", encryptedToken)
    );
});

export {};
