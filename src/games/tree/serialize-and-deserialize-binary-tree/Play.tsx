import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Typography } from '@mui/material';
import { normalSphereColor, enabledSphereColor } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";
import { Direction, Place, Stage, Step } from "./algo";

const updateTreeColor = (root?: TreeNode<string>, current?: TreeNode<string>) => {
    if (root === undefined) {
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

const DisplaySerialized = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index - 1];
    const values: string[] = step ? step.values : [];
    const i: number = (step && step.i !== undefined) ? step.i : -1;

    const getStyles = (a: number) => {
        if (a === i) {
            return { "color": "#FFF", "backgroundColor": "green" };
        } else {
            return { "color": "green" };
        }
    }

    return (
        <div style={{
            position: "fixed",
            top: "100px",
            left: "50%",
            transform: "translate(-50%)",
        }}>
            <ButtonGroup>
                {
                    values.map((value, i) => <Button key={i} sx={{ width: "55px", height: "55px", borderColor: "lightgray", ...getStyles(i) }}>
                        <Typography variant="h5">
                            {value}
                        </Typography>
                    </Button>
                    )
                }
            </ButtonGroup>
        </div>
    )
}

const Main = () => {

    const { animate, cancelAnimate, setState, root, index, steps, setIndex, nodes } = useAlgoContext();
    const s = steps[index];

    const handleNextClick = async () => {
        setState(State.Computing);
        animate();

        try {
            if (s) {
                doClick(s);
                await wait(0.1);
            }
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
        const { node, stage, place, direction } = step;

        // Serialize
        if (node && stage === Stage.Serialize) {
            const parent = nodes.get(node.parentIndex);

            if (place === Place.Post) {
                node.hide();
                if (parent && direction !== undefined) {
                    if (direction as Direction === Direction.Left) {
                        parent.leftLine?.hide();
                    }
                    if (direction as Direction === Direction.Right) {
                        parent.rightLine?.hide();
                    }
                }
            }
        }

        // Deserialize
        if (node && stage === Stage.Deserialize) {
            node.show();

            const parent = nodes.get(node.parentIndex);
            if (parent && direction !== undefined) {
                if (direction as Direction === Direction.Left) {
                    parent.leftLine?.show();
                }
                if (direction as Direction === Direction.Right) {
                    parent.rightLine?.show();
                }
            }
        }

        updateTreeColor(root, node);
    }

    return (
        <>
            <DisplaySerialized />
            <div style={{
                position: "fixed",
                bottom: "150px",
                left: "50%",
                transform: "translate(-50%)",
            }}
            >
                <ButtonGroup variant="contained" size="large">
                    <Button onClick={handleNextClick} disabled={!s || s.stage === Stage.Deserialize}>
                        serialize
                    </Button>
                    <Button onClick={handleNextClick} disabled={!s || s.stage === Stage.Serialize}>
                        deserialize
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Main;
