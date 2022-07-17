import * as THREE from 'three';
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";

const nodeAdjust = new THREE.Vector3(0.22, 0.2, 0);
const width = 1;
const height = 1;
const depth = 1;

export const buildStackNodeParams = (font: Font) => {
    const nodeTextGeometryParameters: TextGeometryParameters = { font, size: 0.6, height: 0.1 };
    return {
        width, height, depth,
        material: new THREE.MeshBasicMaterial({ color: "green", opacity: 0.5, transparent: true }),
        textMaterial: new THREE.MeshBasicMaterial({ color: "black" }),
        textGeometryParameters: nodeTextGeometryParameters,
        initPosition: new THREE.Vector3(-10, -1, -4),
        textAdjust: nodeAdjust,
    }
};

export const buildStackShellParams = (size: number) => {
    return {
        material: new THREE.MeshBasicMaterial({ color: "green", opacity: 0.3, transparent: true }),
        position: new THREE.Vector3(0, -1, -4),
        size,
    }
};

export const buildQueueNodeParams = (font: Font) => {
    const nodeTextGeometryParameters: TextGeometryParameters = { font, size: 0.6, height: 0.1 };
    return {
        width, height, depth,
        material: new THREE.MeshBasicMaterial({ color: "purple", opacity: 0.5, transparent: true }),
        textMaterial: new THREE.MeshBasicMaterial({ color: "red" }),
        textGeometryParameters: nodeTextGeometryParameters,
        initPosition: new THREE.Vector3(-10, 2, -4),
        textAdjust: nodeAdjust,
    }
};

export const buildQueueShellParams = (size: number) => {
    return {
        material: new THREE.MeshBasicMaterial({ color: "purple", opacity: 0.3, transparent: true }),
        position: new THREE.Vector3(0, 2, -4),
        size,
    }
};
