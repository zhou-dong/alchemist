import React from 'react';
import StatementsDisplayer from "./StatementsDisplayer";
import Title from "./Title";
import { Container, Divider, IconButton, Stack, styled } from "@mui/material";
import Welcome from "./Welcome";
import { statements } from './Statements';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { green } from '@mui/material/colors';
import { useAlgoContext } from '../AlgoContext';

const Navigator = styled(IconButton)({
    width: 60,
    height: 60,
    backgroundColor: green[500],
    color: "#fff",
    '&:hover': {
        backgroundColor: green[600],
    },
    '&.Mui-disabled': {
        backgroundColor: 'lightgray',
        color: 'gray',
    },
});

const Main = () => {

    const { setDisplayIntroduce } = useAlgoContext();

    const [statmentIndex, setStatementIndex] = React.useState(-1);

    const handlePreviousSection = () => {
        if (statmentIndex >= 0) {
            setStatementIndex(statmentIndex - 1);
        }
    };

    const handleNextSection = () => {
        if (statmentIndex < statements.length) {
            setStatementIndex(statmentIndex + 1);
        }
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <Title displayStar={statmentIndex >= 0} />
            {statmentIndex < 0 && <Welcome />}

            <Divider variant="middle" />
            <StatementsDisplayer statmentIndex={statmentIndex} statements={statements} />

            <Stack
                direction="row"
                spacing={3}
                textAlign="center"
                mt={4}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Navigator
                    onClick={handlePreviousSection}
                    disabled={statmentIndex < 0}
                >
                    <NavigateBeforeIcon fontSize='large' />
                </Navigator>

                <Navigator
                    onClick={handleNextSection}
                    disabled={statmentIndex === statements.length - 1}
                >
                    <NavigateNextIcon fontSize='large' />
                </Navigator>

                <Navigator
                    onClick={() => setDisplayIntroduce(false)}
                >
                    <RocketLaunchIcon />
                </Navigator>
            </Stack>
        </Container>
    );
};

export default Main;
