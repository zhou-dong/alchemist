import * as THREE from 'three';
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import TreeNode from "../../../data-structures/tree/node";
import { font } from '../../../commons/three';
import { useAlgoContext } from "./AlgoContext";
import TextSphere from '../../../data-structures/_commons/sphere/three/text-sphere';
import { Direction } from './algo';
import Position from '../../../data-structures/_commons/position';

const duration = 1;

const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphereMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "yellow", opacity: 0.6, transparent: true });
const textMaterial: THREE.Material = new THREE.MeshBasicMaterial({ color: "green" });
const textGeometryParameters: TextGeometryParameters = { font, size: 1, height: 0.1 };
const lineMaterial = new THREE.LineBasicMaterial({ color: "gold" });

const rootColor = "success";
const leftColor = "warning";
const rightColor = "info";
const defaultColor = "inherit";

const startPosition: THREE.Vector3 = new THREE.Vector3(10, 0, 1);

const buildTreeNode = (value: number, scene: THREE.Scene) => {
    const textSphere = new TextSphere<number>(
        value,
        sphereGeometry,
        sphereMaterial,
        textMaterial,
        textGeometryParameters,
        scene
    );

    const { x, y, z } = startPosition;
    textSphere.center.x = x;
    textSphere.center.y = y;
    textSphere.center.z = z;

    switch (value.toString().length) {
        case 1:
            textSphere.textPosition.x = x - 1 / 2;
            break;
        case 2:
            textSphere.textPosition.x = x - 3 / 4;
            break;
        default:
            textSphere.textPosition.x = x;
            break;
    }
    textSphere.textPosition.y = y - 1 / 2;
    textSphere.textPosition.z = z;
    return new TreeNode<number>(textSphere);
}

const PreorderDisplay = () => {
    const { inputOutput, index } = useAlgoContext();
    const { preorder, steps } = inputOutput;

    const step = steps[index];
    const preorderLeft = step ? step.preorderLeft : -1;
    const preorderRight = step ? step.preorderRight : -1;
    const leftTreeLength = step ? step.leftTreeLength : 0;

    const getColor = (i: number) => {
        if (i === preorderLeft) {
            return rootColor;
        }
        if (i > preorderLeft && i <= preorderLeft + leftTreeLength) {
            return leftColor;
        }
        if (i > preorderLeft + leftTreeLength && i <= preorderRight) {
            return rightColor;
        }
        return defaultColor;
    }

    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
            {preorder.length > 0 && <Typography sx={{ width: "65px" }}>Preorder</Typography>}
            <ButtonGroup>
                {
                    preorder.map((value, i) => <Button
                        key={i}
                        sx={{ width: "50px", height: "50px" }}
                        color={getColor(i)}
                        variant="contained"
                    >
                        {value}
                    </Button>)
                }
            </ButtonGroup>
        </Stack>
    )
}

const InorderDisplay = () => {
    const { inputOutput, index } = useAlgoContext();
    const { inorder, steps } = inputOutput;

    const step = steps[index];
    const inorderLeft = step ? step.inorderLeft : -1;
    const inorderRight = step ? step.inorderRight : -1;
    const inorderRootIndex = step ? step.inorderRootIndex : -1;

    const getColor = (i: number) => {
        if (i === inorderRootIndex) {
            return rootColor;
        }
        if (i >= inorderLeft && i < inorderRootIndex) {
            return leftColor;
        }
        if (i > inorderRootIndex && i <= inorderRight) {
            return rightColor;
        }
        return defaultColor;
    }

    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
            {inorder.length > 0 && <Typography sx={{ width: "65px" }}>Inorder</Typography>}
            <ButtonGroup>
                {
                    inorder.map((value, i) => <Button
                        key={i}
                        sx={{ width: "50px", height: "50px" }}
                        color={getColor(i)}
                        variant="contained"
                    >
                        {value}
                    </Button>)
                }
            </ButtonGroup>
        </Stack>
    )
}

const map: Map<number, TreeNode<number>> = new Map();

const Next = () => {
    const { setIndex, index, inputOutput, scene, animate, cancelAnimate } = useAlgoContext();

    const handleOnClick = async () => {
        const step = inputOutput.steps[index];
        if (!step) {
            return;
        }
        const { node, parent, direction } = step;
        const treeNode = buildTreeNode(node.val, scene);

        map.set(node.val, treeNode);

        animate();
        treeNode.show();

        if (parent && map.has(parent.val) && direction !== undefined) {
            const { x, y, z } = map.get(parent.val)!.val!.center;
            const parentNode = map.get(parent.val)!;
            if (direction === Direction.Left) {
                const position: Position = { x: x - 3, y: y - 3, z };
                await parentNode.setLeft(treeNode, position, lineMaterial, duration, scene);
            } else {
                const position: Position = { x: x + 3, y: y - 3, z };
                await parentNode.setRight(treeNode, position, lineMaterial, duration, scene);
            }
        } else {
            await treeNode.val.move({ x: 0, y: 8, z: 0 }, 1);
        }

        cancelAnimate();
        setIndex(i => i + 1);
    }

    return (
        <Button onClick={handleOnClick} variant="contained">
            Next
        </Button>
    )
}

const Main = () => {

    return (
        <Stack direction="column" style={{ display: "flex", alignItems: "flex-end", width: "95%", position: "fixed", top: "100px" }} spacing={2}>
            <PreorderDisplay />
            <InorderDisplay />
            <Next />
        </Stack>
    )
}

export default Main;
