import styled from "@emotion/styled";
import Title from "../description/Title";
import GameInput from "./GameInput";
import { Stack, useTheme } from "@mui/material";
import { useAlgoContext } from "../AlgoContext";
import Toolbox, { Tool } from "../toolbox";

const Location = styled("div")({
    position: 'fixed',
    top: '50%',
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 12,
});

const Main = () => {

    return (
        <>
            <Toolbox current={Tool.Input} />
            <Location>
                <Stack
                    spacing={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Title displayStar={false} />
                    <GameInput />
                </Stack>
            </Location>
        </>
    );
};

export default Main;
