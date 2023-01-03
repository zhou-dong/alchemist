import * as THREE from 'three';
import { buildPerfectBinaryTree } from "../../../data-structures/tree/perfectBinaryTree"
import TreeNode from "../../../data-structures/tree/node";
import { buildTreeNode, lineMaterial, yDistance, xCenter } from "./styles";
import Position from '../../../data-structures/_commons/params/position';
import { calDepth } from './depth';

export enum Direction {
    Left, Right
}

export interface Step {
    inorderLeft: number;
    inorderRight: number;

    postorderLeft: number;
    postorderRight: number;

    inorderRootIndex: number;
    leftTreeLength: number;

    parent?: TreeNode<number>;
    direction?: Direction;
    node: TreeNode<number>;
}

export interface InputOutput {
    inorder: number[];
    postorder: number[];
    steps: Step[];
    xAxis: number[];
    tree: TreeNode<number>[];
}

const startPosition: THREE.Vector3 = new THREE.Vector3(xCenter, 11, 0);

export function buildTree(inorder: number[], postorder: number[], scene: THREE.Scene): InputOutput {

    const depth: number = calDepth(inorder, postorder);
    const xAxisAlpha = 2; // expend the tree size in xAxis.
    const xAxis: number[] = buildPerfectBinaryTree(depth, xAxisAlpha).map(node => node.x);
    const xAlpha = (xAxis.length === 0) ? 0 : xCenter - xAxis[0];
    const steps: Step[] = [];
    const tree: TreeNode<number>[] = new Array(postorder.length);

    const inorderIndexMap = new Map<number, number>();
    inorder.forEach((value, index) => inorderIndexMap.set(value, index));

    const buildMyTree = (
        inorderLeft: number,
        inorderRight: number,
        postorderLeft: number,
        postorderRight: number,
        center: Position,
        index: number,
        parent?: TreeNode<number>,
        direction?: Direction,
    ): TreeNode<number> | undefined => {
        if (postorderLeft > postorderRight) {
            return undefined;
        }

        const inorderRootIndex: number = inorderIndexMap.get(postorder[postorderRight])!;
        const leftTreeLength = inorderRootIndex - inorderLeft;

        const root = buildTreeNode(postorder[postorderRight], scene, center);
        root.index = index;
        root.show();
        tree[postorderRight] = root;

        const { y, z } = root.val.center;

        steps.push({ postorderLeft, postorderRight, inorderLeft, inorderRight, inorderRootIndex, leftTreeLength, node: root, parent, direction });

        const leftPosition = { x: xAxis[root.leftChildIndex] + xAlpha, y: y + yDistance, z };
        const left = buildMyTree(inorderLeft, inorderRootIndex - 1, postorderLeft, postorderLeft + leftTreeLength - 1, leftPosition, root.leftChildIndex, root, Direction.Left);
        if (left) {
            root.setLeft(left, leftPosition, lineMaterial, 0, scene);
        }

        const rightPosition = { x: xAxis[root.rightChildIndex] + xAlpha, y: y + yDistance, z };
        const right = buildMyTree(inorderRootIndex + 1, inorderRight, postorderLeft + leftTreeLength, postorderRight - 1, rightPosition, root.rightChildIndex, root, Direction.Right);
        if (right) {
            root.setRight(right, rightPosition, lineMaterial, 0, scene);
        }
        return root;
    }

    buildMyTree(0, postorder.length - 1, 0, inorder.length - 1, startPosition, 0);
    updateTreeColor(tree, steps[0]);
    return { postorder, inorder, steps, xAxis, tree };
};

export function updateTreeColor(tree: TreeNode<any>[], step?: Step) {
    tree.map((node, i) => updateTreeNodeColor(node, i, step));
}

function updateTreeNodeColor(node: TreeNode<any>, i: number, step?: Step) {
    if (!step) {
        return;
    }

    const { postorderLeft, postorderRight, leftTreeLength } = step;

    if (i === postorderRight) {
        node.sphereColor = "lightgreen"; // root
    } else if (i >= postorderLeft && i < postorderLeft + leftTreeLength) { // left
        node.sphereColor = "yellow";
    } else if (i >= postorderLeft + leftTreeLength && i < postorderRight) { // right
        node.sphereColor = "lightblue";
    } else { // others
        node.sphereColor = "lightgray";
    }
}
