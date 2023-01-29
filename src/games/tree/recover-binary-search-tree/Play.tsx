import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup } from '@mui/material';
import { normalSphereColor, enabledSphereColor, errorSphereColor } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";
import { Step } from './algo';

const updateTreeColor = (
    root?: TreeNode<number>,
    prev?: TreeNode<number>,
    current?: TreeNode<number>,
    errorOne?: TreeNode<number>,
    errorTwo?: TreeNode<number>
) => {
    if (root === undefined) {
        return;
    }

    if (root === current || root === prev) {
        root.sphereColor = enabledSphereColor;
    } else {
        root.sphereColor = normalSphereColor;
    }

    if (root === errorOne || root === errorTwo) {
        root.sphereColor = errorSphereColor;
    }

    updateTreeColor(root.left, prev, current, errorOne, errorTwo);
    updateTreeColor(root.right, prev, current, errorOne, errorTwo);
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root } = useAlgoContext();

    const handleOnClick = async () => {
        setState(State.Computing);
        animate();

        try {
            handleClick(steps[index]);
            await wait(0.2);
        } finally {
            cancelAnimate();
        }

        if (index >= steps.length) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }
        setIndex(i => i + 1);
    }

    const handleClick = (step?: Step) => {
        if (step) {
            doClick(step);
        } else {
            swap();
        }
    }

    const swap = () => {
        const last = steps[steps.length - 1];
        if (last && last.errorOne && last.errorTwo) {
            updateTreeColor(root, undefined, undefined, last.errorOne, last.errorTwo);
            const temp = last.errorOne.val.value;
            last.errorOne.val.value = last.errorTwo.val.value;
            last.errorTwo.val.value = temp;
        }
    }

    const doClick = (step: Step) => {
        const { node, prev, errorOne, errorTwo } = step;
        updateTreeColor(root, prev, node, errorOne, errorTwo);
    }

    return (
        <>
            <div style={{
                position: "fixed",
                bottom: "150px",
                left: "50%",
                transform: "translate(-50%)",
            }}
            >
                <ButtonGroup variant="contained" size="large" disabled={state !== State.Playing}>
                    <Button
                        onClick={handleOnClick}
                        sx={{ zIndex: 1 }}
                        disabled={steps[index] === undefined}
                    >
                        Inorder
                    </Button>
                    <Button
                        onClick={handleOnClick}
                        sx={{ zIndex: 1 }}
                        disabled={steps[index] !== undefined}
                    >
                        Swap
                    </Button>
                </ButtonGroup>

            </div>
        </>
    );
}

export default Main;
