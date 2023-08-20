import React from 'react';
import { styled } from '@mui/system';
import { IconButton, Stack } from "@mui/material";
import { State } from "./AlgoState";
import { useAlgoContext } from "./AlgoContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { isBadVersion } from "./algo";

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

    const { state, setState, steps, index, setIndex, n, bad } = useAlgoContext();
    const step = steps[index];

    const handleLeftClick = () => {
        if (!step || !n || !bad) return;
        const { mid } = step;

        if (isBadVersion(mid, n, bad)) {
            setLeftBtnColor("success");
            setRightBtnColor("success");
            if (index === steps.length - 1) {
                setState(State.Finished);
            }
            setIndex(i => i + 1);
        } else {
            setLeftBtnColor("error");
        }
    }

    const handleRightClick = () => {
        if (!step || !n || !bad) return;
        const { mid } = step;

        if (isBadVersion(mid, n, bad)) {
            setRightBtnColor("error");
        } else {
            setLeftBtnColor("success");
            setRightBtnColor("success");
            if (index === steps.length - 1) {
                setState(State.Finished);
            }
            setIndex(i => i + 1);
        }
    }

    const disabled = state !== State.Playing;

    return (
        <Position>
            <Stack spacing={1} direction="row">
                <IconButton color={leftBtnColor} onClick={handleLeftClick} sx={{ border: "1px solid lightgray" }} size='large' disabled={disabled}>
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
