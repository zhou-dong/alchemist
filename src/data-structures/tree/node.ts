import * as THREE from 'three';
import Position from '../_commons/position';
import { TextSphere } from '../_commons/sphere/text-sphere';

class Line {

    private scene: THREE.Scene;
    private instance: THREE.Line;

    constructor(
        start: Position,
        end: Position,
        material: THREE.LineBasicMaterial,
        scene: THREE.Scene
    ) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            this.buildThreePosition(start),
            this.buildThreePosition(end)
        ]);

        this.instance = new THREE.Line(geometry, material);
        this.scene = scene;
    }

    private buildThreePosition({ x, y, z }: Position): THREE.Vector3 {
        return new THREE.Vector3(x, y, z);
    }

    updateStart(position: Position) {
        this.update(position, 0, 1, 2);
    }

    updateEnd(position: Position) {
        this.update(position, 3, 4, 5);
    }

    show() {
        this.scene.add(this.instance);
    }

    hide() {
        this.scene.remove(this.instance);
    }

    private update(position: Position, xIndex: number, yIndex: number, zIndex: number) {
        this.instance.geometry.attributes.position.needsUpdate = true;
        const positions = this.instance.geometry.attributes.position.array;
        const { x, y, z } = position;
        (positions[xIndex] as any) = x;
        (positions[yIndex] as any) = y;
        (positions[zIndex] as any) = z;
    }
}

export default class TreeNode<T> {

    private _val: TextSphere<T>;
    private _left?: TreeNode<T>;
    private _right?: TreeNode<T>;

    private _leftLine?: Line;
    private _rightLine?: Line;

    constructor(val: TextSphere<T>) {
        this._val = val;
    }

    getLeft(): TreeNode<T> | undefined {
        return this._left;
    }

    getRight(): TreeNode<T> | undefined {
        return this._right;
    }

    setLeft(node: TreeNode<T>, position: Position, lineMaterial: THREE.LineBasicMaterial, duration: number, scene: THREE.Scene): Promise<void> {
        this._left = node;
        this._leftLine = new Line(this._val.center, node._val.center, lineMaterial, scene);
        this._leftLine.show();
        const onUpdate = () => {
            if (this._leftLine) {
                this._leftLine.updateStart(node._val.center)
            }
        }
        return node._val.move(position, duration, onUpdate);
    }

    setRight(node: TreeNode<T>, position: Position, lineMaterial: THREE.LineBasicMaterial, duration: number, scene: THREE.Scene): Promise<void> {
        this._right = node;
        this._rightLine = new Line(node._val.center, position, lineMaterial, scene);
        this._leftLine?.show();
        const onUpdate = () => {
            if (this._rightLine) {
                this._rightLine.updateStart(node._val.center)
            }
        }
        return node._val.move(position, duration, onUpdate);
    }

    deleteLeft(): TreeNode<T> | undefined {
        if (this._leftLine) {
            this._leftLine.hide();
            this._leftLine = undefined;
        }
        return this._left;
    }

    deleteRight(): TreeNode<T> | undefined {
        if (this._rightLine) {
            this._rightLine.hide();
            this._rightLine = undefined;
        }
        return this._right;
    }

    show() {
        this._val.show();
    }

    hide() {
        this._val.hide();
        if (this._leftLine) {
            this._leftLine.hide();
        }
        if (this._rightLine) {
            this._rightLine.hide();
        }
    }
}

