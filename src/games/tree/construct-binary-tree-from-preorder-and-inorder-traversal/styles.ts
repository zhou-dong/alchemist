import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import Position from '../../../data-structures/_commons/params/position';
import { build } from '../../../data-structures/tree/nodes/v1/tree-node-builder';

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: "yellow", opacity: 0.6, transparent: true });
}

const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };

export const yDistance = -2.5;
export const xCenter = -5;

export const lineMaterial = new THREE.LineBasicMaterial({ color: "gold" });

export const buildTreeNode = (value: number, scene: THREE.Scene, center: Position) => {
    return build<number>(
        0,
        sphereGeometry,
        sphereMaterial(),
        textMaterial,
        textGeometryParameters,
        value,
        scene,
        center
    );
}
