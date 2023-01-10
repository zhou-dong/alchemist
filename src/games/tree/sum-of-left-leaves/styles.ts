import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import { buildBinaryTree } from "../../../data-structures/tree/binaryTreeBuilder";

const lineColor = "gold";
export const arrowColor = "green";
export const arrowHeadLength = 0.5;
export const arrowHeadWidth = 0.3;
export const enabledSphereColor = "lightblue";
export const normalSphereColor = "yellow";

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: normalSphereColor, opacity: 0.4, transparent: true });
}
const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor });

export const buildTree = (array: (string | null)[], scene: THREE.Scene) => {
    const center = { x: 0, y: 7, z: 0 };
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

const getText = (value: number): string => {
    switch (value) {
        case -Infinity: return "min"
        case Infinity: return "max";
        default: return value + "";
    }
}

const indexTextMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "orange" });
const indexUpperTextGeometryParameters: TextGeometryParameters = { font, size: 0.5, height: 0.1 };
export const buildThreeText = (value: number, x: number, y: number, z: number): THREE.Mesh => {
    const text = getText(value);
    const textGeometry = new TextGeometry(text, indexUpperTextGeometryParameters);
    const mesh = new THREE.Mesh(textGeometry, indexTextMaterial);
    mesh.position.set(x, y, z);
    return mesh;
}
