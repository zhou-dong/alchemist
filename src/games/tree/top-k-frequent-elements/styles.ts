import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import MinHeap from '../../../data-structures/tree/heap/min-heap';
import { Props, TreeNodeProps } from '../../../data-structures/tree/heap/props';
import { HeapItem } from './AlgoContext';

const lineColor = "gold";
const normalSphereColor = "yellow";
const cubeColor = "yellow";
const enabledColor = "orange";

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial = (): THREE.Material => {
    return new THREE.MeshBasicMaterial({ color: normalSphereColor, opacity: 0.4, transparent: true });
}
const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor });

export const buildTree = (array: (number)[], scene: THREE.Scene, k: number): MinHeap<HeapItem> => {

    const cubeMaterial = () => new THREE.MeshBasicMaterial({ color: cubeColor, opacity: 0.5, transparent: true });
    const cubeWidth = 2;
    const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(cubeWidth, 2, 2);
    const arrayX = 0 + (k / 2) * cubeWidth;
    const treeInitDepth = Math.floor(Math.log2(k)) + 1;

    const arrayNodeProps = {
        textMaterial,
        textGeometryParameters,
        cubeMaterial,
        cubeGeometry,
        initPosition: { x: 15, y: 11, z: 0 },
    };

    const treeNodeProps: TreeNodeProps = {
        sphereGeometry,
        sphereMaterial,
        textMaterial,
        textGeometryParameters,
        enabledTreeNodeColor: enabledColor,
        initPosition: { x: 15, y: 11, z: 0 },
    }

    const treeLineProps = {
        material: lineMaterial
    }

    const props: Props = {
        arrayPosition: { x: arrayX + 5, y: 9, z: 0 },
        arrayNodeProps,
        treePosition: { x: 0 + 5, y: -Math.log2(k), z: 0 },
        treeNodeProps,
        treeLineProps,
        treeNodeDistance: { x: 2.5, y: 2.5 },
        treeInitDepth,
        scene,
        duration: 1
    }

    return new MinHeap(props);
}
