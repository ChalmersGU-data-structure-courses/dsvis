import { MessagesObject, NBSP } from "~/engine";
import { compare, finishAllAnimationsForElement, updateDefault } from "~/helpers";
import { Sorter } from "~/sorting";
import { BaseSorter, SortMessages } from "./BaseSorter";
import { StapleArray } from "~/objects/staple-array";
import { ValueStaple } from "~/objects/value-staple";
import { RecursiveSortingGeneralControls } from "~/general-controls/recursive-sorting-general-controls";

export const MergeSortMessages = {
    sort: {
        split: (a: string, b: string) => `Split ${a} from ${b}`,
        merge: `Merge subarrays`,
        move: (a: string) => `Move ${a} to upper array`,
        foundNewMin: (a: string) => `Found a smaller value ${a}`,
        mergeComplete: `Subarrays successfully merged`,
        singleElement: (element: string) =>
            `Array has single element ${element}, is already sorted`,
    },
} as const satisfies MessagesObject;

export class MergeSort extends BaseSorter implements Sorter {
    VERTICAL_RECURSION_SEPARATION = 10; // TODO: Depend on object size?

    messages: MessagesObject = updateDefault(MergeSortMessages, SortMessages);
    isFollowingRecursion: boolean = true;

    constructor(containerSelector: string) {
        super(containerSelector);

        this.generalControls = new RecursiveSortingGeneralControls(this.container, this);
    }

    async sort() {
        //Check if array is empty
        const sortSize = this.sortArray.length();
        if (sortSize <= 1) {
            await this.pause("general.empty");
            return;
        }

        //Start recursive calls to mergeSort
        this.sortArray = await this.mergeSort(this.sortArray, 1);

        //Finish the algorithm
        await this.pause("general.finished");
        for (let i = 0; i < this.sortArray.length(); i++) {
            this.sortArray.clearStapleHighlight(i, "all");
        }
    }

    async mergeSort(arr: StapleArray, iteration: number) {
        {
            if (arr.length() === 1) {
                arr.setStapleHighlight(0, 'success')
                await this.pause("sort.singleElement", arr.getValue(0))
                return arr;
            }

            //When the array is larger than 1 element split into two arrays and sort recusively
            if (arr.length() > 1) {
                const mid = Math.ceil(arr.length() / 2);

                // Create a copy of the left part of the array an place it on top of the existing
                let leftSubArr: StapleArray = this.Svg.put(
                    new StapleArray(
                        arr.getValues().slice(0, mid),
                        this.STAPLE_MAX_HEIGHT,
                        this.getObjectSize(),
                        arr.getMaxValue()
                    )
                ).init(arr.cx() - Number(arr.width()) / 4, arr.cy());

                // Mark left portion of parent array as disabled
                arr.setStaplesDisabled(0, mid);

                // Move the new array down and slightly to the left to show split step
                const leftSubArrDeltaMove = { x: -this.getObjectSize(), y: Number(arr.height()) + this.VERTICAL_RECURSION_SEPARATION }
                this.animate(leftSubArr)
                    .dx(leftSubArrDeltaMove.x)
                    .dy(leftSubArrDeltaMove.y);
                
                // Move the viewbox to follow recursion to the left
                // Skip first iteration to prevent disjointed transition
                if (this.isFollowingRecursion && iteration > 1)
                    this.setViewBoxCenter(arr.cx(), arr.cy(), true)
                                
                await this.pause(
                    "merge.split",
                    leftSubArr.getValues(),
                    arr.getValues()
                );
                
                // Sort left subarray recursively
                leftSubArr = await this.mergeSort(leftSubArr, iteration + 1);
                
                // Move the viewbox to follow recursion to the right
                if (this.isFollowingRecursion)
                    this.setViewBoxCenter(arr.cx(), arr.cy(), true)

                if (leftSubArr.length() > 1) {
                    await this.pause(undefined);
                }
                                
                // Create a copy of the right part of the array an place it on top of the existing
                let rightSubArr: StapleArray = this.Svg.put(
                    new StapleArray(
                        arr.getValues().slice(mid),
                        this.STAPLE_MAX_HEIGHT,
                        this.getObjectSize(),
                        arr.getMaxValue()
                    )
                ).init(arr.cx() + Number(arr.width()) / 4, arr.cy());

                // Mark right portion of parent array as disabled
                arr.setStaplesDisabled(mid);

                // Move the new array down and slightly to the right to show split step
                const rightSubArrDeltaMove = { x: this.getObjectSize(), y: Number(arr.height()) + this.VERTICAL_RECURSION_SEPARATION }
                this.animate(rightSubArr)
                    .dx(rightSubArrDeltaMove.x)
                    .dy(rightSubArrDeltaMove.y);
                                
                await this.pause(
                    "merge.split",
                    rightSubArr.getValues(),
                    arr.getValues()
                );

                // Sort right subarray recursively
                rightSubArr = await this.mergeSort(rightSubArr, iteration + 1);

                // Move viewbox to follow merging subarrays
                // If it is the first iteration, reset to starting position
                if (this.isFollowingRecursion) {
                    if (iteration === 1) 
                        this.resetViewBoxPosition();
                    else 
                        this.setViewBoxCenter(arr.cx(), arr.cy(), true);
                }
                
                // Merge the two now sorted subarrays
                return await this.merge(arr, leftSubArr, rightSubArr);
            }

            throw new Error(`Could not mergeSort array: ${arr}`);
        }
    }

    async merge(
        parentArr: StapleArray,
        leftSubArr: StapleArray,
        rightSubArr: StapleArray
    ) {

        // Remove the highlight that indicates that the arrays are sorted
        for (let i = 0; i < leftSubArr.length(); i++) {
            leftSubArr.clearStapleHighlight(i, "success")
        }
        for (let i = 0; i < rightSubArr.length(); i++) {
            rightSubArr.clearStapleHighlight(i, "success")
        }
        await this.pause("sort.merge")

        let leftIndex = 0;
        let rightIndex = 0;
        
        const mergedArrayValues: number[] = [];

        // Save initial values for y for the subarrays, since they will change when moving the staples later
        leftSubArr.remember("y", leftSubArr.y())
        rightSubArr.remember("y", rightSubArr.y())

        //Merge the two subarrays into the parent array
        for (let i = 0; i < parentArr.length(); i++) {

            // Highlight the staples that are being compared
            if (leftIndex < leftSubArr.length()) {
                leftSubArr.setStapleHighlight(leftIndex, "primary");
            }
            if (rightIndex < rightSubArr.length()) {
                rightSubArr.setStapleHighlight(rightIndex, "primary");
            }

            await this.pause(
                "sort.compare",
                leftIndex < leftSubArr.length()
                    ? leftSubArr.getValue(leftIndex)
                    : "empty array",
                rightIndex < rightSubArr.length()
                    ? rightSubArr.getValue(rightIndex)
                    : "empty array"
            );

            let sourceArr: StapleArray;
            let sourceIndex: number;

            // Determine which staple is smaller from the two subarrays
            if (
                rightIndex >= rightSubArr.length() ||
                (leftIndex < leftSubArr.length() &&
                compare(
                    leftSubArr.getValue(leftIndex),
                    rightSubArr.getValue(rightIndex)
                ) <= 0)
            ) {
                sourceArr = leftSubArr;
                sourceIndex = leftIndex;
                leftIndex++;
            } else {
                sourceArr = rightSubArr;
                sourceIndex = rightIndex;
                rightIndex++;
            }
            const stapleToInsert: ValueStaple = sourceArr.getStaple(sourceIndex);

            mergedArrayValues.push(stapleToInsert.getValue())

            const deltaX: number = parentArr.getStapleX(i) - sourceArr.getStapleX(sourceIndex);

            // Use the stored value for y, since sourceArr.y() might have changed if one of the staples have been moved
            const deltaY: number = Number(parentArr.y()) - Number(sourceArr.remember("y"));

            // Remove comparison highlight and move the staple to the correct position in the parent array
            this.animate(stapleToInsert).dmove(deltaX, deltaY)
            sourceArr.clearStapleHighlight(sourceIndex, "primary")

            // Hide the staple in the parent array to make the new one take its place
            parentArr.$staples[i].hide()

            await this.pause("sort.move", stapleToInsert.getValue())
        }

        // Delete subarrays when all staples have been moved
        finishAllAnimationsForElement(this.timeline, leftSubArr);
        finishAllAnimationsForElement(this.timeline, rightSubArr);
        leftSubArr.delete();
        rightSubArr.delete();

        // Create a new array with the values in the correct order and initialize it at the same position as the parent array
        const mergedArray: StapleArray = this.Svg.put(new StapleArray(
            mergedArrayValues,
            this.STAPLE_MAX_HEIGHT,
            this.getObjectSize(),
            parentArr.getMaxValue()
        )).init(parentArr.cx(), parentArr.cy())

        // Highlight the merged array as completely sorted
        for (let i = 0; i < mergedArray.length(); i++) {
            mergedArray.setStapleHighlight(i, "success")
        }
        
        // Delete the old parent array
        parentArr.delete();

        await this.pause("sort.mergeComplete")

        return mergedArray;
    }

    followRecursion() {
        this.disableViewBoxPanning();
        this.isFollowingRecursion = true;
    }

    doNotFollowRecursion() {
        this.enableViewBoxPanning();
        this.isFollowingRecursion = false;
    }
}
