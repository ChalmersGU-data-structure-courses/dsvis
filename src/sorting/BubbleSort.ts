import { MessagesObject, NBSP } from "~/engine";
import { compare, updateDefault } from "~/helpers";
import { Sorter } from "~/sorting";
import { BaseSorter, SortMessages } from "./BaseSorter";

export const BubbleSortMessages = {
    sort: {
        swap: (a: string, b: string) => `Swapping ${a} and ${b}`,
    },
} as const satisfies MessagesObject;

export class BubbleSort extends BaseSorter implements Sorter {
    messages: MessagesObject = updateDefault(BubbleSortMessages, SortMessages);
    async sort() {
        let sortSize = this.sortArray.length();
        if (sortSize <= 1) {
            await this.pause("general.empty");
            return;
        }

        for (let i = 0; i < sortSize - 1; i++) {
            for (let j = 0; j < sortSize - i - 1; j++) {
                // Highlight the current pair of elements being compared
                this.sortArray.setStapleHighlight(j, "primary");
                this.sortArray.setStapleHighlight(j + 1, "primary");

                // Message: Compare the current pair of elements
                await this.pause(
                    "sort.compare",
                    this.sortArray.getValue(j),
                    this.sortArray.getValue(j + 1)
                );

                if (
                    Number(this.sortArray.getValue(j)) >
                    Number(this.sortArray.getValue(j + 1))
                ) {
                    // Swap the elements in the array
                    this.sortArray.swap(j, j + 1);
                    // Message: Swapping the two elements
                    await this.pause(
                        "sort.swap",
                        this.sortArray.getValue(j),
                        this.sortArray.getValue(j + 1)
                    );
                }
                // Clear highlights for the current pair
                this.sortArray.clearStapleHighlight(j, "primary");
                this.sortArray.clearStapleHighlight(j + 1, "primary");
            }
            // Highlight the last element of the current pass as sorted
            this.sortArray.setStapleHighlight(sortSize - i - 1, "secondary");
        }
        // Highlight the first element as sorted after all passes
        this.sortArray.setStapleHighlight(0, "secondary");
    }
}
