import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import { Props, TreeNodeProps } from '../../../data-structures/tree/heap/props';
import MaxHeap from '../../../data-structures/tree/heap/max-heap';

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

export const buildHeap = (scene: THREE.Scene, k: number): MaxHeap<number> => {

    const cubeMaterial = () => new THREE.MeshBasicMaterial({ color: cubeColor, opacity: 0.5, transparent: true });
    const cubeWidth = 2;
    const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(cubeWidth, 2, 2);
    const arrayX = (3 / 2) * cubeWidth - cubeWidth / 2;
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

    return new MaxHeap(props);
}
