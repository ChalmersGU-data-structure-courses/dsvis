import { Collection } from "~/collections";
import { addReturnSubmit, querySelector } from "~/helpers";
import { StackAlgorithmControl } from "./Stack-algorithm-controls";

export class QueueAlgorithmControl extends StackAlgorithmControl {
    insertSubmit: HTMLInputElement;
    deleteSubmit: HTMLInputElement;

    constructor(container: HTMLElement, engine: Collection) {
        super(container, engine);

        this.engine = engine;

        this.insertSubmit = querySelector<HTMLInputElement>(
            "input.insertSubmit",
            container
        );

        this.insertSubmit.value = "Enqueue";
        
        this.deleteSubmit = querySelector<HTMLInputElement>(
            "input.deleteSubmit",
            container
        );
        this.deleteSubmit.value = "Dequeue";

    }
}
