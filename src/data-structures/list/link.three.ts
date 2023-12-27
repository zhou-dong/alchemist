import * as THREE from "three";
import { Link as ILink } from "./link.interface";
import DisplayerImpl from "../_commons/three/displayer.class";
import Position from "../_commons/params/position.interface";

const threePosition = (position: Position, adjustPosition: (p: Position) => Position) => {
    const { x, y, z } = adjustPosition(position);
    return new THREE.Vector3(x, y, z);
}

export class Link extends DisplayerImpl implements ILink {

    source: Position;
    target: Position;
    adjustSource: (p: Position) => Position;
    adjustTarget: (p: Position) => Position;

    readonly arrow: THREE.ArrowHelper;
    public headLength: number;
    public headWidth: number;
    private arrowColor: THREE.Color | string | number;

    constructor(
        source: Position,
        adjustSource: (p: Position) => Position,
        target: Position,
        adjustTarget: (p: Position) => Position,
        scene: THREE.Scene,
        color: THREE.Color | string | number,
        headLength: number,
        headWidth: number
    ) {
        const origin = threePosition(source, adjustSource);
        const dest = threePosition(target, adjustTarget);
        const direction = dest.clone().sub(origin);

        const arrow = new THREE.ArrowHelper(
            direction.clone().normalize(),
            origin,
            direction.length(),
            color,
            headLength,
            headWidth
        );

        super(scene, arrow);

        this.source = source;
        this.target = target;
        this.arrow = arrow;
        this.headLength = headLength;
        this.headWidth = headWidth;
        this.arrowColor = color;

        this.adjustSource = adjustSource;
        this.adjustTarget = adjustTarget;
    }

    refresh(): void {
        const origin = threePosition(this.source, this.adjustSource);
        const dest = threePosition(this.target, this.adjustTarget);
        const direction = dest.clone().sub(origin);

        this.arrow.position.copy(origin);
        this.arrow.setDirection(direction.clone().normalize());
        this.arrow.setLength(direction.length(), this.headLength, this.headWidth);
    }

    setColor(color: string): Promise<void> {
        this.color = color;
        return Promise.resolve();
    }

    get color(): string {
        return this.arrowColor + "";
    }

    set color(color: string) {
        this.arrowColor = color;
        this.arrow.setColor(color);
    }

}

export class SimpleLink extends Link {

    constructor(
        source: Position,
        adjustSource: (p: Position) => Position,
        target: Position,
        adjustTarget: (p: Position) => Position,
        scene: THREE.Scene,
        color: THREE.Color | string | number
    ) {
        const headLength = 0.6;
        const headWidth = 0.4;
        super(source, adjustSource, target, adjustTarget, scene, color, headLength, headWidth);
    }

}
