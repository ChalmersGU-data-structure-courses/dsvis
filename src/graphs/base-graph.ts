import { G } from "@svgdotjs/svg.js";
import { Engine, MessagesObject, NBSP } from "~/engine";
import { EngineGeneralControls } from "~/general-controls/engine-general-controls";
import { Graph } from "~/graph";
import { WeightedGraphNode } from "~/objects/weightedgraph-node";
import { WeightedConnection } from "~/objects/weigted-connection";

export const BaseGraphMessages = {
    warning: {
        nullGraph: "Please choose a graph first"
      , incorrectStart: (value: string, graph: string) => 
            `Could not find ${value}; current start node is ${graph}`
    }
    , traversal: {
        complete: "Done!"
    }
} as const satisfies MessagesObject

export type tableInformation = { node:   WeightedGraphNode
                               , weight: number
                               , node2?: WeightedGraphNode }

export type rowHighlight = { node:   WeightedGraphNode
                           , weight: number
                           , node2?: WeightedGraphNode }

export abstract class BaseGraph extends Engine implements Graph {
    edgeTable: G;
    graph: WeightedGraphNode | null = null;
    createdNodes: WeightedGraphNode[] = [];
    generalControls: EngineGeneralControls;

    constructor(containorSelector: string) {
        super(containorSelector)

        this.generalControls = new EngineGeneralControls(this.container, this)
        this.edgeTable = this.Svg.group()
        
    }



    /**
     * Function for running the graph algorithm
     */
    abstract runningAlgorithm(): Promise<void>

    /**
     * Function for visualizing how the graph algorithm iterates through the graph
     */
    abstract nodeTraversalVisualisation(): void

    //Updates the table and redraws it using drawRow()
    abstract updateTable(
        tableInformation:tableInformation[]
      , rowHighlight:rowHighlight
    ): Promise<void>

    drawRow(
        rowData: string[],
        rowIndex: number,
        startX: number,
        startY: number,
        cellWidth: number,
        cellHeight: number,
        highlight?: boolean
    ): G {
        const rowY = startY + rowIndex * cellHeight;
        const rowWidth = rowData.length * cellWidth;

        // Create a group for the row
        const rowGroup = this.edgeTable.group();

        // Background highlight (CSS class)
        const rowRect = rowGroup
            .rect(rowWidth, cellHeight)
            .move(startX, rowY)

        if (highlight) rowRect.addClass('row-highlight');
        else rowRect.addClass("row-normal")

        // Send highlight to back so cells and text appear on top
        

        // Draw cells and text on top
        for (let col = 0; col < rowData.length; col++) {
            const x = startX + col * cellWidth;
            const y = rowY;

            rowGroup
                .rect(cellWidth, cellHeight)
                .move(x, y)
                .addClass('cell');

            rowGroup
                .text(rowData[col])
                .font({
                    anchor: 'middle',
                    leading: '1em',
                    size: 14
                })
                .center(x + cellWidth / 2, y + cellHeight / 2);
        }
        rowRect.front();
        return rowGroup;
    }

    /**
     * Resets all highlighted edges and nodes and clears the edgetable
     */
    resetHighlights(): void {
        for (const k of this.createdNodes) {
            const inc = k.$incoming
            const out = k.$outgoing
            for (const c in inc) {
                inc[c]?.setHighlightColor(false)
            }
            for (const c in out) {
                out[c]?.setHighlightColor(false)
            }
            k.setHighlightColor(false)
        }
        this.edgeTable.clear()
    }

    /**
     * Chooses a new start node for the graph algorithm
     * 
     * @param value - A string or number that the new start node has, if no created node has this value then it sends a warning
     */
    async startNode(value: string | number): Promise<void> {
        if (!this.graph) {
            await this.pause("warning.nullGraph")
            return
        }
        this.resetHighlights()
        this.graph?.setHighlight(false)
        for (const k of this.createdNodes) {
            if (k.getText() === value) {
                this.graph = k
                this.graph.setHighlight(true)
                return
            }
        }
        await this.pause("warning.incorrectStart", value, this.graph?.getText())
        this.graph?.setHighlight(true)
    }

    /**
     * Chooses the next graph that the algorithm can run on
     * 
     * @param graf - The name of an existing graph, if non existant it sends a warning
     */
    async chosenGraph(graf: string | number): Promise<void> {
        if (graf === "") {
            await this.resetAlgorithm()
        } else if (graf === "Simple") {
            await this.resetAlgorithm()
            this.simpleGraph()
        } else if (graf === "Tree") {
            await this.resetAlgorithm()
            this.treeGraph()
        } else if (graf === "Simple_2") {
            await this.resetAlgorithm()
            this.simple2Graph()
        } else if (graf === "Cyclic") {
            await this.resetAlgorithm()
            this.cyclicGraph()
        } else if (graf === "aCyclic") {
            await this.resetAlgorithm()
            this.acyclicGraph()
        } else if (graf === "DAG") {
            await this.resetAlgorithm()
            this.DAGraph()
        } else if (graf === "Weakly") {
            await this.resetAlgorithm()
            this.weaklyConnectedGraph()
        } else if (graf === "Strongly") {
            await this.resetAlgorithm()
            this.stronglyConnectedGraph()
        } else if (graf === "Eulerian") {
            await this.resetAlgorithm()
            this.eulerianGraph()
        } else if (graf === "Hamiltonian") {
            await this.resetAlgorithm()
            this.hamiltonianGraph()
        } else if (graf === "Chordal") {
            await this.resetAlgorithm()
            this.chordalGraph()
        } else {
            await this.resetAlgorithm()
            this.Svg.text("You are WRONG!")
            .center(this.$Svg.width/10, this.$Svg.height/2)
            .font({ size: 100 })
            .stroke({ color: "#f44444", width: 5 })
            this.Svg.text("also ERROR!")
            .center(this.$Svg.width/10, this.$Svg.height/2 + 100)
            .font({ size: 10 })
            .stroke({ color: "#f44444", width: 0.5 })
        }
        this.body = NBSP;
    }

    /**
     * Initiates a new node, puts it on the canvas and stores it in this.creatednodes
     * 
     * @param text - The text that will be displayed on the new node
     * 
     * @returns - The new node
     */
    newNode(text: string): WeightedGraphNode {
        const newNode = new WeightedGraphNode(text, this.getObjectSize(), this.getStrokeWidth())
        this.createdNodes.push(newNode)
        return this.Svg.put(
            newNode
        ).init(...this.getNodeStart());
    }

    /**
     * Removes all nodes and edges from canvas and 
     * resets this.creatednodes and the edgetable
     */
    async resetAlgorithm(): Promise<void> {
        await super.resetAlgorithm();
        for (const k of this.createdNodes) {
            k.remove()
            for (const c in k.$incoming) {
                k.$incoming[c]?.remove()
                k.$incoming[c]?.$textObj.remove()
            }
            for (const c in k.$outgoing) {
                k.$outgoing[c]?.remove()
                k.$outgoing[c]?.$textObj.remove()
            }
        }
        this.createdNodes = []
        this.edgeTable.clear()
    }

    /**
     * 
     * 
     * @param startNode - Node at the start of the edge
     * @param endNode - Node at the end of the edge
     * @returns edge going from startNode to endNode
     */
    getEdge( startNode:WeightedGraphNode
           , endNode:WeightedGraphNode): WeightedConnection<WeightedGraphNode> {
        for (const key in startNode.$outgoing) {
            if (!startNode.$outgoing[key]) continue

            if (endNode === startNode.$outgoing[key].$end) return startNode.$outgoing[key]

        }
        throw new Error("There exists no edge between startNode and endNode")
    }

    /**
     * Creates an edge between two nodes
     * 
     * @param ourNode - The starting point for the edge
     * 
     * @param theirNode - The end point for the edge
     * 
     * @param weight - The weight of the edge
     * 
     * @param dir - Determines which way the edge is directed, to(our -> their)/from(their -> our)/both(our <-> their)
     * 
     * @returns - The graph
     */
    link(
        ourNode: WeightedGraphNode, 
        theirNode: WeightedGraphNode,
        weight: number,
        dir: string
    ): this {
        if (dir === "to") {
            ourNode.setSuccessor(
                theirNode.getText(), 
                ourNode.getText(), 
                theirNode, 
                this.getStrokeWidth(), 
                weight
            )
        } else if (dir === "from") {
            ourNode.setPredecessor(
                theirNode.getText(), 
                ourNode.getText(), 
                theirNode, 
                this.getStrokeWidth(), 
                weight
            )
        } else if (dir === "both") {
            ourNode.setPredecessor(
                theirNode.getText(),
                ourNode.getText(),
                theirNode,
                this.getStrokeWidth(),
                weight
            )
            ourNode.setSuccessor(
                theirNode.getText(), 
                ourNode.getText(), 
                theirNode, 
                this.getStrokeWidth(), 
                weight
            )
        } else {
            throw new Error ("Internal error, you've spelt the direction wrong")
        }
        return this
    }

    /**
     * Puts a node relative to another node a certain distance away 
     * (standard 125, not sure which unit)
     * 
     * @param putNode - The node you are moving
     * 
     * @param relativNode - The node you are basing the moving of putNode around
     * 
     * @param degree - The degree relativ relativNode you are putting putNode
     * 
     * @param distance - The distance from relativNode that you are putting putNode
     * 
     * @param animation - Determines if it will be animated (currently buggy)
     */
    putAtDeg(
        putNode: WeightedGraphNode,
        relativNode: WeightedGraphNode,
        degree: number,
        distance: number = 125,
        animation: boolean = false
    ): void {
        distance = distance*putNode.getSize()/40
        const degreé = Math.PI/180 * degree * (-1)
        const [relativX, relativY] = relativNode.getCenter()
        var ani = 0
        if (animation) ani = this.getAnimationSpeed();
        putNode.setCenter(
            relativX + distance*Math.cos(degreé),
            relativY + distance*Math.sin(degreé),
            ani
        )
    }

    //Implement default graphs below

    private simpleGraph(): void {
        const midW = this.$Svg.width/2 - 250
        const midH = this.$Svg.height/2 + 150

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")
        const F = this.newNode("F")
        const G = this.newNode("G")
        const H = this.newNode("H")
        const I = this.newNode("I")
        const J = this.newNode("J")

        this.graph = A
        A.setCenter(midW, midH)
        
        this.putAtDeg(B, A, 135)
        this.link(A, B, 1, "from")

        this.putAtDeg(C, A, 0, 150)
        this.link(A, C, 6, "from")
        
        this.putAtDeg(D, B, 45)
        this.link(C, D, 3, "to")
        this.link(B, D, 4, "to")
        this.link(A, D, 3, "from")

        this.putAtDeg(E, A, 225)
        this.link(E, A, 5, "to")

        this.putAtDeg(F, C, 45)
        this.link(F, C, 2, "from")

        this.putAtDeg(G, C, -45)
        this.link(G, C, 1, "from")
        this.link(G, F, 5, "from")

        this.putAtDeg(H, D, 0, 150)
        this.link(D, H, 7, "to")
        this.link(H, C, 1, "from")

        this.putAtDeg(I, D, 135, 80)
        this.link(I, D, 3, "from")

        this.putAtDeg(J, G, 45)
        this.link(G, J, 8, "to")
    }

    private simple2Graph(): void {
        const midW = this.$Svg.width/2 - 100
        const midH = this.$Svg.height/2 + 100

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")
        const F = this.newNode("F")
        const G = this.newNode("G")
        const H = this.newNode("H")
        const I = this.newNode("I")
        const J = this.newNode("J")

        this.graph = A
        A.setCenter(midW, midH)

        this.putAtDeg(B, A, -90)
        this.link(A, B, 3, "to")

        this.putAtDeg(C, A, -30, 100)
        this.link(C, A, 2, "both")
        this.link(C, B, 4, "both")

        this.putAtDeg(D, A, -150, 100)
        this.link(D, A, 9, "to")

        this.putAtDeg(E, A, 90)
        this.link(E, A, 8, "to")
        this.link(E, A, 1, "from")

        this.putAtDeg(F, A, 30)
        this.link(C, F, 6, "to")
        this.link(F, E, 4, "to")

        this.putAtDeg(G, F, 60)
        this.link(F, G, 7, "both")
        this.link(G, E, 3, "to")

        this.putAtDeg(H, E, 190)
        this.link(H, E, 2, "from")
        this.link(H, E, 8, "to")

        this.putAtDeg(I, H, 170)
        this.link(H, I, 5, "both")

        this.putAtDeg(J, H, 220)
        this.link(I, J, 2, "to")
        this.link(I, J, 3, "from")
        this.link(J, D, 2, "from")
        this.link(J, A, 1, "from")
        this.link(D, B, 4, "from")
    }

    private treeGraph(): void {
        const midW = this.$Svg.width/2 - 150
        const midH = this.$Svg.height/2 - 120

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")
        const F = this.newNode("F")
        const G = this.newNode("G")
        const H = this.newNode("H")
        const I = this.newNode("I")
        const J = this.newNode("J")
        const K = this.newNode("K")
        const L = this.newNode("L")
        const M = this.newNode("M")
        const N = this.newNode("N")

        A.setCenter(midW, midH)
        this.graph = A

        this.putAtDeg(B, A, -40, 100)
        this.putAtDeg(C, A, 180, 100)
        this.link(A, B, 10, "to")
        this.link(A, C, 10, "to")

        this.putAtDeg(D, B, -120, 90)
        this.putAtDeg(E, B, -60, 90)
        this.link(B, D, 10, "to")
        this.link(B, E, 10, "to")

        this.putAtDeg(F, C, -150, 90)
        this.putAtDeg(G, C, -90, 90)
        this.link(C, F, 10, "to")
        this.link(C, G, 10, "to")

        this.putAtDeg(H, F, -120, 90)
        this.putAtDeg(I, F, -60, 90)
        this.link(F, H, 10, "to")
        this.link(F, I, 10, "to")

        this.putAtDeg(J, G, -60, 90)
        this.link(G, J, 10, "to")

        this.putAtDeg(K, I, -120, 90)
        this.link(I, K, 10, "to")

        this.putAtDeg(L, K, -135, 90)
        this.putAtDeg(M, K, -45, 90)
        this.link(K, L, 10, "to")
        this.link(K, M, 10, "to")

        this.putAtDeg(N, D, -90, 90)
        this.link(D, N, 10, "to")
    }

    private cyclicGraph(): void {
        const midW = this.$Svg.width/2 - 80
        const midH = this.$Svg.height/2 - 50

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")
        const F = this.newNode("F")
        const G = this.newNode("G")
        const H = this.newNode("H")
        const I = this.newNode("I")
        const J = this.newNode("J")
        const K = this.newNode("K")

        this.graph = A
        A.setCenter(midW, midH)

        this.link(A, B, 1, "to")
        this.putAtDeg(B, A, 145)

        this.link(B, C, 2, "to")
        this.putAtDeg(C, B, 190)

        this.link(C, D, 3, "to")
        this.putAtDeg(D, C, 235)

        this.link(D, E, 4, "to")
        this.putAtDeg(E, D, 280)
        
        this.link(E, F, 5, "to")
        this.putAtDeg(F, E, 325)

        this.link(F, G, 6, "to")
        this.link(F, B, 14, "both")
        this.putAtDeg(G, F, 10)

        this.link(G, H, 7, "to")
        this.putAtDeg(H, G, 55)

        this.link(H, A, 8, "to")
        this.link(H, I, 9, "both")
        this.putAtDeg(I, H, 60)

        this.link(I, J, 10, "both")
        this.link(J, K, 11, "both")
        this.link(J, H, 12, "to")
        this.putAtDeg(J, I, -45)

        this.link(K, H, 13, "both")
        this.putAtDeg(K, H, -60)
    }

    private acyclicGraph(): void {
        const midW = this.$Svg.width/2 - 100
        const midH = this.$Svg.height/2 + 100

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")
        const F = this.newNode("F")
        const G = this.newNode("G")
        const H = this.newNode("H")

        this.graph = A
        A.setCenter(midW, midH)
        
        this.link(A, B, 4, "from")
        this.putAtDeg(B, A, 180)

        this.link(A, C, 7, "from")
        this.putAtDeg(C, A, 0)

        this.link(D, B, 6, "to")
        this.putAtDeg(D, B, 90)

        this.link(E, C, 5, "to")
        this.link(E, D, 2, "from")
        this.putAtDeg(E, C, 90)

        this.link(F, A, 9, "from")
        this.putAtDeg(F, A, -90)

        this.link(G, F, 1, "to")
        this.putAtDeg(G, F, 180)

        this.link(H, F, 1, "from")
        this.putAtDeg(H, F, 0)
    }

    private DAGraph(): void {
        const midW = this.$Svg.width/2 - 300
        const midH = this.$Svg.height/2 - 50

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")
        const F = this.newNode("F")
        const G = this.newNode("G")
        const H = this.newNode("H")

        this.graph = A
        A.setCenter(midW, midH)

        this.link(B, A, 2, "from")
        this.putAtDeg(B, A, -90)

        this.link(C, A, 2, "from")
        this.putAtDeg(C, A, 0)

        this.link(D, B, 8, "from")
        this.link(D, C, 4, "from")
        this.putAtDeg(D, C, 10)

        this.link(E, B, 5, "from")
        this.putAtDeg(E, B, 10)

        this.link(F, E, 2, "from")
        this.link(F, D, 4, "from")
        this.putAtDeg(F, D, -50)

        this.link(G, B, 3, "from")
        this.link(G, F, 6, "from")
        this.putAtDeg(G, B, -60, 140)

        this.link(H, F, 2, "from")
        this.link(H, G, 1, "to")
        this.putAtDeg(H, F, -120)
    }

    private weaklyConnectedGraph(): void {
        const midW = this.$Svg.width/2 - 200
        const midH = this.$Svg.height/2 + 200

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")

        this.graph = A
        A.setCenter(midW, midH)

        this.link(B, A, 1, "to")
        this.putAtDeg(B, A, 80)

        this.link(C, B, 3, "to")
        this.putAtDeg(C, B, 110)

        this.link(D, A, 5, "from")
        this.link(D, B, 2, "from")
        this.putAtDeg(D, A, 20)

        this.link(E, C, 1, "from")
        this.link(E, A, 3, "to")
        this.putAtDeg(E, C, -120)
    }

    private stronglyConnectedGraph(): void {
        const midW = this.$Svg.width/2 - 200
        const midH = this.$Svg.height/2 + 200

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")

        this.graph = A
        A.setCenter(midW, midH)

        this.link(B, A, 1, "to")
        this.putAtDeg(B, A, 80)

        this.link(C, B, 3, "from")
        this.putAtDeg(C, B, 110)

        this.link(D, A, 5, "from")
        this.link(D, B, 2, "to")
        this.putAtDeg(D, A, 20)

        this.link(E, C, 1, "from")
        this.link(E, A, 3, "to")
        this.putAtDeg(E, C, -120)
    }

    private eulerianGraph(): void {
        const midW = this.$Svg.width/2 - 200
        const midH = this.$Svg.height/2 + 50

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")
        const F = this.newNode("F")

        this.graph = A
        A.setCenter(midW, midH)

        this.link(B, A, 1, "from")
        this.putAtDeg(B, A, -120)

        this.link(C, A, 3, "from")
        this.link(C, B, 2, "to")
        this.link(C, B, 3, "from")
        this.putAtDeg(C, A, -60)

        this.putAtDeg(D, A, 90)

        this.link(E, C, 4, "from")
        this.link(E, D, 9, "from")
        this.link(E, D, 4, "to")
        this.link(E, A, 6, "to")
        this.putAtDeg(E, C, 45)

        this.link(F, B, 5, "from")
        this.link(F, D, 6, "from")
        this.link(F, D, 7, "to")
        this.link(F, A, 8, "to")
        this.putAtDeg(F, B, 135)
    }

    private hamiltonianGraph(): void {
        const midW = this.$Svg.width/2 - 150
        const midH = this.$Svg.height/2

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")

        this.graph = A
        A.setCenter(midW, midH)

        this.link(B, A, 4, "to")
        this.putAtDeg(B, A, 135)

        this.link(C, B, 3, "from")
        this.link(C, A, 7, "from")
        this.putAtDeg(C, A, 45)

        this.link(D, C, 9, "from")
        this.link(D, A, 2, "to")
        this.putAtDeg(D, A, -45)

        this.link(E, D, 5, "from")
        this.link(E, B, 8, "to")
        this.link(E, A, 1, "from")
        this.putAtDeg(E, A, -135)
    }

    private chordalGraph(): void {
        const midW = this.$Svg.width/2 - 200
        const midH = this.$Svg.height/2 + 100

        const A = this.newNode("A")
        const B = this.newNode("B")
        const C = this.newNode("C")
        const D = this.newNode("D")
        const E = this.newNode("E")
        const F = this.newNode("F")
        const G = this.newNode("G")
        const H = this.newNode("H")
        const I = this.newNode("I")
        const J = this.newNode("J")
        const K = this.newNode("K")
        const L = this.newNode("L")

        A.setCenter(midW, midH)
        this.graph = A

        this.link(B, A, 1, "both")
        this.putAtDeg(B, A, -10, 90)

        this.link(C, A, 1, "both")
        this.link(C, B, 1, "both")
        this.putAtDeg(C, A, 50, 90)

        this.link(D, A, 2, "both")
        this.putAtDeg(D, A, -90)

        this.link(E, D, 4, "both")
        this.link(E, A, 1, "both")
        this.putAtDeg(E, D, 150, 100)

        this.link(F, E, 7, "both")
        this.link(F, A, 2, "both")
        this.putAtDeg(F, E, 120, 100)

        this.link(G, F, 5, "both")
        this.link(G, A, 3, "both")
        this.putAtDeg(G, F, 60, 100)

        this.link(H, B, 4, "both")
        this.putAtDeg(H, B, -80)

        this.link(I, H, 1, "both")
        this.link(I, B, 7, "both")
        this.putAtDeg(I, H, 45, 100)

        this.link(J, I, 6, "both")
        this.link(J, B, 4, "both")
        this.putAtDeg(J, I, 95, 100)

        this.link(K, C, 2, "both")
        this.putAtDeg(K, C, 20)

        this.link(L, K, 1, "both")
        this.link(L, C, 3, "both")
        this.putAtDeg(L, K, 150)
    }
}