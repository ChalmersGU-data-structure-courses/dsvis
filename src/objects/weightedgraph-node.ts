import { GraphNode } from "./graph-node";
import { WeightedConnection } from "./weigted-connection";

export class WeightedGraphNode extends GraphNode {
    $outgoing: Record<string, WeightedConnection<this> | null> = {};
    $incoming: Record<string, WeightedConnection<this> | null> = {};
    $weights: Record<string, number | null> = {};
    $dir: boolean = true;

    override getDirected(): boolean {
        return this.$dir
    }

    override setPredecessor(
        inKey: string
      , outKey: string
      , predecessor: this
      , strokeWidth: number
      , weight: number = 0
    ): this {
        // Overriden so it accounts for weight
        predecessor.setSuccessor(outKey, inKey, this, strokeWidth, weight);
        return this;
    }

    override setSuccessor(
        outKey: string
      , inKey: string
      , successor: this | null
      , strokeWidth: number
      , weight: number = 0
    ): this {
        const outEdge = this.$outgoing[outKey];

        if (outEdge) {
            const oldSuccessor = outEdge.getEnd();
            const oldIncoming = oldSuccessor.$incoming;
            for (const k in oldIncoming) {
                if (oldIncoming[k] === outEdge) {
                    // Added to remove the text object
                    oldIncoming[k].$textObj.remove();
                    delete oldIncoming[k];
                }
            }
            outEdge.remove();
        }
        if (successor) {
            const inEdge = successor.$incoming[inKey];
            if (inEdge) {
                const oldPredecessor = inEdge.getStart();
                const oldOutgoing = oldPredecessor.$outgoing;
                for (const k in oldOutgoing) {
                    if (oldOutgoing[k] === inEdge) {
                        // Added to remove the text object
                        oldOutgoing[k].$textObj.remove();
                        delete oldOutgoing[k];
                    }
                }
                inEdge.remove();
            }

            // Added to differensiate between undirected edges and
            // two different edges that lead from and to
            var bend = 0
            if(successor.$outgoing[inKey] && successor.$weights[inKey] != weight) {
                bend = 0.2
                successor.$outgoing[inKey].$bend = bend
                successor.$outgoing[inKey].update(successor.$outgoing[inKey].$coords)
            }

            const edge = this.engine().Svg
                .put(new WeightedConnection(this, successor, weight))
                .init(
                    strokeWidth,
                    this.getBend(outKey) + bend,
                    this.getDirected()
                );

            this.$outgoing[outKey] = edge;
            // Added to update weights
            this.$weights[outKey] = weight;
            successor.$incoming[inKey] = edge;
        } else {
            // Added to remove the text object
            this.$outgoing[outKey]?.$textObj.remove();
            delete this.$outgoing[outKey];
        }
        this._updateNullary();
        return this;
    }
}