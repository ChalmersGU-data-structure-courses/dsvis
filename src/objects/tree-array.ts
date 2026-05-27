import { G, Rect } from "@svgdotjs/svg.js";
import { BTreeConnection } from "./btree-connection";
import { BTreeNode } from "~/objects/btree-node";

type HighlightType = "primary" | "secondary" | "tertiary";

/**
 * Complete-binary-tree visualizer backed by array indices:
 * parent(i)=floor((i-1)/2), left(i)=2i+1, right(i)=2i+2
 */
export class TreeArray extends G {
    LEVEL_GAP = 70;
    STROKE_WIDTH = 2;

    $boundingBox: Rect | undefined = undefined;
    $values: number[] = [];
    $nodes: BTreeNode[] = [];

    $treeMaxHeight: number;
    $nodeSize: number;

    $centerX = 0;
    $centerY = 0;

    $connections: BTreeConnection[] = [];

    constructor(values: number[], treeMaxHeight: number, nodeSize: number) {
        super();
        this.$values = [...values];
        this.$treeMaxHeight = treeMaxHeight;
        this.$nodeSize = nodeSize;
    }

    init(centerX: number, centerY: number): this {
        this.$centerX = centerX;
        this.$centerY = centerY;
        this.redraw();
        return this;
    }

    length(): number {
        return this.$values.length;
    }

    getValues(): number[] {
        return [...this.$values];
    }

    getValue(index: number): number {
        return this.$values[index];
    }

    setValue(i: number, value: number) {
        this.$values[i] = value;
        this.redraw();
    }

    addValues(...values: number[]) {
        this.$values.push(...values);
        this.redraw();
    }

    removeValue(i: number) {
        this.removeValues(i, i + 1);
    }

    removeValues(start: number, end: number) {
        this.$values.splice(start, end - start);
        this.redraw();
    }

    reset() {
        this.$values = [];
        this.redraw();
    }

    delete() {
        this.clearVisuals();
        this.clear();
        this.remove();
    }

    swap(i: number, j: number, _animate: boolean = true) {
        [this.$values[i], this.$values[j]] = [this.$values[j], this.$values[i]];
        this.redraw();
    }

    setTreeHighlight(i: number, type: HighlightType = "primary") {
        this.$nodes[i]?.addClass(`${type}Highlight`);
    }

    clearTreeHighlight(i: number, type: HighlightType | "all" = "primary") {
        const node = this.$nodes[i];
        if (!node) return;

        if (type === "all") {
            node.removeClass("primaryHighlight");
            node.removeClass("secondaryHighlight");
            node.removeClass("tertiaryHighlight");
            return;
        }

        node.removeClass(`${type}Highlight`);
    }

    setTreesDisabled(start: number, end: number = this.length()) {
        for (let i = start; i < end; i++) {
            this.$nodes[i]?.addClass("disabled");
        }
    }

    clearTreesDisabled(start: number, end: number = this.length()) {
        for (let i = start; i < end; i++) {
            this.$nodes[i]?.removeClass("disabled");
        }
    }

    private redraw() {
        this.clearVisuals();

        const n = this.$values.length;
        if (n === 0) {
            this.$boundingBox?.remove();
            this.$boundingBox = this.rect(1, 1).center(this.$centerX, this.$centerY).addClass("invisible");
            return;
        }

        // 1) Create all nodes
        for (let i = 0; i < n; i++) {
            const { x, y } = this.getNodePosition(i);

            const node = this.put(new BTreeNode()) as BTreeNode;
            node.init(false, 1, x, y, this.$nodeSize, this.STROKE_WIDTH);
            node.setText(0, String(this.$values[i]));
            this.$nodes.push(node);
        }

        // 2) Connect parent -> child via BTreeNode.setChild
            for (let child = 1; child < n; child++) {
            const parent = Math.floor((child - 1) / 2);
            const slot = child === 2 * parent + 1 ? 0 : 1; // left=0, right=1

            const conn = this.put(
                new BTreeConnection(this.$nodes[parent], this.$nodes[child], slot, 2)
            ) as BTreeConnection;
            conn.init(this.STROKE_WIDTH);
            this.$connections.push(conn);
        }

        // 3) Keep group centered with invisible bbox
        const levels = Math.floor(Math.log2(n)) + 1;
        const width = Math.max(1, this.getLevelWidth(levels - 1));
        const height = Math.max(1, levels * this.LEVEL_GAP + this.$nodeSize * 2);

        this.$boundingBox?.remove();
        this.$boundingBox = this.rect(width, height).center(0, 0).addClass("invisible");
        this.center(this.$centerX, this.$centerY);
    }

    private clearVisuals() {
        this.$connections.forEach((c) => c.remove());
        this.$connections = [];
        this.$nodes.forEach((n) => n.remove());
        this.$nodes = [];
    }

    private getNodePosition(index: number): { x: number; y: number } {
        const level = Math.floor(Math.log2(index + 1));
        const firstIndexAtLevel = 2 ** level - 1;
        const posInLevel = index - firstIndexAtLevel;
        const nodesInLevel = 2 ** level;

        const levelWidth = this.getLevelWidth(level);
        const step = nodesInLevel > 1 ? levelWidth / (nodesInLevel - 1) : 0;
        const x = -levelWidth / 2 + posInLevel * step;
        const y = level * this.LEVEL_GAP;

        return { x, y };
    }

    private getLevelWidth(level: number): number {
        const maxNodesOnLevel = 2 ** level;
        return Math.max(this.$nodeSize * 2, maxNodesOnLevel * this.$nodeSize * 2.2);
    }
}