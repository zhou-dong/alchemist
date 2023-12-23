import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import Displayer from "../_commons/params/displayer.interface";
import DisplayerImpl from "../_commons/three/displayer.class";
import Position from "../_commons/params/position.interface";
import PositionImpl from '../_commons/three/position.class';
import Mover from '../_commons/params/mover.interface';
import MoverImpl from '../_commons/three/mover.class';
import Color from '../_commons/params/color.interface';
import ColorImpl from '../_commons/three/color.class';
import { calDestination, calDistance } from '../_commons/utils';

class NodeBase extends PositionImpl implements Mover, Displayer, Position, Color {

    private displayer: Displayer;
    private mover: Mover;
    private readonly colour: Color;

    constructor(
        scene: THREE.Scene,
        geometry: THREE.BufferGeometry,
        material: THREE.Material
    ) {
        const mesh = new THREE.Mesh(geometry, material);
        super(mesh);
        this.colour = new ColorImpl(material);
        this.displayer = new DisplayerImpl(scene, mesh);
        this.mover = new MoverImpl(mesh);
    }

    setColor(color: string): Promise<void> {
        return this.colour.setColor(color);
    }

    get color(): string {
        return this.colour.color;
    }

    set color(c: string) {
        this.colour.color = c;
    }

    show() {
        this.displayer.show();
    }

    hide() {
        this.displayer.hide();
    }

    move(position: Position, duration: number, onUpdate?: (() => void) | undefined) {
        return this.mover.move(position, duration, onUpdate);
    }
}

export class LinkedListNodeSkin extends NodeBase {
    distance(position: Position): Position {
        return calDistance({ x: this.x, y: this.y, z: this.z }, position);
    }
}

export class LinkedListNodeText extends NodeBase {
    text: string;

    constructor(
        text: string,
        scene: THREE.Scene,
        geometryParameters: TextGeometryParameters,
        material: THREE.Material
    ) {
        const geometry = new TextGeometry(text, geometryParameters);
        super(scene, geometry, material);
        this.text = text;
    }

    destinate(distance: Position) {
        return calDestination({ x: this.x, y: this.y, z: this.z }, distance);
    }
}

export class LinkedListBaseNode<T> {
    data: T;

    readonly nodeSkin: LinkedListNodeSkin;
    readonly nodeText: LinkedListNodeText;

    constructor(
        data: T,
        text: string,
        scene: THREE.Scene,
        skinGeometry: THREE.BufferGeometry,
        skinMaterial: THREE.Material,
        textGeometryParameters: TextGeometryParameters,
        textMaterial: THREE.Material,
    ) {
        this.data = data;
        this.nodeSkin = new LinkedListNodeSkin(scene, skinGeometry, skinMaterial);
        this.nodeText = new LinkedListNodeText(text, scene, textGeometryParameters, textMaterial);
    }

    get x() {
        return this.nodeSkin.x;
    }

    get y() {
        return this.nodeSkin.y;
    }

    get z() {
        return this.nodeSkin.z;
    }

    async move(position: Position, duration: number, onUpdate?: (() => void) | undefined) {
        const distance = this.nodeSkin.distance(position);
        const textEndPosition = this.nodeText.destinate(distance);

        const skinMove = this.nodeSkin.move(position, duration, onUpdate);
        const textMove = this.nodeText.move(textEndPosition, duration);
        return Promise.all([skinMove, textMove]).then(() => { });
    };

    show() {
        this.nodeSkin.show();
        this.nodeText.show();
    };

    hide() {
        this.nodeSkin.hide();
        this.nodeText.hide();
    };
}
