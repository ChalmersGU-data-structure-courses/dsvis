describe("BST", () => {
    beforeEach(() => {
        cy.visit("collections.html?algorithm=BST");
    });

    it("Canvas doesn't contain any objects on load", () => {
        cy.get("svg").children().not("text").not("svg").should("have.length", 0);
    });

    it("Inserting first character 'C' adds object with value C as root", () => {
        cy.get("input.insertField").type("C").press(Cypress.Keyboard.Keys.ENTER)
        cy.get("svg").first().find("g").should("have.length", 1).and("have.text", "C")
    });

    it("Animation doesn't run if toggled off", () => {
        cy.get(".toggleRunner").click()
        cy.get("input.insertField").type("C").press(Cypress.Keyboard.Keys.ENTER)
        cy.get("svg").first().find(".status-report").should("have.text", "Paused")
    })
    
    it("Changing animation speed from fastest to slowest increases completion time", () => {
        let fastestDiff: number;
        let slowestDiff: number;
        cy.get(".animationSpeed").select("Fastest").then((element) => {
            const startFastest = Date.now()
            cy.get("input.insertField").type("C").press(Cypress.Keyboard.Keys.ENTER)
            cy.get("svg", { timeout: 10000 }).first().find(".title").should("have.text", "Select an action from the menu above").then(() => {
                fastestDiff = Date.now() - startFastest
            })
        })
        cy.visit("collections.html?algorithm=BST")
        cy.get(".animationSpeed").select("Slow").then((element) => {
            const startSlowest = Date.now()
            cy.get("input.insertField").type("C").press(Cypress.Keyboard.Keys.ENTER)
            cy.get("svg", { timeout: 10000 }).first().find(".title").should("have.text", "Select an action from the menu above").then(() => {
                slowestDiff = Date.now() - startSlowest
            })
        }).then(() => {
            expect(fastestDiff).to.be.lessThan(slowestDiff)
        })
    })

    it("Inserting multiple characters adds all of them", () => {
        const charsToAdd = ["A", "B", "C", "D"]
        cy.get("input.insertField").type(charsToAdd.join(" ")).press(Cypress.Keyboard.Keys.ENTER)
        cy.get(".fastForward").click()
        cy.get("svg").first().find("g").should("have.length", charsToAdd.length).each((element) => {
            const nodeText = element.find("text").text()
            expect(charsToAdd).to.contain(nodeText)
            charsToAdd.splice(charsToAdd.indexOf(nodeText), 1)
        }).then(() => {
            expect(charsToAdd.length).to.equal(0)
        })
    })

    it("Added characters have correct relative x position", () => {
        const charsToAdd = ["B", "H", "D", "C", "A", "F", "G"];
        const nodeMap: { [key: string]: { node: JQuery<HTMLElement>, right?: JQuery<HTMLElement>, left?: JQuery<HTMLElement>}} = {}
        cy.get("input.insertField")
            .type(charsToAdd.join(" "))
            .press(Cypress.Keyboard.Keys.ENTER);
        cy.get(".fastForward")
            .click()
            .then(() => {
                for (let char of charsToAdd) {
                    cy.get("svg")
                        .first()
                        .find("svg")
                        .contains(char, { matchCase: true })
                        .then((element) => {
                            const { left, top } = element.position()
                            const width = element.width()
                            const height = element.height()
                            const cX = roundedCoordinateValue(left + width! / 2)
                            const cY = roundedCoordinateValue(top + height! / 2)
                            const key = cX + ' ' + cY;
                            nodeMap[key] = { node: element }
                        });
                }
            })
            .then(() => {

                cy.get("svg")
                    .first()
                    .find("svg")
                    .find("path")
                    .not(".nullnode")
                    .each((element) => {
                        const { left: leftPos, top: topPos } = element.position()
                        const width = element.width()
                        const height = element.height()
                        const left = roundedCoordinateValue(leftPos)
                        const top = roundedCoordinateValue(topPos)
                        const right = roundedCoordinateValue(leftPos + width!)
                        const bottom = roundedCoordinateValue(topPos + height!)

                        let key = left + ' ' + top;
                        if (nodeMap[key]) {
                            const childKey = right + " " + bottom;
                            if (!nodeMap[childKey]) {
                                throw new Error(
                                    "End of arrow could not be mapped to a node"
                                );
                            }
                            nodeMap[key].right = nodeMap[childKey].node;
                        } else {
                            key = right + " " + top;
                            if (nodeMap[key]) {
                                const childKey = left + " " + bottom;
                                if (!nodeMap[childKey]) {
                                    throw new Error(
                                        "End of arrow could not be mapped to a node"
                                    );
                                }
                                nodeMap[key].left = nodeMap[childKey].node;
                            } else {
                                throw new Error(
                                    "Start of arrow could not be mapped to a node"
                                );
                            }
                        }
                    })
            })
            .then(() => {
                for (let key of Object.keys(nodeMap)) {
                    if (nodeMap[key].left !== undefined) {
                        expect(nodeMap[key].node.text() > nodeMap[key].left!.text()).to.be.true
                    }
                    if (nodeMap[key].right !== undefined) {
                        expect(nodeMap[key].node.text() < nodeMap[key].right!.text()).to.be.true
                    }
                }
            })
    });
});

// Function to round cooridinates so that connections are not missed due to rounding differences
function roundedCoordinateValue(value: number): number {
    return Math.round(value / 10) * 10;
}
