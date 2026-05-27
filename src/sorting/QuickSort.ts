import { Timeline } from "@svgdotjs/svg.js";
import { Runner } from "@svgdotjs/svg.js";
import { Element } from "@svgdotjs/svg.js";
import { Line } from "@svgdotjs/svg.js";
import { MessagesObject } from "~/engine";
import { compare, finishAllAnimationsForElement, updateDefault } from "~/helpers";
import { Arrow } from "~/objects/arrow";
import { StapleArray } from "~/objects/staple-array";
import { ValueStaple } from "~/objects/value-staple";
import { Sorter } from "~/sorting";
import { BaseSorter, SortMessages } from "~/sorting/BaseSorter";

export const QuickSortMessages = {
    sort: {
        selectPivot: "Select pivot",
        pivotFirst: "Place pivot at the start of the range",
        initPointers: "Initialize low and high pointers",
        compareWithPivot: (pointer: "low" | "high") =>
            `Compare ${pointer} with pivot`,
        biggerThanPivot: (pointer: "low" | "high") =>
            `${pointer} bigger than pivot`,
        smaller: "Element smaller than pivot",
        pivotSwap: "Swap pivot with high to put it into the correct place",
        sorting: (low: number, high: number) =>
            `Sorting array from index ${low} to index ${high}`,
        singleElement: "Single element arrays are automatically sorted",
    },
} as const satisfies MessagesObject;

export const PivotSelectionMethods = ['first' , 'middle' , 'last' , 'medianOfThree', 'random'] as const;
export type PivotSelectionMethods = typeof PivotSelectionMethods[number]

export class QuickSort extends BaseSorter implements Sorter {
    messages: MessagesObject = updateDefault(QuickSortMessages, SortMessages);

    pivotSelectionMethod: PivotSelectionMethods = "middle";

    async sort() {
        if (this.sortArray.length() <= 1) {
            await this.pause("general.empty");
            return;
        }

        // Start recursive calls to quickSort
        await this.quickSort(this.sortArray, 0, this.sortArray.length());

        // Message done
        await this.pause("general.finished");
        for (let i = 0; i < this.sortArray.length(); i++) {
            this.sortArray.clearStapleHighlight(i, "all");
        }
    }

    async quickSort(array: StapleArray, start: number, end: number) {
        if (end <= start) {
            return;
        }

        // Makes only the current section being partitioned enabled
        this.sortArray.setStaplesDisabled(0, start);
        this.sortArray.setStaplesDisabled(end);
        await this.pause(`sort.sorting`, start, end);

        if (start === end - 1) {
            this.sortArray.setStapleHighlight(start, "success");
            await this.pause(`sort.singleElement`);
            this.sortArray.clearStaplesDisabled(0);
            return;
        }

        // Partition
        const pivotIndex = await this.partition(start, end);

        this.sortArray.clearStaplesDisabled(0);

        // Recursively call quicksort on the subarrays created by partition
        await this.quickSort(array, start, pivotIndex);
        await this.quickSort(array, pivotIndex + 1, end);
    }

    async partition(start: number, end: number) {
        // Select pivot
        await this.pause("sort.selectPivot");

        let pivotIndex: number = await this.getPivotIndex(
            this.sortArray,
            start,
            end
        );
        const pivotValue: number = this.sortArray.getValue(pivotIndex);

        const pivotStaple: ValueStaple = this.sortArray.getStaple(pivotIndex);
        // @ts-ignore: Due to incorrect typing off the .css method explained below, 
        // TS do not understand the returned type will be Line
        const pivotLine: Line = this.Svg.line(
            Number(this.sortArray.x()),
            Number(pivotStaple.y()),
            Number(this.sortArray.x()) + Number(this.sortArray.width()),
            Number(pivotStaple.y())
        )
            .dy(-1)
            // @ts-ignore: Wrong typing from library, incorrectly requires camelCase attribute names
            .css({ stroke: "var(--sorting-staple-marked)", "stroke-width": 2 });


        // Swap pivot with the first value of the range and update index
        this.sortArray.swap(start, pivotIndex);
        pivotIndex = start;

        await this.pause("sort.pivotFirst");

        // Initialize low and high to define range
        let low = start + 1;
        let high = end - 1;

        // Adds arrows to indicate low and high
        const lowArrow = new Arrow(20, 90);
        this.Svg.put(lowArrow)
            .css("fill", "blue")
            .cx(
                this.sortArray.getStapleX(low) +
                    this.sortArray.getStapleWidth() / 2
            )
            .y(Number(this.sortArray.y()) + Number(this.sortArray.height()));

        const highArrow = new Arrow(20, 90);
        this.Svg.put(highArrow)
            .css("fill", "red")
            .cx(
                this.sortArray.getStapleX(high) +
                    this.sortArray.getStapleWidth() / 2
            )
            .y(Number(this.sortArray.y()) + Number(this.sortArray.height()));

        await this.pause("sort.initPointers");

        while (true) {
            // Moves low as far right in the array as possible
            // Stops moving if bigger or equal to pivot or if it exceeds high
            while (low <= high) {
                this.sortArray.setStapleHighlight(low, "primary");
                await this.pause("sort.compareWithPivot", "low");
                this.sortArray.clearStapleHighlight(low, "primary");

                if (compare(this.sortArray.getValue(low), pivotValue) >= 0) {
                    await this.pause(
                        "Low is bigger or equal to the pivot, stop the pointer."
                    );
                    break;
                }

                low += 1;
                this.animate(lowArrow).cx(
                    this.sortArray.getStapleX(low) +
                        this.sortArray.getStapleWidth() / 2
                );
                await this.pause(
                    "Low is smaller than the pivot, advance pointer."
                );
            }

            // Moves high as far left in the array as possible
            // Stops moving if smaller or equal to pivot or if it precedes low
            while (low <= high) {
                this.sortArray.setStapleHighlight(high, "primary");
                await this.pause(
                    "sort.compareWithPivot",
                    this.sortArray.getValue(high),
                    "high",
                    pivotValue
                );
                this.sortArray.clearStapleHighlight(high, "primary");

                if (compare(this.sortArray.getValue(high), pivotValue) <= 0) {
                    await this.pause(
                        "High is smaller or equal to the pivot, stop the pointer."
                    );
                    break;
                }

                high -= 1;
                this.animate(highArrow).cx(
                    this.sortArray.getStapleX(high) +
                        this.sortArray.getStapleWidth() / 2
                );
                await this.pause(
                    "High is bigger than the pivot, advance pointer."
                );
            }

            if (low > high) {
                await this.pause("Low exceeded high, done.");
                break;
            }

            // Swap low and high since low is now higher than or equal to the pivot
            // and high is lower than or equal to the pivot
            this.sortArray.swap(low, high);

            low += 1;
            high -= 1;

            this.animate(lowArrow).cx(
                this.sortArray.getStapleX(low) +
                    this.sortArray.getStapleWidth() / 2
            );
            this.animate(highArrow).cx(
                this.sortArray.getStapleX(high) +
                    this.sortArray.getStapleWidth() / 2
            );

            await this.pause("Swap low and high, advance both pointers.");
        }

        // Swap the pivot back into its correct position in the array
        // Highlight pivot as sorted
        this.sortArray.swap(pivotIndex, high);
        this.sortArray.clearStapleHighlight(high, "info");
        this.sortArray.setStapleHighlight(high, "success");
        await this.pause("sort.pivotSwap");

        pivotLine.remove();

        finishAllAnimationsForElement(this.timeline, lowArrow)
        finishAllAnimationsForElement(this.timeline, highArrow)
        lowArrow.remove();
        highArrow.remove();

        await this.pause("Partition done, return pivot index.");
        return high;
    }

    setPivotSelectionMethod(method: PivotSelectionMethods) {
        this.pivotSelectionMethod = method;
    }

    private async getPivotIndex(
        arr: StapleArray,
        start: number,
        end: number
    ): Promise<number> {
        switch (this.pivotSelectionMethod) {
            case "first":
                return this.getPivotFirst(arr, start);
            case "middle":
                return this.getPivotMiddle(arr, start, end);
            case "last":
                return this.getPivotLast(arr, end);
            case "medianOfThree":
                return this.getPivotMedianOfThree(arr, start, end);
            case "random":
                return this.getPivotRandom(arr, start, end);
            default:
                throw new Error("Invalid pivot selection method");
        }
    }

    private async getPivotFirst(
        arr: StapleArray,
        start: number
    ): Promise<number> {
        const pivotIndex = start;
        arr.setStapleHighlight(pivotIndex, "info");
        await this.pause("Use first element as pivot");
        return pivotIndex;
    }

    private async getPivotMiddle(
        arr: StapleArray,
        start: number,
        end: number
    ): Promise<number> {
        const pivotIndex = Math.floor((start + end) / 2);
        arr.setStapleHighlight(pivotIndex, "info");
        await this.pause("Use middle element as pivot");
        return pivotIndex;
    }

    private async getPivotLast(arr: StapleArray, end: number): Promise<number> {
        const pivotIndex = end - 1;
        arr.setStapleHighlight(pivotIndex, "info");
        await this.pause("Use last element as pivot");
        return pivotIndex;
    }

    private async getPivotRandom(arr: StapleArray, start: number, end: number): Promise<number> {
        const pivotIndex = start + Math.floor(Math.random() * (end - start));
        arr.setStapleHighlight(pivotIndex, "info");
        await this.pause("Use random element as pivot");
        return pivotIndex;
    }

    private async getPivotMedianOfThree(
        arr: StapleArray,
        start: number,
        end: number
    ): Promise<number> {
        const firstIndex = start;
        const lastIndex = end - 1;
        const middleIndex = Math.floor((start + end) / 2);
        const candidates: { i: number; value: number }[] = [
            { i: firstIndex, value: arr.getValue(firstIndex) },
            { i: lastIndex, value: arr.getValue(lastIndex) },
            { i: middleIndex, value: arr.getValue(middleIndex) },
        ];
        candidates.sort(
            (candidateA, candidateB) => candidateA.value - candidateB.value
        );
        const pivotIndex = candidates[1].i;
        for (let candidate of candidates) {
            arr.setStapleHighlight(candidate.i, "info");
        }
        await this.pause("Use median-of-three as pivot");
        for (let candidate of candidates) {
            if (candidate.i !== pivotIndex)
                arr.clearStapleHighlight(candidate.i, "info");
        }
        return pivotIndex;
    }
}
