import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import { TextCube } from '../../../data-structures/_commons/cube/three/text-cube';
import { node, text } from "./queueStyles";

class QueueItemBuilder<T> {

    private _value: T;
    private _scene: THREE.Scene;

    private _textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: text.color });
    private _textGeometryParameters: TextGeometryParameters = { font, size: text.size, height: text.height };
    private _cubeMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "white", opacity: 0, transparent: true });
    private _cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(node.size.width, node.size.height, node.size.depth);
    private _position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    private _show: boolean;

    constructor(value: T, scene: THREE.Scene, show: boolean) {
        this._value = value;
        this._scene = scene;
        this._show = show;
    }

    position(x: number, y: number, z: number): QueueItemBuilder<T> {
        this._position = new THREE.Vector3(x, y, z);
        return this;
    }

    cubeMaterial(material: THREE.Material): QueueItemBuilder<T> {
        this._cubeMaterial = material;
        return this;
    }

    cubeGeometry(width: number, height: number, depth: number): QueueItemBuilder<T> {
        this._cubeGeometry = new THREE.BoxGeometry(width, height, depth);
        return this;
    }

    textMaterial(material: THREE.Material): QueueItemBuilder<T> {
        this._textMaterial = material;
        return this;
    }

    textGeometryParameters(parameters: TextGeometryParameters): QueueItemBuilder<T> {
        this._textGeometryParameters = parameters;
        return this;
    }

    build(): TextCube<T> {
        const item = new TextCube<T>(
            this._value,
            this._textMaterial,
            this._textGeometryParameters,
            this._cubeMaterial,
            this._cubeGeometry,
            this._scene
        );

        this.setPosition(item);

        if (this._show) {
            item.show();
        }
        return item;
    }

    private setPosition(item: TextCube<T>): void {
        item.x = this._position.x;
        item.y = this._position.y;
        item.z = this._position.z;

        item.textX = item.x - 0.25;
        item.textY = item.y - 0.26;
        item.textZ = item.z;
    }
}

export default QueueItemBuilder;
