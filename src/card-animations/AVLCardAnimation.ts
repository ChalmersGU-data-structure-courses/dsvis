import { SVG, Element, Text } from "@svgdotjs/svg.js";

interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    height: number;
}

/**
 * A simplified AVL tree animation for the collections card on the index page.
 * Shows a looping animation of tree insertions and rebalancing.
 * Uses a lightweight implementation without full Engine/Controls infrastructure.
 */
export class AVLCardAnimation {
    private container: HTMLElement | null = null;
    private svg: Element | null = null;
    private root: TreeNode | null = null;
    private isRunning = false;
    private animationTimeout: number | null = null;
    private colors = {
        nodeColor: "#0d6efd",
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
        return value || ""; // Return empty string if not found, we'll use defaults in drawTree
    }

    private reloadColors(): void {
        const nodeColor = this.getCSSVariable("--card-avl-node");
        const strokeColor = this.getCSSVariable("--card-avl-stroke");
        
        if (nodeColor) this.colors.nodeColor = nodeColor;
        if (strokeColor) this.colors.strokeColor = strokeColor;

        // Redraw with new colors
        this.redraw();
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
            const nodeColor = this.getCSSVariable("--card-avl-node");
            const strokeColor = this.getCSSVariable("--card-avl-stroke");
            
            if (nodeColor) this.colors.nodeColor = nodeColor;
            if (strokeColor) this.colors.strokeColor = strokeColor;

            // Create SVG canvas for animation
            this.svg = SVG().addTo(this.container);
            (this.svg as any).attr({ width: "100%", height: "180px", viewBox: "0 0 300 180" });
            this.svg.css({ "background-color": "transparent" });

            // Setup theme change listener
            this.setupThemeChangeListener();

            this.isRunning = true;
            this.runLoop();
        } catch (error) {
            console.error("Failed to initialize AVL card animation:", error);
        }
    }

    private getNodeHeight(node: TreeNode | null): number {
        return node === null ? 0 : node.height;
    }

    private updateHeight(node: TreeNode | null): number {
        if (node === null) return 0;
        node.height = Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
        return node.height;
    }

    private getBalance(node: TreeNode | null): number {
        return node === null ? 0 : this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    }

    private rotateRight(node: TreeNode): TreeNode {
        const left = node.left!;
        node.left = left.right;
        left.right = node;
        this.updateHeight(node);
        this.updateHeight(left);
        return left;
    }

    private rotateLeft(node: TreeNode): TreeNode {
        const right = node.right!;
        node.right = right.left;
        right.left = node;
        this.updateHeight(node);
        this.updateHeight(right);
        return right;
    }

    private insertNode(node: TreeNode | null, value: number): TreeNode {
        if (node === null) {
            return { value, left: null, right: null, height: 1 };
        }

        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        }

        this.updateHeight(node);
        const balance = this.getBalance(node);

        // Left-left case
        if (balance > 1 && value < node.left!.value) {
            return this.rotateRight(node);
        }
        // Right-right case
        if (balance < -1 && value > node.right!.value) {
            return this.rotateLeft(node);
        }
        // Left-right case
        if (balance > 1 && value > node.left!.value) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }
        // Right-left case
        if (balance < -1 && value < node.right!.value) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    private drawTree(node: TreeNode | null, x: number, y: number, offset: number) {
        if (!node || !this.svg) return;

        const radius = 9;
        const verticalGap = 42;

        // Create circle element directly as SVG DOM element
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x.toString());
        circle.setAttribute("cy", y.toString());
        circle.setAttribute("r", radius.toString());
        circle.setAttribute("style", `fill: ${this.colors.nodeColor}; stroke: ${this.colors.strokeColor}; stroke-width: 1.2px;`);
        this.svg.node.appendChild(circle);
        
        // Add text value inside circle using SVG text element  
        const textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textNode.setAttribute("x", x.toString());
        textNode.setAttribute("y", (y + 1).toString());
        textNode.setAttribute("text-anchor", "middle");
        textNode.setAttribute("dy", ".3em");
        textNode.setAttribute("font-size", "11");
        textNode.setAttribute("font-weight", "bold");
        textNode.setAttribute("fill", "white");
        textNode.setAttribute("font-family", "sans-serif");
        textNode.setAttribute("pointer-events", "none");
        textNode.textContent = node.value.toString();
        this.svg.node.appendChild(textNode);

        // Draw connections to children
        if (node.left) {
            const leftX = x - offset;
            const leftY = y + verticalGap;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x.toString());
            line.setAttribute("y1", (y + radius).toString());
            line.setAttribute("x2", leftX.toString());
            line.setAttribute("y2", (leftY - radius).toString());
            line.setAttribute("style", "stroke: #999; stroke-width: 1px;");
            this.svg.node.appendChild(line);
            this.drawTree(node.left, leftX, leftY, offset / 2);
        }

        if (node.right) {
            const rightX = x + offset;
            const rightY = y + verticalGap;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x.toString());
            line.setAttribute("y1", (y + radius).toString());
            line.setAttribute("x2", rightX.toString());
            line.setAttribute("y2", (rightY - radius).toString());
            line.setAttribute("style", "stroke: #999; stroke-width: 1px;");
            this.svg.node.appendChild(line);
            this.drawTree(node.right, rightX, rightY, offset / 2);
        }
    }

    private redraw() {
        if (!this.svg) return;

        // Clear and redraw
        this.svg.clear();
        if (this.root) {
            this.drawTree(this.root, 150, 20, 70);
        }
    }

    private async runLoop() {
        if (!this.isRunning) return;

        try {
            // Sequence of values to insert and delete
            const valuesToInsert = [5, 3, 7, 2, 4, 6, 8];
            const valuesToDelete = [2, 4];

            // Insert values one by one
            for (const value of valuesToInsert) {
                if (!this.isRunning) return;
                this.root = this.insertNode(this.root, value);
                this.redraw();
                await this.pause(400);
            }

            // Wait before deleting
            await this.pause(1000);

            // Delete and reset - for simplicity, just clear and restart
            this.root = null;
            this.redraw();
            await this.pause(500);

            // Restart animation loop
            this.runLoop();
        } catch (error) {
            console.error("Error in AVL card animation loop:", error);
            // Try to restart after error
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
