import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import TreeNode from "../../../data-structures/tree/node";
import TextSphere from '../../../data-structures/_commons/sphere/three/text-sphere';
import Position from '../../../data-structures/_commons/params/position';

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
    const textSphere = new TextSphere<number>(
        value,
        sphereGeometry,
        sphereMaterial(),
        textMaterial,
        textGeometryParameters,
        scene
    );

    const { x, y, z } = center;
    textSphere.center.x = x;
    textSphere.center.y = y;
    textSphere.center.z = z;

    switch (value.toString().length) {
        case 1:
            textSphere.textPosition.x = x - 0.3;
            break;
        case 2:
            textSphere.textPosition.x = x - 0.6;
            break;
        default:
            textSphere.textPosition.x = x;
            break;
    }
    textSphere.textPosition.y = y - 0.4;
    textSphere.textPosition.z = z;
    return new TreeNode<number>(textSphere);
}
