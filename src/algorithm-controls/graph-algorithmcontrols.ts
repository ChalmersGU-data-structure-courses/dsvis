import { Graph } from "~/graph";
import { EngineAlgorithmControl } from "./engine-algorithm-controls";
import { addReturnSubmit, querySelector } from "~/helpers";


export class GraphAlgorithmControl extends EngineAlgorithmControl {
    runningAlgorithm: HTMLInputElement;
    chosenGraph: HTMLInputElement;
    insertNode: HTMLInputElement;
    startNode: HTMLInputElement;
    chooseGraphI: HTMLSelectElement;
    engine: Graph;
    
    constructor(container: HTMLElement, engine: Graph) {
        super(container);

        this.engine = engine

        this.chooseGraphI = querySelector<HTMLSelectElement>(
            "select.chooseGraphI",
            container
        );

        this.chosenGraph = querySelector<HTMLInputElement>(
            "Input.chosengraph",
            container
        );

        this.runningAlgorithm = querySelector<HTMLInputElement> (
            "input.runningAlgorithm",
            container
        );

        this.insertNode = querySelector<HTMLInputElement> (
            "input.insertNode",
            container
        )

        this.startNode = querySelector<HTMLInputElement> (
            "input.startNode",
            container
        )

        this.initialize();
    }

    initialize() {
        this.chooseGraphI.addEventListener("change", () => {
            this.chosenGraph.value = this.chooseGraphI.value
            this.chooseGraphI.value = ""
            this.engine.submit(this.engine.chosenGraph, this.chosenGraph)
        })

        this.runningAlgorithm.addEventListener("click", () => {
            this.engine.submit(this.engine.runningAlgorithm, null)
        });

        addReturnSubmit(this.insertNode, "ALPHANUM+", () =>
                    this.engine.submit(this.engine.startNode, this.insertNode)
            );

        this.startNode.addEventListener("click", () => {
            this.engine.submit(this.engine.startNode, this.insertNode)
        })
    }
}