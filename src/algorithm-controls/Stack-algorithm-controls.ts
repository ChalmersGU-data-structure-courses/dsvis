import { Collection } from "~/collections";
import { addReturnSubmit, querySelector } from "~/helpers";
import { EngineAlgorithmControl } from "./engine-algorithm-controls";

export class StackAlgorithmControl extends EngineAlgorithmControl {
    insertSelect: HTMLSelectElement;
    insertField: HTMLInputElement;
    insertSubmit: HTMLInputElement;
    deleteSubmit: HTMLInputElement;
    clearSubmit: HTMLInputElement;
    engine: Collection;

    constructor(container: HTMLElement, engine: Collection) {
        super(container);

        this.engine = engine;

        this.insertSelect = querySelector<HTMLSelectElement>(
            "select.insertSelect",
            container
        );
        this.insertField = querySelector<HTMLInputElement>(
            "input.insertField",
            container
        );
        this.insertSubmit = querySelector<HTMLInputElement>(
            "input.insertSubmit",
            container
        );
        this.clearSubmit = querySelector<HTMLInputElement>(
            "input.clearSubmit",
            container
        );

        this.insertSubmit.value = "Push";
        querySelector<HTMLSelectElement>(
            "input.findField",
            container
        ).remove();
        querySelector<HTMLInputElement>(
            "input.findSubmit",
            container
        ).remove();
        querySelector<HTMLSelectElement>(
            "input.deleteField",
            container
        ).remove();
        querySelector<HTMLSelectElement>(
            "input.printSubmit",
            container
        ).remove();
        this.deleteSubmit = querySelector<HTMLInputElement>(
            "input.deleteSubmit",
            container
        );
        this.deleteSubmit.value = "Pop";

        this.initialize();
    }

    initialize() {
        this.insertSelect.addEventListener("change", () => {
            this.insertField.value = this.insertSelect.value;
            this.insertSelect.value = "";
        });

        addReturnSubmit(this.insertField, "ALPHANUM+", () =>
            this.engine.submit(this.engine.insert, this.insertField)
        );

        this.insertSubmit.addEventListener("click", () => {
            this.engine.submit(this.engine.insert, this.insertField);
        });

        this.deleteSubmit.addEventListener("click", () =>
            this.engine.submit(this.engine.delete, null)
        );
        
        this.clearSubmit.addEventListener("click", () =>
            this.engine.confirmResetAll()
        );
    }
}
