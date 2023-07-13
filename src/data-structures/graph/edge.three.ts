import * as THREE from "three";
import Position from "../_commons/params/position.interface";
import { GraphEdge, DirectedGraphEdge as IDirectedGraphEdge, UndirectedGraphEdge as IUndirectedGraphEdge } from "./edge.interface";
import { GraphNode } from "./node.interface";
import Displayer from "../_commons/params/displayer.interface";
import DisplayerImpl from "../_commons/three/displayer.class";
import Color from "../_commons/params/color.interface";
import ColorImpl from "../_commons/three/color.class";

const threePosition = <T>(node: GraphNode<T>) => {
    const { x, y, z } = node.skin;
    return new THREE.Vector3(x, y, z);
}

abstract class Base<T> implements GraphEdge<T> {

    readonly source: GraphNode<T>;
    readonly target: GraphNode<T>;
    private displayer: Displayer;

    constructor(
        source: GraphNode<T>,
        target: GraphNode<T>,
        scene: THREE.Scene,
        object3D: THREE.Object3D,
    ) {
        this.source = source;
        this.target = target;
        this.displayer = new DisplayerImpl(scene, object3D);
    }

    abstract setColor(color: string): Promise<void>;

    abstract get color(): string

    abstract refresh(): void

    show() {
        this.displayer.show();
    }

    hide() {
        this.displayer.hide();
    }
}

export class DirectedGraphEdge<T> extends Base<T> implements IDirectedGraphEdge<T> {

    private arrow: THREE.ArrowHelper;
    private readonly headLength: number;
    private readonly headWidth: number;
    private arrowColor: string;

    constructor(
        source: GraphNode<T>,
        target: GraphNode<T>,
        scene: THREE.Scene,
        color: THREE.Color | string | number,
        headLength: number,
        headWidth: number
    ) {
        const origin = threePosition(source);
        const dest = threePosition(target);
        const direction = dest.clone().sub(origin);

        const arrow = new THREE.ArrowHelper(
            direction.clone().normalize(),
            origin,
            direction.length(),
            color,
            headLength,
            headWidth
        );

        super(source, target, scene, arrow)
        this.arrow = arrow;
        this.headLength = headLength;
        this.headWidth = headWidth;
        this.arrowColor = color + "";
    }

    setColor(color: string): Promise<void> {
        this.arrowColor = color;
        return Promise.resolve(this.arrow.setColor(color));
    }

    get color(): string {
        return this.arrowColor;
    }

    refresh(): void {
        const origin = threePosition(this.source);
        const dest = threePosition(this.target);
        const direction = dest.clone().sub(origin);

        this.arrow.position.copy(origin);
        this.arrow.setDirection(direction.clone().normalize());
        this.arrow.setLength(direction.length(), this.headLength, this.headWidth);
    }
}

export class UndirectedGraphEdge<T> extends Base<T> implements IUndirectedGraphEdge<T> {

    private line: THREE.Line;
    private readonly colorProxy: Color;

    constructor(
        source: GraphNode<T>,
        target: GraphNode<T>,
        scene: THREE.Scene,
        material: THREE.Material,
    ) {
        const geometry = new THREE.BufferGeometry().setFromPoints([threePosition(source), threePosition(target)]);
        const line = new THREE.Line(geometry, material);
        super(source, target, scene, line)
        this.line = line;
        this.colorProxy = new ColorImpl(material);
    }

    setColor(color: string): Promise<void> {
        return this.colorProxy.setColor(color);
    }

    get color(): string {
        return this.colorProxy.color;
    }

    refresh(): void {
        this.refreshSource();
        this.refreshTarget();
    }

    private refreshSource(): void {
        this.update(this.source.skin, 0, 1, 2);
    }

    private refreshTarget(): void {
        this.update(this.target.skin, 3, 4, 5);
    }

    private update(position: Position, xIndex: number, yIndex: number, zIndex: number) {
        this.line.geometry.attributes.position.needsUpdate = true;
        const positions = this.line.geometry.attributes.position.array;
        const { x, y, z } = position;
        (positions[xIndex] as any) = x;
        (positions[yIndex] as any) = y;
        (positions[zIndex] as any) = z;
    }

}

export class SimpleDirectedGraphEdge<T> extends DirectedGraphEdge<T> {

    constructor(
        source: GraphNode<T>,
        target: GraphNode<T>,
        scene: THREE.Scene,
        color: THREE.Color | string | number
    ) {
        const headLength = 1.2;
        const headWidth = 0.5;
        super(source, target, scene, color, headLength, headWidth);
    }

}

export class SimpleUndirectedGraphEdge<T> extends UndirectedGraphEdge<T> {

    constructor(
        source: GraphNode<T>,
        target: GraphNode<T>,
        scene: THREE.Scene,
        color: THREE.Color | string | number
    ) {
        const material = new THREE.LineBasicMaterial({ color });
        super(source, target, scene, material);
    }

}
