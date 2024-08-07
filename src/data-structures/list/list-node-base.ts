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
import { font } from '../../commons/three';

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

export abstract class LinkedListNodeSkin extends NodeBase {
    distance(position: Position): Position {
        return calDistance({ x: this.x, y: this.y, z: this.z }, position);
    }

    abstract get width(): number;
}

export class SimpleLinkedListBoxNodeSkin extends LinkedListNodeSkin {

    private _width: number;

    get width(): number {
        return this._width;
    }

    constructor(
        scene: THREE.Scene,
        color: string,
        width: number,
        height: number,
        depth: number,
        opacity: number,
        transparent: boolean,
    ) {
        const material = new THREE.MeshBasicMaterial({ color, opacity, transparent });
        const geometry = new THREE.BoxGeometry(width, height, depth);
        super(scene, geometry, material)

        this._width = geometry.parameters.width;
    }
}

export class SimpleLinkedListSphereNodeSkin extends LinkedListNodeSkin {

    private _radius: number;

    get width(): number {
        return this._radius * 2;
    }

    constructor(
        scene: THREE.Scene,
        color: string,
        radius: number,
        opacity: number,
        transparent: boolean,
    ) {
        const material = new THREE.MeshBasicMaterial({ color, opacity, transparent });
        const geometry = new THREE.SphereGeometry(radius);
        super(scene, geometry, material)
        this._radius = geometry.parameters.radius;
    }
}

export class LinkedListNodeText extends NodeBase {
    private _text: string;
    private _geometryParameters: TextGeometryParameters;
    private _material: THREE.Material;
    private _scene: THREE.Scene;

    constructor(
        text: string,
        scene: THREE.Scene,
        geometryParameters: TextGeometryParameters,
        material: THREE.Material,
    ) {
        const geometry = new TextGeometry(text, geometryParameters);
        super(scene, geometry, material);
        this._text = text;
        this._geometryParameters = geometryParameters;
        this._material = material;
        this._scene = scene;
    }

    destinate(distance: Position) {
        return calDestination({ x: this.x, y: this.y, z: this.z }, distance);
    }

    get text() {
        return this._text;
    }

    set text(text: string) {
        this._text = text;
        const geometry = new TextGeometry(text, this._geometryParameters);
        const mesh = new THREE.Mesh(geometry, this._material);
        mesh.position.setX(this.x);
        mesh.position.setY(this.y);
        mesh.position.setZ(this.z);
        this.hide();
        this._scene.add(mesh);
    }
}

export class SimpleLinkedListNodeText extends LinkedListNodeText {
    constructor(
        text: string,
        scene: THREE.Scene,
        textColor: string,
        fontSize: number,
        fontHeight: number
    ) {
        const geometryParameters: TextGeometryParameters = { font, size: fontSize, height: fontHeight };
        const material: THREE.Material = new THREE.MeshBasicMaterial({ color: textColor });
        super(text, scene, geometryParameters, material);
    }
}

export class LinkedListBaseNode<T> {
    data: T;

    readonly nodeSkin: LinkedListNodeSkin;
    readonly nodeText: LinkedListNodeText;

    constructor(
        data: T,
        nodeSkin: LinkedListNodeSkin,
        nodeText: LinkedListNodeText
    ) {
        this.data = data;
        this.nodeSkin = nodeSkin;
        this.nodeText = nodeText;
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

    get width() {
        return this.nodeSkin.width;
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
