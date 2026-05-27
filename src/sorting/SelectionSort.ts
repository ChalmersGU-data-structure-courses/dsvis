import { MessagesObject, NBSP } from "~/engine";
import { compare, finishAllAnimationsForElement, updateDefault } from "~/helpers";
import { Sorter } from "~/sorting";
import { BaseSorter, SortMessages } from "./BaseSorter";
import { Arrow } from "~/objects/arrow";

export const SelectionSortMessages = {
    sort: {
        foundNewMin: (a: string) => `Found a smaller value ${a}`,
    },
} as const satisfies MessagesObject;

export class SelectionSort extends BaseSorter implements Sorter {
    messages: MessagesObject = updateDefault(
        SelectionSortMessages,
        SortMessages
    );
    async sort() {
        let sortSize = this.sortArray.length();
        if (sortSize <= 1) {
            await this.pause("general.empty");
            return;
        }

        const progressionArrow = new Arrow(
            Math.max((this.getObjectSize() * 2) / 3, 7),
            90
        );
        this.Svg.put(progressionArrow)
            .cx(
                this.sortArray.getStapleX(0) +
                    this.sortArray.getStapleWidth() / 2
            )
            .y(Number(this.sortArray.y()) + Number(this.sortArray.height()) + 5)
            .css({ stroke: "none", fill: "blue" });
        await this.pause("Initialize progress pointer.");

        for (let i = 0; i < sortSize - 1; i++) {
            let minIndex: number = i;

            // Highlight current min element
            this.sortArray.setStapleHighlight(minIndex, 'info');

            // Find the index of the minimum element in the shuffleed part of the array
            for (let j = i + 1; j < sortSize; j++) {
                // Highlight the current element
                this.sortArray.setStapleHighlight(j, 'primary');

                // Message: Compare the current element with the minimum element
                await this.pause(
                    "sort.compare",
                    this.sortArray.getValue(j),
                    this.sortArray.getValue(minIndex)
                );

                if (
                    compare(
                        this.sortArray.getValue(j),
                        this.sortArray.getValue(minIndex)
                    ) < 0
                ) {
                    // Update highlight and index to new min element
                    this.sortArray.clearStapleHighlight(minIndex, 'info');
                    minIndex = j;
                    this.sortArray.clearStapleHighlight(j, 'primary')
                    this.sortArray.setStapleHighlight(j, 'info');


                    // Message: Found a new minimum element
                    await this.pause(
                        "sort.foundNewMin",
                        this.sortArray.getValue(minIndex)
                    );
                } else {
                    // Unhighlight the current element
                    this.sortArray.clearStapleHighlight(j, 'primary');
                }
            }

            // If we found a new minimum, swap it with the current element
            if (minIndex !== i) {
                await this.swap(this.sortArray, i, minIndex);
            }

            // Clear the highlight of newly positioned min element and highlight as sorted
            this.sortArray.clearStapleHighlight(i, 'info')
            this.sortArray.setStapleHighlight(i, 'success');

            this.animate(progressionArrow).cx(
                this.sortArray.getStapleX(i + 1) + this.sortArray.getStapleWidth() / 2
            );
            await this.pause("Advance pointer.");
        }
        
        finishAllAnimationsForElement(this.timeline, progressionArrow);
        progressionArrow.remove();
        this.sortArray.setStapleHighlight(this.sortArray.length() - 1, 'success');
        await this.pause("general.finished");

        // Reset the highlights
        for (let i = 0; i < sortSize; i++) {
            this.sortArray.clearStapleHighlight(i, 'all');
        }
    }
}
