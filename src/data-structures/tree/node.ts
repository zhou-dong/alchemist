import * as THREE from 'three';
import gsap from 'gsap';
import Position from '../_commons/position';
import { TextSphere } from '../_commons/sphere/text-sphere';
import { wait } from '../_commons/utils';

type Item<T> = TextSphere<T> & THREE.Line;

export default class TreeNode<T> {

    private _val: TextSphere<T>;
    private _left?: TreeNode<TextSphere<T>>;
    private _right?: TreeNode<TextSphere<T>>;

    private _leftLine?: THREE.Line;
    private _rightLine?: THREE.Line;

    constructor(val: TextSphere<T>) {
        this._val = val;
    }

    async getLeft(duration: number): Promise<TreeNode<TextSphere<T>> | undefined> {
        return;
    }

    async getRight(duration: number): Promise<TreeNode<TextSphere<T>> | undefined> {
        return;
    }

    async setLeft(node: TreeNode<TextSphere<T>>, position: Position, lineMaterial: THREE.LineBasicMaterial, duration: number): Promise<void> {
        this._left = node;
        this._leftLine = this.buildLine(node._val.center, position, lineMaterial);
        const onUpdate = () => {
            if (this._leftLine) {
                this.updateLine(node, this._leftLine);
            }
        }
        node._val.move(position, duration, onUpdate);
        await wait(duration);
    }

    async setRight(node: TreeNode<TextSphere<T>>, position: Position, lineMaterial: THREE.LineBasicMaterial, duration: number): Promise<void> {
        this._right = node;
        this._rightLine = this.buildLine(node._val.center, position, lineMaterial);
        const onUpdate = () => {
            if (this._rightLine) {
                this.updateLine(node, this._rightLine);
            }
        }
        node._val.move(position, duration, onUpdate);
        await wait(duration);
    }

    async deleteLeft(duration: number): Promise<void> {

        await wait(duration);
    }

    async deleteRight(duration: number): Promise<void> {

        await wait(duration);
    }

    private updateLine(node: TreeNode<TextSphere<T>>, line: THREE.Line) {
        line.geometry.attributes.position.needsUpdate = true;
        const positions = line.geometry.attributes.position.array;
        const { x, y, z } = node._val.center;
        (positions[3] as any) = x;
        (positions[4] as any) = y;
        (positions[5] as any) = z;
    }

    private buildLine(startPosition: Position, endPosition: Position, lineMaterial: THREE.LineBasicMaterial): THREE.Line {
        const start = this.buildThreePosition(startPosition);
        const end = this.buildThreePosition(endPosition);
        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        return new THREE.Line(geometry, lineMaterial);
    }

    private buildThreePosition({ x, y, z }: Position): THREE.Vector3 {
        return new THREE.Vector3(x, y, z);
    }
}

