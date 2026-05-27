import { Engine, SubmitFunction } from "~/engine";
import { AVL } from "~/trees/AVL";
import { BST } from "~/trees/BST";
import { BTree } from "~/trees/BTree";
import { RedBlack } from "~/trees/RedBlack";
import { SplayTree } from "~/trees/SplayTree";
import { BTreeAlgorithmControl } from "./algorithm-controls/BTree-algorithm-controls";
import { CollectionAlgorithmControl } from "./algorithm-controls/collection-algorithm-controls";
import { HashTableAlgorithmControl } from "./algorithm-controls/HashTable-algorithm-controls";
import { StackAlgorithmControl } from "./algorithm-controls/Stack-algorithm-controls";
import { QueueAlgorithmControl } from "./algorithm-controls/Queue-algorithm-controls";
import { LinkedListAnim } from "~/basic/LinkedListAnim";
import { StackLinkedListAnim } from "~/basic/StackLinkedListAnim";
import { StackDynamicArrayAnim } from "~/basic/StackDynamicArrayAnim";
import { QueueDynamicArrayAnim } from "~/basic/QueueDynamicArrayAnim";
import { QueueLinkedListAnim } from "~/basic/QueueLinkedListAnim";
import { HashTableLinearProbing } from "~/basic/HashTableLinearProbing";
import { HashTableSeparateChaining } from "~/basic/HashTableSeparateChaining";

import { initialiseEngine, RecordOfEngines } from "./helpers";

export interface Collection extends Engine {
    insert: SubmitFunction;
    find: SubmitFunction;
    delete: SubmitFunction;
    print: SubmitFunction;
}


const COLLECTIONS_CLASSES = {
    BST: BST,
    AVL: AVL,
    RedBlack: RedBlack,
    SplayTree: SplayTree,
    BTree: BTree,
    LinkedListAnim: LinkedListAnim,
    StackLinkedListAnim: StackLinkedListAnim,
    StackDynamicArrayAnim: StackDynamicArrayAnim,
    QueueDynamicArrayAnim: QueueDynamicArrayAnim,
    QueueLinkedListAnim: QueueLinkedListAnim,
    HashTableLinearProbing: HashTableLinearProbing,
    HashTableSeparateChaining : HashTableSeparateChaining
} as const satisfies RecordOfEngines<Collection>;

const { engine, isBaseEngine } = initialiseEngine<Collection>(
    "#collectionsContainer",
    COLLECTIONS_CLASSES
);

if (!isBaseEngine) {
    if (engine instanceof BTree) {
        engine.algorithmControls = new BTreeAlgorithmControl(
            engine.container,
            engine
        );
    } 
    else if(engine instanceof QueueDynamicArrayAnim || engine instanceof QueueLinkedListAnim){
        engine.algorithmControls = new QueueAlgorithmControl(
            engine.container,
            engine
        );
    }
    else if(engine instanceof StackDynamicArrayAnim || engine instanceof StackLinkedListAnim){
        engine.algorithmControls = new StackAlgorithmControl(
            engine.container,
            engine
        );
    } 
    else if(engine instanceof HashTableLinearProbing || engine instanceof HashTableSeparateChaining){
        engine.algorithmControls = new HashTableAlgorithmControl(
            engine.container,
            engine
        );
    } else {
        engine.algorithmControls = new CollectionAlgorithmControl(
            engine.container,
            engine
        );
    }
}
