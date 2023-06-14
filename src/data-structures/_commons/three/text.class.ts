import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';
import Color from "../../_commons/params/color.interface";
import ColorImpl from "../../_commons/three/color.class";
import Displayer from "../../_commons/params/displayer.interface";
import DisplayerImpl from "../../_commons/three/displayer.class";
import Mover from "../../_commons/params/mover.interface";
import MoverImpl from "../../_commons/three/mover.class";
import Position from "../../_commons/params/position.interface";
import PositionImpl from "../../_commons/three/position.class"
import IText from "../../_commons/params/text.interface";

export default class Text<T> extends PositionImpl implements IText<T> {
    private _value: T;
    private _mover: Mover;
    private _displayer: Displayer;
    private _color: Color;

    constructor(
        value: T,
        material: THREE.Material,
        geometryParameters: TextGeometryParameters,
        scene: THREE.Scene
    ) {
        const geometry = new TextGeometry(value + '', geometryParameters);
        const mesh = new THREE.Mesh(geometry, material);
        super(mesh)
        this._value = value;
        this._mover = new MoverImpl(mesh);
        this._displayer = new DisplayerImpl(scene, mesh);
        this._color = new ColorImpl(material);
    }

    get value(): T {
        return this._value;
    }

    setColor(color: string): Promise<void> {
        return this._color.setColor(color);
    }

    get color(): string {
        return this._color.color;
    }

    show() {
        this._displayer.show();
    }

    hide() {
        this._displayer.hide();
    }

    move(position: Position, duration: number, onUpdate?: (() => void) | undefined): Promise<void> {
        return this._mover.move(position, duration, onUpdate);
    }
}
