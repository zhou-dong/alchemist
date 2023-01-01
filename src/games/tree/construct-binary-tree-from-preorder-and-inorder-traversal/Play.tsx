import * as THREE from 'three';
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { Direction, updateTreeColor } from './algo';
import Position from '../../../data-structures/_commons/params/position';
import { State } from './AlgoState';
import { buildTreeNode, lineMaterial, yDistance, xCenter } from "./styles";
import { wait } from '../../../data-structures/_commons/utils';

const duration = 1;

const defaultStyle = { width: "50px", height: "50px", backgroundColor: "lightgray", color: "black" };
const rootStyle = { ...defaultStyle, backgroundColor: "lightgreen", color: "black" };
const leftStyle = { ...defaultStyle, backgroundColor: "yellow", color: "black" };
const rightStyle = { ...defaultStyle, backgroundColor: "lightblue", color: "black" };

const startPosition: THREE.Vector3 = new THREE.Vector3(10, -10, 0);

const PreorderDisplay = () => {
    const { inputOutput, index } = useAlgoContext();
    const { preorder, steps } = inputOutput;

    const step = steps[index];
    const preorderLeft = step ? step.preorderLeft : -1;
    const preorderRight = step ? step.preorderRight : -1;
    const leftTreeLength = step ? step.leftTreeLength : 0;

    const getStyle = (i: number) => {
        if (i === preorderLeft) {
            return rootStyle;
        }
        if (i > preorderLeft && i <= preorderLeft + leftTreeLength) {
            return leftStyle;
        }
        if (i > preorderLeft + leftTreeLength && i <= preorderRight) {
            return rightStyle;
        }
        return defaultStyle;
    }

    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
            {preorder.length > 0 && <Typography sx={{ width: "65px" }}>Preorder</Typography>}
            <ButtonGroup>
                {
                    preorder.map((value, i) => <Button
                        key={i}
                        sx={getStyle(i)}
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

    const getStyle = (i: number) => {
        if (i === inorderRootIndex) {
            return rootStyle;
        }
        if (i >= inorderLeft && i < inorderRootIndex) {
            return leftStyle;
        }
        if (i > inorderRootIndex && i <= inorderRight) {
            return rightStyle;
        }
        return defaultStyle;
    }

    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
            {inorder.length > 0 && <Typography sx={{ width: "65px" }}>Inorder</Typography>}
            <ButtonGroup>
                {
                    inorder.map((value, i) => <Button
                        key={i}
                        sx={getStyle(i)}
                        variant="contained"
                    >
                        {value}
                    </Button>)
                }
            </ButtonGroup>
        </Stack>
    )
}

const Next = () => {
    const { setIndex, index, inputOutput, scene, animate, cancelAnimate, state, setState, map } = useAlgoContext();
    const { xAxis, tree } = inputOutput;
    const alpha = (xAxis.length === 0) ? xCenter : xCenter - xAxis[0];

    const handleOnClick = async () => {
        if (state !== State.Playing) {
            return;
        }
        const step = inputOutput.steps[index];
        if (!step) {
            return;
        }
        setState(State.Computing);

        const { node, parent, direction } = step;
        const treeNode = buildTreeNode(node.val.value, scene, startPosition);
        map.set(node.val.value, treeNode);

        animate();
        treeNode.show();

        if (parent && map.has(parent.val.value) && direction !== undefined) {
            const { y, z } = map.get(parent.val.value)!.val!.center;
            const parentNode = map.get(parent.val.value)!;
            if (direction === Direction.Left) {
                const x = xAxis[parentNode.leftChildIndex] + alpha;
                const position: Position = { x: x, y: y + yDistance, z };
                await parentNode.setLeft(treeNode, position, lineMaterial, duration, scene);
            } else {
                const x = xAxis[parentNode.rightChildIndex] + alpha;
                const position: Position = { x: x, y: y + yDistance, z };
                await parentNode.setRight(treeNode, position, lineMaterial, duration, scene);
            }
        } else {
            const x = xAxis[0] + alpha;
            await treeNode.val.move({ x, y: 0, z: 0 }, duration);
        }

        updateTreeColor(tree, inputOutput.steps[index + 1]);
        await wait(0.1);

        cancelAnimate();

        if (index >= inputOutput.steps.length - 1) {
            setState(State.Finished)
        } else {
            setIndex(i => i + 1);
            setState(State.Playing);
        }
    }

    return (
        <Button onClick={handleOnClick} variant="contained" disabled={state !== State.Playing} size="large">
            Next
        </Button>
    )
}

const Main = () => {
    return (
        <Stack direction="column" style={{ display: "flex", position: "fixed", top: "350px", right: "100px" }} spacing={2}>
            <PreorderDisplay />
            <InorderDisplay />
            <Next />
        </Stack>
    )
}

export default Main;
