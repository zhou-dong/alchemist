import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import TreeNode from "./node";
import TextSphere from '../_commons/sphere/three/text-sphere';
import Position from '../_commons/params/position';

export const build = <T>(
    sphereGeometry: THREE.SphereGeometry,
    sphereMaterial: THREE.Material,
    textMaterial: THREE.Material,
    textGeometryParameters: TextGeometryParameters,
    value: T,
    scene: THREE.Scene,
    center: Position
) => {
    const textSphere = new TextSphere<T>(
        value,
        sphereGeometry,
        sphereMaterial,
        textMaterial,
        textGeometryParameters,
        scene
    );

    const { x, y, z } = center;
    textSphere.center.x = x;
    textSphere.center.y = y;
    textSphere.center.z = z;

    switch ((value as any).toString().length) {
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
    return new TreeNode<T>(textSphere);
}
