import styled from "@emotion/styled";
import Title from "../description/Title";
import GameInput from "./GameInput";
import { Stack } from "@mui/material";
import InputIcon from '@mui/icons-material/Input';
import Toolbox from "../toolbox";
import { State } from "../AlgoState";

const Location = styled("div")({
    position: 'fixed',
    top: '40%',
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 12,
});

const Main = () => {

    return (
        <>
            <Toolbox current={State.Input} />
            <Location>
                <Stack
                    spacing={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Title icon={<InputIcon />} />
                    <GameInput />
                </Stack>
            </Location>
        </>
    );
};

export default Main;
