import { MessagesObject, NBSP } from "~/engine";
import { BaseGraph, BaseGraphMessages, rowHighlight, tableInformation } from "./base-graph";
import { Graph } from "~/graph";
import { updateDefault } from "~/helpers";
import { WeightedGraphNode } from "~/objects/weightedgraph-node";
import { WeightedConnection } from "~/objects/weigted-connection";
import { HighlightCircle } from "~/objects/highlight-circle";
import { Text } from "@svgdotjs/svg.js";

export const FloydWarshallMessages = {
    warning: {
        floydWarshall: `Please run the algorithm first, then pick start node`
    }
    , floydWarshall: {
        start1: `Create a nodes X nodes sized matrix`
      , start2: `This matrix contains the path weight between nodes`
      , start3: `Nodes that go to themselves cost 0`
      , start4: `Nodes that have no path between them cost ∞`

      , intermission1: `After the matrix have been created`
      , intermission2: `Look if adding a middle node to a path gives better weight`

      , prelim: {
            base: (from: string) => `Iterate through all nodes, current: ${from}`

          , lookup: (from: string, to: string) => 
                `Iterate through all nodes, current: ${from}`.concat(
                `\nLookup path to ${to}`
                )

          , same: (from: string, to: string) => 
                `Iterate through all nodes, current: ${from}`.concat(
                `\n${from} = ${to}, cost = 0`
                )
          , found: (from: string, to: string) => 
                `Iterate through all nodes, current: ${from}`.concat(
                `\nPath found between ${from} and ${to}`
                )
          , notFound: (from: string, to: string) =>
                `Iterate through all nodes, current: ${from}`.concat(
                `\nNo path found between ${from} and ${to}, cost = ∞`
                )

          , updateEdgetable: (from: string, to: string) => 
                `Iterate through all nodes, current: ${from}`.concat(
                `\nUpdate matrix for path from ${from} to ${to}`
                )
      }

      , final: {
            base1: (inter: string) => 
                `Iterate through all nodes, current middle node: ${inter}`
          , base2: (inter: string, from: string) => 
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`
                )
                
          , lookup: ( inter: string
                    , from: string
                    , to: string ) => 
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`.concat(
                `\nLookup path to ${to}`
                )
                )

          , noPath1: (inter: string, from: string) =>
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`.concat(
                `\nNo path found between start node(${from}) and middle node(${inter})`
                )
                )
            
          , noPath2: (inter: string, from: string, to: string) =>
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`.concat(
                `\nNo path found between middle node(${inter}) and end node(${to})`
                )
                )

          , compare1: ( inter: string
                      , from: string
                      , weight: number ) => 
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`.concat(
                `\nLookup path ${from} -> ${inter}, cost = ${weight}`
                )
                )
          , compare2: ( inter: string
                      , from: string
                      , to: string
                      , weight: number ) => 
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`.concat(
                `\nLookup path ${inter} -> ${to}, cost = ${weight}`
                )
                )
          , compare3: ( inter: string
                      , from: string
                      , to: string
                      , weight: number ) => 
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`.concat(
                `\nLookup path ${from} -> ${to}, cost = ${weight}`
                )
                )
          , compare4: ( inter: string
                      , from: string
                      , to: string ) => 
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`.concat(
                `\nCompare ${from} -> ${inter} -> ${to} to ${from} -> ${to}`
                )
                )
          , compare5: ( inter: string
                      , from: string
                      , weight1: number 
                      , weight2: number
                      , weight3: number ) => 
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`.concat(
                `\nCompare ${weight1} + ${weight2} to ${weight3}`
                )
                )

          , compareOutcome1: ( inter: string
                             , from: string ) => 
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`.concat(
                `\nKeeping old weight and path`
                )
                )
          , compareOutcome2: ( inter: string
                             , from: string
                             , to: string
                             , weight: number ) => 
                `Iterate through all nodes, current middle node: ${inter}`.concat(
                `\nIterate through all nodes, current start node: ${from}`.concat(
                `\nNew path ${from} -> ${inter} -> ${to} with weight: ${weight}`
                )
                )
      }
    }
} as const satisfies MessagesObject

type msgCont = { msg: string
               , k?: string
               , i?: string
               , j?: string
               , weight?: number }

export class FloydWarshall extends BaseGraph implements Graph {
    messages: MessagesObject = updateDefault(FloydWarshallMessages, BaseGraphMessages);
    private traversalMsg: msgCont = {msg: ""};
    private matrix: Text[][] = []
    private graphTraversal: WeightedConnection<WeightedGraphNode>[] = [];
    private weights: Record<string, Record<string, number>> = {};
    private paths: Record<string, 
                          Record<string, 
                                 WeightedConnection<WeightedGraphNode>[]>> = {};
    private run: boolean = false
    body: string = "Warning! this algorithm takes a lot of time to complete".concat(
                    "\nIts time complexity is cubic O(N^3)").concat(
                    "\nChoose a small graph or be prepared for a long wait")

    override async startNode(value: string | number): Promise<void> {
        if (!this.graph) {
            await this.pause("warning.nullGraph")
            return
        }
        if (!this.run) {
            await this.pause("warning.floydWarshall")
            return
        }
        try {
            // This code is only here to trigger the error early
            // so the paths don't get reset unnecessarily
            this.paths[value][this.createdNodes[0].getText()]

            this.resetHighlights()

            // Highlight every edge that starts at value
            for (const path of Object.values(this.paths[value])) {
                for (const edge of path) {
                    edge.setHighlight(true)
                    const edgeBack = edge.$end.$outgoing[edge.$start.getText()]
                    if (edgeBack && edgeBack.$weight === edge.$weight)
                        edgeBack.setHighlight(true)
                }
            }
            // Highlight the start node's row and sets it as this.graph
            for (let i = 0;  i < this.createdNodes.length; i++) {
                if (this.createdNodes[i].getText() === value) {
                    this.graph = this.createdNodes[i]
                    this.graph.setHighlight(true)
                    for (let j = 1; j < this.matrix[i].length; j++) {
                        this.matrix[i+1][j].setHighlight(true)
                    }
                    return
                }
            }
        } catch {
            await this.pause("warning.incorrectStart", value, this.graph)
        }
    }

    override async runningAlgorithm() {
        if (!this.graph) {
            await this.pause("warning.nullGraph")
            return
        }
        this.graph.setHighlight(false)
        await this.floydWarshallSearch()
        await this.pause("traversal.complete")
    }

    /**
     * Goes through the Floyd-Warshall algorithm and pauses to highlight
     * relevant steps, as well as uses nodeTraversalVisualisation
     * to show which paths are being considered
     */
    async floydWarshallSearch(): Promise<void> {
        var tableInf: tableInformation[] = [];
        var high: rowHighlight

        await this.pause("floydWarshall.start1")

        this.createTable()

        await this.pause("floydWarshall.start2")

        await this.pause("floydWarshall.start3")

        await this.pause("floydWarshall.start4")
        
        // Creates the preliminary matrix (only paths between immediate neighbours)
        for (const nodeFrom of this.createdNodes) {
            const tempWeights: Record<string, number> = {}
            const tempPaths: Record<string,
                                    WeightedConnection<WeightedGraphNode>[]> = {}
            const out: WeightedGraphNode[] = [];

            const fromPointer = this.Svg.put(new HighlightCircle()).init(
                nodeFrom.cx(),
                nodeFrom.cy(),
                this.getObjectSize(),
                this.getStrokeWidth()
            )

            for (const edge of Object.values(nodeFrom.$outgoing)) {
                out[out.length] = edge!.$end
            }
            
            const nodeFromT = nodeFrom.getText()
            await this.pause("floydWarshall.prelim.base", nodeFromT)

            // Checks if nodeFrom has a path to nodeTo
            for (const nodeTo of this.createdNodes) {
                const nodeToT   = nodeTo.getText()
                const path: WeightedConnection<WeightedGraphNode>[] = []
                var weight: number;
                const toPointer = this.Svg.put(new HighlightCircle()).init(
                    nodeTo.cx(),
                    nodeTo.cy(),
                    this.getObjectSize(),
                    this.getStrokeWidth()
                ).addClass(`highlight-circle-green`)

                await this.pause("floydWarshall.prelim.lookup", nodeFromT, nodeToT)

                if (nodeFrom === nodeTo) {
                    // Path starting and ending in the same node has 0 weight
                    await this.pause("floydWarshall.prelim.same", nodeFromT, nodeToT)
                    weight = 0
                    tableInf = [{ node: nodeFrom
                                , node2: nodeTo
                                , weight: weight }]
                } else if (out.includes(nodeTo)) {
                    // nodeTo is an immediate neighbour and can therefore
                    // update the path and weight
                    await this.pause("floydWarshall.prelim.found", nodeFromT, nodeToT)
                    weight = nodeFrom.$outgoing[nodeToT]!.$weight
                    path[0] = nodeFrom.$outgoing[nodeToT]!
                    this.graphTraversal = path
                    tableInf = [{ node: nodeFrom
                                , node2: nodeTo
                                , weight: weight}]

                    this.traversalMsg.k = nodeFromT
                    this.traversalMsg.i = nodeToT
                    this.traversalMsg.msg = "floydWarshall.prelim.found"
                    await this.nodeTraversalVisualisation()
                } else {
                    // Only option left is no path between nodeFrom and nodeTo
                    // the path between them then get infinte weight
                    await this.pause("floydWarshall.prelim.notFound", nodeFromT, nodeToT)
                    weight = Infinity
                    tableInf = [{ node: nodeFrom
                                , node2: nodeTo
                                , weight: weight }]
                }

                // Update the path
                tempPaths[nodeToT] = path
                this.paths[nodeFromT] = tempPaths

                // Update the weight
                tempWeights[nodeToT] = weight
                this.weights[nodeFromT] = tempWeights
                
                this.updateTable(tableInf)
                await this.pause("floydWarshall.prelim.updateEdgetable", nodeFromT, nodeToT)

                toPointer.remove()
                this.resetHighlights()
            }
            fromPointer.remove()
        }

        await this.pause("floydWarshall.intermission1")

        await this.pause("floydWarshall.intermission2")
        
        // Creates the final matrix
        for (const kNode of this.createdNodes) {
            const k = kNode.getText()

            const kPointer = this.Svg.put(new HighlightCircle()).init(
                kNode.cx(),
                kNode.cy(),
                this.getObjectSize(),
                this.getStrokeWidth()
            ).addClass(`highlight-circle-blue`)

            await this.pause("floydWarshall.final.base1", k)

            for (const iNode of this.createdNodes) {
                // We skip if middle and start node is the same
                if (kNode === iNode) continue

                const i = iNode.getText()
                const iPointer = this.Svg.put(new HighlightCircle()).init(
                    iNode.cx(),
                    iNode.cy(),
                    this.getObjectSize(),
                    this.getStrokeWidth()
                )

                await this.pause("floydWarshall.final.base2", k, i)

                // We skip if there is no path between start and middle node
                if (this.weights[i][k] === Infinity) {
                    high = { node: iNode
                           , node2: kNode
                           , weight: this.weights[i][k] }
                    this.updateTable([], high)
                    await this.pause("floydWarshall.final.noPath1", k, i)
                    this.updateTable([])

                    iPointer.remove()
                    continue
                }

                for (const jNode of this.createdNodes) {
                    // Skip if middle, start or end node are the same
                    if (jNode === kNode || jNode === iNode) continue

                    const j = jNode.getText()
                    const jPointer = this.Svg.put(new HighlightCircle()).init(
                        jNode.cx(),
                        jNode.cy(),
                        this.getObjectSize(),
                        this.getStrokeWidth()
                    ).addClass(`highlight-circle-green`)

                    this.traversalMsg.k = k
                    this.traversalMsg.i = i
                    this.traversalMsg.j = j

                    await this.pause("floydWarshall.final.lookup", k, i, j)

                    // Skip if there is no path between middle and end node
                    if (this.weights[k][j] === Infinity) {
                        high = { node: kNode
                               , node2: jNode
                               , weight: this.weights[k][j] }
                        this.updateTable([], high)
                        await this.pause("floydWarshall.final.noPath2", k, i, j)
                        this.updateTable([])

                        jPointer.remove()
                        continue
                    }

                    high = { node: iNode
                           , node2: kNode
                           , weight: this.weights[i][k] }
                    this.updateTable([], high)
                    await this.pause("floydWarshall.final.compare1", k, i, this.weights[i][k])
                    
                    this.traversalMsg.msg = "floydWarshall.final.compare1"
                    this.traversalMsg.weight = this.weights[i][k]
                    this.graphTraversal = this.paths[i][k]
                    await this.nodeTraversalVisualisation()

                    high = { node: kNode
                           , node2: jNode
                           , weight: this.weights[k][j]}
                    this.updateTable([], high)
                    await this.pause("floydWarshall.final.compare2", k, i, j, this.weights[k][j])
                    
                    // Only run if paths have a length greater than zero
                    // nodeTraversalVisualisation sends an error otherwise
                    if (this.paths[k][j].length > 0) {
                        this.traversalMsg.msg = "floydWarshall.final.compare2"
                        this.traversalMsg.weight = this.weights[k][j]
                        this.graphTraversal = this.paths[k][j]
                        await this.nodeTraversalVisualisation()
                    }

                    high = { node: iNode
                           , node2: jNode
                           , weight: this.weights[i][j] }

                    this.updateTable([], high)
                    await this.pause("floydWarshall.final.compare3", k, i, j, this.weights[i][j])

                    // Only run if paths have a length greater than zero
                    // nodeTraversalVisualisation sends an error otherwise
                    if (this.paths[i][j].length > 0) {
                        this.traversalMsg.msg = "floydWarshall.final.compare3"
                        this.traversalMsg.weight = this.weights[i][j]
                        this.graphTraversal = this.paths[i][j]
                        await this.nodeTraversalVisualisation()
                    }

                    this.updateTable([])

                    await this.pause("floydWarshall.final.compare4", k, i, j)

                    await this.pause("floydWarshall.final.compare5", k, i,
                                      this.weights[i][k]
                                    , this.weights[k][j]
                                    , this.weights[i][j]
                    )

                    if (this.weights[i][j] > this.weights[i][k] + this.weights[k][j]) {
                        // The new path has less weight so we update
                        this.weights[i][j] = this.weights[i][k] + this.weights[k][j]
                        const path  = this.paths[i][k].concat(this.paths[k][j])
                        this.paths[i][j] = path

                        tableInf = [{ node: iNode
                                    , node2: jNode
                                    , weight: this.weights[i][j] }]
                        this.updateTable(tableInf)
                        await this.pause("floydWarshall.final.compareOutcome2", k, i, j, this.weights[i][j])

                        this.traversalMsg.msg = "floydWarshall.final.compareOutcome2"
                        this.traversalMsg.weight = this.weights[i][j]
                        this.graphTraversal = this.paths[i][j]
                        await this.nodeTraversalVisualisation()
                        
                        this.resetHighlights()
                    } else {
                        // New path has more weight so we keep the old path
                        await this.pause("floydWarshall.final.compareOutcome1", k, i)
                        this.traversalMsg.msg = "floydWarshall.final.compareOutcome1"
                        this.graphTraversal = this.paths[i][j]
                        await this.nodeTraversalVisualisation()

                        this.resetHighlights()
                    }
                    jPointer.remove()
                }
                iPointer.remove()
            }
            kPointer.remove()
        }
        this.body = NBSP

        // Set that we have run the algorithm, this is so that startNode
        // knows it has paths it can print out, otherwise it sends a warning
        this.run = true
    }

    async nodeTraversalVisualisation(): Promise<void> {

        if(this.graphTraversal.length === 0) {
            throw new Error ("graphTraversal is empty, shouldn't happen")
        }

        let highColor = `highlight`
        let circColor = `highlight-circle`

        // The message being checked for means the nodeTraversal was
        // called during the preliminary matrix, meaning we would only
        // work with red colors
        if (this.traversalMsg.msg != "floydWarshall.prelim.found")
            for (const edge of this.graphTraversal) {
                if (edge.$start.getText() === this.traversalMsg.k ||
                    edge.$end.getText() === this.traversalMsg.k) {
                    // The conditions being checked imply that the
                    // path is a new path, thus it would be blue
                    highColor = `highlight-blue`
                    circColor = `highlight-circle-blue`
                    break
                }
            }
    
        let lastNode: WeightedGraphNode | null = null
    
        let pointer: HighlightCircle | null = null
    
        const firstNode  = this.graphTraversal[0].$start
    
        pointer = this.Svg.put(new HighlightCircle()).init(
                        firstNode.cx(),
                        firstNode.cy(),
                        this.getObjectSize(),
                        this.getStrokeWidth()
        ).addClass(circColor)
    
        // For every edge animate the pointers and set highlights
        for (let i = 0; i < this.graphTraversal.length;i++) {
            const edge = this.graphTraversal[i]
            const startNode = edge.$start
            const endNode = edge.$end

            if (lastNode !== startNode) {
                // animate pointer to node
                pointer.setCenter(
                    startNode.cx(),
                    startNode.cy(),
                    this.getAnimationSpeed()
                )
            }
    
            const edgeBack = edge.$end.$outgoing[edge.$start.getText()]
            // highlight the traversed edge
            edge.setHighlightColor(true, highColor)
            if (edgeBack && edgeBack.$weight === edge.$weight)
                // highlight the way back as well if the edge is undirected
                edgeBack.setHighlightColor(true, highColor)
            
           // animate pointer to next node
            pointer?.setCenter(
                endNode.cx(),
                endNode.cy(),
                this.getAnimationSpeed()
            )

            if (this.traversalMsg.msg === "floydWarshall.final.compare1") {
                await this.pause( this.traversalMsg.msg
                                , this.traversalMsg.k
                                , this.traversalMsg.i
                                , this.traversalMsg.weight )
            } else {
                await this.pause( this.traversalMsg.msg
                                , this.traversalMsg.k
                                , this.traversalMsg.i
                                , this.traversalMsg.j
                                , this.traversalMsg.weight )
            }
        
            lastNode = endNode
        }
    
        pointer?.remove()
    }

    /**
     * Updates the edgetable
     * 
     * @param tableInformation - Contains the information of what should change
     * 
     * @param highlightEdge - Is used to highlight without changing
     */
    async updateTable(
          tableInformation: tableInformation[]
        , highlightEdge?: rowHighlight
    ): Promise<void> {
        for (const rows of this.matrix) {
            for (const txt of rows) {
                txt.setHighlight(false)
            }
        }

        for (const tab of tableInformation) {
            const row = this.createdNodes.indexOf(tab.node) + 1
            const col = this.createdNodes.indexOf(tab.node2!) + 1
            
            this.matrix[row][col].setHighlight(true)
            this.matrix[0][col].setHighlight(true)
            this.matrix[row][0].setHighlight(true)

            if (tab.weight === Infinity)
                this.matrix[row][col].text("∞")
            else
                this.matrix[row][col].text(tab.weight.toString())
        }

        if (highlightEdge) {
            const row = this.createdNodes.indexOf(highlightEdge.node) + 1
            const col = this.createdNodes.indexOf(highlightEdge.node2!) + 1

            this.matrix[row][col].setHighlight(true)
            this.matrix[0][col].setHighlight(true)
            this.matrix[row][0].setHighlight(true)
        }
    }

    /**
     * Creates an empty matrix
     */
    async createTable(): Promise<void> {
        const columns = [""].concat(this.createdNodes.map(item => item.getText()))
        
        const cellHeight = 20;
        const cellWidth = 30;

        const startX = this.$Svg.width-cellWidth*columns.length;
        const startY = 0;

        this.drawRow( columns
                    , 0
                    , startX
                    , startY
                    , cellWidth 
                    , cellHeight)
        let k = 0
        for (const from of this.createdNodes) {
            const fromT = from.getText()
            const rowData = [];
            rowData.push(fromT)
            for(let i = 0; i < this.createdNodes.length; i++) {
                rowData.push("-")
            }
        
            this.drawRow(
                rowData,
                k + 1,
                startX,
                startY,
                cellWidth,
                cellHeight
            );
            k++
        }    

        this.Svg.add(this.edgeTable)
    }

    /**
     * Resets all highlighted edges and nodes
     */
    override resetHighlights(): void {
        this.updateTable([])
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
        this.graph?.setHighlightColor(false)
    }

    /**
     * Draws a row for the matrix
     * 
     * @param rowData - Contains the data for the row, set as | rowData[0] | rowData[1] | ...
     * 
     * @param rowIndex - Which index the row is, determines y-level for the row
     * 
     * @param startX - Where the matrix starts in the x-level, includes all previous drawn rows
     * 
     * @param startY - Where the matrix starts in the y-level, includes all previous drawn rows
     * 
     * @param cellWidth - Determines how wide each individual cell is
     * 
     * @param cellHeight - Determines how tall each individual cell is
     */
    override drawRow (
        rowData: string[],
        rowIndex: number,
        startX: number,
        startY: number,
        cellWidth: number,
        cellHeight: number
    ) {
        const rowY = startY + rowIndex * cellHeight;
        const rowWidth = rowData.length * cellWidth;

        // Create a group for the row
        const rowGroup = this.edgeTable.group();

        const rowRect = rowGroup
            .rect(rowWidth, cellHeight)
            .move(startX, rowY)

        rowRect.addClass("row-normal")

        // Draw cells and text on top
        for (let col = 0; col < rowData.length; col++) {
            const x = startX + col * cellWidth;
            const y = rowY;

            rowGroup
                .rect(cellWidth, cellHeight)
                .move(x, y)
                .addClass('cell');

            const txt = rowGroup
                .text(rowData[col])
                .font({
                    anchor: 'middle',
                    leading: '1em',
                    size: 14
                })
                .center(x + cellWidth / 2, y + cellHeight / 2);
            if (col === 0)
                this.matrix[rowIndex] = []
            // Saves the text element so it can be changed in updateTable
            this.matrix[rowIndex][col] = txt
        }
        rowRect.front();
        return rowGroup;
    }
}