import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup } from '@mui/material';
import { normalSphereColor, enabledSphereColor, } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/nodes/v1/node";
import { Step } from './algo';
import { leftLeafColor, buildThreeText } from "./styles";

const updateTreeColor = (root?: TreeNode<number>, current?: TreeNode<number>) => {
    if (root === undefined || current === undefined) {
        return;
    }

    if (root === current) {
        root.sphereColor = enabledSphereColor;
    } else {
        root.sphereColor = normalSphereColor;
    }

    updateTreeColor(root.left, current);
    updateTreeColor(root.right, current);
}

const DisplaySum = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index - 1];
    const sum = (step && step.sum) || 0;

    return (
        <ButtonGroup
            size="large"
            sx={{
                position: "fixed",
                top: 100,
                left: "50%",
                transform: "translate(-50%)",
            }}>
            <Button sx={{ width: "60px", borderColor: "lightgray", color: "gray" }}>
                sum
            </Button>
            <Button sx={{ width: "60px", borderColor: "lightgray", fontWeight: "bold" }}>
                {sum}
            </Button>
        </ButtonGroup>
    )
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root, scene } = useAlgoContext();

    const handleOnClick = async () => {
        setState(State.Computing);
        animate();

        try {
            doClick(steps[index]);
            await wait(0.3);
        } finally {
            cancelAnimate();
        }

        if (index >= steps.length - 1) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }
        setIndex(i => i + 1);
    }

    const doClick = (step: Step) => {
        const { node, isLeftLeafNode } = step;
        if (!node) {
            return;
        }
        updateTreeColor(root, node);
        const left = node.left;
        if (isLeftLeafNode && left) {
            const { x, y, z } = left.val.center;
            const text = buildThreeText("left leaf", x - 1.2, y + 0.9, z);
            scene.add(text);
            left.sphereColor = leftLeafColor;
        }
    }

    return (
        <>
            <DisplaySum />
            <div style={{
                position: "fixed",
                bottom: "150px",
                left: "50%",
                transform: "translate(-50%)",
            }}
            >
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleOnClick}
                    sx={{ color: "#FFF", zIndex: 1 }}
                    disabled={state !== State.Playing}
                    color="primary"
                >
                    next
                </Button>
            </div>
        </>
    );
}

export default Main;
