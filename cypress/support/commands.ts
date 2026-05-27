/// <reference types="cypress" />
export {};
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
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(
    "selectAlgorithm",
    (optionValue: string, optionText?: string) => {
        cy.get(".algorithmSelector").select(optionText ?? optionValue);
        cy.url().should("include", `algorithm=${optionValue}`);
        cy.get(".algorithmSelector").should("have.value", optionValue);
    }
);

Cypress.Commands.add("checkForAllAlgorithms", (check: () => void) => {
    cy.get(".algorithmSelector").then((algorithmSelector) => {
        algorithmSelector.find("option").each(function () {
            expect(this.ownerDocument.defaultView).to.not.be.undefined;
            // Test fails if anchorElement.ownerDocument.defaultView is undefined, hence not null assertion
            if (
                this instanceof
                    this.ownerDocument.defaultView!.HTMLOptionElement &&
                !this.disabled
            ) {
                cy.selectAlgorithm(this.value);
                check();
            }
        });
    });
});

Cypress.Commands.add("checkForAllPages", (check: () => void) => {
    cy.visit("/");
    cy.get(".row div.card")
        .find("a")
        .each((a) => {
            const anchorElement: HTMLElement = a.get(0);
            expect(anchorElement.ownerDocument.defaultView).to.not.be.undefined;
            // Test fails if anchorElement.ownerDocument.defaultView is undefined, hence not null assertion
            if (anchorElement instanceof anchorElement.ownerDocument.defaultView!.HTMLAnchorElement) {
                cy.visit(anchorElement.href);
                cy.url().should("include", anchorElement.href);
                check();
            }
        });
});

declare global {
    namespace Cypress {
        interface Chainable {
            selectAlgorithm(value: string, text?: string): Chainable<void>;
            checkForAllAlgorithms(check: () => void): Chainable<void>;
            checkForAllPages(check: () => void): Chainable<void>;
        }
    }
}
