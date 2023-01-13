import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup } from '@mui/material';
import { normalSphereColor, enabledSphereColor, } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";
import { ActionType, Direction, Step } from './algo';
import { finishedColor } from "./styles";

const changeColor = (node: TreeNode<string> | undefined, color: string) => {
    if (!node) {
        return;
    }
    node.sphereColor = color;
    changeColor(node.left, color);
    changeColor(node.right, color);
}

const DisplaySum = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index - 1];
    const count = step ? step.count : 0;

    return (
        <ButtonGroup
            sx={{
                position: "fixed",
                top: 100,
                left: "50%",
                transform: "translate(-50%)",
            }}>
            <Button sx={{ borderColor: "lightgray", color: "gray" }}>
                count
            </Button>
            <Button sx={{ width: "60px", borderColor: "lightgray", fontWeight: "bold" }}>
                {count}
            </Button>
        </ButtonGroup>
    )
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, } = useAlgoContext();

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
        const { node, actionType, direction } = step;
        node.sphereColor = enabledSphereColor;
        if (direction !== undefined && actionType === ActionType.DFS) {
            node.sphereColor = finishedColor;
            if (direction as Direction === Direction.Left) {
                changeColor(node.right, finishedColor);
                changeColor(node.left, normalSphereColor);
            }
            if (direction as Direction === Direction.Right) {
                changeColor(node.left, finishedColor);
                changeColor(node.right, normalSphereColor);
            }
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
