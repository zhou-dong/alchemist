import styled from "@emotion/styled";
import Title from "../description/Title";
import GameInput from "./GameInput";
import { IconButton, Stack, useTheme } from "@mui/material";
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LightTooltip from "../../../../commons/LightTooltip";
import { useAlgoContext } from "../AlgoContext";
import { State } from "../AlgoState";

const Location = styled("div")({
    position: 'fixed',
    top: '50%',
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 12,
});

const Main = () => {

    const { setState } = useAlgoContext();
    const theme = useTheme();

    return (
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
                <div>
                    <LightTooltip title="Back To Description" placement="top">
                        <IconButton
                            size="large"
                            sx={{
                                backgroundColor: theme.palette.primary.light,
                                borderColor: theme.palette.primary.light,
                                color: "#fff",
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.main,
                                    borderColor: theme.palette.primary.main,
                                    color: "#fff",
                                },
                                '&&.Mui-selected': {
                                    backgroundColor: theme.palette.primary.dark,
                                    borderColor: theme.palette.primary.dark,
                                    color: "#fff",
                                },
                                width: 50,
                                height: 50,
                            }}
                            onClick={() => setState(State.Description)}
                        >
                            <EmojiEmotionsIcon />
                        </IconButton>
                    </LightTooltip>
                </div>
            </Stack>
        </Location>
    );
};

export default Main;
