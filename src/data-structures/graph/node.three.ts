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
import { Base as IBase, GraphSkin as ISkin, GraphText as IText } from "./node.interface";
import { font } from '../../commons/three';

class Base implements Mover, Displayer, IBase {

    public readonly color: Color;
    public readonly position: Position;
    private displayer: Displayer;
    private mover: Mover;

    constructor(
        scene: THREE.Scene,
        geometry: THREE.BufferGeometry,
        material: THREE.Material
    ) {
        const mesh = new THREE.Mesh(geometry, material);
        this.position = new PositionImpl(mesh);
        this.color = new ColorImpl(material);
        this.displayer = new DisplayerImpl(scene, mesh);
        this.mover = new MoverImpl(mesh);
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

export class GraphSkin extends Base implements ISkin {

    constructor(
        scene: THREE.Scene,
        geometry: THREE.SphereGeometry,
        material: THREE.Material,
    ) {
        super(scene, geometry, material);
    }

}

export class GraphText extends Base implements IText {

    public text: string;

    constructor(
        text: string,
        scene: THREE.Scene,
        geometryParameters: TextGeometryParameters,
        material: THREE.Material,
    ) {
        const geometry = new TextGeometry(text, geometryParameters);
        super(scene, geometry, material);
        this.text = text;
    }

}

export class SimpleGraphSkin extends GraphSkin {

    constructor(scene: THREE.Scene, color: string) {
        const geometry = new THREE.SphereGeometry(1, 32, 16);
        const material = new THREE.MeshBasicMaterial({ color, opacity: 0.4, transparent: true });
        super(scene, geometry, material);
    }

}

export class SimpleGraphText extends GraphText {

    constructor(text: string, scene: THREE.Scene, color: string) {
        const material = new THREE.MeshBasicMaterial({ color });
        const geometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
        super(text, scene, geometryParameters, material);
    }

}
