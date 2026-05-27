const pages: string[] = ["collections.html", "prioqueues.html", "sorting.html"];

describe("Index.html", () => {
    it("Navigates to correct page when clicking link", () => {
        cy.visit("/");
        cy.get(".row div.card").contains("Collections").parent().find("a").click();
        cy.url().should("include", "collections.html");

        cy.visit("/");
        cy.get(".row div.card").contains("Priority Queues").parent().find("a").click();
        cy.url().should("include", "prioqueues.html");

        cy.visit("/");
        cy.get(".row div.card").contains("Sorting").parent().find("a").click();
        cy.url().should("include", "sorting.html");

        cy.visit("/");
        cy.get(".row div.card").contains("Graph").parent().find("a").click();
        cy.url().should("include", "graph.html");
    });
});

describe("General controls and information", () => {
    it("Node size and animation speed does not have empty values", () => {
        cy.checkForAllPages(() => {
            cy.checkForAllAlgorithms(() => {
                cy.get(".objectSize").should("not.have.value", "");
                cy.get(".animationSpeed").should("not.have.value", "");
            });
        });
    });

    it("Selecting different node sizes should work", () => {
        cy.checkForAllPages(() => {
            cy.checkForAllAlgorithms(() => {
                const nodeSizes = ["Tiny", "Small", "Medium", "Large", "Huge"]
                for (let size of nodeSizes) {
                    cy.get(".objectSize").select(size)
                    cy.get(".objectSize").find(":selected").should("contain.text", size)
                }
                    
            })
        })
    });

    it("Canvas should contain information text on load", () => {
        cy.checkForAllPages(() => {
            cy.checkForAllAlgorithms(() => {
                cy.get("svg")
                    .first()
                    .children()
                    .filter("text")
                    .then((texts) => {
                        cy.wrap(texts.filter(".message")).invoke("text").should("not.be.undefined");
                        cy.wrap(texts.filter(".title")).should(
                            "have.text",
                            "Select an action from the menu above"
                        );
                        cy.wrap(texts.filter(".printer")).should(
                            "have.text",
                            "\u00A0"
                        );
                        cy.wrap(texts.filter(".status-report")).should(
                            "have.text",
                            "Idle"
                        );
                    });
            });
        });
    });
});
