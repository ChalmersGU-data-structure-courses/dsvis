import { Engine } from "~/engine";
import PannableAndZoomable from "~/util/PannableAndZoomable";

export default class PanAndZoomHelper implements PannableAndZoomable {
    engine: Engine;
    svgContainer: SVGSVGElement;
    isPanning: boolean = false;
    lastPointerPosition: { x?: number; y?: number } = {};

    constructor(engine: Engine, svgContainer: SVGSVGElement) {
        this.engine = engine;
        this.svgContainer = svgContainer;

        this.initialize();
    }

    private initialize(): void {
        this.svgContainer.addEventListener("mousedown", this.startPanning);

        this.svgContainer.addEventListener("mouseleave", this.stopPanning);

        this.svgContainer.addEventListener("mouseup", this.stopPanning);

        this.svgContainer.addEventListener("mousemove", (e: MouseEvent) => {
            if (this.isPanning) {
                const pointerDelta = {
                    x: this.lastPointerPosition.x
                        ? e.clientX - this.lastPointerPosition.x
                        : 0,
                    y: this.lastPointerPosition.y
                        ? e.clientY - this.lastPointerPosition.y
                        : 0,
                };
                this.lastPointerPosition = {
                    x: e.clientX,
                    y: e.clientY,
                };

                // Viewbox should change in opposite direction to the pointer movement, hence -pointerDelta.x/y
                this.moveViewBox(-pointerDelta.x, -pointerDelta.y, false);
            }
        });

        let zoomCount: number = 0;
        this.svgContainer.addEventListener("wheel", (event: WheelEvent) => {
            event.preventDefault();
            if (event.ctrlKey) {
                const { x: containingSvgX, y: containingSvgY } =
                    this.engine._containingSvg.node.getBoundingClientRect();
                const pointerPositionRelativeToContainingSvg = {
                    x: event.clientX - containingSvgX,
                    y: event.clientY - containingSvgY,
                };

                let cssClassToAdd: string | undefined;

                if (event.deltaY > 0) {
                    cssClassToAdd = "zooming-out";
                    this.zoomViewBox(
                        "out",
                        pointerPositionRelativeToContainingSvg,
                        1,
                        true
                    );
                }
                if (event.deltaY < 0) {
                    cssClassToAdd = "zooming-in";
                    this.zoomViewBox(
                        "in",
                        pointerPositionRelativeToContainingSvg,
                        1,
                        true
                    );
                }
                if (cssClassToAdd) {
                    this.svgContainer.classList.add(cssClassToAdd);
                    zoomCount++;
                    setTimeout(() => {
                        zoomCount--;
                        if (zoomCount <= 0) {
                            this.svgContainer.classList.remove(cssClassToAdd);
                            zoomCount = 0;
                        }
                    }, 100);
                }
            }
        });
    }
    
    enableViewBoxPanning(): void {
        this.svgContainer.addEventListener("mousedown", this.startPanning);
    }

    disableViewBoxPanning(): void {
        this.svgContainer.removeEventListener("mousedown", this.startPanning);
        this.isPanning = false;
    }
    
    resetViewBox(): void {
        this.setViewBox(0, 0, this.engine.$Svg.width, this.engine.$Svg.height)
    }

    resetViewBoxPosition(): void {
        const {
            width: containingViewBoxWidth,
            height: containingViewBoxHeight,
        } = this.engine._containingSvg.viewbox();
        const { width: viewBoxWidth, height: viewBoxHeight } =
            this.engine.Svg.viewbox();
        this.setViewBox(
            (containingViewBoxWidth - viewBoxWidth) / 2,
            (containingViewBoxHeight - viewBoxHeight) / 2,
            viewBoxWidth,
            viewBoxHeight,
            true
        );
    }

    moveViewBox(dx: number, dy: number, animate: boolean): void {
        const { x: viewBoxX, y: viewBoxY } = this.engine.Svg.viewbox();
        const zoomScale: { x: number; y: number } = this.getZoomScale();
        this.setViewBoxPosition(
            viewBoxX + dx * zoomScale.x,
            viewBoxY + dy * zoomScale.y,
            animate
        );
    }

    setViewBoxPosition(x: number, y: number, animate: boolean): void {
        const { width: viewBoxWidth, height: viewBoxHeight } =
            this.engine.Svg.viewbox();
        this.setViewBox(x, y, viewBoxWidth, viewBoxHeight, animate);
    }

    setViewBoxCenter(x: number, y: number, animate: boolean): void {
        const { width: viewBoxWidth, height: viewBoxHeight } =
            this.engine.Svg.viewbox();
        this.setViewBoxPosition(
            x - viewBoxWidth / 2,
            y - viewBoxHeight / 2,
            animate
        );
    }

    zoomViewBox(
        direction: "in" | "out",
        pointerLocation: { x: number; y: number },
        steps: number,
        animate: boolean
    ): void {
        const {
            x: viewBoxX,
            y: viewBoxY,
            height: viewBoxHeight,
            width: viewBoxWidth,
        } = this.engine.Svg.viewbox();

        const zoomFractionPerStep: number = 0.05;
        let yChange: number;
        if (direction === "in") {
            yChange = -steps * zoomFractionPerStep * viewBoxHeight;
        } else if (direction === "out") {
            yChange = steps * zoomFractionPerStep * viewBoxHeight;
        } else {
            throw new Error(
                `direction must be 'in' or 'out', was ${direction}`
            );
        }

        const height = Math.max(1, viewBoxHeight + yChange);
        const width = height * this.getViewBoxWToHAspectRatio();

        const heightDiff = viewBoxHeight - height;
        const widthDiff = viewBoxWidth - width;

        const proportionatePosition = {
            x: pointerLocation.x / this.engine._containingSvg.node.clientWidth,
            y: pointerLocation.y / this.engine._containingSvg.node.clientHeight,
        };

        const viewBoxDeltaX =
            widthDiff *
            (direction === "in"
                ? proportionatePosition.x
                : 1 - proportionatePosition.x);
        const viewBoxDeltaY =
            heightDiff *
            (direction === "in"
                ? proportionatePosition.y
                : 1 - proportionatePosition.y);
        this.setViewBox(
            viewBoxX + viewBoxDeltaX,
            viewBoxY + viewBoxDeltaY,
            width,
            height,
            false
        );
    }

    private setViewBox(
        x: number,
        y: number,
        width: number,
        height: number,
        animate: boolean = false
    ) {
        if (animate) {
            this.engine.Svg.animate(this.engine.getAnimationSpeed()).viewbox(x, y, width, height);
        } else {
            this.engine.Svg.viewbox(x, y, width, height);
        }
    }

    private getZoomScale(): { x: number; y: number } {
        const { width: viewBoxWidth, height: viewBoxHeight } =
            this.engine.Svg.viewbox();
        const renderedWidth: number =
            this.engine._containingSvg.node.clientWidth;
        const renderedHeight: number =
            this.engine._containingSvg.node.clientHeight;
        return {
            x: viewBoxWidth / renderedWidth,
            y: viewBoxHeight / renderedHeight,
        };
    }

    private getViewBoxWToHAspectRatio(): number {
        return this.engine.$Svg.width / this.engine.$Svg.height;
    }

    private startPanning = () => {
        this.isPanning = true;
        this.svgContainer.classList.add("panning");
    }

    private stopPanning = () => {
        this.isPanning = false;
        this.lastPointerPosition = {};
        this.svgContainer.classList.remove("panning");
    }
}
