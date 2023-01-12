import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack } from '@mui/material';
import { normalSphereColor, enabledSphereColor, targetSumColor, } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";
import { Step } from './algo';
import { buildThreeText } from "./styles";

const updateTreeColor = (leaves: TreeNode<number>[], root?: TreeNode<number>, current?: TreeNode<number>) => {
    if (root === undefined || current === undefined) {
        return;
    }

    if (!leaves.includes(root)) {
        if (root === current) {
            root.sphereColor = enabledSphereColor;
        } else {
            root.sphereColor = normalSphereColor;
        }
    }
    updateTreeColor(leaves, root.left, current);
    updateTreeColor(leaves, root.right, current);
}

const DisplaySum = () => {
    const { targetSum, steps, index } = useAlgoContext();
    const step = steps[index - 1];
    const paths = step ? step.paths : [];

    return (
        <Stack
            spacing={1}
            sx={{
                position: "fixed",
                top: 100,
                left: "50%",
                transform: "translate(-50%)",
            }}>
            <ButtonGroup>
                <Button sx={{ width: "160px", borderColor: "lightgray", color: "gray" }}>
                    target sum
                </Button>
                <Button sx={{ width: "60px", borderColor: "lightgray", color: "gray" }}>
                    {targetSum || ""}
                </Button>

            </ButtonGroup>
            <ButtonGroup>
                <Button sx={{ borderColor: "lightgray", color: "gray" }}>
                    Paths
                </Button>
                {
                    paths.map((path, i) =>
                        <Button key={i} sx={{ borderColor: "lightgray", color: "gray" }}>
                            [{path.join(" ,")}]
                        </Button>
                    )
                }
            </ButtonGroup>
        </Stack>
    )
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root, scene, leaves, setLeaves } = useAlgoContext();

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
        const { node, sum, hasPathSum } = step;
        updateTreeColor(leaves, root, node);
        const { x, y, z } = node.val.center;
        const text = buildThreeText(sum, x - 1.2, y + 0.9, z);
        scene.add(text);
        if (hasPathSum) {
            node.sphereColor = targetSumColor;
            setLeaves(leaves => {
                leaves.push(node);
                return leaves;
            })
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
