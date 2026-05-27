import { MessagesObject, NBSP } from "~/engine";
import { finishAllAnimationsForElement, updateDefault } from "~/helpers";
import { Arrow } from "~/objects/arrow";
import { Sorter } from "~/sorting";
import { BaseSorter, SortMessages } from "~/sorting/BaseSorter";

export const InsertionSortMessages = {
    sort: {
        swap: (a: string, b: string) =>
            `Swap ${a} and ${b} since ${a} is smaller`,
        smallerLeft: (a: string, b: string) =>
            `${a} is smaller than ${b} no swap`,
        record: (a: string) => `The record is set to ${a}`,
    },
} as const satisfies MessagesObject;

export class InsertionSort extends BaseSorter implements Sorter {
    messages: MessagesObject = updateDefault(
        InsertionSortMessages,
        SortMessages
    );

    async sort() {
        let sortSize = this.sortArray.length();

        if (sortSize <= 1) {
            await this.pause("general.empty");
            return;
        }

        const progressionArrow = new Arrow(Math.max(this.getObjectSize() * 2 / 3, 7), 90);
        this.Svg.put(progressionArrow)
            .cx(this.sortArray.getStapleX(1) + this.sortArray.getStapleWidth() / 2)
            .y(Number(this.sortArray.y()) + Number(this.sortArray.height()) + 5)
            .css({"stroke": "none", "fill": "blue"});
        await this.pause("Initialize progress pointer.")

        for (let i = 1; i < sortSize; i++) {
            let j = i;

            while (j > 0) {
                this.sortArray.setStapleHighlight(j);
                this.sortArray.setStapleHighlight(j - 1);
                await this.pause(
                    "sort.compare",
                    this.sortArray.getValue(j),
                    this.sortArray.getValue(j - 1)
                );

                //Check if the current element is larger than the element to its left
                if (
                    this.sortArray.getValue(j) >= this.sortArray.getValue(j - 1)
                ) {
                    //Then message this, disable the highlights and break
                    await this.pause(
                        "sort.smallerLeft",
                        this.sortArray.getValue(j - 1),
                        this.sortArray.getValue(j)
                    );
                    this.sortArray.clearStapleHighlight(j);
                    this.sortArray.clearStapleHighlight(j - 1);
                    break;
                }

                //If the current element is smaller then swap it with the left neighbour
                await this.swap(this.sortArray, j, j - 1);

                this.sortArray.clearStapleHighlight(j);
                this.sortArray.clearStapleHighlight(j - 1);
                j -= 1;

            }
            this.animate(progressionArrow).cx(
                this.sortArray.getStapleX(i + 1) + this.sortArray.getStapleWidth() / 2
            );
            await this.pause("Advance pointer.");
        }

        finishAllAnimationsForElement(this.timeline, progressionArrow);
        progressionArrow.remove();
        for (let i = 0; i < this.sortArray.length(); i++) {
            this.sortArray.setStapleHighlight(i, 'success');
        }
        await this.pause("general.finished");
        for (let i = 0; i < this.sortArray.length(); i++) {
            this.sortArray.clearStapleHighlight(i, 'all');
        }
    }
}
