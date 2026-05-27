import { Graph } from "~/graph";
import { BaseGraph, BaseGraphMessages, rowHighlight, tableInformation } from "./base-graph";
import { WeightedGraphNode } from "~/objects/weightedgraph-node";
import { MinPriorityStack } from "~/basic/MinPriorityStack";
import { MessagesObject } from "~/engine";
import { updateDefault } from "~/helpers";

export const DijkstraMessages = {
    
} as const satisfies MessagesObject

export type path = {node:WeightedGraphNode,weight:number,parent:WeightedGraphNode | null}


export class Dijkstras_algorithm extends BaseGraph implements Graph {
    messages: MessagesObject = updateDefault(DijkstraMessages, BaseGraphMessages)

  
    private distanceMap:Map<WeightedGraphNode, number> = new Map
    private start_Node:WeightedGraphNode | undefined


    override async runningAlgorithm() {
        this.resetHighlights()
        this.distanceMap = new Map
        
        if (!this.graph) {
            await this.pause("warning.nullGraph")
            return
        }
        this.graph.setHighlight(false)
    
        
        this.start_Node = this.graph
        await this.nodeTraversalVisualisation()
        
    }   
    
    //Visualizing the algorithm going through the graph by animations and highlighting.
    async nodeTraversalVisualisation() {

    if (this.start_Node === undefined) return

    const visited = new Set<WeightedGraphNode>();
   
    const minStack = new MinPriorityStack<path>
    

    this.start_Node.setHighlightColor(true,"highlight")

    await this.pause("Add start node to min stack")

     

    this.distanceMap.set(this.start_Node, 0);


    minStack.push({node:this.start_Node,weight:0,parent:null})


    this.updateTable(this.extractUpdateTableInformation(minStack))


    

    while (minStack.size > 0) {
        
        const current = minStack.peek

        this.updateTable(this.extractUpdateTableInformation(minStack),current)

        await this.pause("Pop first element from stack")

        

        minStack.pop()

        this.updateTable(this.extractUpdateTableInformation(minStack))
        

        if (!current) break



        const { node, weight: currentDist,parent} = current;

        

        if (visited.has(node)) {
            await this.pause(`${node.getText()} has already been visited`)
            continue;
        }
            
        
        
        await this.pause(`Add ${node.getText()} to visited nodes`)
        visited.add(node);
        
        if(parent) {
            const edgeTo   = this.getEdge(parent,node)
            const edgeBack = edgeTo.$end.$outgoing[edgeTo.$start.getText()]
            edgeTo.setHighlightColor(true,"highlight-green")
            if (edgeBack && edgeBack.$weight === edgeTo.$weight)
                edgeBack.setHighlightColor(true, `highlight-green`)
        }
       

        node.setHighlightColor(true,"highlight")

        
        await this.pause("Search all connected nodes for a better path")
        for (const key in node.$outgoing) {
            if (visited.has(node.$outgoing[key]?.$end!)) {continue}

            const newDist = currentDist + node.$weights[key]!;



            if (!node.$outgoing[key]) continue
            const connectedNode = node.$outgoing[key].$end



            const oldDist =  this.distanceMap.get(connectedNode);
            connectedNode.setHighlightColor(true,"highlight-green")
            await this.pause(`Current best distance to ${connectedNode.getText()} is ${oldDist} and this path has distance ${newDist}`)
            if (oldDist === undefined || newDist < oldDist) {
                await this.pause(`Current path is shortest found yet, so we add ${connectedNode.getText()} to stack`)
                this.distanceMap.set(connectedNode, newDist);
                minStack.push({node:connectedNode, weight:newDist,parent:node});
                this.updateTable(this.extractUpdateTableInformation(minStack))
            }
            connectedNode.setHighlightColor(false)
        }
    }
    const displayDistanceMap:path[] = []
    for (let entry of this.distanceMap.entries()) { 
            displayDistanceMap.push({node:entry[0],weight:entry[1],parent:null}) 
    
    }   
    this.updateTable(displayDistanceMap)
    await this.pause("Here is final distances to all nodes")

     }
    

    async updateTable(
    tableInformation: tableInformation[]
  , rowHighlight?:rowHighlight
) {
    

    const columns = ["To", "Distance"];
    const rows = tableInformation
    
    const cellHeight = 40;
    const cellWidth = 80;

    const startX = this.$Svg.width-cellWidth*columns.length;
    const startY = 0;
    

    // Clear previous content
    this.edgeTable.clear();

    this.drawRow(columns,0,startX,startY,cellWidth,cellHeight)

    let k = 0
     for (const row of rows) {
        const currRow = row
        const rowData = [currRow.node.getText()
                        ,currRow.weight.toString()]


        //Check if this edge is the one that should be highlight
        let bool_highlight: boolean 
        if (currRow === rowHighlight) bool_highlight = true
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
   
//Creates an array of type path from the entries in the MinPriorityStack
private extractUpdateTableInformation(stack:MinPriorityStack<path>):tableInformation[] {

    const tableInformation:path[] = []


    for (let i = 0; i < stack.size; i++) {
        const value = stack.get(i)

        if (value instanceof Error) { throw Error("value from stack is incorrect") }


        tableInformation.push(value)
    }



    return tableInformation

}


}

