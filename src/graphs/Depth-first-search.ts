import { MessagesObject } from "~/engine";
import { Graph } from "~/graph";
import { WeightedGraphNode } from "~/objects/weightedgraph-node";
import { WeightedConnection } from "~/objects/weigted-connection";
import { GraphNode } from "~/objects/graph-node";
import { BaseGraph, BaseGraphMessages, rowHighlight, tableInformation } from "./base-graph";
import { updateDefault } from "~/helpers";
import { HighlightCircle } from "~/objects/highlight-circle";

export const DepthMessages = {
    traversal: {
        start: (value: string) => `Starting search at ${value}`
      , atNode: (value: string) => `At node ${value}`
      , cleanUp: (value: string) => `Remove edges that visit ${value}`
      , edgeUpdate: (value: string) => `Add ${value}'s edges`
      , chooseEdge: "Choose next edge based on its remaining depth"
    }
} as const satisfies MessagesObject

export class Depth extends BaseGraph implements Graph {
    messages: MessagesObject = updateDefault(DepthMessages, BaseGraphMessages);
    private graphTraversal: WeightedConnection<WeightedGraphNode>[] = [];

    override async runningAlgorithm() {
        this.graphTraversal = []
        this.resetHighlights()
        if (!this.graph) {
            await this.pause("warning.nullGraph")
            return
        }
        this.graph.setHighlight(false)
        this.graphTraversal = this.searchGraph(this.graph)
       
        await this.nodeTraversalVisualisation()
        this.graph.setHighlight(true)
    }

    //search through the graph starting from "startNode". returns a list of chronological order of traversal
    searchGraph(startNode:WeightedGraphNode):WeightedConnection<WeightedGraphNode>[] {
        const visitedNodes: WeightedGraphNode[] = []
        const result:WeightedConnection<WeightedGraphNode>[] = []
        this.searchGraphRecursion(startNode,visitedNodes,result)
        
        return result
    }

    //Recursively travels through the graph, going fully down the path until the node has no child then returns
    private searchGraphRecursion(currNode:WeightedGraphNode,visitedNodes:WeightedGraphNode[],result:WeightedConnection<GraphNode>[]):void {
        
        if (!currNode) {
            throw new Error("start node doesnt exist")
        }
        
        visitedNodes.push(currNode)
        
        const edges = this.getEdges([currNode])
        for (let i = 0; i < edges.length;i++) {
            const connectedNode = edges[i].$end
            if (!visitedNodes.includes(connectedNode)) {
                result.push(edges[i])
                this.searchGraphRecursion(connectedNode, visitedNodes,result)
            }
        }
    }   

    //returns all outgoing edges from the provided nodes
    private getEdges(nodes:WeightedGraphNode[]):WeightedConnection<WeightedGraphNode>[] {
        const edges:WeightedConnection<WeightedGraphNode>[] = []
        for (const node of nodes) {
            for (const key in node.$outgoing) {
                
                const edge = node.$outgoing[key];
                
                if (!edge) continue;

                edges.push(edge);
            }
        }
        return edges
    }

    //Visualizing the algorithm going through the graph by animations and highlighting.
    async nodeTraversalVisualisation(
) {
    if(this.graphTraversal.length === 0) {
        await this.pause("traversal.start", this.graph!.getText())
        await this.pause("traversal.edgeUpdate", this.graph!.getText())
        await this.pause("traversal.complete")
        return
    }

    let lastNode: WeightedGraphNode | null = null

    const knownEdges = new Set<tableInformation>
    const visitedEdges = new Set<WeightedConnection<WeightedGraphNode>>()
    const visitedNodes = new Set<GraphNode>()

    let pointer: HighlightCircle | null = null

    const firstNode = this.graphTraversal[0].$start

    pointer = this.Svg.put(new HighlightCircle()).init(
                    firstNode.cx(),
                    firstNode.cy(),
                    this.getObjectSize(),
                    this.getStrokeWidth()
    )

    await this.pause("traversal.start", firstNode.getText())

    await this.pause("traversal.edgeUpdate", firstNode.getText())
    // discover outgoing edges
    for (const currEdge of Object.values(firstNode.$outgoing)) {
        if (currEdge && !visitedEdges.has(currEdge)
            && !visitedNodes.has(currEdge.$end)) {
            knownEdges.add({node:currEdge.$start,weight:currEdge.$weight,node2:currEdge.$end})
        }
    }

    for (let i = 0; i < this.graphTraversal.length;i++) {
        const edge = this.graphTraversal[i]
        const startNode = edge.$start
        visitedNodes.add(startNode)

        this.updateTable([...knownEdges])
        await this.pause("traversal.chooseEdge", startNode.getText())
        this.updateTable([...knownEdges], {node:startNode,weight:edge.$weight,node2:edge.$end})

        visitedNodes.add(edge.$end)
        if (lastNode !== startNode) {
            // animate pointer to node
            pointer.setCenter(
                startNode.cx(),
                startNode.cy(),
                this.getAnimationSpeed()
            )

            await this.pause(`traversal.atNode`, startNode.getText())
        }

        visitedEdges.add(edge)

        const edgeBack = edge.$end.$outgoing[edge.$start.getText()]
        // highlight the traversed edge
        if (edgeBack && edgeBack.$weight === edge.$weight)
            // highlight the way back as well if the edge is undirected
            edgeBack.setHighlight(true)
        edge.setHighlight(true)

        const endNode = edge.$end
        
        // animate pointer to next node
        pointer?.setCenter(
            endNode.cx(),
            endNode.cy(),
            this.getAnimationSpeed()
        )

        await this.pause("traversal.atNode", endNode.getText())

        // remove edge from known edges
        await this.pause("traversal.cleanUp", endNode.getText())
        for (const currEdge of knownEdges) {
            if (visitedNodes.has(currEdge.node2!)) {
                knownEdges.delete(currEdge)
            }
        }
        this.updateTable([...knownEdges])
        
        // discover outgoing edges
        for (const currEdge of Object.values(endNode.$outgoing)) {
                if (currEdge && !visitedEdges.has(currEdge)
                    && !visitedNodes.has(currEdge.$end)) {
                    knownEdges.add({node:currEdge.$start,weight:currEdge.$weight,node2:currEdge.$end})
                }
            }

        await this.pause("traversal.edgeUpdate", endNode.getText())

        lastNode = endNode
    }

    pointer?.remove()

    this.edgeTable.clear()

    await this.pause("traversal.complete")
}

async updateTable(
    tableInformation:tableInformation[]
  , highlightEdge?:rowHighlight
) {
    

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
        const currEdge = edge
        const rowData = [currEdge.node.getText()
                        ,currEdge.weight.toString()
                        ,currEdge.node2!.getText()]


        //Check if this edge is the one that should be highlight
        let bool_highlight: boolean 
        if (highlightEdge?.node === currEdge.node && highlightEdge.node2 === currEdge.node2) bool_highlight = true
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

}