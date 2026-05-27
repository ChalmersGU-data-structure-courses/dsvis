import { Engine, SubmitFunction } from "~/engine";
import { initialiseEngine, RecordOfEngines } from "./helpers";
import { Depth } from "./graphs/Depth-first-search";
import { GraphAlgorithmControl } from "./algorithm-controls/graph-algorithmcontrols";
import { Breadth } from "./graphs/Breadth-first-search";
import { FloydWarshall } from "./graphs/Floyd-Warshall";
import { Dijkstras_algorithm } from "./graphs/Dijkstras-algoritm";
import { Prim } from "./graphs/Prim";

export interface Graph extends Engine {
    runningAlgorithm: SubmitFunction;
    chosenGraph: SubmitFunction;
    startNode: SubmitFunction;
}

const GRAPH_CLASSES = {
    FloydWarshall: FloydWarshall,
    Breadth: Breadth,
    Depth: Depth,
    Dijkstras_algorithm: Dijkstras_algorithm,
    Prim: Prim
} as const satisfies RecordOfEngines<Graph>;

const { engine, isBaseEngine } = initialiseEngine<Graph>(
    "#graphContainer",
    GRAPH_CLASSES
);

if (!isBaseEngine) {
    engine.algorithmControls = new GraphAlgorithmControl(
        engine.container,
        engine
    ); 
}