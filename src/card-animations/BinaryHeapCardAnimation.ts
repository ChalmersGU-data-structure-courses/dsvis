import { SVG, Element } from "@svgdotjs/svg.js";

/**
 * A simplified Binary Heap animation for the priority queues card.
 * Shows a looping animation of heap insertions, rebalancing, and deletions.
 */
export class BinaryHeapCardAnimation {
    private container: HTMLElement | null = null;
    private svg: Element | null = null;
    private heap: number[] = [];
    private isRunning = false;
    private animationTimeout: number | null = null;
    private colors = {
        nodeColor: "#28a745",
        strokeColor: "#343a40",
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
        const nodeColor = this.getCSSVariable("--card-heap-node");
        const strokeColor = this.getCSSVariable("--card-heap-stroke");
        
        if (nodeColor) this.colors.nodeColor = nodeColor;
        if (strokeColor) this.colors.strokeColor = strokeColor;

        // Redraw with new colors
        this.drawHeap();
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
            const nodeColor = this.getCSSVariable("--card-heap-node");
            const strokeColor = this.getCSSVariable("--card-heap-stroke");
            
            if (nodeColor) this.colors.nodeColor = nodeColor;
            if (strokeColor) this.colors.strokeColor = strokeColor;

            this.svg = SVG().addTo(this.container);
            (this.svg as any).attr({ width: "100%", height: "180px", viewBox: "0 0 300 180" });
            this.svg.css({ "background-color": "transparent" });

            // Setup theme change listener
            this.setupThemeChangeListener();

            this.isRunning = true;
            this.runLoop();
        } catch (error) {
            console.error("Failed to initialize Binary Heap card animation:", error);
        }
    }

    private bubbleUp(index: number) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent] > this.heap[index]) {
                [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
                index = parent;
            } else {
                break;
            }
        }
    }

    private bubbleDown(index: number) {
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            if (smallest !== index) {
                [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
                index = smallest;
            } else {
                break;
            }
        }
    }

    private insert(value: number) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    private extractMin() {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.bubbleDown(0);
        return min;
    }

    private drawHeap() {
        if (!this.svg) return;

        this.svg.clear();
        if (this.heap.length === 0) return;

        const radius = 9;
        const startX = 150;
        const startY = 20;
        const hGap = 35;
        const vGap = 42;
        let index = 0;

        const drawNode = (idx: number, x: number, y: number) => {
            if (idx >= this.heap.length) return;

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", x.toString());
            circle.setAttribute("cy", y.toString());
            circle.setAttribute("r", radius.toString());
            circle.setAttribute("style", `fill: ${this.colors.nodeColor}; stroke: ${this.colors.strokeColor}; stroke-width: 1.2px;`);
            this.svg!.node.appendChild(circle);

            // Draw value
            const textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textNode.setAttribute("x", x.toString());
            textNode.setAttribute("y", (y + 1).toString());
            textNode.setAttribute("text-anchor", "middle");
            textNode.setAttribute("dy", ".3em");
            textNode.setAttribute("font-size", "11");
            textNode.setAttribute("font-weight", "bold");
            textNode.setAttribute("fill", "white");
            textNode.setAttribute("pointer-events", "none");
            textNode.textContent = this.heap[idx].toString();
            this.svg!.node.appendChild(textNode);

            // Draw lines to children
            const leftIdx = 2 * idx + 1;
            const rightIdx = 2 * idx + 2;

            if (leftIdx < this.heap.length) {
                const leftX = x - hGap / Math.pow(2, Math.floor(Math.log2(idx + 1)));
                const leftY = y + vGap;
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", x.toString());
                line.setAttribute("y1", (y + radius).toString());
                line.setAttribute("x2", leftX.toString());
                line.setAttribute("y2", (leftY - radius).toString());
                line.setAttribute("style", "stroke: #999; stroke-width: 1px;");
                this.svg!.node.appendChild(line);
                drawNode(leftIdx, leftX, leftY);
            }

            if (rightIdx < this.heap.length) {
                const rightX = x + hGap / Math.pow(2, Math.floor(Math.log2(idx + 1)));
                const rightY = y + vGap;
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", x.toString());
                line.setAttribute("y1", (y + radius).toString());
                line.setAttribute("x2", rightX.toString());
                line.setAttribute("y2", (rightY - radius).toString());
                line.setAttribute("style", "stroke: #999; stroke-width: 1px;");
                this.svg!.node.appendChild(line);
                drawNode(rightIdx, rightX, rightY);
            }
        };

        drawNode(0, startX, startY);
    }

    private async runLoop() {
        if (!this.isRunning) return;

        try {
            const valuesToInsert = [15, 10, 8, 2, 16, 7];

            // Insert values
            for (const value of valuesToInsert) {
                if (!this.isRunning) return;
                this.insert(value);
                this.drawHeap();
                await this.pause(500);
            }

            // Wait before extracting
            await this.pause(800);

            // Extract min values
            const extractCount = 3;
            for (let i = 0; i < extractCount; i++) {
                if (!this.isRunning) return;
                this.extractMin();
                this.drawHeap();
                await this.pause(500);
            }

            // Wait and reset
            await this.pause(800);
            this.heap = [];
            this.drawHeap();
            await this.pause(500);

            // Restart
            this.runLoop();
        } catch (error) {
            console.error("Error in Binary Heap card animation loop:", error);
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
