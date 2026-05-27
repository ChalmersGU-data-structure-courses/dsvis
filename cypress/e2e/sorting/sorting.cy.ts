describe("Sorting", () => {
    it("Selects correct algorithm", () => {
        cy.visit("sorting.html");
        cy.get(".algorithmSelector")
            .find(":selected")
            .should("contain.text", "Please choose an algorithm");

        cy.selectAlgorithm("MergeSort");
        cy.selectAlgorithm("QuickSort");
        cy.selectAlgorithm("InsertionSort");
        cy.selectAlgorithm("SelectionSort");
    });
});
