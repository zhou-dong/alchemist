import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import Position from '../../../data-structures/_commons/params/position';
import { buildBinaryTree } from "../../../data-structures/tree/binaryTreeBuilder";

export const falseSphereColor = "red";
export const enabledSphereColor = "lightgreen";
export const normalSphereColor = "yellow";

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: normalSphereColor, opacity: 0.4, transparent: true });
}
const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
const lineMaterial = new THREE.LineBasicMaterial({ color: "gold" });

export const buildPTree = (array: (string | null)[], scene: THREE.Scene) => {
    const center = { x: -10, y: 8, z: 0 };
    return buildTree(array, scene, center);
}

export const buildQTree = (array: (string | null)[], scene: THREE.Scene) => {
    const center = { x: 10, y: 9, z: 0 };
    return buildTree(array, scene, center);
}

const buildTree = (array: (string | null)[], scene: THREE.Scene, center: Position) => {
    const show = true;
    const duration = 0;
    const yDistance = 3;
    const xAxisAlpha = 2; // expend the tree size in xAxis.

    return buildBinaryTree<string>(
        sphereGeometry,
        sphereMaterial,
        textMaterial,
        textGeometryParameters,
        lineMaterial,
        scene,
        duration,
        center,
        yDistance,
        xAxisAlpha,
        array,
        show
    );
}
