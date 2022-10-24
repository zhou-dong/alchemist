import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import { TextCube } from '../../../data-structures/_commons/three/text-cube';

class StackItemBuilder<T> {

    private _value: T;
    private _scene: THREE.Scene;

    private _width: number = 1;
    private _height: number = 1;
    private _depth: number = 1;

    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;

    private _textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "blue" });
    private _textGeometryParameters: TextGeometryParameters = { font, size: 0.6, height: 0.1 };
    private _cubeMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "white", opacity: 0, transparent: true });

    constructor(value: T, scene: THREE.Scene) {
        this._value = value;
        this._scene = scene;
    }

    position(x: number, y: number, z: number): StackItemBuilder<T> {
        this._x = x;
        this._y = y;
        this._z = z;
        return this;
    }

    cubeMaterial(material: THREE.Material): StackItemBuilder<T> {
        this._cubeMaterial = material;
        return this;
    }

    cubeGeometry(width: number, height: number, depth: number): StackItemBuilder<T> {
        this._width = width;
        this._height = height;
        this._depth = depth;
        return this;
    }

    textMaterial(material: THREE.Material): StackItemBuilder<T> {
        this._textMaterial = material;
        return this;
    }

    textGeometryParameters(parameters: TextGeometryParameters): StackItemBuilder<T> {
        this._textGeometryParameters = parameters;
        return this;
    }

    build(): TextCube<T> {
        const cubeGeometry = new THREE.BoxGeometry(this._width, this._height, this._depth);
        const item = new TextCube<T>(
            this._value,
            this._textMaterial,
            this._textGeometryParameters,
            this._cubeMaterial,
            cubeGeometry,
            this._scene
        );

        this.setPosition(item);
        return item;
    }

    private setPosition(item: TextCube<T>): void {
        item.x = this._x;
        item.y = this._y;
        item.z = this._z;

        item.textX = item.x - 0.1;
        item.textY = item.y - 0.26;
        item.textZ = this._z;
    }
}

export default StackItemBuilder;
