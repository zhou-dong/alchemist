import React from 'react';
import Title from "./Title";
import { Container, Divider, IconButton, Stack, styled } from "@mui/material";
import Welcome from "./Welcome";
import { contents, DisplayContents } from './Contents';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import InputIcon from '@mui/icons-material/Input';
import { green } from '@mui/material/colors';
import { useAlgoContext } from '../AlgoContext';
import testCases from "../toolbox/test-cases.json";
import { buildSteps, createTable, createTableStyle } from '../game/algo';
import { State } from '../AlgoState';

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

    const { setDisplayIntroduction, table, setTable, setTableStyle, setIndex, setState, setSteps, setHaystack, setNeedle } = useAlgoContext();


    const [statmentIndex, setStatementIndex] = React.useState(-1);

    const handlePreviousSection = () => {
        if (statmentIndex >= 0) {
            setStatementIndex(statmentIndex - 1);
        }
    };

    const handleNextSection = () => {
        if (statmentIndex < contents.length) {
            setStatementIndex(statmentIndex + 1);
        }
    };

    const getRandomTestCase = () => {
        const max = testCases.length;
        const index = Math.floor(Math.random() * max);
        return testCases[index];
    }

    const fillTable = () => {
        const { input } = getRandomTestCase();
        const { haystack, needle } = input;

        const table = createTable(haystack, needle);
        const tableStyle = createTableStyle(haystack, needle);
        const steps = buildSteps(haystack, needle);

        setTable(table);
        setTableStyle(tableStyle);
        setIndex(0);
        setSteps(steps);
        setState(State.Playing);

        setHaystack(haystack);
        setNeedle(needle);
    }

    const handleGetIntoGame = () => {
        if (table.length === 0) {
            fillTable();
        }
        setDisplayIntroduction(false);
    }

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
            <DisplayContents contentIndex={statmentIndex} contents={contents} />

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
                    disabled={statmentIndex === contents.length - 1}
                >
                    <NavigateNextIcon fontSize='large' />
                </Navigator>

                <Navigator
                    onClick={handleGetIntoGame}
                >
                    <InputIcon />
                    {/* <SportsEsportsOutlinedIcon /> */}
                </Navigator>
            </Stack>
        </Container>
    );
};

export default Main;
