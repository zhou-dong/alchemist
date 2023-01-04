import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import { build } from '../../../data-structures/tree/treeNodeBuilder';
import Position from '../../../data-structures/_commons/params/position';

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: "yellow", opacity: 0.4, transparent: true });
}
const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
export const lineMaterial = new THREE.LineBasicMaterial({ color: "gold" });

export const rootCenter = { x: 0, y: 11, z: 0 };
export const initCenter = { x: 0, y: -8, z: 0 };
export const yDistance = 3;
export const duration = 1;
export const xAxisAlpha = 2; // expend the tree size in xAxis.

export const buildTreeNode = (value: string, index: number, scene: THREE.Scene, center: Position, show: boolean) => {
    const node = build<string>(
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
    return node;
}
