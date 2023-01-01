import * as THREE from 'three';
import { buildPerfectBinaryTree } from "../../../data-structures/tree/perfectBinaryTree"
import TreeNode from "../../../data-structures/tree/node";
import { buildTreeNode, lineMaterial, yDistance } from "./styles";
import Position from '../../../data-structures/_commons/params/position';
import { calDepth } from './depth';

export enum Direction {
    Left, Right
}

export interface Step {
    preorderLeft: number;
    preorderRight: number;

    inorderLeft: number;
    inorderRight: number;

    inorderRootIndex: number;
    leftTreeLength: number;

    parent?: TreeNode<number>;
    direction?: Direction;
    node: TreeNode<number>;
}

export interface InputOutput {
    preorder: number[];
    inorder: number[];
    steps: Step[];
    xAxis: number[];
    tree: TreeNode<number>[];
}

const startX = 0;
const startPosition: THREE.Vector3 = new THREE.Vector3(startX, 11, 0);

export function buildTree(preorder: number[], inorder: number[], scene: THREE.Scene): InputOutput {

    const depth: number = calDepth(preorder, inorder);
    const xAxisAlpha = 2;
    const xAxis: number[] = buildPerfectBinaryTree(depth, xAxisAlpha).map(node => node.x);

    const xAlpha = (xAxis.length === 0) ? 0 : startX - xAxis[0];

    const steps: Step[] = [];
    const tree: TreeNode<number>[] = new Array(preorder.length);

    const inorderIndexMap = new Map<number, number>();
    inorder.forEach((value, index) => inorderIndexMap.set(value, index));

    const buildMyTree = (
        preorderLeft: number,
        preorderRight: number,
        inorderLeft: number,
        inorderRight: number,
        center: Position,
        index: number,
        parent?: TreeNode<number>,
        direction?: Direction,
    ): TreeNode<number> | undefined => {
        if (preorderLeft > preorderRight) {
            return undefined;
        }

        const inorderRootIndex: number = inorderIndexMap.get(preorder[preorderLeft])!;
        const leftTreeLength = inorderRootIndex - inorderLeft;

        const root = buildTreeNode(preorder[preorderLeft], scene, center);
        root.index = index;
        root.show();
        tree[preorderLeft] = root;

        const { y, z } = root.val.center;

        steps.push({ preorderLeft, preorderRight, inorderLeft, inorderRight, inorderRootIndex, leftTreeLength, node: root, parent, direction });

        const leftPosition = { x: xAxis[root.leftChildIndex] + xAlpha, y: y + yDistance, z };
        const left = buildMyTree(preorderLeft + 1, preorderLeft + leftTreeLength, inorderLeft, inorderRootIndex - 1, leftPosition, root.leftChildIndex, root, Direction.Left);
        if (left) {
            root.setLeft(left, leftPosition, lineMaterial, 0, scene);
        }

        const rightPosition = { x: xAxis[root.rightChildIndex] + xAlpha, y: y + yDistance, z };
        const right = buildMyTree(preorderLeft + leftTreeLength + 1, preorderRight, inorderRootIndex + 1, inorderRight, rightPosition, root.rightChildIndex, root, Direction.Right);
        if (right) {
            root.setRight(right, rightPosition, lineMaterial, 0, scene);
        }
        return root;
    }

    buildMyTree(0, preorder.length - 1, 0, inorder.length - 1, startPosition, 0);
    updateTreeColor(tree, steps[0]);
    return { preorder, inorder, steps, xAxis, tree };
};

export function updateTreeColor(tree: TreeNode<any>[], step?: Step) {
    tree.map((node, i) => updateTreeNodeColor(node, i, step));
}

function updateTreeNodeColor(node: TreeNode<any>, i: number, step?: Step) {
    if (!step) {
        return;
    }
    const preorderLeft = step.preorderLeft;
    const preorderRight = step.preorderRight;
    const leftTreeLength = step.leftTreeLength;

    if (i === preorderLeft) {
        node.sphereColor = "lightgreen";
    } else if (i > preorderLeft && i <= preorderLeft + leftTreeLength) {
        node.sphereColor = "yellow";
    } else if (i > preorderLeft + leftTreeLength && i <= preorderRight) {
        node.sphereColor = "lightblue";
    } else {
        node.sphereColor = "lightgray";
    }
}
