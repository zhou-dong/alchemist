import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import TreeNode from "./node";
import Position from '../../../_commons/params/position.interface';
import { build } from "./tree-node-builder";
import { buildPerfectBinaryTree } from '../utils/perfect-binary-tree';

export const buildBinaryTree = <T>(
    sphereGeometry: THREE.SphereGeometry,
    sphereMaterial: () => THREE.Material,
    textMaterial: THREE.Material,
    textGeometryParameters: TextGeometryParameters,
    lineMaterial: THREE.LineBasicMaterial,
    scene: THREE.Scene,
    duration: number,
    position: Position,
    yDistance: number,
    xAxisAlpha: number, // expend the tree size in xAxis.
    array: (T | null)[],
    show: boolean
): TreeNode<T> | undefined => {

    const depth = Math.floor(Math.log2(array.length)) + 1;
    const xAxis: number[] = buildPerfectBinaryTree(depth, xAxisAlpha, 2).map(node => node.x);
    const xAlpha = (xAxis.length === 0) ? 0 : position.x - xAxis[0];

    const buildTree = (index: number, center: Position): TreeNode<T> | undefined => {

        const value = array[index];

        if (value === null || value === undefined) {
            return undefined;
        }

        const node = build<T>(
            index,
            sphereGeometry,
            sphereMaterial(),
            textMaterial,
            textGeometryParameters,
            value,
            scene,
            center
        );

        if (show) {
            node.show();
        }

        const { y, z } = center;
        const leftPosition = { x: xAxis[node.leftChildIndex] + xAlpha, y: y - yDistance, z };
        const left = buildTree(node.leftChildIndex, leftPosition);
        if (left) {
            node.setLeft(left, leftPosition, lineMaterial, duration, scene);
        }

        const rightPosition = { x: xAxis[node.rightChildIndex] + xAlpha, y: y - yDistance, z };
        const right = buildTree(node.rightChildIndex, rightPosition);
        if (right) {
            node.setRight(right, rightPosition, lineMaterial, duration, scene);
        }

        return node;
    }

    return buildTree(0, position);
}
