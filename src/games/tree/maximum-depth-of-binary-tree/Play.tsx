import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { useAlgoContext } from "./AlgoContext";
import TreeNode from "../../../data-structures/tree/node";
import TextSphere from "../../../data-structures/_commons/sphere/three/text-sphere";
import { font } from '../../../commons/three';
import { Button } from '@mui/material';
import React from 'react';


const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: 0xffff00, opacity: 0.5, transparent: true });
const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "gold" });
const textGeometryParameters: TextGeometryParameters = { font, size: 1, height: 1 };
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });

const buildNode = (value: number, scene: THREE.Scene, x: number, y: number, z: number) => {
    const node = new TextSphere<number>(
        value,
        sphereGeometry,
        sphereMaterial,
        textMaterial,
        textGeometryParameters,
        scene
    );

    node.center.x = 0;
    node.center.y = 0;
    node.center.z = 0;

    node.show();
    return node;
}

const Main = () => {

    const [value, setValue] = React.useState(0);

    const { scene, animate, cancelAnimate } = useAlgoContext();

    animate();
    const node = buildNode(value, scene, 0, 0, 0);
    node.show();
    const root = new TreeNode<number>(node);

    cancelAnimate();

    const handleClick = async () => {
        setValue(v => v + 1);

        animate();
        const newNode = buildNode(value, scene, 1, 1, 1);
        newNode.show();
        const newN = new TreeNode<number>(newNode);
        await root.setLeft(newN, { x: -6, y: -2, z: 2 }, lineMaterial, 1, scene);

        cancelAnimate();
    }

    return (
        <>
            <Button onClick={handleClick}>
                Add
            </Button>
        </>
    );
}

export default Main;
