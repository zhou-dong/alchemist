import * as THREE from "three";
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";

export interface ArrowStyles {
    color: THREE.Color | string | number;
    headLength: number;
    headWidth: number;
}

export interface NodeStyles {
    width: number;
    height: number;
    color: THREE.Color | string | number;
    textGeometryParameters: TextGeometryParameters;
    textColor: THREE.Color | string | number;
}
