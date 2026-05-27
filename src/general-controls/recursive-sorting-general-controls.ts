import { querySelector } from "~/helpers";
import { EngineGeneralControls } from "./engine-general-controls";
import { MergeSort } from "~/sorting/MergeSort";

export class RecursiveSortingGeneralControls extends EngineGeneralControls {
    followRecursionCheckbox: HTMLInputElement;
    engine: MergeSort;

    constructor(container: HTMLElement, engine: MergeSort) {
        super(container, engine);

        this.engine = engine;

        this.generalControls.insertAdjacentHTML(
            "beforeend",
            `<span class="formgroup">
                <input id="followRecursionCheckbox" type="checkbox" checked switch />
                <label for="followRecursionCheckbox">Follow recursion</label>
            </span>`
        );

        this.followRecursionCheckbox = querySelector<HTMLInputElement>(
            "input#followRecursionCheckbox",
            container
        );

        this.followRecursionCheckbox.addEventListener("change", () => {
            if (this.followRecursionCheckbox.checked)
                this.engine.followRecursion();
            else this.engine.doNotFollowRecursion();
        });

        this.engine.disableViewBoxPanning();
    }
}
