describe("Collections", () => {
    it("Selects correct algorithm", () => {
        cy.visit("collections.html");
        cy.get(".algorithmSelector")
            .find(":selected")
            .should("contain.text", "Please choose a data structure");

        cy.selectAlgorithm("BST", "BST: Binary search tree");
        cy.selectAlgorithm("AVL", "AVL tree");
        cy.selectAlgorithm("RedBlack", "Red-black tree");
        cy.selectAlgorithm("SplayTree", "Splay tree");
        cy.selectAlgorithm("BTree", "B-tree");
        cy.selectAlgorithm("LinkedListAnim", "Linked List");
    });
});
