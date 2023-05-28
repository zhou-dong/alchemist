import React from "react";
import { useAlgoContext } from "./AlgoContext";
import { styled } from '@mui/system';
import { Avatar, Button, ButtonGroup, Chip, Paper, Stack, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { smallerHeapColor, greaterHeapColor } from "./styles";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Action, Target } from "./algo";

const HeapStats: React.FC<{
    title: string,
    formula: string,
    backgroundColor: string,
    lazyDeleteItems: Map<number, number>
}> = ({
    title,
    backgroundColor,
    formula,
    lazyDeleteItems
}) => (
        <Paper
            elevation={2}
            sx={{
                padding: 2,
                textAlign: "center",
                backgroundColor: "#f5f5f5"
            }}
        >
            <Stack direction="row" spacing={1}>
                <TipsAndUpdatesIcon sx={{ color: backgroundColor }} />

                <Typography variant="body1">
                    {title + " (" + formula + ")"}
                </Typography>
            </Stack>

            <Typography variant="body1" sx={{ marginTop: 2, color: "grayText" }}>
                Items delete later
            </Typography>

            <Stack spacing={1} direction="row" sx={{ marginTop: "6px" }}>
                {
                    Array.from(lazyDeleteItems.entries()).map((value, i) =>
                        <Chip
                            key={i}
                            avatar={
                                <Avatar sx={{ backgroundColor }}>
                                    <Typography sx={{ color: "#fff" }}>
                                        {value[0]}
                                    </Typography>
                                </Avatar>
                            }
                            label={value[1]}
                        />
                    )
                }
            </Stack>
        </Paper>
    );

const DisplayNums = () => {
    const { nums, k, steps, stepIndex } = useAlgoContext();

    const index = steps[stepIndex]?.index || -1;
    const lower = index + 1 - k;
    const upper = index;

    return (
        <div style={{
            position: "fixed",
            top: "150px",
            left: "50%",
            transform: "translate(-50%)",
        }}>
            <ButtonGroup>
                {nums.map((num, i) =>
                    <Button
                        key={i}
                        color="success"
                        sx={{ borderColor: "lightgray" }}
                        size="large"
                        variant={(i >= lower && i <= upper) ? "contained" : "outlined"}
                    >
                        {num}
                    </Button>
                )}
            </ButtonGroup>
        </div>
    );
};

const DisplayResult = () => {
    const { result } = useAlgoContext();

    return (
        <ButtonGroup size="large" color="success">
            {result.length > 0 && <Button variant="contained" sx={{ color: "#fff" }}>medians</Button>}
            {
                result.map((value, i) => <Button key={i} sx={{ color: "#000" }}>{value}</Button>)
            }
        </ButtonGroup>
    );
};

const DisplayHeapsStats = () => {

    const { dualHeap } = useAlgoContext();

    return (
        <>
            <div style={{
                position: "fixed",
                top: "38%",
                left: "12%",
            }}>
                <HeapStats
                    title="MaxHeap"
                    formula="nums <= median"
                    backgroundColor={smallerHeapColor}
                    lazyDeleteItems={dualHeap?.smaller.deleted || new Map()}
                />
            </div>

            <div style={{
                position: "fixed",
                top: "38%",
                right: "12%",
            }}>
                <HeapStats
                    title="MinHeap"
                    formula="nums > median"
                    backgroundColor={greaterHeapColor}
                    lazyDeleteItems={dualHeap?.greater.deleted || new Map()}
                />
            </div>
        </>
    );
}

const Actions = styled('div')({
    position: "fixed",
    bottom: "150px",
    left: "50%",
    transform: "translate(-50%)",
});

const PlayActions = () => {
    const { animate, cancelAnimate, state, setState, result, dualHeap, stepIndex, steps, setStepIndex } = useAlgoContext();

    const step = steps[stepIndex];

    const handlePushToHeap = async () => {
        if (step === undefined || step.action !== Action.Push || step.target !== Target.Heap) {
            return;
        }

        setState(State.Running);
        animate();

        try {
            await dualHeap?.push(step.value);
            await wait(0.1);
        } catch (error) {
            console.error(error);
        }

        cancelAnimate();
        setStepIndex(i => i + 1);
        setState(State.Ready);
    }

    const handleAddtoResult = async () => {
        if (step === undefined || step.action !== Action.Push || step.target !== Target.Result) {
            return;
        }

        setState(State.Running);
        result.push(step.value);
        setStepIndex(i => i + 1);
        setState(State.Ready);
    }

    const handleDeleteFromHeap = async () => {
        if (step === undefined || step.action !== Action.Delete || step.target !== Target.Heap) {
            return;
        }

        setState(State.Running);
        animate();

        try {
            await dualHeap?.delete(step.value);
            await wait(0.1);
        } catch (error) {
            console.error(error);
        }

        cancelAnimate();
        setStepIndex(i => i + 1);
        setState(State.Ready);
    }

    return (
        <Actions>
            <Stack spacing={3} sx={{ "display": "flex", alignItems: "center" }}>
                <DisplayResult />
                <ButtonGroup size='large' variant='outlined'>
                    <Button
                        color={"success"}
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handlePushToHeap}
                        disabled={state !== State.Ready || step === undefined || step.action !== Action.Push || step.target !== Target.Heap}
                    >
                        Push to Heap
                    </Button>
                    <Button
                        color={"success"}
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleAddtoResult}
                        disabled={state !== State.Ready || step === undefined || step.action !== Action.Push || step.target !== Target.Result}
                    >
                        Add to Result
                    </Button>
                    <Button
                        color={"success"}
                        startIcon={<RemoveCircleOutlineIcon />}
                        onClick={handleDeleteFromHeap}
                        disabled={state !== State.Ready || step === undefined || step.action !== Action.Delete || step.target !== Target.Heap}
                    >
                        delete from Heap
                    </Button>
                </ButtonGroup>
            </Stack>
        </Actions>
    );
}

const Main = () => {
    const { state } = useAlgoContext();
    return (
        <>
            <DisplayNums />
            {state !== State.Typing && <DisplayHeapsStats />}
            {state !== State.Typing && <PlayActions />}
        </>
    );
}

export default Main;
