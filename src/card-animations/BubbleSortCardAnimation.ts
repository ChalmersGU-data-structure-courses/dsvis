import { SVG, Element } from "@svgdotjs/svg.js";

/**
 * A simplified Bubble Sort animation for the sorting card.
 * Shows a looping animation of the bubble sort algorithm.
 */
export class BubbleSortCardAnimation {
    private container: HTMLElement | null = null;
    private svg: Element | null = null;
    private array: number[] = [];
    private isRunning = false;
    private animationTimeout: number | null = null;
    private colors = {
        default: "#0d6efd",
        active: "#dc3545",
        sorted: "#28a745",
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
        const defaultColor = this.getCSSVariable("--card-sort-default");
        const activeColor = this.getCSSVariable("--card-sort-active");
        const sortedColor = this.getCSSVariable("--card-sort-sorted");
        
        if (defaultColor) this.colors.default = defaultColor;
        if (activeColor) this.colors.active = activeColor;
        if (sortedColor) this.colors.sorted = sortedColor;

        // Redraw with new colors
        this.drawArray();
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
            const defaultColor = this.getCSSVariable("--card-sort-default");
            const activeColor = this.getCSSVariable("--card-sort-active");
            const sortedColor = this.getCSSVariable("--card-sort-sorted");
            
            if (defaultColor) this.colors.default = defaultColor;
            if (activeColor) this.colors.active = activeColor;
            if (sortedColor) this.colors.sorted = sortedColor;

            this.svg = SVG().addTo(this.container);
            (this.svg as any).attr({ width: "100%", height: "180px", viewBox: "0 0 300 180" });
            this.svg.css({ "background-color": "transparent" });

            // Setup theme change listener
            this.setupThemeChangeListener();

            this.isRunning = true;
            this.runLoop();
        } catch (error) {
            console.error("Failed to initialize Bubble Sort card animation:", error);
        }
    }

    private drawArray(highlightIndex: number = -1, sortedIndex: number = -1) {
        if (!this.svg) return;

        this.svg.clear();

        const barWidth = 20;
        const startX = 50;
        const startY = 150;
        const maxHeight = 100;

        for (let i = 0; i < this.array.length; i++) {
            const height = (this.array[i] / 10) * maxHeight;
            const x = startX + i * (barWidth + 5);
            const y = startY - height;

            // Determine color
            let color = this.colors.default;
            if (i === highlightIndex) {
                color = this.colors.active;
            } else if (i > sortedIndex) {
                color = this.colors.sorted;
            }

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x.toString());
            rect.setAttribute("y", y.toString());
            rect.setAttribute("width", barWidth.toString());
            rect.setAttribute("height", height.toString());
            rect.setAttribute("style", `fill: ${color}; stroke: #343a40; stroke-width: 1px;`);
            this.svg.node.appendChild(rect);

            // Add value label
            const textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textNode.setAttribute("x", (x + barWidth / 2).toString());
            textNode.setAttribute("y", (startY + 12).toString());
            textNode.setAttribute("text-anchor", "middle");
            textNode.setAttribute("font-size", "9");
            textNode.setAttribute("fill", "#666");
            textNode.setAttribute("pointer-events", "none");
            textNode.textContent = this.array[i].toString();
            this.svg.node.appendChild(textNode);
        }
    }

    private async bubbleSort() {
        const n = this.array.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (!this.isRunning) return;

                // Highlight comparison
                this.drawArray(j, n - i - 1);
                await this.pause(300);

                if (this.array[j] > this.array[j + 1]) {
                    // Swap
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    this.drawArray(j, n - i - 1);
                    await this.pause(300);
                }
            }
        }

        this.drawArray(-1, n - 1);
    }

    private async runLoop() {
        if (!this.isRunning) return;

        try {
            // Reset array
            this.array = [5, 2, 8, 1, 9, 3, 7, 4, 6];
            this.drawArray();
            await this.pause(500);

            // Run bubble sort
            await this.bubbleSort();

            // Wait before restart
            await this.pause(1000);

            // Restart
            this.runLoop();
        } catch (error) {
            console.error("Error in Bubble Sort card animation loop:", error);
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
