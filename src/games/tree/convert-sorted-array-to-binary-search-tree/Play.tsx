import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack } from '@mui/material';
import { buildTreeNode, rootCenter, initCenter, yDistance, lineMaterial, duration } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import { Direction } from "./algo";

const defaultStyle = { width: "50px", height: "50px", backgroundColor: "lightgray", color: "black" };
const rootStyle = { ...defaultStyle, backgroundColor: "lightgreen", color: "black" };
const leftStyle = { ...defaultStyle, backgroundColor: "yellow", color: "black" };
const rightStyle = { ...defaultStyle, backgroundColor: "lightblue", color: "black" };

const InputDisplay = () => {

    const { inputOutput, index } = useAlgoContext();
    const { input, steps } = inputOutput;

    const getStyle = (i: number) => {
        const step = steps[index];
        if (!step) {
            return defaultStyle;
        }
        const { left, mid, right } = step;
        switch (i) {
            case left: return leftStyle;
            case right: return rightStyle;
            case mid: return rootStyle;
            default: return defaultStyle;
        }
    }

    return (
        <ButtonGroup>
            {
                input.map((value, i) =>
                    <Button key={i} variant="contained" style={getStyle(i)}>
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
        setState(State.Computing);

        const { steps, xAxis } = inputOutput;
        const step = steps[index];

        animate();

        if (step) {
            const { node, direction } = step;
            const treeNode = buildTreeNode(node.value, node.index, scene, initCenter, true);
            map.set(treeNode.index, treeNode);

            if (direction === undefined) {
                await treeNode.val.move(rootCenter, duration)
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

        if (index >= steps.length - 1) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }

        await wait(0.2);
        cancelAnimate();
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
            <InputDisplay />
            <div>

                <Button
                    variant="contained"
                    size="large"
                    onClick={handleOnClick}
                    sx={{ color: "#FFF", zIndex: 1 }}
                    disabled={state !== State.Playing}
                    color="info"
                >
                    next
                </Button>
            </div>
        </Stack>
    );
}

export default Main;
