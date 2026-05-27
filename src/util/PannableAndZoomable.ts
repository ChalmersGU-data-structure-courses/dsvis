export default interface PannableAndZoomable {

    resetViewBox(): void;

    enableViewBoxPanning(): void;

    disableViewBoxPanning(): void;

    resetViewBoxPosition(): void;

    moveViewBox(dx: number, dy: number, animate: boolean): void;

    setViewBoxPosition(x: number, y: number, animate: boolean): void;

    setViewBoxCenter(x: number, y: number, animate: boolean): void;

    zoomViewBox(
        direction: "in" | "out",
        pointerLocation: { x: number; y: number },
        steps: number,
        animate: boolean
    ): void;
}
