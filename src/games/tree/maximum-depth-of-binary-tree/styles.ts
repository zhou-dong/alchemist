import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';

export const enabledSphereColor = "lightgreen";
export const normalSphereColor = "yellow";

export const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
export const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: normalSphereColor, opacity: 0.4, transparent: true });
}
export const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
export const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
export const lineMaterial = new THREE.LineBasicMaterial({ color: "gold" });

export const center = { x: 0, y: 11, z: 0 };
export const depthTreeCenter = { x: 0, y: 0, z: 0 };
export const yDistance = 3;
export const duration = 0;
export const xAxisAplha = 2;
