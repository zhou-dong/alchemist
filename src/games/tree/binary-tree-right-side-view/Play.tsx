import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup } from '@mui/material';
import { normalSphereColor, enabledSphereColor, } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";
import { Step } from './algo';
import { rightSideColor } from "./styles";

const updateTreeColor = (rightSideNodes: TreeNode<number>[], root?: TreeNode<number>, current?: TreeNode<number>) => {
    if (root === undefined || current === undefined) {
        return;
    }

    if (!rightSideNodes.includes(root)) {
        if (root === current) {
            root.sphereColor = enabledSphereColor;
        } else {
            root.sphereColor = normalSphereColor;
        }
    }

    updateTreeColor(rightSideNodes, root.left, current);
    updateTreeColor(rightSideNodes, root.right, current);
}

const DisplaySideView = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index - 1];
    const rightSideNodes = step ? step.result : [];

    return (
        <ButtonGroup
            size="large"
            sx={{
                position: "fixed",
                top: 100,
                left: "50%",
                transform: "translate(-50%)",
            }}>
            {
                rightSideNodes.map((value, i) => <Button key={i} sx={{ borderColor: "lightgray" }}>{value}</Button>)
            }
        </ButtonGroup>
    )
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root, rightSideNodes, setRightSideNodes } = useAlgoContext();

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
        const { node, isRightSide } = step;
        updateTreeColor(rightSideNodes, root, node);

        if (isRightSide) {
            node.sphereColor = rightSideColor;
            setRightSideNodes(nodes => {
                nodes.push(node);
                return nodes;
            })
        }
    }

    return (
        <>
            <DisplaySideView />
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
