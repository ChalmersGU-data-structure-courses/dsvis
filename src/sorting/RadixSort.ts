import { MessagesObject } from "~/engine";
import { updateDefault } from "~/helpers";
import { Sorter } from "~/sorting";
import { BaseSorter, SortMessages } from "./BaseSorter";
import { DSArray } from "~/objects/dsarray";
import { StapleArray } from "~/objects/staple-array";

export const RadixSortMessages = {
    sort: {
        countingSort: (exp: string) =>
            `Counting sort for exponent ${exp}`,
        countPhase: (digit: string) =>
            `Phase 1: Counting occurrences of digit ${digit}`,
        cumulativePhase: `Phase 2: Converting to cumulative count (prefix sum)`,
        placementPhase: `Phase 3: Placing values using cumulative count`,
        placingValue: (value: string, digit: string, position: string) =>
            `Placing ${value} (digit ${digit}) at position ${position}`,
        digitPosition: (position: string) =>
            `Processing ${position} digit`,
    },
} as const satisfies MessagesObject;

export class RadixSort extends BaseSorter implements Sorter {
    override messages: MessagesObject = updateDefault(RadixSortMessages, SortMessages);
    VERTICAL_SEPARATION = 40;

    override async sort(): Promise<void> {
        const sortSize = this.sortArray.length();
        if (sortSize <= 1) {
            await this.pause("general.empty");
            return;
        }

        let min = Number(this.sortArray.getValue(0));
        let max = min;

        for (let i = 0; i < sortSize; i++) {
            const value = Number(this.sortArray.getValue(i));
            if (!Number.isInteger(value)) {
                throw new Error("RadixSort only supports integers.");
            }
            if (value < min) min = value;
            if (value > max) max = value;
        }

        const offset = min < 0 ? -min : 0;
        const maxShifted = max + offset;

        const digitNames = ["units", "tens", "hundreds", "thousands"];
        let digitPhaseIndex = 0;
        for (let exp = 1; Math.floor(maxShifted / exp) > 0; exp *= 10) {
            const digitName = digitNames[digitPhaseIndex] || `10^${digitPhaseIndex}`;
            await this.pause("sort.digitPosition", digitName);
            await this.countingSort(exp, offset, digitName);
            digitPhaseIndex++;
        }

        await this.pause("general.finished");
    }

    private async countingSort(exp: number, offset: number, digitName: string): Promise<void> {
        const sortSize = this.sortArray.length();
        const output: string[] = new Array(sortSize);
        const count: number[] = new Array(10).fill(0);
        
        const originalSortArrayCX = this.sortArray.cx();
        const originalSortArrayCY = this.sortArray.cy();

        // === PHASE 1: COUNTING ===
        for (let i = 0; i < sortSize; i++) {
            this.sortArray.setStapleHighlight(i, "primary");
            const shifted = Number(this.sortArray.getValue(i)) + offset;
            const digit = Math.floor(shifted / exp) % 10;
            count[digit]++;
            await this.pause("sort.countPhase", digit.toString());
            this.sortArray.clearStapleHighlight(i, "all");
        }

        // Show the count array (below sortArray)
        const countArray = this.Svg.put(
            new DSArray(10, this.getObjectSize(), true)
        ).init(10, this.sortArray.cx(), this.sortArray.cy() + Number(this.sortArray.height()) + this.VERTICAL_SEPARATION);

        // Display count values
        for (let i = 0; i < 10; i++) {
            countArray.setValue(i, count[i].toString());
            if (count[i] > 0) {
                countArray.setIndexHighlight(i, false);
            } else {
                countArray.setDisabled(i, true);
            }
        }

        await this.pause("sort.countingSort", digitName);

        // === PHASE 2: CUMULATIVE COUNT (PREFIX SUM) ===
        await this.pause("sort.cumulativePhase");
        for (let i = 1; i < 10; i++) {
            countArray.setIndexHighlight(i - 1, true, "green");
            count[i] += count[i - 1];
            countArray.setValue(i, count[i].toString());
            countArray.setIndexHighlight(i, true, "#C00");
            await this.pause(undefined);
            countArray.setIndexHighlight(i - 1, false);
        }
        
        for (let i = 0; i < 10; i++) {
            countArray.setIndexHighlight(i, false);
        }

        const countArrayHeight = Number(countArray.height());
        const countArrayCY = countArray.cy();

        // === PHASE 3: PLACEMENT ===
        await this.pause("sort.placementPhase");

        // Create output array visualization as StapleArray (below countArray)
        const outputArray = this.Svg.put(
            new StapleArray(
                Array(sortSize).fill(0),
                this.STAPLE_MAX_HEIGHT,
                this.getObjectSize(),
                99
            )
        ).init(this.sortArray.cx(), countArrayCY + countArrayHeight + this.VERTICAL_SEPARATION);

        // Place values right-to-left for stability
        for (let i = sortSize - 1; i >= 0; i--) {
            const value = this.sortArray.getValue(i);
            const shifted = Number(value) + offset;
            const digit = Math.floor(shifted / exp) % 10;
            
            this.sortArray.setStapleHighlight(i, "primary");
            countArray.setIndexHighlight(digit, true, "#C00");
            
            const outputPosition = count[digit] - 1;
            output[outputPosition] = String(value);
            outputArray.setValue(outputPosition, Number(value));
            outputArray.setStapleHighlight(outputPosition, "info");
            
            await this.pause("sort.placingValue", String(value), digit.toString(), outputPosition.toString());
            
            count[digit]--;
            this.sortArray.clearStapleHighlight(i, "all");
            countArray.setIndexHighlight(digit, false);
            outputArray.clearStapleHighlight(outputPosition, "all");
        }

        // Animate output array back to original position
        this.animate(outputArray)
            .cy(originalSortArrayCY);
        
        // Wait for animation to complete before updating
        await this.pause(undefined);

        // Update main array with output values
        for (let i = 0; i < sortSize; i++) {
            this.sortArray.setValue(i, Number(output[i]!));
        }

        // Remove temporary arrays from DOM
        countArray.remove();
        outputArray.remove();

        await this.pause(undefined);
    }
}