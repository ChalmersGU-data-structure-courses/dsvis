import { SVG, Element } from "@svgdotjs/svg.js";

interface GraphNode {
    id: number;
    x: number;
    y: number;
    visited: boolean;
}

interface GraphEdge {
    from: number;
    to: number;
    highlighted: boolean;
}

/**
 * A simplified Depth-First Search animation for the graph card.
 * Shows DFS traversal on a DAG (directed acyclic graph).
 */
export class DFSCardAnimation {
    private container: HTMLElement | null = null;
    private svg: Element | null = null;
    private nodes: GraphNode[] = [];
    private edges: GraphEdge[] = [];
    private isRunning = false;
    private animationTimeout: number | null = null;
    private colors = {
        nodeUnvisited: "#0d6efd",
        nodeVisited: "#28a745",
        edgeUnvisited: "#ccc",
        edgeVisited: "#999",
        edgeHighlighted: "#ff6b6b",
    };

    constructor(containerId: string) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        this.initialize();
    }

    private getCSSVariable(varName: string): string {
        const value = getComputedStyle(document.body).getPropertyValue(varName).trim();
        return value || "";
    }

    private reloadColors(): void {
        const nodeUnvisited = this.getCSSVariable("--card-graph-node-unvisited");
        const nodeVisited = this.getCSSVariable("--card-graph-node-visited");
        const edgeUnvisited = this.getCSSVariable("--card-graph-edge-unvisited");
        const edgeVisited = this.getCSSVariable("--card-graph-edge-visited");
        const edgeHighlighted = this.getCSSVariable("--card-graph-edge-highlighted");
        
        if (nodeUnvisited) this.colors.nodeUnvisited = nodeUnvisited;
        if (nodeVisited) this.colors.nodeVisited = nodeVisited;
        if (edgeUnvisited) this.colors.edgeUnvisited = edgeUnvisited;
        if (edgeVisited) this.colors.edgeVisited = edgeVisited;
        if (edgeHighlighted) this.colors.edgeHighlighted = edgeHighlighted;

        // Redraw with new colors
        this.drawGraph();
    }

    private setupThemeChangeListener(): void {
        const observer = new MutationObserver(() => {
            this.reloadColors();
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    private initialize() {
        if (!this.container) return;

        try {
            // Load colors from CSS variables with fallbacks
            const nodeUnvisited = this.getCSSVariable("--card-graph-node-unvisited");
            const nodeVisited = this.getCSSVariable("--card-graph-node-visited");
            const edgeUnvisited = this.getCSSVariable("--card-graph-edge-unvisited");
            const edgeVisited = this.getCSSVariable("--card-graph-edge-visited");
            const edgeHighlighted = this.getCSSVariable("--card-graph-edge-highlighted");
            
            if (nodeUnvisited) this.colors.nodeUnvisited = nodeUnvisited;
            if (nodeVisited) this.colors.nodeVisited = nodeVisited;
            if (edgeUnvisited) this.colors.edgeUnvisited = edgeUnvisited;
            if (edgeVisited) this.colors.edgeVisited = edgeVisited;
            if (edgeHighlighted) this.colors.edgeHighlighted = edgeHighlighted;

            this.svg = SVG().addTo(this.container);
            (this.svg as any).attr({ width: "100%", height: "180px", viewBox: "0 0 300 180" });
            this.svg.css({ "background-color": "transparent" });

            // Setup theme change listener
            this.setupThemeChangeListener();

            this.setupGraph();
            this.isRunning = true;
            this.runLoop();
        } catch (error) {
            console.error("Failed to initialize DFS card animation:", error);
        }
    }

    private setupGraph() {
        // Create a simple DAG with 6 nodes
        this.nodes = [
            { id: 0, x: 150, y: 20, visited: false },
            { id: 1, x: 80, y: 70, visited: false },
            { id: 2, x: 220, y: 70, visited: false },
            { id: 3, x: 50, y: 120, visited: false },
            { id: 4, x: 150, y: 120, visited: false },
            { id: 5, x: 250, y: 120, visited: false },
        ];

        // Create edges (DAG - no cycles)
        this.edges = [
            { from: 0, to: 1, highlighted: false },
            { from: 0, to: 2, highlighted: false },
            { from: 1, to: 3, highlighted: false },
            { from: 1, to: 4, highlighted: false },
            { from: 2, to: 4, highlighted: false },
            { from: 2, to: 5, highlighted: false },
            { from: 3, to: 4, highlighted: false },
        ];
    }

    private drawArrow(
        fromNode: GraphNode,
        toNode: GraphNode,
        color: string,
        lineWidth: number = 1.5
    ) {
        if (!this.svg) return;

        const radius = 10;
        const arrowSize = 5;

        // Calculate the direction from source to target
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Calculate start and end points (at circle edges)
        const startX = fromNode.x + Math.cos(angle) * radius;
        const startY = fromNode.y + Math.sin(angle) * radius;
        const endX = toNode.x - Math.cos(angle) * radius;
        const endY = toNode.y - Math.sin(angle) * radius;

        // Draw line as SVG element
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", startX.toString());
        line.setAttribute("y1", startY.toString());
        line.setAttribute("x2", endX.toString());
        line.setAttribute("y2", endY.toString());
        line.setAttribute("style", `stroke: ${color}; stroke-width: ${lineWidth}px;`);
        this.svg.node.appendChild(line);

        // Draw arrowhead (triangle)
        const arrowX = endX;
        const arrowY = endY;
        const arrowPoints = [
            [arrowX, arrowY],
            [
                arrowX - arrowSize * Math.cos(angle - Math.PI / 6),
                arrowY - arrowSize * Math.sin(angle - Math.PI / 6),
            ],
            [
                arrowX - arrowSize * Math.cos(angle + Math.PI / 6),
                arrowY - arrowSize * Math.sin(angle + Math.PI / 6),
            ],
        ];
        
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const pointsString = arrowPoints.map(p => p.join(",  ")).join(" ");
        polygon.setAttribute("points", pointsString);
        polygon.setAttribute("style", `fill: ${color};`);
        this.svg.node.appendChild(polygon);
    }

    private drawGraph() {
        if (!this.svg) return;

        this.svg.clear();

        const radius = 10;
        const unvisitedEdgeColor = this.colors.edgeUnvisited;
        const visitedEdgeColor = this.colors.edgeVisited;
        const highlightedEdgeColor = this.colors.edgeHighlighted;

        // Draw edges first (so they appear behind nodes)
        for (const edge of this.edges) {
            const fromNode = this.nodes[edge.from];
            const toNode = this.nodes[edge.to];

            let edgeColor = unvisitedEdgeColor;
            let lineWidth = 1.2;

            if (edge.highlighted) {
                edgeColor = highlightedEdgeColor;
                lineWidth = 2.5;
            } else if (this.nodes[edge.to].visited) {
                edgeColor = visitedEdgeColor;
                lineWidth = 1.5;
            }

            this.drawArrow(fromNode, toNode, edgeColor, lineWidth);
        }

        // Draw nodes
        for (const node of this.nodes) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", node.x.toString());
            circle.setAttribute("cy", node.y.toString());
            circle.setAttribute("r", radius.toString());
            
            // Color based on visited status
            const fillColor = node.visited ? this.colors.nodeVisited : this.colors.nodeUnvisited;
            circle.setAttribute("style", `fill: ${fillColor}; stroke: #343a40; stroke-width: 1.2px;`);
            this.svg.node.appendChild(circle);

            // Draw node ID
            const textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textNode.setAttribute("x", node.x.toString());
            textNode.setAttribute("y", (node.y + 1).toString());
            textNode.setAttribute("text-anchor", "middle");
            textNode.setAttribute("dy", ".3em");
            textNode.setAttribute("font-size", "11");
            textNode.setAttribute("font-weight", "bold");
            textNode.setAttribute("fill", "white");
            textNode.setAttribute("pointer-events", "none");
            textNode.textContent = node.id.toString();
            this.svg.node.appendChild(textNode);
        }
    }

    private clearHighlights() {
        for (const edge of this.edges) {
            edge.highlighted = false;
        }
    }

    private async dfs(nodeId: number, visited: Set<number>) {
        if (!this.isRunning) return;

        visited.add(nodeId);
        this.nodes[nodeId].visited = true;
        this.drawGraph();
        await this.pause(600);

        // Find neighbors
        const neighbors = this.edges.filter((e) => e.from === nodeId && !visited.has(e.to));

        for (const edge of neighbors) {
            if (!this.isRunning) return;

            // Highlight the edge being traversed
            edge.highlighted = true;
            this.drawGraph();
            await this.pause(400);

            // Traverse the edge
            await this.dfs(edge.to, visited);

            // Clear highlight after traversal
            edge.highlighted = false;
        }
    }

    private async runLoop() {
        if (!this.isRunning) return;

        try {
            // Reset visited status and highlights
            for (const node of this.nodes) {
                node.visited = false;
            }
            this.clearHighlights();
            this.drawGraph();
            await this.pause(500);

            // Run DFS from node 0
            await this.dfs(0, new Set());

            // Wait before restart
            await this.pause(1000);

            // Restart
            this.runLoop();
        } catch (error) {
            console.error("Error in DFS card animation loop:", error);
            await this.pause(2000);
            this.runLoop();
        }
    }

    private pause(ms: number): Promise<void> {
        return new Promise((resolve) => {
            this.animationTimeout = window.setTimeout(resolve, ms);
        });
    }

    public stop() {
        this.isRunning = false;
        if (this.animationTimeout !== null) {
            clearTimeout(this.animationTimeout);
        }
    }

    public destroy() {
        this.stop();
        if (this.svg) {
            this.svg.remove();
            this.svg = null;
        }
    }
}
