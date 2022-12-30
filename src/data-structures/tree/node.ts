import * as THREE from 'three';
import Position from '../_commons/position';
import { TextSphere } from '../_commons/sphere/text-sphere';
import { wait } from '../_commons/utils';

export default class TreeNode<T> {

    private _val: TextSphere<T>;
    private _left?: TreeNode<T>;
    private _right?: TreeNode<T>;

    private _leftLine?: THREE.Line;
    private _rightLine?: THREE.Line;

    constructor(val: TextSphere<T>) {
        this._val = val;
    }

    async getLeft(duration: number): Promise<TreeNode<T> | undefined> {
        return this._left;
    }

    async getRight(duration: number): Promise<TreeNode<T> | undefined> {
        return this._right;
    }

    async setLeft(node: TreeNode<T>, position: Position, lineMaterial: THREE.LineBasicMaterial, duration: number, scene: THREE.Scene): Promise<void> {
        this._left = node;
        this._leftLine = this.buildLine(this._val.center, node._val.center, lineMaterial);
        scene.add(this._leftLine);
        const onUpdate = () => {
            if (this._leftLine) {
                this.updateLine(this._leftLine, node);
            }
        }
        await node._val.move(position, duration, onUpdate);
    }

    async setRight(node: TreeNode<T>, position: Position, lineMaterial: THREE.LineBasicMaterial, duration: number, scene: THREE.Scene): Promise<void> {
        this._right = node;
        this._rightLine = this.buildLine(node._val.center, position, lineMaterial);
        scene.add(this._rightLine);
        const onUpdate = () => {
            if (this._rightLine) {
                this.updateLine(this._rightLine, node);
            }
        }
        node._val.move(position, duration, onUpdate);
        await wait(duration);
    }

    async deleteLeft(duration: number): Promise<TreeNode<T> | undefined> {

        await wait(duration);

        return this._left;
    }

    async deleteRight(duration: number): Promise<TreeNode<T> | undefined> {

        await wait(duration);

        return this._right;
    }

    private updateLine(line: THREE.Line, node: TreeNode<T>) {
        line.geometry.attributes.position.needsUpdate = true;
        const positions = line.geometry.attributes.position.array;
        const { x, y, z } = node._val.center;
        (positions[3] as any) = x;
        (positions[4] as any) = y;
        (positions[5] as any) = z;
    }

    private buildLine(startPosition: Position, endPosition: Position, lineMaterial: THREE.LineBasicMaterial): THREE.Line {

        const geometry = new THREE.BufferGeometry().setFromPoints([
            this.buildThreePosition(startPosition),
            this.buildThreePosition(endPosition)
        ]);

        return new THREE.Line(geometry, lineMaterial);
    }

    private buildThreePosition({ x, y, z }: Position): THREE.Vector3 {
        return new THREE.Vector3(x, y, z);
    }
}

