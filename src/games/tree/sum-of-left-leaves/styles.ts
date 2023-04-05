import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import { buildBinaryTree } from "../../../data-structures/tree/nodes/v1/binary-tree-builder";

export const leftLeafColor = "orange";
export const enabledSphereColor = "lightblue";
export const normalSphereColor = "yellow";

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: normalSphereColor, opacity: 0.4, transparent: true });
}
const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
const lineMaterial = new THREE.LineBasicMaterial({ color: "gold" });

export const buildTree = (array: (number | null)[], scene: THREE.Scene) => {
    const center = { x: 0, y: 8, z: 0 };
    const show = true;
    const duration = 0;
    const yDistance = 3;
    const xAxisAlpha = 2; // expend the tree size in xAxis.

    return buildBinaryTree<number>(
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

const indexTextMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "orange" });
const indexUpperTextGeometryParameters: TextGeometryParameters = { font, size: 0.5, height: 0.1 };
export const buildThreeText = (text: string, x: number, y: number, z: number): THREE.Mesh => {
    const textGeometry = new TextGeometry(text, indexUpperTextGeometryParameters);
    const mesh = new THREE.Mesh(textGeometry, indexTextMaterial);
    mesh.position.set(x, y, z);
    return mesh;
}
