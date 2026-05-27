import { MessagesObject } from "~/engine";
import { updateDefault } from "~/helpers";
import { Sorter } from "~/sorting";
import { TreeSorter, SortMessages } from "./TreeSorter";

export const HeapSortMessages = {
    sort: {
        swap: (a: string, b: string) => `Swapping ${a} and ${b}`,
    },
} as const satisfies MessagesObject;

export class HeapSort extends TreeSorter implements Sorter {
    messages: MessagesObject = updateDefault(HeapSortMessages, SortMessages);
    async sort() {
        const values = this.getValues();
        const sortSize = values.length;

        if (sortSize <= 1) {
            await this.pause("general.empty");
            return;
        }

        // Build max heap
        for (let i = Math.floor(sortSize / 2) - 1; i >= 0; i--) {
            await this.heapify(sortSize, i);
        }

        // Extract max one by one
        for (let i = sortSize - 1; i > 0; i--) {
            const rootValue = String(this.getValue(0));
            const endValue = String(this.getValue(i));

            this.setTreeHighlight(0, "primary");
            this.setTreeHighlight(i, "secondary");

            await this.pause("sort.swap", rootValue, endValue);

            await this.swap(0, i);

            this.clearTreeHighlight(0);
            this.clearTreeHighlight(i);
            this.setTreesDisabled(i, sortSize);

            await this.heapify(i, 0);
        }

        this.setTreesDisabled(0, sortSize);
    }

    private async heapify(n: number, i: number) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        this.setTreeHighlight(i, "tertiary");

        // Compare left child
        if (left < n) {
            this.setTreeHighlight(left, "primary");
            await this.pause("sort.compare", String(this.getValue(left)), String(this.getValue(largest)));

            if (this.getValue(left) > this.getValue(largest)) {
                largest = left;
            }

            this.clearTreeHighlight(left);
        }

        // Compare right child
        if (right < n) {
            this.setTreeHighlight(right, "primary");
            await this.pause("sort.compare", String(this.getValue(right)), String(this.getValue(largest)));

            if (this.getValue(right) > this.getValue(largest)) {
                largest = right;
            }

            this.clearTreeHighlight(right);
        }

        // Swap if needed
        if (largest !== i) {
            const iValue = String(this.getValue(i));
            const largestValue = String(this.getValue(largest));

            this.setTreeHighlight(i, "secondary");
            this.setTreeHighlight(largest, "secondary");

            await this.pause("sort.swap", iValue, largestValue);
            await this.swap(i, largest);

            this.clearTreeHighlight(i);
            this.clearTreeHighlight(largest);

            await this.heapify(n, largest);
            return;
        }

        this.clearTreeHighlight(i);
    }
}
