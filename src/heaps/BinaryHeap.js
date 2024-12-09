
///////////////////////////////////////////////////////////////////////////////
// Import and export information used by the Javascript linter ESLint:
/* globals DS */
///////////////////////////////////////////////////////////////////////////////

DS.BinaryHeap = class BinaryHeap {
    $arraySize = 28;
    $DS;
    $initialValues;

    constructor(engine, initialValues = null) {
        this.$DS = engine;
        this.$initialValues = initialValues;
    }

    async reset() {
        this.treeRoot = null;
        this.treeNodes = new Array(this.$arraySize);
        this.heapArray = this.$DS.SVG().dsArray(this.$arraySize, this.getRootX(), this.$DS.$SvgHeight - this.getRootY());
        if (this.heapArray.x() < this.$DS.$Info.x) this.heapArray.x(this.$DS.$Info.x);
        this.heapSize = 0;
        if (this.$initialValues) {
            this.$DS.$resetting = true;
            await this.insert(...this.$initialValues);
            this.$DS.$resetting = false;
        }
    }

    getStartX() {
        return this.$DS.$Info.x + this.$DS.getObjectSize() / 2;
    }

    getStartY() {
        return this.$DS.$Info.y * 4;
    }

    getRootX() {
        return this.$DS.$SvgWidth / 2;
    }

    getRootY() {
        return 2 * this.$DS.$Info.y + this.$DS.getObjectSize() / 2;
    }

    resizeTree() {
        const animate = !this.$DS.$resetting;
        this.treeRoot?.resize(this.getRootX(), this.getRootY(), animate);
    }

    async insert(...values) {
        for (const val of values) await this.insertOne(val);
    }

    async swap(j, k, message, ...args) {
        const jNode = this.treeNodes[j], kNode = this.treeNodes[k];
        const jLabel = this.$DS.SVG().textCircle(jNode.getText(), jNode.cx(), jNode.cy());
        const kLabel = this.$DS.SVG().textCircle(kNode.getText(), kNode.cx(), kNode.cy());
        jLabel.setCenter(kLabel.cx(), kLabel.cy(), true);
        kLabel.setCenter(jLabel.cx(), jLabel.cy(), true);
        this.heapArray.swap(j, k, true);
        await this.$DS.pause(message, ...args);
        jNode.setText(kLabel.getText());
        kNode.setText(jLabel.getText());
        jLabel.remove();
        kLabel.remove();
    }


    async insertOne(value) {
        if (this.heapSize >= this.$arraySize) {
            await this.$DS.pause('general.full');
            return;
        }

        let currentIndex = this.heapSize;
        let parentIndex = Math.floor((currentIndex - 1) / 2);
        let parentNode = this.treeNodes[parentIndex];
        const arrayLabel = this.$DS.SVG().textCircle(value, this.getStartX(), this.getStartY());
        let treeNode = this.$DS.SVG().binaryNode(value, this.getStartX(), this.getStartY());
        this.treeNodes[currentIndex] = treeNode;
        await this.$DS.pause('insert.value', value);

        arrayLabel.setCenter(this.heapArray.getCX(currentIndex), this.heapArray.cy(), true);
        if (currentIndex === 0) {
            this.treeRoot = treeNode;
        } else {
            const direction = (currentIndex - 1) / 2 === parentIndex ? "left" : "right";
            parentNode.setChild(direction, treeNode);
        }
        this.resizeTree();
        await this.$DS.pause();

        arrayLabel.remove();
        this.heapArray.setDisabled(currentIndex, false);
        this.heapArray.setValue(currentIndex, value);
        this.heapArray.setIndexHighlight(currentIndex, true);
        this.heapSize++;

        while (currentIndex > 0) {
            treeNode.setHighlight(true);
            await this.$DS.pause('insert.shiftUp');
            parentIndex = Math.floor((currentIndex - 1) / 2);
            parentNode = this.treeNodes[parentIndex];
            const parentValue = this.heapArray.getValue(parentIndex);
            this.heapArray.setIndexHighlight(parentIndex, true);
            const direction = (currentIndex - 1) / 2 === parentIndex ? "left" : "right";
            parentNode.setChildHighlight(direction, true);
            const cmp = DS.compare(value, parentValue);
            if (cmp >= 0) {
                await this.$DS.pause('insert.stopShift', parentValue);
                this.heapArray.setIndexHighlight(currentIndex, false);
                this.heapArray.setIndexHighlight(parentIndex, false);
                treeNode.setHighlight(false);
                parentNode.setChildHighlight(direction, false);
                break;
            }
            await this.$DS.pause('insert.shiftAgain', parentValue);
            await this.swap(currentIndex, parentIndex, 'swap.swap', value, parentValue);
            this.heapArray.setIndexHighlight(currentIndex, false);
            treeNode.setHighlight(false);
            parentNode.setChildHighlight(direction, false);
            currentIndex = parentIndex;
            treeNode = parentNode;
        }
        this.heapArray.setIndexHighlight(currentIndex, false);
        treeNode.setHighlight(false);
    }


    async deleteMin() {
        if (this.heapSize === 0) {
            await this.$DS.pause('general.empty');
            return;
        }
        this.heapSize--;
        const minValue = this.heapArray.getValue(0);

        const arrayLabel = this.$DS.SVG().textCircle(minValue, this.heapArray.getCX(0), this.heapArray.cy());
        if (this.heapSize === 0) {
            await this.$DS.pause('delete.root', minValue);
            this.heapArray.setValue(0);
            arrayLabel.setCenter(this.getStartX(), this.getStartY(), true);
            this.treeRoot.setCenter(this.getStartX(), this.getStartY(), true);
            await this.$DS.pause();
            arrayLabel.remove();
            this.heapArray.setDisabled(0, true);
            this.treeRoot.remove();
            this.treeRoot = null;
            return;
        }

        const treeLabel = this.$DS.SVG().textCircle(minValue, this.treeRoot.cx(), this.treeRoot.cy());
        await this.$DS.pause('remove.minValue', minValue);
        this.heapArray.setValue(0);
        this.treeRoot.setText();
        arrayLabel.setCenter(this.getStartX(), this.getStartY(), true);
        treeLabel.setCenter(this.getStartX(), this.getStartY(), true);
        let currentValue = this.heapArray.getValue(this.heapSize);
        await this.$DS.pause();
        await this.swap(0, this.heapSize, 'swap.lastToFirst', currentValue);
        this.treeNodes[this.heapSize].remove();
        this.heapArray.setDisabled(this.heapSize, true);
        await this.$DS.pause('delete.lastHeap');

        let currentIndex = 0;
        let currentNode = this.treeNodes[currentIndex];
        while (currentIndex < this.heapSize) {
            currentNode.setHighlight(true);
            this.heapArray.setIndexHighlight(currentIndex, true);
            let childIndex = currentIndex * 2 + 1;
            if (childIndex >= this.heapSize) {
                await this.$DS.pause('finished');
                currentNode.setHighlight(false);
                this.heapArray.setIndexHighlight(currentIndex, false);
                break;
            }

            await this.$DS.pause('delete.shiftDown');
            let direction = "left";
            let childValue = this.heapArray.getValue(childIndex);
            if (childIndex + 1 < this.heapSize && DS.compare(childValue, this.heapArray.getValue(childIndex + 1)) > 0) {
                direction = "right";
                childIndex++;
                childValue = this.heapArray.getValue(childIndex);
            }
            const childNode = this.treeNodes[childIndex];

            this.heapArray.setIndexHighlight(childIndex, true);
            currentNode.setChildHighlight(direction, true);
            childNode.setHighlight(true);

            const cmp = DS.compare(currentValue, childValue);
            if (cmp <= 0) {
                await this.$DS.pause('delete.stopShift', currentValue, childValue);
                this.heapArray.setIndexHighlight(currentIndex, false);
                this.heapArray.setIndexHighlight(childIndex, false);
                currentNode.setChildHighlight(direction, false);
                childNode.setHighlight(false);
                break;
            }

            await this.$DS.pause('delete.shiftAgain', currentValue, childValue);
            await this.swap(currentIndex, childIndex, 'swap.swap', currentValue, childValue);
            this.heapArray.setIndexHighlight(currentIndex, false);
            this.heapArray.setIndexHighlight(childIndex, false);
            currentNode.setChildHighlight(direction, false);
            childNode.setHighlight(false);
            currentIndex = childIndex;
            currentNode = childNode;
        }

        await this.$DS.pause();
        arrayLabel.remove();
        treeLabel.remove();
        this.resizeTree();
    }

};


DS.BinaryHeap.messages = {
    general: {
        empty: "Heap is empty!",
        full: "Heap is full!",
        finished: "Finished",
    },
    insert: {
        value: (value) => `Insert value: ${value}`,
        shiftUp: "Shift the value upwards",
        stopShift: (parentValue) => `The parent ${parentValue} is not larger: stop here`,
        shiftAgain: (parentValue) => `The parent ${parentValue} is larger`,
    },
    delete: {
        root: (minValue) => `Remove the root: ${minValue}`,
        minValue: (minValue) => `Remove the minimum value: ${minValue}`,
        lastHeap: "Remove the new last heap value",
        shiftDown: "Shift the value downwards",
        stopShift: (currentValue, childValue) => `The value ${currentValue} is not larger than the smallest child ${childValue}: stop here`,
        shiftAgain: (currentValue, childValue) => `The value ${currentValue} is larger than the smallest child ${childValue}`,
    },
    swap: {
        swap: (a, b) => `Swap ${a} and ${b}`,
        lastToFirst: (val) => `Swap in the last heap value to the first position: ${val}`,
    },
};

