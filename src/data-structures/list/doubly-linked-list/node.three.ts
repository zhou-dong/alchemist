import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import Displayer from "../../_commons/params/displayer.interface";
import DisplayerImpl from "../../_commons/three/displayer.class";
import Position from "../../_commons/params/position.interface";
import PositionImpl from '../../_commons/three/position.class';
import Mover from '../../_commons/params/mover.interface';
import MoverImpl from '../../_commons/three/mover.class';
import Color from '../../_commons/params/color.interface';
import ColorImpl from '../../_commons/three/color.class';
import { font } from '../../../commons/three';
import { DoublyLinkedListNode as ILinkedListNode } from "./node.interface";
import { calDestination, calDistance } from '../../_commons/utils';
import { Link } from '../link.three';
import { LinkedListBaseNode } from '../list-node-base';

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

class NodeSkin extends NodeBase {
    distance(position: Position): Position {
        return calDistance({ x: this.x, y: this.y, z: this.z }, position);
    }
}

class NodeText extends NodeBase {
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

export class DoublyLinkedListNode<T> extends LinkedListBaseNode<T> implements ILinkedListNode<T> {

    next?: DoublyLinkedListNode<T>;
    prev?: DoublyLinkedListNode<T>;

    linkToNext?: Link<T>;
    linkToPrev?: Link<T>;

    constructor(
        data: T,
        text: string,
        scene: THREE.Scene,
        skinGeometry: THREE.BufferGeometry,
        skinMaterial: THREE.Material,
        textGeometryParameters: TextGeometryParameters,
        textMaterial: THREE.Material,
    ) {
        super(data, text, scene, skinGeometry, skinMaterial, textGeometryParameters, textMaterial)
    }
}

export class SimpleDoublyLinkedListNode<T> extends DoublyLinkedListNode<T> {

    constructor(
        data: T,
        text: string,
        scene: THREE.Scene,
        skinColor: string,
        skinWidth: number,
        skinHeight: number,
        skinDepth: number,
        skinOpacity: number,
        skinTransparent: boolean,
        textColor: string,
        fontSize: number,
        fontHeight: number
    ) {
        const skinMaterial = new THREE.MeshBasicMaterial({ color: skinColor, opacity: skinOpacity, transparent: skinTransparent });
        const skinGeometry = new THREE.BoxGeometry(skinWidth, skinHeight, skinDepth);
        const textGeometryParameters: TextGeometryParameters = { font, size: fontSize, height: fontHeight };
        const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: textColor });

        super(
            data,
            text,
            scene,
            skinGeometry,
            skinMaterial,
            textGeometryParameters,
            textMaterial
        )
    }

}
