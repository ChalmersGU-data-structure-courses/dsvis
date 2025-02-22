
///////////////////////////////////////////////////////////////////////////////
// Import and export information used by the Javascript linter ESLint:
/* globals DSVis */
///////////////////////////////////////////////////////////////////////////////

DSVis.BST = class BST extends DSVis.Engine {
    initialValues;

    initialise(initialValues = null) {
        this.initialValues = DSVis.parseValues(initialValues);
        super.initialise();
    }

    async resetAlgorithm() {
        await super.resetAlgorithm();
        this.treeRoot = null;
        if (this.initialValues) {
            this.State.resetting = true;
            await this.insert(...this.initialValues);
            this.State.resetting = false;
        }
    }

    initToolbar() {
        super.initToolbar();
        this.Toolbar.generalControls.insertAdjacentHTML("beforeend", `
            <span class="formgroup"><label>
                <input class="showNullNodes" type="checkbox"/> Show null nodes
            </label></span>`,
        );
        this.Toolbar.showNullNodes = this.Container.querySelector(".showNullNodes");
        this.Toolbar.showNullNodes.addEventListener("change", () => this.toggleNullNodes());
        this.toggleNullNodes(true);
    }

    toggleNullNodes(show) {
        if (show == null) show = this.Toolbar.showNullNodes.checked;
        this.Toolbar.showNullNodes.checked = show;
        if (show) this.SVG.addClass("shownullnodes");
        else this.SVG.removeClass("shownullnodes");
    }

    newNode(text) {
        return this.SVG.binaryNode(text, ...this.getNodeStart());
    }

    resizeTree() {
        const animate = !this.State.resetting;
        this.treeRoot?.resize(...this.getTreeRoot(), animate);
    }

    async insert(...values) {
        for (const val of values) await this.insertOne(val);
    }

    async find(value) {
        if (!this.treeRoot) {
            await this.pause('general.empty');
            return null;
        }
        await this.pause('find.start', value);
        const found = await this.findHelper(value);
        found.node.setHighlight(true);
        const path = found.success ? 'find.found' : 'find.notfound';
        await this.pause(path, value);
        found.node.setHighlight(false);
        return found;
    }

    async findHelper(value) {
        let parent = null;
        let node = this.treeRoot;
        const pointer = this.SVG.highlightCircle(node.cx(), node.cy());
        while (node) {
            node.setHighlight(true);
            const cmp = DSVis.compare(value, node.getText());
            if (cmp === 0) {
                pointer.remove();
                node.setHighlight(false);
                return {success: true, node: node};
            }
            const direction = cmp < 0 ? "left" : "right";
            node.setChildHighlight(direction, true);
            parent = node;
            node = parent.getChild(direction);
            if (node) pointer.setCenter(node.cx(), node.cy(), true);
            await this.pause('find.look', direction);
            parent.setChildHighlight(direction, false);
        }
        pointer.remove();
        return {success: false, node: parent};
    }

    async insertOne(value) {
        if (!this.treeRoot) {
            this.treeRoot = this.newNode(value);
            await this.pause('insert.newroot', value);
            this.resizeTree();
            await this.pause();
            return {success: true, node: this.treeRoot};
        }
        await this.pause('insert.search', value);
        const found = await this.findHelper(value);
        if (found.success) {
            found.node.setHighlight(true);
            await this.pause('insert.exists', found.node);
            found.node.setHighlight(false);
            return {success: false, node: found.node};
        }
        const child = this.newNode(value);
        const cmp = DSVis.compare(value, found.node.getText());
        const direction = cmp < 0 ? "left" : "right";
        found.node.setChild(direction, child);
        child.setHighlight(true);
        found.node.setChildHighlight(direction, true);
        await this.pause('insert.child', value, direction);
        found.node.setChildHighlight(direction, false);
        child.setHighlight(false);
        this.resizeTree();
        await this.pause();
        return {success: true, node: child};
    }

    async delete(value) {
        if (!this.treeRoot) {
            await this.pause('general.empty');
            return null;
        }
        await this.pause('delete.search', value);
        const found = await this.findHelper(value);
        if (!found.success) {
            found.node.setHighlight(true);
            await this.pause('delete.notexists', value);
            found.node.setHighlight(false);
            const direction = DSVis.compare(value, found.node.getText()) < 0 ? "left" : "right";
            return {success: false, direction: direction, parent: found.node};
        }
        found.node.setHighlight(true);
        await this.pause('delete.found', value);
        return await this.deleteHelper(found.node);
    }

    async deleteHelper(node) {
        if (!(node.getLeft() && node.getRight())) {
            return await this.deleteNode(node);
        }
        const pointer = this.SVG.highlightCircle(node.cx(), node.cy());
        node.setHighlight(false);
        node.addClass("marked");
        await this.pause('delete.predecessor.search', node);

        let predecessor = node.getLeft();
        while (true) {
            predecessor.setParentHighlight(true);
            pointer.setCenter(predecessor.cx(), predecessor.cy(), true);
            await this.pause();
            predecessor.setParentHighlight(false);
            if (!predecessor.getRight()) break;
            predecessor = predecessor.getRight();
        }
        predecessor.setHighlight(true);
        pointer.remove();
        const newText = predecessor.getText();
        const moving = this.SVG.textCircle(newText, predecessor.cx(), predecessor.cy());
        moving.addClass("unfilled");
        moving.setHighlight(true);
        await this.pause('delete.predecessor.replace', node, predecessor);
        moving.setCenter(node.cx(), node.cy(), true);
        node.setText("");
        await this.pause();
        node.setText(newText);
        moving.remove();
        node.removeClass("marked");
        await this.pause('delete.predecessor.delete', predecessor);
        return await this.deleteNode(predecessor);
    }

    async deleteNode(node) {
        // The node will NOT have two children - this has been taken care of by deleteHelper
        const child = node.getLeft() || node.getRight();
        const parent = node.getParent();
        if (!parent) {
            if (!child) {
                this.treeRoot = null;
                await this.pause('delete.root.singleton', node);
            } else {
                this.treeRoot = child;
                await this.pause('delete.root.onechild', child, node);
            }
            node.remove();
            this.resizeTree();
            await this.pause();
            return {success: true, direction: null, parent: null};
        }

        const direction = parent.getLeft() === node ? "left" : "right";
        if (child) {
            node.setHighlight(false);
            if (child === parent.getLeft()?.getLeft()) node.dmoveCenter(-node.getSize(), -node.getSize() / 2, true);
            if (child === parent.getRight()?.getRight()) node.dmoveCenter(node.getSize(), -node.getSize() / 2, true);
            parent.setChild(direction, child);
            child.setHighlight(true);
            parent.setChildHighlight(direction, true);
            await this.pause('delete.redirect', parent, child);
            parent.setChildHighlight(direction, false);
            child.setHighlight(false);
            node.setHighlight(true);
            await this.pause('delete.node', node);
        } else {
            await this.pause('delete.leaf', node);
        }
        node.remove();
        this.resizeTree();
        await this.pause();
        return {success: true, direction: direction, parent: parent};
    }

    async print() {
        if (!this.treeRoot) {
            await this.pause('general.empty');
            return;
        }
        const {x, y} = this.Info.printer.bbox();
        const printed = [this.SVG.text("Printed nodes: ").addClass("printer").x(x).y(y)];
        const pointer = this.SVG.highlightCircle(...this.getNodeStart());
        await this.printHelper(this.treeRoot, pointer, printed);
        pointer.remove();
        await this.pause();
        for (const lbl of printed) lbl.remove();
    }

    async printHelper(node, pointer, printed) {
        pointer.setCenter(node.cx(), node.cy(), true);
        await this.pause();
        if (node.getLeft()) {
            await this.printHelper(node.getLeft(), pointer, printed);
            pointer.setCenter(node.cx(), node.cy(), true);
            await this.pause();
        }
        const lbl = this.SVG.text(node.getText()).center(node.cx(), node.cy());
        await this.pause();
        const last = printed[printed.length - 1];
        const spacing = this.getNodeSpacing() / 2;
        this.animate(lbl).x(last.bbox().x2 + spacing).cy(last.cy());
        printed.push(lbl);
        await this.pause();
        if (node.getRight()) {
            await this.printHelper(node.getRight(), pointer, printed);
            pointer.setCenter(node.cx(), node.cy(), true);
            await this.pause();
        }
    }


    ///////////////////////////////////////////////////////////////////////////////
    // Rotate the tree
    // These are not used by BST, but by self-balancing subclasses
    // The following rotations are implemented:
    //  - Single Rotate: Left and Right (also known as Zig)
    //  - Double Rotate: Left-Right and Right-Left (also known as Zig-Zag)

    async resetHeight(node) {
        // BSTs do not store the height in the nodes, so do nothing
        // This is implemented by, e.g., AVL trees
    }

    async doubleRotate(left, node) {
        // Note: 'left' and 'right' are variables that can have values "left" or "right"!
        const right = left === "left" ? "right" : "left";
        const child = node.getChild(right);
        await this.pause('rotate.zigzag', child, right, node, left);
        await this.singleRotate(right, child);
        return await this.singleRotate(left, node);
    }

    async singleRotate(left, node) {
        // Note: 'left' and 'right' are variables that can have values "left" or "right"!
        // So, if left==="right", then we rotate right.
        const right = left === "left" ? "right" : "left";
        const A = node;
        const B = A.getChild(right);
        const C = B.getChild(left);

        A.setChildHighlight(right, true);
        B.setHighlight(true);
        await this.pause('rotate.single', A, left);

        const parent = A.getParent();
        if (parent) {
            const direction = parent.getLeft() === A ? "left" : "right";
            B.setParent(direction, parent);
        } else {
            this.treeRoot = B;
        }
        A.setChild(right, C);
        B.setChild(left, A);

        B.setChildHighlight(left, true);
        A.setHighlight(true);
        await this.pause();
        this.resizeTree();
        await this.pause();

        B.setChildHighlight(left, false);
        A.setHighlight(false);
        await this.resetHeight(A);
        await this.resetHeight(B);
        return B;
    }

};


DSVis.BST.messages = {
    general: {
        empty: "Tree is empty",
    },
    find: {
        start: (value) => `Searching for ${value}`,
        found: (value) => `Found ${value}`,
        notfound: (value) => `Did not find ${value}`,
        look: (direction) => `Look into ${direction} child`,
    },
    insert: {
        newroot: (value) => `Create a new tree root ${value}`,
        search: (value) => `Searching for node to insert ${value}`,
        exists: (node) => `There is already a node ${node}`,
        child: (value, direction) => `Insert ${value} as ${direction} child`,
    },
    delete: {
        search: (value) => `Searching for node to delete ${value}`,
        notexists: (value) => `There is no node ${value}`,
        found: (value) => `Found node ${value} to delete`,
        predecessor: {
            search: (node) => `Finding the predecessor node of ${node}`,
            replace: (node, predecessor) => `Replace the value of ${node} with ${predecessor}`,
            delete: (predecessor) => `Now delete the predecessor ${predecessor}`,
        },
        redirect: (parent, child) => `Redirect parent ${parent} to child ${child}`,
        root: {
            singleton: (root) => `Remove the root node ${root}`,
            onechild: (child, root) => [
                `Make the child ${child} the new root,`,
                `and remove node ${root}`,
            ],
        },
        node: (node) => `Remove node ${node}`,
        leaf: (node) => `Remove leaf node ${node}`,
    },
    rotate: {
        single: (A, left) => `Rotate ${A} ${left}`,
        zigzag: (child, right, node, left) => `Zig-zag: Rotate ${child} ${right}, then rotate ${node} ${left}`,
    },
};

