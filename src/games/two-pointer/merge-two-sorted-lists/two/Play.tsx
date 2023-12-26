import { styled } from '@mui/system';
import { Stack } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { State } from "../AlgoState";

const Main = () => {
    return (
        <Stack
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            spacing={4}
            direction="column"
        >
        </Stack>
    );
};

const Position = styled("div")({
    position: "fixed",
    top: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    zIndex: 0
});

const Play = () => {
    const { state } = useAlgoContext();

    return (
        <Position>
            {state !== State.Typing && <Main />}
        </Position>
    );
}

export default Play;
