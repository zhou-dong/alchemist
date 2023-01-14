import { useAlgoContext } from "./AlgoContext";
import { Avatar, Button, ButtonGroup, Chip, Stack } from '@mui/material';
import { buildTreeNode, rootCenter, initCenter, yDistance, lineMaterial, duration } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import { Direction, Step } from "./algo";
import Title from './Title';

const slowColor = { backgroundColor: "gold", color: "black", };
const fastColor = { backgroundColor: "orange", color: "#FFF", };
const rootColor = { backgroundColor: "green", color: "#FFF", };

const defaultStyle = { width: "40px", height: "40px", backgroundColor: "#FFF", color: "gray", borderColor: "lightgray" };
const rootStyle = { ...defaultStyle, ...rootColor };
const slowStyle = { ...defaultStyle, ...slowColor };
const fastStyle = { ...defaultStyle, ...fastColor };

const StatesDisplay = () => {

    const { inputOutput, index } = useAlgoContext();
    const step = inputOutput.steps[index];

    const slow = (step) ? step.slow : -1;
    const fast = (step) ? step.fast : -1;
    let mid = (step) ? step.mid : -1;
    if (mid === undefined) {
        mid = -1;
    }

    return (
        <Stack spacing={2} direction="row" sx={{ justifyContent: "center", alignItems: "center" }}>
            <Chip avatar={<Avatar sx={{ ...slowColor }}>S</Avatar>} label={`Slow: ${slow || "-1"}`} variant="outlined" />
            <Chip avatar={<Avatar style={{ color: "#FFF" }} sx={{ ...fastColor }}>F</Avatar>} label={`Fast: ${fast || "-1"}`} variant="outlined" />
            <Chip avatar={<Avatar style={{ color: "#FFF" }} sx={{ ...rootColor, color: "#FFF" }}>M</Avatar>} label={`Mid: ${mid}`} variant="outlined" />
        </Stack>
    )
}

const InputDisplay = () => {

    const { inputOutput, index } = useAlgoContext();
    const { input, steps } = inputOutput;

    const getStyle = (i: number) => {
        const step = steps[index];
        if (!step) {
            return defaultStyle;
        }
        const { mid, slow, fast } = step;
        switch (i) {
            case mid: return rootStyle;
            case slow: return slowStyle;
            case fast: return fastStyle;
            default: return defaultStyle;
        }
    }

    return (
        <ButtonGroup>
            {
                input.map((value, i) =>
                    <Button key={i} style={getStyle(i)} variant="outlined">
                        {value}
                    </Button>
                )
            }
        </ButtonGroup>
    )
}

const Main = () => {

    const { animate, cancelAnimate, index, inputOutput, setIndex, state, setState, scene, map } = useAlgoContext();

    const handleOnClick = async () => {
        const { steps } = inputOutput;
        const step = steps[index];
        if (!step) {
            return;
        }
        setState(State.Computing);
        animate();
        try {
            await doClick(step)
            await wait(0.2);
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
        const { xAxis } = inputOutput;
        const { node, direction } = step;
        if (!node) {
            return;
        }
        const treeNode = buildTreeNode(node.value, node.index, scene, initCenter, true);
        map.set(treeNode.index, treeNode);

        if (direction === undefined) {
            await treeNode.val.move(rootCenter, duration);
        } else {
            const parent = map.get(treeNode.parentIndex)!;
            const x = xAxis[treeNode.index] - inputOutput.xAxis[0];
            const y = parent.val.center.y - yDistance;
            const { z } = parent.val.center;
            if (direction === Direction.Left) {
                await parent.setLeft(treeNode, { x, y, z }, lineMaterial, duration, scene);
            } else {
                await parent.setRight(treeNode, { x, y, z }, lineMaterial, duration, scene)
            }
        }
    }

    return (
        <>
            <Stack
                direction="column"
                spacing={2}
                sx={{ position: "fixed", left: "50%", transform: "translateX(-50%)", top: "60px" }}
            >
                <Title />
                <StatesDisplay />
                <InputDisplay />
            </Stack>

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
                        color="success"
                    >
                        next
                    </Button>
                </div>
            </Stack>
        </>
    );
}

export default Main;
