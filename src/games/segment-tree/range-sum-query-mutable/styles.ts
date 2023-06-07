import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';

export const lineColor = "gold";
export const normalSphereColor = "yellow";
export const enabledSphereColor = "orange";

export const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
export const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: normalSphereColor, opacity: 0.4, transparent: true });
}
export const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
export const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
export const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor });
