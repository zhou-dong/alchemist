import React from "react";
import { useAlgoContext } from "./AlgoContext";
import { styled } from '@mui/system';
import { Button, ButtonGroup, Paper, Stack, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { smallerHeapColor, greaterHeapColor } from "./styles";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Action, Target } from "./algo";

const DisplayTip: React.FC<{ tip: string, backgroundColor: string, fontColor: string }> = ({ tip, backgroundColor, fontColor }) => (
    <Paper
        variant="elevation"
        elevation={8}
        sx={{
            backgroundColor,
            padding: 2
        }}
    >
        <Stack direction="row" spacing={1}>
            <TipsAndUpdatesOutlinedIcon sx={{ color: "#fff" }} />
            <Typography sx={{ color: fontColor }}>
                {tip}
            </Typography>
        </Stack>
    </Paper>
);

const DisplayTips = () => (
    <div style={{
        position: "fixed",
        top: "15%",
        right: "5%",
    }}>
        <Stack spacing={1}>
            <DisplayTip tip="MaxHeap: (nums <= median)" backgroundColor={smallerHeapColor} fontColor="#000" />
            <DisplayTip tip="MinHeap: (nums > median)" backgroundColor={greaterHeapColor} fontColor="#fff" />
        </Stack>
    </div>
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

const Actions = styled('div')({
    position: "fixed",
    bottom: "150px",
    left: "50%",
    transform: "translate(-50%)",
});

const Main = () => {

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
        <>
            <DisplayNums />
            <DisplayTips />

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
        </>
    );
}

export default Main;
