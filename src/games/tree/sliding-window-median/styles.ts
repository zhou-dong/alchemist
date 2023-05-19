import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import MaxHeap from '../../../data-structures/tree/heap/max-heap';
import MinHeap from '../../../data-structures/tree/heap/min-heap';
import { Props, TreeNodeProps } from '../../../data-structures/tree/heap/props';
import Position from '../../../data-structures/_commons/params/position.interface';

const cubeWidth = 2;
const enabledColor = "gold";
const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(cubeWidth, 1.5, 1.5);

interface HeapPosition {
    arrayPosition: Position;
    treePosition: Position;
}

const buildHeapProps = (
    initPosition: HeapPosition,
    heapPosition: HeapPosition,
    sphereMaterial: () => THREE.Material,
    cubeMaterial: () => THREE.Material,
    textMaterial: THREE.Material,
    lineMaterial: THREE.LineBasicMaterial,
    scene: THREE.Scene
): Props => {

    const treeInitDepth = 3;
    const treeNodeDistance = { x: 2, y: 2.5 };

    const arrayNodeProps = {
        textMaterial,
        textGeometryParameters,
        cubeMaterial,
        cubeGeometry,
        initPosition: initPosition.arrayPosition,
    };

    const treeNodeProps: TreeNodeProps = {
        sphereGeometry,
        sphereMaterial,
        textMaterial,
        textGeometryParameters,
        enabledTreeNodeColor: enabledColor,
        initPosition: initPosition.treePosition,
    }

    const treeLineProps = {
        material: lineMaterial
    }

    const props: Props = {
        arrayPosition: heapPosition.arrayPosition,
        arrayNodeProps,
        treePosition: heapPosition.treePosition,
        treeNodeProps,
        treeLineProps,
        treeNodeDistance,
        treeInitDepth,
        scene,
        duration: 1
    }

    return props;
}

export const smallerHeapColor = "orange";
export const greaterHeapColor = "green";

const calArrayX = (len: number, cubeWidth: number) => {
    return len * cubeWidth / 2 - cubeWidth / 2;
}

export const buildSmaller = (scene: THREE.Scene): MaxHeap<number> => {
    return new MaxHeap(buildHeapProps(
        { arrayPosition: { x: 0, y: 0, z: 0 }, treePosition: { x: 0, y: 0, z: 0 } },
        { arrayPosition: { x: -7 + calArrayX(3, cubeWidth), y: 6, z: 0 }, treePosition: { x: -7, y: -5, z: 0 } },
        () => new THREE.MeshBasicMaterial({ color: smallerHeapColor, opacity: 0.6, transparent: true }),
        () => new THREE.MeshBasicMaterial({ color: smallerHeapColor, opacity: 0.5, transparent: true }),
        new THREE.MeshBasicMaterial({ color: "#000" }),
        new THREE.LineBasicMaterial({ color: smallerHeapColor }),
        scene
    ));
}

export const buildGreater = (scene: THREE.Scene): MinHeap<number> => {
    return new MinHeap(buildHeapProps(
        { arrayPosition: { x: 0, y: 0, z: 0 }, treePosition: { x: 0, y: 0, z: 0 } },
        { arrayPosition: { x: 6 + calArrayX(3, cubeWidth), y: 6, z: 0 }, treePosition: { x: 6, y: -5, z: 0 } },
        () => new THREE.MeshBasicMaterial({ color: greaterHeapColor, opacity: 0.6, transparent: true }),
        () => new THREE.MeshBasicMaterial({ color: greaterHeapColor, opacity: 0.5, transparent: true }),
        new THREE.MeshBasicMaterial({ color: "#000" }),
        new THREE.LineBasicMaterial({ color: greaterHeapColor }),
        scene
    ));
}
