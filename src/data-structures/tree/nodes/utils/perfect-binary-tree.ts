import { getLeftChildIndex, getRightChildIndex } from "./tree-node-utils";

export class TreeNode {

    x: number;
    y: number;
    index: number;
    left?: TreeNode;
    right?: TreeNode;
    private readonly xAlpha: number;
    private readonly yDistance: number;

    constructor(index: number, xAlpha: number, yDistance: number) {
        this.x = 0;
        this.y = 0;
        this.index = index;
        this.xAlpha = xAlpha;
        this.yDistance = yDistance;
    }

    setX(): number {
        this.x = (this.setLeftX() + this.setRightX()) / 2;
        return this.x;
    }

    private setLeftX(): number {
        if (this.left) {
            return this.left.setX();
        } else {
            return this.index * this.xAlpha;
        }
    }

    private setRightX(): number {
        if (this.right) {
            return this.right.setX();
        } else {
            return this.index * this.xAlpha;
        }
    }

    setY(): number {
        this.y = Math.max(this.setLeftY(), this.setRightY()) + this.yDistance;
        return this.y;
    }

    private setLeftY(): number {
        if (this.left) {
            return this.left.setY();
        } else {
            return 0;
        }
    }

    private setRightY(): number {
        if (this.right) {
            return this.right.setY();
        } else {
            return 0;
        }
    }
}

export const buildPerfectBinaryTree = (level: number, alpha: number, yDistance: number): TreeNode[] => {
    const size = Math.pow(2, level) - 1;
    const array: TreeNode[] = [];

    for (let i = 0; i < size; i++) {
        const node = new TreeNode(i, alpha, yDistance);
        array.push(node);
    }

    for (let i = 0; i < size; i++) {
        const node = array[i];
        node.left = array[getLeftChildIndex(i)];
        node.right = array[getRightChildIndex(i)];
    }

    const root = array[0];
    root.setX();
    root.setY();

    return array;
}
