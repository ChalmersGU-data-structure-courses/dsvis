import { Polygon } from "@svgdotjs/svg.js";

export class Arrow extends Polygon {


    constructor(baseWidth: number, angleDegrees: number) {
        super()
        this.plot([
            [0, 0],
            [
                Math.cos((150 + angleDegrees) * Math.PI / 180) * baseWidth,
                -Math.sin((150 + angleDegrees) * Math.PI / 180) * baseWidth,
            ],
            [
                Math.cos((210 + angleDegrees) * Math.PI / 180) * baseWidth,
                -Math.sin((210 + angleDegrees) * Math.PI / 180) * baseWidth,
            ],
            [0, 0],
        ]);
        
    }
}