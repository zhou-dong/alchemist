import { useAlgoContext } from "./AlgoContext";
import { Avatar, Button, Stack, Typography, } from '@mui/material';
import { normalSphereColor, enabledSphereColor, } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/nodes/v1/node";
import { Step } from './algo';
import { buildThreeText } from "./styles";

const updateTreeColor = (root?: TreeNode<string>, current?: TreeNode<string>) => {
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

const DisplayK = () => {
    const { k, } = useAlgoContext();

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                position: "fixed",
                top: 100,
                left: "50%",
                transform: "translate(-50%)",
                alignItems: "center",
                border: "1px solid lightgray",
                padding: "8px 14px",
                borderRadius: "30px"
            }}>
            <Avatar sx={{ border: "1px solid lightgray", backgroundColor: "#FFF", color: "gray", }}>K</Avatar>
            <Typography variant="h5" sx={{ color: "orange" }}>{k}</Typography>
        </Stack>
    );
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
        const { node, index } = step;
        if (!node) {
            return;
        }
        updateTreeColor(root, node);
        const { x, y, z } = node.val.center;
        const text = buildThreeText(index, x - 1.2, y + 0.5, z);
        scene.add(text);
    }

    return (
        <>
            <DisplayK />
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
