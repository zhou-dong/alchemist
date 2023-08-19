import React from 'react';
import { styled } from '@mui/system';
import { IconButton, Stack } from "@mui/material";
import { State } from "./AlgoState";
import { useAlgoContext } from "./AlgoContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';

const Position = styled('div')({
    display: "flex",
    position: "fixed",
    bottom: "40%",
    justifyContent: "center",
    width: "100%",
    alignItems: "center"
});

const Main = () => {

    type btnColor = "error" | "success";
    const [leftBtnColor, setLeftBtnColor] = React.useState<btnColor>("success");
    const [rightBtnColor, setRightBtnColor] = React.useState<btnColor>("success");
    const [foundBtnColor, setFoundBtnColor] = React.useState<btnColor>("success");

    const { state, setState, steps, index, setIndex } = useAlgoContext();
    const nums: number[] = [];
    const target = 1;

    const step = steps[index];

    const handleFoundClick = () => {
        if (!step) return;

        const { mid } = step;

        if (nums[mid] === target) {
            setState(State.Finished);
            setIndex(i => i + 1);

            setLeftBtnColor("success");
            setRightBtnColor("success");
            setFoundBtnColor("success");
        } else {
            setFoundBtnColor("error");
        }
    }

    const handleLeftClick = () => {
        if (!step) return;
        const { mid } = step;

        if (nums[mid] <= target) {
            setLeftBtnColor("error");
            return;
        }

        setLeftBtnColor("success");
        setRightBtnColor("success");
        setFoundBtnColor("success");

        if (index === steps.length - 1) {
            setState(State.Finished);
        }

        setIndex(i => i + 1);
    }

    const handleRightClick = () => {
        if (!step) return;
        const { mid } = step;

        if (nums[mid] >= target) {
            setRightBtnColor("error");
            return;
        }

        setLeftBtnColor("success");
        setRightBtnColor("success");
        setFoundBtnColor("success");

        if (index === steps.length - 1) {
            setState(State.Finished);
        }

        setIndex(i => i + 1);
    }

    const disabled = state !== State.Playing;

    return (
        <Position>
            <Stack spacing={1} direction="row">
                <IconButton color={leftBtnColor} onClick={handleLeftClick} sx={{ border: "1px solid lightgray" }} size='large' disabled={disabled}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton color={foundBtnColor} onClick={handleFoundClick} sx={{ border: "1px solid lightgray" }} size='large' disabled={disabled}>
                    <CheckIcon />
                </IconButton>
                <IconButton color={rightBtnColor} onClick={handleRightClick} sx={{ border: "1px solid lightgray" }} size='large' disabled={disabled}>
                    <ArrowForwardIcon />
                </IconButton>

            </Stack>
        </Position>
    );
}

export default Main;
