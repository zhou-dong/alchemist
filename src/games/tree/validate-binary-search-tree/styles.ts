import * as THREE from 'three';
import { TextGeometry, TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';

export const errorSphereColor = "red";
export const enabledSphereColor = "lightgreen";
export const normalSphereColor = "yellow";

export const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
export const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: normalSphereColor, opacity: 0.4, transparent: true });
}
export const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
export const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
export const lineMaterial = new THREE.LineBasicMaterial({ color: "gold" });

export const center = { x: 0, y: 10, z: 0 };
export const yDistance = 3;
export const duration = 0;
export const xAxisAplha = 2;

const getText = (value: number): string => {
    switch (value) {
        case -Infinity: return "min"
        case Infinity: return "max";
        default: return value + "";
    }
}

export const lowerUpperTextMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "orange" });
export const lowerUpperTextGeometryParameters: TextGeometryParameters = { font, size: 0.5, height: 0.1 };
export const buildThreeText = (value: number, x: number, y: number, z: number): THREE.Mesh => {
    const text = getText(value);
    const textGeometry = new TextGeometry(text, lowerUpperTextGeometryParameters);
    const mesh = new THREE.Mesh(textGeometry, lowerUpperTextMaterial);
    mesh.position.set(x, y, z);
    return mesh;
}
