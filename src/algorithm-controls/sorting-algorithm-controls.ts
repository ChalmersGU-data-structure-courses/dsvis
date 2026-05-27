import { addReturnSubmit, querySelector } from "~/helpers";
import { Sorter } from "~/sorting";
import { EngineAlgorithmControl } from "./engine-algorithm-controls";

export class SortingAlgorithmControls extends EngineAlgorithmControl {
    presetSizeSelect: HTMLSelectElement;
    insertField: HTMLInputElement;
    insertSubmit: HTMLInputElement;
    sortSubmit: HTMLInputElement;
    pseudoCode: HTMLDivElement;
    clearSubmit: HTMLInputElement;
    shuffleSelect: HTMLSelectElement;
    engine: Sorter;

    constructor(container: HTMLElement, engine: Sorter) {
        super(container);
        this.engine = engine;

        this.presetSizeSelect = querySelector<HTMLSelectElement>(
            "select#presetSizeSelect",
            container
        );
        this.insertField = querySelector<HTMLInputElement>(
            "input#insertField",
            container
        );
        this.insertSubmit = querySelector<HTMLInputElement>(
            "input#insertSubmit",
            container
        );
        this.clearSubmit = querySelector<HTMLInputElement>(
            "input#clearSubmit",
            container
        );
        this.pseudoCode = querySelector<HTMLDivElement>(
            "div.pseudoCode",
            container
        );
        this.sortSubmit = querySelector<HTMLInputElement>(
            "input#sortSubmit",
            container
        );
        this.shuffleSelect = querySelector<HTMLSelectElement>(
            "select.shuffle",
            container
        );

        this.initialize();

        if ((new URL(window.location.href).searchParams.get("array"))) {
            this.presetSizeSelect.value = 'none';
        } else {
            this.presetSizeSelect.value = 'tiny';
            this.presetSizeSelect.dispatchEvent(
                new Event("change")
            );
        }
    }

    initialize() {
        this.presetSizeSelect.addEventListener("change", () => {
            let arraySize: number;
            let objectSize: string | undefined;
            switch (this.presetSizeSelect.value) {
                case "tiny":
                    arraySize = 10;
                    objectSize = "huge"
                    break;
                case "small":
                    arraySize = 20;
                    objectSize = "large"
                    break;
                case "medium":
                    arraySize = 50
                    objectSize = "medium"
                    break;
                case "large":
                    arraySize = 100;
                    objectSize = "small"
                    break;
                case "huge":
                    arraySize = 200;
                    objectSize = "tiny"
                    break;
                case "empty":
                    arraySize = 0;
                    break;
                default:
                    console.debug("Value of preset size selected was incorrect");
                    return;
            }

            this.engine.setArraySize(arraySize);
            if (objectSize) {
                this.engine.generalControls.objectSizeSelect.value = objectSize;
                this.engine.generalControls.objectSizeSelect.dispatchEvent(
                    new Event("change")
                );
            }
        });

        addReturnSubmit(this.insertField, "int+", () =>
            this.engine.submit(this.engine.insert, this.insertField)
        );

        this.insertSubmit.addEventListener("click", () =>
            this.engine.submit(this.engine.insert, this.insertField)
        );

        this.sortSubmit.addEventListener("click", () =>
            this.engine.submit(this.engine.sort, null)
        );

        this.clearSubmit.addEventListener("click", () =>
            this.engine.confirmResetAll()
        );

        if (this.shuffleSelect) {
            this.shuffleSelect.addEventListener("change", () => {
                const shuffleType = this.shuffleSelect.value;
                this.shuffleSelect.value = "";
                
                if (shuffleType) {
                    // Generate the shuffled array
                    const shuffledArray = this.engine.generateShuffledArray(shuffleType);
                    
                    // Get current URL parameters
                    const searchParams = new URL(window.location.href).searchParams;
                    
                    // Append the shuffled array as a query parameter
                    const arrayParam = shuffledArray.join(",");
                    searchParams.set("array", arrayParam);
                    
                    // Update URL and reload
                    window.history.replaceState(
                        "",
                        "",
                        `${window.location.pathname}?${searchParams}`
                    );
                    window.location.reload();
                }
            });
        }

    }
}
