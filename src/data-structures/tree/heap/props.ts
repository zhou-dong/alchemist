import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import Position from "../../_commons/params/position.interface"

export type Distance = {
    x: number;
    y: number;
}

export type ArrayNodeProps = {
    textMaterial: THREE.Material;
    textGeometryParameters: TextGeometryParameters;
    cubeMaterial: () => THREE.Material;
    cubeGeometry: THREE.BoxGeometry;
    initPosition: Position;
}

export type TreeNodeProps = {
    enabledTreeNodeColor: string;
    sphereGeometry: THREE.SphereGeometry;
    sphereMaterial: () => THREE.Material;
    textMaterial: THREE.Material;
    textGeometryParameters: TextGeometryParameters;
    initPosition: Position;
}

export type TreeLineProps = {
    material: THREE.LineBasicMaterial;
}

export type Props = {
    arrayPosition: Position;
    arrayNodeProps: ArrayNodeProps;
    treePosition: Position;
    treeNodeProps: TreeNodeProps;
    treeLineProps: TreeLineProps;
    treeNodeDistance: Distance;
    treeInitDepth: number;
    scene: THREE.Scene,
    duration?: number;
}
