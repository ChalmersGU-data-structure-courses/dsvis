import { Collection } from "~/collections";
import { Engine, MessagesObject, SubmitFunction } from "~/engine";
import { LinkedNode } from "~/objects/basic-structure-objects/linked-node";
import { LinkedConnection } from "~/objects/basic-structure-objects/node-connection";
import Queue from "./Queue"


export const QueueLinkedListMessages = {
    insert: {
        element: (element: string | number) => `Enqueuing element: ${element}`,
        head: (element: string | number) =>
            `Queue is empty, insert ${element} as head`,
        adjustPointer: "Moving tail pointer to enqueued node"
    },
    delete: {
        delete: `Dequeuing node at head`,
        adjustLink: "Adjusting link",
        adjustPos: "Adjusting positions",
    },
    connection: {
        connect: (start: string, end: string) =>
            `connecting ${start} with ${end}`,
    },
};

export class QueueLinkedListAnim<T> extends Engine implements Collection{

    private readonly TOP_MARGIN = 200;
    private readonly MIN_SIDE_MARGIN = 20;

    messages: MessagesObject = QueueLinkedListMessages;
    initialValues: string[] | null = null; // Only used for hard-coded values
    queue: Queue<string | number> = new Queue(); // Queue instance
    nodeArray: [LinkedNode, LinkedConnection | null][] = []; // Array to store the nodes and connections
    nodeDimensions: [number, number] = [
        this.getObjectSize() * 2,
        this.getObjectSize(),
    ]; // Dimensions for the nodes

    headNode: LinkedNode = new LinkedNode("Head", this.nodeDimensions, this.getStrokeWidth());
    tailNode: LinkedNode = new LinkedNode("Tail", this.nodeDimensions, this.getStrokeWidth());
    tailText !: any;
    private tailConnection: LinkedConnection | null = null;

    cols: number = Math.floor(this.$Svg.width / this.nodeDimensions[0] / 2); //number of columns
    rows: number = Math.ceil(this.$Svg.height / this.nodeDimensions[1] / 2); //number of rows based on size and height of the canvas

    constructor(containerSelector: string) {
        super(containerSelector);
    }

    initialise(initialValues: string[] | null = null): void {
        super.initialise(); // super also calls resetAlgorithm
        this.initialValues = initialValues;
    }

    async resetAlgorithm(): Promise<void> {
        await super.resetAlgorithm();

        this.tailText = this.Svg.text("Tail");
        this.tailText.fill('var(--node-text)');

        // Reset the Queue by creating a new instance
        this.queue = new Queue();
        this.nodeArray = [];
        this.nodeDimensions = [this.getObjectSize() * 2, this.getObjectSize()];

        // If initial values are provided, insert them into the animated Queue
        await this.state.runWhileResetting(async () => {
            if (this.initialValues) {
                await this.insert(...this.initialValues);
            }
        });
    }

    // Enqueue
    async insert(...values: (string | number)[]): Promise<void>{
        for (const val of values) {
            if(this.queue.size() != 0){
                await this.pause("Enqueue at tail");
            }
            await this.insertBack(val);
        }
    }

   
    async insertBack(value: string | number): Promise<void> {
        this.queue.enqueue(value);

        const insertionText =
            this.queue.size() === 1 ? "insert.head" : "insert.element";
        await this.pause(insertionText, value);

        const node = new LinkedNode(
            value,
            this.nodeDimensions,
            this.getStrokeWidth()
        );

        const size = this.queue.size();

        this.Svg.add(node);

        const coords = this.newNodeCoords();

        // Creates invisible nodes to act as the head and tail pointers
        if(size === 1){
            this.headNode = new LinkedNode("Head", this.nodeDimensions, this.getStrokeWidth());
            this.Svg.add(this.headNode);
            await this.headNode.move(coords[0]-this.nodeDimensions[1], coords[1] - this.nodeDimensions[0]);
            this.headNode.opacity(0);
            const head = this.Svg.text("Head");
            head.fill('var(--node-text)');
            head.font({size: this.getObjectSize() * 0.6});
            head.move(this.headNode.getCenterPos()[0], this.headNode.getCenterPos()[1] - this.getObjectSize() * 0.7);


            this.tailNode = new LinkedNode("Tail", this.nodeDimensions, this.getStrokeWidth());
            this.Svg.add(this.tailNode);
            this.tailText.font({size: this.getObjectSize() * 0.6});
            this.tailText.opacity(1);
            this.tailNode.opacity(0);
            await this.tailNode.move(coords[0], coords[1] + this.nodeDimensions[0]);

            this.tailConnection = new LinkedConnection(
                this.tailNode,
                node,
                this.nodeDimensions,
                this.getStrokeWidth(),
                this.Svg
            );
            this.tailConnection.opacity(0);

        } 

        this.tailNode.move(coords[0], coords[1] + this.nodeDimensions[0]);
        
        node.mirror(coords[2]);

        this.highlight(node, true);

        // Start at the lower center and then move to the correct position with animation
        node.center(
            this.$Svg.width / 2,
            this.$Svg.height - this.nodeDimensions[1] * 2
        );


        const connection = await this.makeConnections(node);

        if (connection) {
            this.highlight(connection, true);
        }


        await this.pause(insertionText, value);
        // Move to the correct position with animation
        this.animate(node, !this.state.isResetting()).move(
            coords[0], 
            coords[1]
        );

        connection?.updateEnd([coords[0], coords[1]], this.animationValue());
        
        await this.pause(undefined)

        if(this.tailConnection){
            this.highlight(this.tailConnection, true);
        }

        this.animate(this.tailText, !this.state.isResetting()).move(
            this.tailNode.getCenterPos()[0] - this.getObjectSize() * 0.5, 
            this.tailNode.getCenterPos()[1] - this.getObjectSize() * 0.3
        );

        this.tailConnection?.updateAll(
            [coords[0] + this.nodeDimensions[1], coords[1] + this.nodeDimensions[0]], 
            [coords[0] + this.nodeDimensions[1], coords[1]],
            this.animationValue()
        );

        
        this.highlight(node, false);
        if (connection) {
            this.highlight(connection, false);
        }

        await this.pause("insert.adjustPointer");

        if(this.tailConnection){
            this.highlight(this.tailConnection, false);
        }

        
        this.tailConnection?.opacity(1);


        // Add the node to the array and make connections
        this.nodeArray.push([node, connection]);

        await this.pause(undefined);
        
    }

    async delete(value: string | number): Promise<void> {
        //await this.pop();

        const node = this.nodeArray[0][0];
        let coords = [0, 0];
        if(this.queue.size() > 1){
            coords = this.nodeArray[this.queue.size() - 2][0].getPos();
        }
        else{
            this.tailConnection?.remove();
        }
        
        if (node) {
            // If the node is found
            this.highlight(node, true);
            await this.pause("delete.delete", value);
            await this.queue.dequeue();
            node.remove(); // Remove the node from the SVG

            await this.pause("delete.adjustLink");
            const index = this.nodeArray.findIndex(([n]) => n === node); // Find the index of the node in the array
            // If the node is the first one, remove the link to the next node
            if (index === this.nodeArray.length - 1) {
                // If the node is the last one, remove the connection to the previous node
                const prevConnection = this.nodeArray[index][1] as LinkedConnection;
                prevConnection.remove();
                this.nodeArray[index][1] = null; // Set the connection to null
            } else {
                // If the node is not the last one
                // Remove the connection to the next node
                const connection = this.nodeArray[index + 1][1] as LinkedConnection;
                connection.remove();
                
                // Update the connection of the previous node to go to the next node
                const nextNode = this.nodeArray[index + 1][0];
                const prevConnection = this.nodeArray[index][1] as LinkedConnection; // need to move this index + 1
                this.nodeArray[index + 1][1] = prevConnection;
                prevConnection.setEnd(nextNode, this.animationValue());
            }

            await this.pause("delete.adjustPos");
            
            
            if (!this.queue.isEmpty()){
                
                this.tailNode.move(coords[0], coords[1] + this.nodeDimensions[0]);
                
                
                console.log("Works?", this.queue.size());
                console.log("Works?", coords);
                
                this.animate(this.tailText, !this.state.isResetting()).move(
                    this.tailNode.getCenterPos()[0] - this.getObjectSize() * 0.5, 
                    this.tailNode.getCenterPos()[1] - this.getObjectSize() * 0.3
                 );
                
                this.tailConnection?.updateAll(
                    [coords[0] + this.nodeDimensions[1], coords[1] + this.nodeDimensions[0]], 
                    [coords[0] + this.nodeDimensions[1], coords[1]],
                    this.animationValue()
                );
            }

            this.adjustNodes(index, index + 1);

            await this.pause(undefined);
        }

        
    }

    adjustNodes(startindex: number, endindex: number): void {
        const left = this.nodeArray.slice(0, startindex);
        const right = this.nodeArray.slice(endindex);
        

        this.nodeArray = left;

        let prevNodePointerPos: [number, number];
        if (startindex > 0) {
            prevNodePointerPos =
                this.nodeArray[this.nodeArray.length - 1][0].getPointerPos(); // Get the pointer position of the previous node
        } else {
            prevNodePointerPos = this.headNode.getPointerPos();
        }

        for (const nodeCon of right) {
            const node = nodeCon[0];
            const connection = nodeCon[1];

            const coords = this.newNodeCoords();
            node.mirror(coords[2]);

            // Move the node and link to the correct position with animation
            this.animate(node, !this.state.isResetting()).move(
                coords[0],
                coords[1]
            );

            // Update the connection to the new position
            if (connection) {
                const startCoords = prevNodePointerPos!;
                const endCoords: [number, number] = [coords[0], coords[1]];
                connection.updateAll(
                    startCoords,
                    endCoords,
                    this.animationValue()
                );
            }

            // Remember the previous node's pointer position for the next connection
            if (!coords[2]) {
                prevNodePointerPos = [
                    coords[0] +
                        node.elementRectWidth +
                        node.nextNodeRectWidth / 2,
                    coords[1] + this.nodeDimensions[1] / 2,
                ];
            } else {
                prevNodePointerPos = [
                    coords[0] + node.nextNodeRectWidth / 2,
                    coords[1] + this.nodeDimensions[1] / 2,
                ];
            }
        
            this.nodeArray.push([node, connection]);
        }

    }

    async makeConnections(node: LinkedNode): Promise<LinkedConnection | null> {
        // insertBack

        // If there is only one node in the list, point from head
        if (this.queue.size() === 1) {
            return new LinkedConnection(
                this.headNode, 
                node,
                this.nodeDimensions,
                this.getStrokeWidth(),
                this.Svg
            );
        }
       
        const prevNode = this.nodeArray[this.nodeArray.length - 1][0];
    
        const connection = new LinkedConnection(
            prevNode,
            node,
            this.nodeDimensions,
            this.getStrokeWidth(),
            this.Svg
        );
        return connection;
    }


    // Calculates the next position for a node in a zigzag layout pattern and if it should be mirrored
    // if the node is going on an odd row, it should be mirrored
    private newNodeCoords(): [number, number, boolean] {
        const [nodeWidth, nodeHeight] = this.nodeDimensions;
        let mirrored = false;
        let tmp;

        const maxNodesPerRow = Math.max(
            1,
            Math.floor(
                (this.$Svg.width - 2 * this.MIN_SIDE_MARGIN) /
                    (nodeWidth + this.getNodeSpacing())
            )
        );
        const totalNodesWidth =
            maxNodesPerRow * nodeWidth +
            (maxNodesPerRow - 1) * this.getNodeSpacing();
        const sideMargin = (this.$Svg.width - totalNodesWidth) / 2;

        const row = Math.floor(this.nodeArray.length / maxNodesPerRow);
        const positionInRow = this.nodeArray.length % maxNodesPerRow;

        const y =
            this.TOP_MARGIN + row * (nodeHeight + this.getNodeSpacing()) + 15; //placement position for the node, y-axis + 15 so it is easier to see the node

        let x: number;
        if (row % 2 === 0) {
            x =
                sideMargin +
                positionInRow * (nodeWidth + this.getNodeSpacing()); //placement position for the node, x-axis
        } else {
            x =
                sideMargin +
                (maxNodesPerRow - 1 - positionInRow) *
                    (nodeWidth + this.getNodeSpacing());
            mirrored = true;
        }

        // if (y + nodeHeight > this.$Svg.height - this.MIN_SIDE_MARGIN) {
        //     throw new Error(
        //         "Cannot add more nodes: Exceeded bottom margin of canvas"
        //     );
        // }

        return [x, y, mirrored];
    }

    private highlight(
        element: LinkedNode | LinkedConnection,
        value: boolean
    ): void {
        if (element instanceof LinkedConnection) {
            element.setHighlight(value);
        } else {
            element.children().forEach((child) => child.setHighlight(value)); // Highlight the element
        }
    }

    private animationValue(): number {
        const animate = !this.state.isResetting();
        return animate ? this.$Svg.animationSpeed : 0;
    }

    async pop(): Promise<void> {}

    async find(...values: (string | number)[]): Promise<void> {}

    async print(): Promise<void> {}

}