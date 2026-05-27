import { QuickSortAlgorithmControls } from "~/algorithm-controls/quick-sort-algorithm-controls";
import { SortingAlgorithmControls } from "./algorithm-controls/sorting-algorithm-controls";
import { Engine, SubmitFunction } from "./engine";
import { initialiseEngine, querySelector, RecordOfEngines } from "./helpers";
import { InsertionSort } from "./sorting/InsertionSort";
import { MergeSort } from "./sorting/MergeSort";
import { QuickSort } from "./sorting/QuickSort";
import { SelectionSort } from "./sorting/SelectionSort";
import { BaseSorter } from "~/sorting/BaseSorter";
import { BubbleSort } from "./sorting/BubbleSort";
import { HeapSort } from "./sorting/HeapSort";
import { RadixSort } from "./sorting/RadixSort";

let right: number = 0;
let down: number = 0;
let zoom: number = 1;
let scrollSpeed: number = 1;

export interface Sorter extends Engine {
    sort: SubmitFunction;
    insert: SubmitFunction;
    setArraySize: (size: number) => void;
    generateShuffledArray: (shuffleType: string) => number[];
}

const SORTING_CLASSES = {
    SelectionSort: SelectionSort,
    InsertionSort: InsertionSort,
    MergeSort: MergeSort,
    QuickSort: QuickSort,
    BubbleSort: BubbleSort,
    HeapSort: HeapSort,
    RadixSort: RadixSort,
} as const satisfies RecordOfEngines<Sorter>;

const { engine, isBaseEngine } = initialiseEngine<Sorter>(
    "#sortingContainer",
    SORTING_CLASSES
);

if (!isBaseEngine) {
    if (engine instanceof QuickSort) {
        engine.algorithmControls = new QuickSortAlgorithmControls(
            engine.container,
            engine
        );
    } else  {
        engine.algorithmControls = new SortingAlgorithmControls(
            engine.container,
            engine
        );
    }
}
