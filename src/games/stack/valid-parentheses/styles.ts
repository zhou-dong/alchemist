import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { NodeSize, ShellParams } from '../../../data-structures/_commons/three/collectionParams';
import { font } from '../../../commons/three';

export const nodeSize: NodeSize = {
    width: 1, height: 1, depth: 1
}

const nodeTextGeometryParameters: TextGeometryParameters = { font, size: 0.6, height: 0.1 };

export const nodeParams = {
    textMaterial: new THREE.MeshBasicMaterial({ color: "black" }),
    textGeometryParameters: nodeTextGeometryParameters,
    cubeMaterial: new THREE.MeshBasicMaterial({ color: "green", opacity: 0.6, transparent: true }),
    cubeGeometry: new THREE.BoxGeometry(nodeSize.width, nodeSize.height, nodeSize.depth),
    initPosition: new THREE.Vector3(-10, 2, -4),
};

const shellSize = 6;

export const queueShellParams: ShellParams = {
    material: new THREE.MeshBasicMaterial({ color: "gold", opacity: 0.2, transparent: true }),
    position: new THREE.Vector3(4, 2, -4),
    size: shellSize,
};

export const stackShellParams: ShellParams = {
    material: new THREE.MeshBasicMaterial({ color: "gold", opacity: 0.2, transparent: true }),
    position: new THREE.Vector3(4, -1, -4),
    size: shellSize,
};
