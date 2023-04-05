import * as THREE from 'three';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { wait } from '../../../data-structures/_commons/utils';
import TreeNode from '../../../data-structures/tree/nodes/v1/node';
import { enabledSphereColor, normalSphereColor, buildThreeText, errorSphereColor } from "./styles";

const updateTreeColor = (errorNodes: TreeNode<number>[], node?: TreeNode<any>, targetNode?: TreeNode<any>, isBalanced?: boolean) => {
    if (node === undefined || targetNode === undefined) {
        return;
    }

    if (!errorNodes.includes(node)) {
        if (node === targetNode) {
            if (isBalanced === false) {
                node.sphereColor = errorSphereColor;
            } else {
                node.sphereColor = enabledSphereColor;
            }
        } else {
            node.sphereColor = normalSphereColor;
        }
    }

    updateTreeColor(errorNodes, node.left, targetNode, isBalanced);
    updateTreeColor(errorNodes, node.right, targetNode, isBalanced);
}

let lowerText: THREE.Mesh | undefined = undefined;
let upperText: THREE.Mesh | undefined = undefined;

const Next = () => {
    const { setIndex, index, steps, scene, animate, cancelAnimate, state, setState, errorNodes, setErrorNodes } = useAlgoContext();

    const handleOnClick = async () => {
        if (state !== State.Playing) {
            return;
        }
        const step = steps[index];
        if (!step) {
            return;
        }

        setState(State.Computing);

        animate();

        if (lowerText) {
            scene.remove(lowerText);
        }
        if (upperText) {
            scene.remove(upperText);
        }

        const { node, lower, upper, isBalanced } = step;
        const { x, y, z } = node.val.center;

        lowerText = buildThreeText(lower, x - 1.2, y + 0.5, z);
        upperText = buildThreeText(upper, x + 0.7, y + 0.5, z);

        scene.add(lowerText);
        scene.add(upperText);

        updateTreeColor(errorNodes, steps[0].node, node, isBalanced);

        if (isBalanced === false) {
            setErrorNodes(nodes => {
                nodes.push(node)
                return nodes;
            });
        }

        await wait(0.1);

        cancelAnimate();

        if (index >= steps.length - 1) {
            setState(State.Finished)
        } else {
            setIndex(i => i + 1);
            setState(State.Playing);
        }
    }

    return (
        < Button onClick={handleOnClick} variant="contained" disabled={state !== State.Playing} size="large" sx={{ color: "#FFF" }}>
            Next
        </Button>
    )
}

const Main = () => (
    <div style={{
        display: "flex",
        position: "fixed",
        bottom: "200px",
        justifyContent: "center",
        left: "50%",
        transform: "translate(-50%)"
    }}
    >
        <Next />
    </div>
);

export default Main;
