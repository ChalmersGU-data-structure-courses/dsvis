import { Graph } from "~/graph";
import { BaseGraph, BaseGraphMessages, rowHighlight } from "./base-graph";
import { WeightedGraphNode } from "~/objects/weightedgraph-node";
import { MessagesObject, NBSP } from "~/engine";
import { querySelector, updateDefault } from "~/helpers";
import { WeightedConnection } from "~/objects/weigted-connection";
import { MinPriorityStack } from "~/basic/MinPriorityStack";

export const PrimMessages = {
    Prim: {
          start: (value: string, cost: number) => 
            `Initialize search with your start node ${value} -> ${value}: costing ${cost}`
        , lookup: `Lookup edge with minimum weight`
        , add: (value: string) => 
            `Add the edges leading to ${value}'s unvisited neighbours`
        , visited: (value: string) => 
            `Add ${value} to visited nodes`
        , remove: (value: string) =>
            `Remove all edges that go to ${value}`
    }
    
} as const satisfies MessagesObject

type path = { path: WeightedConnection<WeightedGraphNode>
            , weight: number
            , incoming: boolean }

type tableInformation = { node: WeightedGraphNode
                        , node2?: WeightedGraphNode
                        , weight: number
                        , incoming?: boolean }

export class Prim extends BaseGraph implements Graph {
    messages: MessagesObject = updateDefault(PrimMessages, BaseGraphMessages);
    body: string = "Prim only works on undirected graphs, therefore some graphs".concat(
                   "\nhave been altered to retain the aspects of their description");

    constructor(containorSelector: string) {
        super(containorSelector)

        const choices = querySelector<HTMLSelectElement>(
                    "select.chooseGraphI",
                    this.container
                );
        
                // Remove connected graphs from options, as they are not relevant
                // to undirected graphs
                Array.from(choices.options).forEach(option => {
                    if (option.value === "Weakly" || option.value === "Strongly") {
                        option.hidden = true
                        option.disabled = true
                    }
                })
    }

    async runningAlgorithm(): Promise<void> {
        if (!this.graph) {
            await this.pause("warning.nullGraph")
            return
        }

        this.resetHighlights()
        await this.primsAlg()
        this.edgeTable.clear()
        for (const node of this.createdNodes) {
            node.setSize(this.getObjectSize())
        }
        this.graph?.setHighlight(true)
        await this.pause(`traversal.complete`)
        this.body = NBSP
    }

    /**
     * Goes through Prims algorithm and pauses to highlight
     * relevant steps and edges
     */
    async primsAlg() {
        const visited = new Set<WeightedGraphNode>
        const unVisited = new MinPriorityStack<path>
        
        const start = this.graph!
        const startConnect = new WeightedConnection(start, start, 0);

        await this.pause(`Prim.start`, start.getText(), 0)

        // Initiate the algorithm
        unVisited.push({ path: startConnect, weight: 0, incoming: false})
        let tableInf = this.tableInf(unVisited)
        this.updateTable(tableInf)
        
        await this.pause(`Prim.start`, start.getText(), 0)

        // Run until no unvisited nodes are left
        while(unVisited.size > 0) {
            await this.pause(`Prim.lookup`)
            tableInf = this.tableInf(unVisited)
            const currPath = unVisited.pop()

            // The edges aren't truly undirected so I log which
            // edge is incoming so I know which node is unvisited,
            // the unvisited then becomes currNode
            let currNode: WeightedGraphNode;
            if (currPath.incoming) {
                currNode = currPath.path.$start
            } else { 
                currNode = currPath.path.$end
            }

            this.updateTable(tableInf, { node: currPath.path.$start
                                       , node2: currPath.path.$end
                                       , weight: currPath.path.$weight })
            currPath.path.setHighlightColor(true, `highlight-blue`)
            await this.pause(`Prim.lookup`)
            tableInf = this.tableInf(unVisited)
            this.updateTable(tableInf)
            
            currPath.path.setHighlightColor(true, `highlight`)
            await this.pause(`Prim.visited`, currNode.getText())
            visited.add(currNode)
            currNode.setSize(this.getObjectSize() - this.getObjectSize()/5)

            await this.pause(`Prim.remove`, currNode)
            const temp = []

            // Remove all visited nodes in unVisited
            while (unVisited.size > 0) {
                const path = unVisited.pop()
                if (path.incoming && !visited.has(path.path.$start) ||
                   !path.incoming && !visited.has(path.path.$end)) {
                    temp.push(path)
                }
            }
            for (const path of temp) {
                unVisited.push(path)
            }

            tableInf = this.tableInf(unVisited)
            this.updateTable(tableInf)
            
            await this.pause(`Prim.add`, currNode.getText())
            // Add all outgoing edges leading to unvisited nodes
            for (const path of Object.values(currNode.$outgoing)) {
                if (!path || visited.has(path.$end)) continue
                unVisited.push(
                    { path: path, weight: path.$weight, incoming: false }
                )
            }
            // Add all incoming edges coming from unvisited nodes
            for (const path of Object.values(currNode.$incoming)) {
                if (!path || visited.has(path.$start)) continue
                unVisited.push(
                    { path: path, weight: path.$weight, incoming: true }
                )
            }
            tableInf = this.tableInf(unVisited)
            this.updateTable(tableInf)
        }
    }

    /**
     * Refactors a MinPriorityStack into tableInformation[]
     * the updateTable can use
     * 
     * @param queue - The MinPriorityStack to be turned into tableInformation[]
     */
    tableInf(queue: MinPriorityStack<path>): tableInformation[] {
        const tableInf = []

        for (let i = queue.size-1; i >= 0; i--) {
            const path = queue.get(i)
            tableInf.push({ node: path.path.$start
                          , node2: path.path.$end
                          , weight: path.path.$weight
                          , incoming: path.incoming })
        }
        return tableInf
    }

    async nodeTraversalVisualisation(): Promise<void> {}

    async updateTable( 
        tableInformation: tableInformation[]
      , rowHighlight?: rowHighlight
    ): Promise<void> {
        const columns = ["From", "Weight", "To"];
        const edges = tableInformation
        
        const cellHeight = 40;
        const cellWidth = 80;

        const startX = this.$Svg.width-cellWidth*columns.length;
        const startY = 0;

        // Clear previous content
        this.edgeTable.clear();

        this.drawRow(columns,0,startX,startY,cellWidth,cellHeight)

        let k = 0
        for (const edge of edges) {
            edge

            let rowData;
            if (edge.incoming) {
                rowData = [edge.node2!.getText()
                          ,edge.weight.toString()
                          ,edge.node.getText()]
            } else {
                rowData = [edge.node.getText()
                          ,edge.weight.toString()
                          ,edge.node2!.getText()]
            }

            //Check if this edge is the one that should be highlight
            let bool_highlight: boolean 
            if (rowHighlight?.node === edge.node && rowHighlight.node2 === edge.node2) bool_highlight = true
            else bool_highlight = false
        
            this.drawRow(
                rowData,
                k + 1,
                startX,
                startY,
                cellWidth,
                cellHeight,
                bool_highlight
            );
            k++
        }           
        this.Svg.add(this.edgeTable)
    }

    override newNode(text: string): WeightedGraphNode {
        const node = super.newNode(text)
        // Added this it makes the graph undirected
        node.$dir = false
        return node
    }

    override link( 
        ourNode: WeightedGraphNode
      , theirNode: WeightedGraphNode
      , weight: number
      , dir: string
    ): this {
        // Added checks so there is only one edge between every node
        if (dir === "to") {
            if (!theirNode.$outgoing[ourNode.getText()])
                ourNode.setSuccessor(
                    theirNode.getText(), 
                    ourNode.getText(), 
                    theirNode, 
                    this.getStrokeWidth(), 
                    weight
                )
        } else if (dir === "from") {
            if (!ourNode.$outgoing[theirNode.getText()])
                ourNode.setPredecessor(
                    theirNode.getText(), 
                    ourNode.getText(), 
                    theirNode, 
                    this.getStrokeWidth(), 
                    weight
                )
        } else if (dir === "both") {
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

    override async chosenGraph(graf: string | number): Promise<void> {
        await super.chosenGraph(graf)

        // Added a message to the DAG graph, removed an edge from the
        // acyclic graph, and added 3 new nodes to the eulerian
        if (graf === "DAG") {
            this.body = "Since Prim fundamentally is undirected, a directed acyclic graph".concat(
                        "\nis impossible to make. So this is not a DAG here")
        } else if (graf === "aCyclic") {
            this.createdNodes[3].setSuccessor("E", "D", null, this.getStrokeWidth())
            this.createdNodes[4].setSuccessor("D", "E", null, this.getStrokeWidth())
        } else if (graf === "Eulerian") {
            const G = this.newNode("G")
            const H = this.newNode("H")
            const I = this.newNode("I")

            this.putAtDeg(G, this.createdNodes[2], -135, 88)
            this.link(G, this.createdNodes[2], 2, "both")
            this.link(G, this.createdNodes[1], 3, "both")

            this.putAtDeg(H, this.createdNodes[4], 90, 145)
            this.link(H, this.createdNodes[4], 7, "both")
            this.link(H, this.createdNodes[3], 4, "both")

            this.putAtDeg(I, this.createdNodes[5], 90, 145)
            this.link(I, this.createdNodes[5], 6, "both")
            this.link(I, this.createdNodes[3], 1, "both")
        }
    }
}