import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { font } from '../../../commons/three';
import { Props, TreeNodeProps } from '../../../data-structures/tree/heap/props';
import Position from '../../../data-structures/_commons/params/position.interface';

const lineColor = "gold";
const normalSphereColor = "yellow";
const cubeColor = "yellow";
const enabledColor = "orange";

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial = () => new THREE.MeshBasicMaterial({ color: normalSphereColor, opacity: 0.4, transparent: true });
const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
const textGeometryParameters: TextGeometryParameters = { font, size: 0.8, height: 0.1 };
const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor });
const cubeMaterial = () => new THREE.MeshBasicMaterial({ color: cubeColor, opacity: 0.5, transparent: true });
const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(2, 2, 2);

interface HeapPosition {
    arrayPosition: Position;
    treePosition: Position;
}

export const buildHeapProps = (initPosition: HeapPosition, heapPosition: HeapPosition, scene: THREE.Scene): Props => {

    const treeInitDepth = 4;
    const treeNodeDistance = { x: 2.5, y: 2.5 };

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
