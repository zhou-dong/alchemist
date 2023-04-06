import * as THREE from 'three';
import Position from '../../../_commons/params/position.interface';
import { TextSphere } from '../../../_commons/sphere/text-sphere.interface';
import Line from "../line";

const getDepth = <T>(node?: TreeNode<T>): number => {
    if (node === undefined) {
        return 0;
    }
    const leftDepth: number = getDepth(node.left);
    const rightDepth: number = getDepth(node.right);
    return Math.max(leftDepth, rightDepth) + 1;
}

export default class TreeNode<T> {

    private _index: number;
    private _val: TextSphere<T>;
    private _left?: TreeNode<T>;
    private _right?: TreeNode<T>;

    private _leftLine?: Line;
    private _rightLine?: Line;

    constructor(val: TextSphere<T>) {
        this._val = val;
        this._index = 0;
    }

    get leftLine(): Line | undefined {
        return this._leftLine;
    }

    get rightLine(): Line | undefined {
        return this._rightLine;
    }

    set index(index: number) {
        this._index = index;
    }

    get index(): number {
        return this._index;
    }

    get left(): TreeNode<T> | undefined {
        return this._left;
    }

    get right(): TreeNode<T> | undefined {
        return this._right;
    }

    get val() {
        return this._val;
    }

    get depth(): number {
        return getDepth(this);
    }

    set sphereColor(color: string) {
        this.val.sphereColor.setColor(color);

    }

    set textColor(color: string) {
        this.val.textColor.setColor(color);
    }

    move(distance: Position, duration: number): Promise<void> {
        const x = this.val.center.x + distance.x;
        const y = this.val.center.y + distance.y;
        const z = this.val.center.z + distance.z;
        return this.moveTo({ x, y, z }, duration);
    }

    moveTo(dest: Position, duration: number): Promise<void> {
        const onUpdate = () => {
            if (this._leftLine) {
                this._leftLine.start = this.val.center
                if (this._left) {
                    this._leftLine.end = this._left.val.center;
                }
            }
            if (this._rightLine) {
                this._rightLine.start = this.val.center
                if (this._right) {
                    this._rightLine.end = this._right.val.center;
                }
            }
        }

        return this.val.move(dest, duration, onUpdate);
    }

    setLeft(node: TreeNode<T>, position: Position, lineMaterial: THREE.LineBasicMaterial, duration: number, scene: THREE.Scene): Promise<void> {
        this._left = node;
        this._left.index = this.leftChildIndex;
        this._leftLine = new Line(this._val.center, node._val.center, lineMaterial, scene);
        this._leftLine.show();
        const onUpdate = () => {
            if (this._leftLine) {
                this._leftLine.end = node.val.center;
            }
        }
        return node._val.move(position, duration, onUpdate);
    }

    setRight(node: TreeNode<T>, position: Position, lineMaterial: THREE.LineBasicMaterial, duration: number, scene: THREE.Scene): Promise<void> {
        this._right = node;
        this._right.index = this.rightChildIndex;
        this._rightLine = new Line(this._val.center, node._val.center, lineMaterial, scene);
        this._rightLine.show();
        const onUpdate = () => {
            if (this._rightLine) {
                this._rightLine.end = node._val.center;
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

    get leftChildIndex(): number {
        return 2 * this._index + 1;
    }

    get rightChildIndex(): number {
        return 2 * this._index + 2;
    }

    get parentIndex(): number {
        return Math.floor((this._index - 1) / 2);
    }
}
