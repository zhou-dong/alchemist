import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import MaxHeap from '../../../data-structures/tree/heap/max-heap';
import { TreeNodeProps } from '../../../data-structures/tree/nodes/v2/builder';

const lineColor = "gold";
const normalSphereColor = "yellow";

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: normalSphereColor, opacity: 0.4, transparent: true });
}
const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor });

export const buildTree = async (array: (number)[], scene: THREE.Scene): Promise<MaxHeap<number>> => {

    const treeNodeProps: TreeNodeProps = {
        sphereGeometry,
        sphereMaterial,
        textMaterial,
        textGeometryParameters
    }

    const heapEnabledNodeColor = "orange";
    const heapDepth = 4;
    const position = { x: 0, y: -6, z: 0 };
    const xDistance = 3;
    const yDistance = 3;

    const maxHeap: MaxHeap<number> = new MaxHeap(
        treeNodeProps,
        lineMaterial,
        heapEnabledNodeColor,
        heapDepth,
        position,
        xDistance,
        yDistance,
        scene
    );

    await maxHeap.buildHeap(array, 0);
    return Promise.resolve(maxHeap);
}
