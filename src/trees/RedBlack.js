
///////////////////////////////////////////////////////////////////////////////
// Import and export information used by the Javascript linter ESLint:
/* globals DS */
///////////////////////////////////////////////////////////////////////////////

DS.RedBlack = class RedBlack extends DS.BST {

    newNode(text) {
        return super.newNode(text).addClass("red");
    }

    async insertOne(value) {
        const result = await super.insertOne(value);
        if (result?.success) {
            await this.fixDoubleRed(result.node);
            if (this.isRed(this.treeRoot)) {
                await DS.pause("Tree root is red: Color it black");
                this.colorBlack(this.treeRoot);
            }
        }
    }

    async fixDoubleRed(node) {
        let parent = node.getParent();
        if (!parent) return;
        if (!this.isRed(parent)) return;

        let grandparent = parent.getParent();
        if (!grandparent) return;

        const pibling = parent.getSibling();
        if (this.isRed(pibling)) {
            node.setHighlight(true);
            parent.setHighlight(true);
            pibling.setHighlight(true);
            await DS.pause([
                `Node ${node}, parent ${parent} and parent's sibling ${pibling} are all red`,
                "Push blackness down from grandparent",
            ]);
            node.setHighlight(false);
            parent.setHighlight(false);
            pibling.setHighlight(false);
            this.colorBlack(pibling);
            this.colorBlack(parent);
            this.colorRed(grandparent);
            await DS.pause();
            await this.fixDoubleRed(grandparent);
            return;
        }

        let side = node.isLeftChild() ? "left" : "right";
        let rotate = parent.isLeftChild() ? "left" : "right";
        if (side !== rotate) {
            node.setHighlight(true);
            parent.setHighlight(true);
            grandparent.setHighlight(true);
            await DS.pause([
                `Node ${node} is a red ${side} child of a red ${rotate} child`,
                `Rotate parent ${parent} ${rotate}`,
            ]);
            node.setHighlight(false);
            parent.setHighlight(false);
            grandparent.setHighlight(false);
            node = (await this.singleRotate(rotate, parent)).getChild(rotate);
        }

        side = node.isLeftChild() ? "left" : "right";
        rotate = side === "left" ? "right" : "left";
        parent = node.getParent();
        grandparent = parent.getParent();
        node.setHighlight(true);
        parent.setHighlight(true);
        grandparent.setHighlight(true);
        await DS.pause([
            `Node ${node} is a red ${side} child of a red ${side} child`,
            `Switch colors and rotate grandparent ${grandparent} ${rotate}`,
        ]);
        node.setHighlight(false);
        parent.setHighlight(false);
        grandparent.setHighlight(false);
        this.colorBlack(parent);
        this.colorRed(grandparent);
        await this.singleRotate(rotate, grandparent);
    }


    async delete(value) {
        const result = await super.delete(value);
        if (result?.success) {
            if (result.parent) {
                await this.fixDeleteImbalance(result.parent, result.direction);
            }
            if (this.isRed(this.treeRoot)) {
                this.treeRoot.colorBlack();
                await DS.pause("Color the root black");
            }
        }
    }

    async fixDeleteImbalance(parent, left) {
        const child = parent.getChild(left);
        if (this.isRed(child)) {
            this.colorBlack(child);
            child.setHighlight(true);
            await DS.pause(`Color node ${child} black`);
            child.setHighlight(false);
        } else if (!parent.isLeaf()) {
            await this.fixDoubleBlack(parent, left);
        }
    }

    async fixDoubleBlack(parent, left) {
        // Note: 'left' is the direction of the double-black child
        const right = left === "left" ? "right" : "left";
        const rightChild = parent.getChild(right);
        const rightGrandchild = rightChild?.getChild(right);
        const leftGrandchild = rightChild?.getChild(left);
        parent.setHighlight(true);
        await DS.pause(`Parent ${parent} is imbalanced`);

        // Sibling is red
        if (this.isRed(rightChild)) {
            parent.setChildHighlight(right, true);
            rightChild.setHighlight(true);
            await DS.pause([
                `Parent ${parent} is black, and ${right} child ${rightChild} is red:`,
                `Switch colors and rotate ${left}`,
            ]);
            parent.setChildHighlight(right, false);
            rightChild.setHighlight(false);

            this.colorBlack(rightChild);
            this.colorRed(parent);
            await this.singleRotate(left, parent);
            await this.fixDoubleBlack(parent, left);
            return;
        }

        // Sibling's distant child is red
        if (this.isRed(rightGrandchild)) {
            parent.setChildHighlight(right, true);
            rightChild.setChildHighlight(right, true);
            rightGrandchild.setHighlight(true);
            await DS.pause([
                `${right} child ${rightChild} is black, its ${right} child is red:`,
                `Switch colors and rotate ${left}`,
            ]);
            parent.setChildHighlight(right, false);
            rightChild.setChildHighlight(right, false);
            rightGrandchild.setHighlight(false);

            if (this.isBlack(parent)) this.colorBlack(rightChild);
            else this.colorRed(rightChild);
            this.colorBlack(parent);
            this.colorBlack(rightGrandchild);
            await this.singleRotate(left, parent);
            return;
        }

        // Sibling's close child is red
        if (this.isRed(leftGrandchild)) {
            parent.setChildHighlight(right, true);
            rightChild.setChildHighlight(left, true);
            leftGrandchild.setHighlight(true);
            await DS.pause([
                `${right} child ${rightChild} is black, its ${left} child is red:`,
                `Switch colors and rotate child ${right}`,
            ]);
            parent.setChildHighlight(right, false);
            rightChild.setChildHighlight(left, false);
            leftGrandchild.setHighlight(false);

            this.colorRed(rightChild);
            this.colorBlack(leftGrandchild);
            await this.singleRotate(right, rightChild);
            await this.fixDoubleBlack(parent, left);
            return;
        }

        // Parent is red
        if (this.isRed(parent)) {
            parent.setChildHighlight(right, true);
            rightChild.setHighlight(true);
            await DS.pause([
                `Parent ${parent} is red,`,
                `${right} child ${rightChild} and its children are black:`,
                "Switch colors",
            ]);
            parent.setChildHighlight(right, false);
            rightChild.setHighlight(false);

            this.colorBlack(parent);
            this.colorRed(rightChild);
            return;
        }

        // All are black
        parent.setChildHighlight(right, true);
        rightChild.setHighlight(true);
        await DS.pause([
            `Parent ${parent}, ${right} child ${rightChild} and its children are black:`,
            `Color ${right} child red`,
        ]);
        parent.setChildHighlight(right, false);
        rightChild.setHighlight(false);

        this.colorRed(rightChild);
        const grandparent = parent.getParent();
        if (grandparent) {
            const direction = parent === grandparent.getLeft() ? "left" : "right";
            await this.fixDoubleBlack(grandparent, direction);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Red/black level

    isBlack(node) {
        return !node || node.hasClass("black");
    }

    isRed(node) {
        return !this.isBlack(node);
    }

    colorBlack(node) {
        node.addClass("black");
    }

    colorRed(node) {
        node.removeClass("black");
    }

};

