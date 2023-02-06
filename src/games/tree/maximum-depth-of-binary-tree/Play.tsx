import { useAlgoContext } from "./AlgoContext";
import { Button, Stack } from '@mui/material';
import { normalSphereColor, enabledSphereColor } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";

const updateTreeColor = (node?: TreeNode<any>, targetNode?: TreeNode<any>) => {
    if (node === undefined || targetNode === undefined) {
        return;
    }

    if (node === targetNode) {
        node.sphereColor = enabledSphereColor;
    } else {
        node.sphereColor = normalSphereColor;
    }

    updateTreeColor(node.left, targetNode);
    updateTreeColor(node.right, targetNode);
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, depthTreeSteps, setState } = useAlgoContext();

    const handleOnClick = async () => {
        setState(State.Computing);

        animate();
        updateTreeColor(steps[0]?.node, steps[index]?.node);
        updateTreeColor(depthTreeSteps[0]?.node, depthTreeSteps[index]?.node);

        const depthTreeStep = depthTreeSteps[index];
        if (depthTreeStep) {
            depthTreeStep.node.val.value = depthTreeStep.depth || "";
        }

        await wait(0.2);
        cancelAnimate();

        if (index >= steps.length - 1) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }

        setIndex(i => i + 1);
    }

    return (
        <Stack
            spacing={2}
            direction="column"
            style={{
                display: "flex",
                position: "fixed",
                bottom: "150px",
                justifyContent: "center",
                width: "100%",
                alignItems: "center"
            }}
        >
            <div>
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
        </Stack>
    );
}

export default Main;
