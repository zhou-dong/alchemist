import * as THREE from 'three';
import TreeNode from "./node";
import TextSphere from '../../../_commons/sphere/three/text-sphere';
import Position from '../../../_commons/params/position.interface';
import { TreeNodeProps } from '../../heap/props';

const calTextX = <T>(value: T, x: number): number => {
    const length: number = (value as any).toString().length;
    switch (length) {
        case 0: return x;
        case 1: return x - 0.3;
        case 2: return x - 0.6;
        case 3: return x - 0.8;
        default: return x - 1;
    }
}

export const buildNode = <T>(
    treeNodeProps: TreeNodeProps,
    value: T,
    scene: THREE.Scene,
    center: Position,
    index?: number
) => {
    const { sphereGeometry, sphereMaterial, textMaterial, textGeometryParameters } = treeNodeProps;

    const textSphere = new TextSphere<T>(
        value,
        sphereGeometry,
        sphereMaterial(),
        textMaterial,
        textGeometryParameters,
        scene
    );

    const { x, y, z } = center;
    textSphere.center.x = x;
    textSphere.center.y = y;
    textSphere.center.z = z;

    textSphere.textPosition.x = calTextX(value, x);
    textSphere.textPosition.y = y - 0.4;
    textSphere.textPosition.z = z;

    const node = new TreeNode<T>(textSphere, index);
    return node;
}
