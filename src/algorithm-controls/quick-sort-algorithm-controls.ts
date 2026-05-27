import { addReturnSubmit, querySelector } from "~/helpers";
import { SortingAlgorithmControls } from "~/algorithm-controls/sorting-algorithm-controls";
import { PivotSelectionMethods, QuickSort } from "~/sorting/QuickSort";

export class QuickSortAlgorithmControls extends SortingAlgorithmControls {
    pivotMethodSelect: HTMLSelectElement;

    constructor(container: HTMLElement, engine: QuickSort) {
        super(container, engine);

        this.algorithmControls.insertAdjacentHTML(
            "beforeend",
            `<span class="formgroup">
                <label for="pivotMethodSelect">Pivot method</label>
                <select name="pivotMethodSelect" id="pivotMethodSelect" class="form-select form-select-sm w-auto">
                    <option value="middle">Middle</option>
                    <option value="first">First</option>
                    <option value="last">Last</option>
                    <option value="medianOfThree">Median-of-three</option>
                    <option value="random">Random</option>
                </select>
            </span>`
        );

        this.pivotMethodSelect = querySelector<HTMLSelectElement>(
            "select#pivotMethodSelect",
            this.algorithmControls
        );

        this.pivotMethodSelect.addEventListener("change", (event: Event) => {
            engine.debugger.log(
                `Setting pivot selection method to: ${this.pivotMethodSelect.value}`
            );
            if (!PivotSelectionMethods.some((value) => value === this.pivotMethodSelect.value)) {
                throw new Error("Pivot selection method does not exist");
            }
            engine.setPivotSelectionMethod(this.pivotMethodSelect.value as PivotSelectionMethods);
        });
    }
}
