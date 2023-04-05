import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup } from '@mui/material';
import { enabledSphereColor, normalSphereColor } from "../styles";
import { wait } from "../../../../data-structures/_commons/utils";
import { State } from "../AlgoState";
import TreeNode from "../../../../data-structures/tree/nodes/v1/node";
import { Step } from './algo';

const updateTreeColor = (level: number, root?: TreeNode<string>, current?: TreeNode<string>) => {
    if (root === undefined || current === undefined) {
        return;
    }

    if (root === current) {
        root.sphereColor = enabledSphereColor;
    } else {
        root.sphereColor = normalSphereColor;
    }

    updateTreeColor(level + 1, root.left, current);
    updateTreeColor(level + 1, root.right, current);
}

const DisplayResult = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index - 1];
    if (!step) {
        return (
            <>
            </>
        );
    }
    const { result } = step;
    return (
        <ButtonGroup size="large">
            {
                result.map((nums, i) => <Button key={i} sx={{ borderColor: "lightgray", color: "gray" }}>
                    {nums.join(", ")}
                </Button>)
            }
        </ButtonGroup>
    );
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root, } = useAlgoContext();

    const handleOnClick = async () => {
        setState(State.Computing);
        animate();

        try {
            await doClick(steps[index]);
            await wait(0.1);
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

    const doClick = async (step: Step) => {
        const { node } = step;
        updateTreeColor(0, root, node);
    }

    return (
        <>
            <div style={{
                position: "fixed",
                top: "110px",
                left: "50%",
                transform: "translate(-50%)",
            }}>
                <DisplayResult />
            </div>

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
