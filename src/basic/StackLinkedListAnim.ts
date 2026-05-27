import { Collection } from "~/collections";
import { Engine, MessagesObject } from "~/engine";
import { LinkedNode } from "~/objects/basic-structure-objects/linked-node";
import { LinkedConnection } from "~/objects/basic-structure-objects/node-connection";
import LinkedList from "./LinkedList";

export const StackLinkedListMessages = {
    insert: {
        element: (element: string | number) => `Pushing element: ${element}`,
        head: (element: string | number) =>
            `Stack is empty, pushing ${element} as head`,
    },
    delete: {
        delete: `Popping, removing node at head`,
        adjustLink: "Adjusting link",
        adjustPos: "Adjusting positions",
    },
    connection: {
        connect: (start: string, end: string) =>
            `connecting ${start} with ${end}`,
    },
};

export class StackLinkedListAnim extends Engine implements Collection {
    private readonly TOP_MARGIN = 200;
    private readonly MIN_SIDE_MARGIN = 20;

    messages: MessagesObject = StackLinkedListMessages;
    initialValues: string[] | null = null; // Only used for hard-coded values
    linkedList: LinkedList<string | number> = new LinkedList(); // Linked list instance
    nodeArray: [LinkedNode, LinkedConnection | null][] = []; // Array to store the nodes and connections
    nodeDimensions: [number, number] = [
        this.getObjectSize() * 2,
        this.getObjectSize(),
    ]; // Dimensions for the nodes
    
    headNode: LinkedNode = new LinkedNode("Head", this.nodeDimensions, this.getStrokeWidth());

    cols: number = Math.floor(this.$Svg.width / this.nodeDimensions[0] / 2); //number of columns
    rows: number = Math.ceil(this.$Svg.height / this.nodeDimensions[1] / 2); //number of rows based on size and height of the canvas

    constructor(containerSelector: string) {
        super(containerSelector);
    }

    initialise(initialValues: string[] | null = null): void {
        super.initialise(); // super also calls resetAlgorithm
        this.initialValues = initialValues;
    }

    // Reset the algorithm to its initial state
    // !! Engine then re-builds by calling all recorded actions
    async resetAlgorithm(): Promise<void> {
        await super.resetAlgorithm();

        // Reset the linked list by creating a new instance
        this.linkedList = new LinkedList();
        this.nodeArray = [];
        this.nodeDimensions = [this.getObjectSize() * 2, this.getObjectSize()];

        // If initial values are provided, insert them into the animated list
        await this.state.runWhileResetting(async () => {
            if (this.initialValues) {
                await this.insert(...this.initialValues);
            }
        });
    }

    // Insert initial values into the linked list
    async insert(...values: (string | number)[]): Promise<void> {
        for (const val of values) {
            if(this.linkedList.size != 0){
                await this.pause("Pushing at head");
            }
            await this.insertFront(val);
        }
    }


    // Visualization logic for inserting a node to the front
    async insertFront(value: string | number): Promise<void> {
        this.linkedList.insertFront(value);

        const insertionText =
            this.linkedList.size === 1 ? "insert.head" : "insert.element";
        await this.pause(insertionText, value);

        const node = new LinkedNode(
            value,
            this.nodeDimensions,
            this.getStrokeWidth()
        );

        if(this.linkedList.size === 1){
            const coords = this.newNodeCoords();

            this.headNode = new LinkedNode("Head", this.nodeDimensions, this.getStrokeWidth());
            this.Svg.add(this.headNode);
            await this.headNode.move(coords[0]-this.nodeDimensions[1], coords[1] - this.nodeDimensions[0]);
            this.headNode.opacity(0);
            const head = this.Svg.text("Head");
            head.fill('var(--node-text)');
            head.font({size: this.getObjectSize() * 0.6});
            head.move(this.headNode.getCenterPos()[0], this.headNode.getCenterPos()[1] - this.getObjectSize() * 0.7);
        }

        this.Svg.add(node);

        this.highlight(node, true);

        // Start at the lower center and then move to the correct position with animation
        node.center(
            this.$Svg.width / 2,
            this.$Svg.height - this.nodeDimensions[1] * 2
        );

        const connection = await new LinkedConnection(
            this.headNode, 
            node,
            this.nodeDimensions,
            this.getStrokeWidth(),
            this.Svg
        );

        if (connection) {
            this.highlight(connection, true);
        }

        // Add the node to the array and make connections
        this.nodeArray.unshift([node, connection]);
        
        await this.pause("delete.adjustPos");

        // Moving node logic in adjustNodes
        this.adjustNodes(0, 0);

        this.highlight(node, false);
        if (connection) {
            this.highlight(connection, false);
        }
        
        await this.pause(undefined);
        
    }

    // Visualization logic for inserting a node to a specific index
    async insertAt(value: string | number, index: number): Promise<void> {
        // Implementation goes here
    }

    // Visualization logic for finding a node
    async find(...values: (string | number)[]): Promise<void> {
    }

    // Visualization logic for deleting a node
    async delete(value: string | number): Promise<void> {
        if (this.nodeArray.length > 0) {
            const node = this.nodeArray[0][0];
            // If the node is found
            this.highlight(node, true);
            await this.pause("delete.delete", value);
            this.linkedList.removeElement(value);
            node.remove(); // Remove the node from the SVG

            await this.pause("delete.adjustLink");
            const index = this.nodeArray.findIndex(([n]) => n === node); // Find the index of the node in the array
            // If the node is the first one, remove the link to the next node
            if (index === this.nodeArray.length - 1) {
                // If the node is the last one, remove the connection to the previous node
                const prevConnection = this.nodeArray[
                    index
                ][1] as LinkedConnection;
                prevConnection.remove();
                this.nodeArray[index][1] = null; // Set the connection to null
            } else {
                // If the node is not the last one
                // Remove the connection to the next node
                const connection = this.nodeArray[
                    index + 1
                ][1] as LinkedConnection;
                connection.remove();
                // Update the connection of the previous node to go to the next node
                const nextNode = this.nodeArray[index + 1][0];
                const prevConnection = this.nodeArray[
                    index
                ][1] as LinkedConnection; // need to move this index + 1
                this.nodeArray[index + 1][1] = prevConnection;
                prevConnection.setEnd(nextNode, this.animationValue());
            }
            await this.pause("delete.adjustPos");
            
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

    async print(): Promise<void> {}

    async makeConnections(node: LinkedNode): Promise<LinkedConnection | null> {
        // insertBack

        // If there is only one node in the list, point from head
        if (this.linkedList.size === 1) {
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
}
