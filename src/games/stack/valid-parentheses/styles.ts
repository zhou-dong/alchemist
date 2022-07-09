import * as THREE from 'three';
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";

const nodeAdjust = new THREE.Vector3(0.22, 0.2, 0);

export const buildStackNodeParams = (font: Font) => {
    const nodeTextGeometryParameters: TextGeometryParameters = { font, size: 0.6, height: 0.1 };
    return {
        width: 1,
        height: 1,
        depth: 1,
        material: new THREE.MeshBasicMaterial({ color: "green", opacity: 0.5, transparent: true }),
        textMaterial: new THREE.MeshBasicMaterial({ color: "black" }),
        textGeometryParameters: nodeTextGeometryParameters,
        initPosition: new THREE.Vector3(-10, 1, 0),
        textAdjust: nodeAdjust,
    }
};

export const stackShellParams = {
    material: new THREE.MeshBasicMaterial({ color: "green", opacity: 0.3, transparent: true }),
    position: new THREE.Vector3(11, 1, 0),
    size: 14,
};

export const buildQueueNodeParams = (font: Font) => {
    const nodeTextGeometryParameters: TextGeometryParameters = { font, size: 0.6, height: 0.1 };
    return {
        width: 1,
        height: 1,
        depth: 1,
        material: new THREE.MeshBasicMaterial({ color: "green", opacity: 0.5, transparent: true }),
        textMaterial: new THREE.MeshBasicMaterial({ color: "black" }),
        textGeometryParameters: nodeTextGeometryParameters,
        initPosition: new THREE.Vector3(-10, 1, 0),
        textAdjust: nodeAdjust,
    }
};

export const queueShellParams = {
    material: new THREE.MeshBasicMaterial({ color: "green", opacity: 0.3, transparent: true }),
    position: new THREE.Vector3(11, 1, 0),
    size: 14,
};
