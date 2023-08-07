import { styled } from '@mui/system';
import { IconButton, Stack } from "@mui/material";
import { State } from "./AlgoState";
import { useAlgoContext } from "./AlgoContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';

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

    const { state, setState, steps, index, setIndex, x } = useAlgoContext();

    const step = steps[index];

    const handleClickLeft = () => {
        if (!step) return;

        const { square } = step;
        if (square < x) {
            setLeftBtnColor("error");
            return;
        }

        setLeftBtnColor("success");
        setRightBtnColor("success");

        if (index === steps.length - 1) {
            setState(State.Finished);
        }

        setIndex(i => i + 1);
    }

    const handleRightClick = () => {
        if (!step) return;
        const { square } = step;

        if (square >= x) {
            setRightBtnColor("error");
            return;
        }

        setLeftBtnColor("success");
        setRightBtnColor("success");

        if (index === steps.length - 1) {
            setState(State.Finished);
        }

        setIndex(i => i + 1);
    }

    const disabled = state !== State.Playing;

    return (
        <Position>
            <Stack spacing={2} direction="row">
                <IconButton color={leftBtnColor} onClick={handleClickLeft} sx={{ border: "1px solid lightgray" }} size='large' disabled={disabled}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton color={rightBtnColor} onClick={handleRightClick} sx={{ border: "1px solid lightgray" }} size='large' disabled={disabled}>
                    <ArrowForwardIcon />
                </IconButton>
            </Stack>
        </Position>
    );
}

export default Main;
