import { Button, ButtonGroup, Stack } from "@mui/material";
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import Title from "../description/Title";
import { useAlgoContext } from "../AlgoContext";
import { State } from "../AlgoState";
import GameInput from "./GameInput";
import styled from "@emotion/styled";

const Location = styled("div")({
    position: 'fixed',
    top: '50%',
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 12,
});

const Main = () => {
    const { setState } = useAlgoContext();

    const handleGoBack = () => {
        setState(State.Description);
    }

    const handleGetIntoGame = () => {
        setState(State.Playing);
    }

    return (
        <Location>
            <Stack
                spacing={4}
                display="flex"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <Title displayStar={false} />

                <GameInput />

                <ButtonGroup variant="contained" size="large">
                    <Button
                        startIcon={<SentimentSatisfiedAltOutlinedIcon />}
                        sx={{ color: "#fff" }}
                        onClick={handleGoBack}
                    >
                        Buck
                    </Button>
                    <Button
                        endIcon={<SportsEsportsOutlinedIcon />}
                        sx={{ color: "#fff" }}
                        onClick={handleGetIntoGame}
                    >
                        Start
                    </Button>
                </ButtonGroup>



            </Stack>
        </Location>
    );
}

export default Main;
