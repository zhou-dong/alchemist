import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import { buildBinaryTree } from "../../../data-structures/tree/binaryTreeBuilder";

export enum SolutionType {
    BFS, DFS
}

export const enabledSphereColor = "lightgreen";
export const normalSphereColor = "yellow";

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: normalSphereColor, opacity: 0.4, transparent: true });
}
const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
const lineMaterial = new THREE.LineBasicMaterial({ color: "gold" });

export const duration = 0.5;

export const buildTree = (array: (string | null)[], scene: THREE.Scene) => {
    const center = { x: 0, y: 5, z: 0 };
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

const indexTextMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "orange" });
const indexUpperTextGeometryParameters: TextGeometryParameters = { font, size: 0.5, height: 0.1 };
export const buildThreeText = (text: string, x: number, y: number, z: number): THREE.Mesh => {
    const textGeometry = new TextGeometry(text, indexUpperTextGeometryParameters);
    const mesh = new THREE.Mesh(textGeometry, indexTextMaterial);
    mesh.position.set(x, y, z);
    return mesh;
}

export const minShellSize = 5;

export const text = { size: 0.5, height: 0.1 };

export const nodeSize = { width: 1, height: 1, depth: 1 };

export const shellMterial = new THREE.MeshBasicMaterial({ color: "lightgrey", opacity: 0.3, transparent: true });

export const queueNamePosition = new THREE.Vector3(-2.5, 2.9, 10);
export const queuePosition = new THREE.Vector3(-2, 4, 10);

export const queueNameStyles = {
    color: "lightgreen",
    size: 0.4,
    height: 0.1
};

const colors = ["gold", "orange", "pink", "purple", "red"];
export const getNodeColor = (level: number) => {
    const colorIndex = level % colors.length;
    return colors[colorIndex];
}
