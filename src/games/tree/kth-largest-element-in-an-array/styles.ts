import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import MaxHeap from '../../../data-structures/tree/heap/max-heap';
import { Props, TreeNodeProps } from '../../../data-structures/tree/heap/props';

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

export const buildTree = async (array: (number)[], scene: THREE.Scene): Promise<MaxHeap<number>> => {

    const cubeMaterial = () => new THREE.MeshBasicMaterial({ color: cubeColor, opacity: 0.5, transparent: true });
    const cubeWidth = 2;
    const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(cubeWidth, 2, 2);
    const arrayX = 0 + (array.length / 2) * cubeWidth;

    const arrayNodeProps = {
        textMaterial,
        textGeometryParameters,
        cubeMaterial,
        cubeGeometry,
        initPosition: { x: 0, y: 0, z: 0 },
    };

    const treeNodeProps: TreeNodeProps = {
        sphereGeometry,
        sphereMaterial,
        textMaterial,
        textGeometryParameters,
        enabledTreeNodeColor: enabledColor,
        initPosition: { x: 0, y: 0, z: 0 },
    }

    const treeLineProps = {
        material: lineMaterial
    }

    const props: Props = {
        arrayPosition: { x: arrayX, y: 9, z: 0 },
        arrayNodeProps,
        treePosition: { x: 0, y: -7, z: 0 },
        treeNodeProps,
        treeLineProps,
        treeNodeDistance: { x: 3, y: 3 },
        treeInitDepth: 4,
        scene,
        duration: 0
    }

    const maxHeap: MaxHeap<number> = new MaxHeap(props);
    await maxHeap.buildHeap(array);
    maxHeap.props.duration = 1;
    return Promise.resolve(maxHeap);
}
