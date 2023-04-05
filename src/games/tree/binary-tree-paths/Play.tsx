import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup } from '@mui/material';
import { normalSphereColor, enabledSphereColor, } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/nodes/v1/node";
import { Step } from './algo';

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
    const paths: string[] = (step && step.paths) || [];

    return (
        <ButtonGroup
            sx={{
                position: "fixed",
                top: 100,
                left: "50%",
                transform: "translate(-50%)",
            }}>
            <Button sx={{ borderColor: "lightgray", color: "gray" }}>
                paths
            </Button>
            {
                paths.map((path, i) => <Button key={i} sx={{ borderColor: "lightgray", }}>
                    {path}
                </Button>)
            }
        </ButtonGroup>
    )
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root } = useAlgoContext();

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
        const { node } = step;
        updateTreeColor(root, node);
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
