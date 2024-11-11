import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import OutputIcon from '@mui/icons-material/Output';
import { BottomNavigation, BottomNavigationAction, ButtonGroup, Container, Paper } from '@mui/material';
import { useAlgoContext } from '../AlgoContext';

import testCases from "./test-cases.json";
import { buildSteps, createTable, createTableStyle } from '../game/algo';
import { State } from '../AlgoState';

import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import { Solution } from "../game/solution";

const getRandomTestCase = () => {
    const max = testCases.length;
    const index = Math.floor(Math.random() * max);
    return testCases[index];
}

const Card = styled(MuiCard)(({ theme }) => ({
    padding: theme.spacing(3),
    border: 0,
}));

export default function Main() {

    const [localHaystack, setLocalHaystack] = React.useState("");
    const [localNeedle, setLocalNeedle] = React.useState("");
    const { setHaystack, setNeedle, setDisplayGame, setDisplayInput, setTable, setTableStyle, setIndex, setSteps, setState } = useAlgoContext();

    const [haystackError, setHaystackError] = React.useState(false);
    const [haystackErrorMessage, setHaystackErrorMessage] = React.useState('');

    const handleSubmit = () => {
        if (localHaystack.trim().length === 0) {
            setHaystackError(true)
            setHaystackErrorMessage("Haystack can not be empty");
            return;
        }
        if (localNeedle.length > localHaystack.length) {
            setHaystackError(true)
            setHaystackErrorMessage("Haystack should longer than needle");
        }

        const table = createTable(localHaystack, localNeedle);
        const tableStyle = createTableStyle(localHaystack, localNeedle);
        const steps = buildSteps(localHaystack, localNeedle);

        setTable(table);
        setTableStyle(tableStyle);
        setIndex(0);
        setSteps(steps);
        setState(State.Playing);

        setHaystack(localHaystack);
        setNeedle(localNeedle);

        handleClear();
        setDisplayInput(false);
        setDisplayGame(true);
    };

    const handleHaystackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (haystackError) {
            setHaystackError(false);
            setHaystackErrorMessage("");
        }
        setLocalHaystack(e.currentTarget.value);
    };

    const handleAutoFill = () => {
        handleClear();
        const { input } = getRandomTestCase();
        const { haystack, needle } = input;

        setLocalHaystack(haystack)
        setLocalNeedle(needle);
    }

    const handleClear = () => {
        setLocalHaystack("");
        setHaystackError(false);
        setHaystackErrorMessage("");
        setLocalNeedle("");
    }

    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Paper elevation={4}>
                <Card variant="outlined">
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="haystack">String</FormLabel>
                            <TextField
                                onChange={handleHaystackChange}
                                error={haystackError}
                                helperText={haystackErrorMessage}
                                type="s"
                                name="string"
                                placeholder="input string"
                                value={localHaystack}
                                autoFocus
                                required
                                fullWidth
                                color={haystackError ? 'error' : 'primary'}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="needle">Solution</FormLabel>
                            <BottomNavigation
                                showLabels
                                sx={{}}
                                value={value}
                                onChange={handleChange}
                            >
                                <BottomNavigationAction
                                    label="Horizontal Scanning"
                                    value={Solution.HorizontalScanning}
                                    icon={<LooksOneOutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Vertical Scanning "
                                    value={Solution.VerticalScanning}
                                    icon={<LooksTwoOutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Divide and Conquer"
                                    value={Solution.DivideAndConquer}
                                    icon={<Looks3OutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Binary Search"
                                    value={Solution.BinarySearch}
                                    icon={<Looks4OutlinedIcon />}
                                />
                            </BottomNavigation>
                        </FormControl>

                        <div style={{ textAlign: "center" }}>
                            <ButtonGroup variant='contained' size='large' color='primary'>
                                <Button
                                    startIcon={<AutoFixHighIcon />}
                                    onClick={handleAutoFill}
                                >
                                    auto
                                </Button>

                                <Button
                                    startIcon={<OutputIcon />}
                                    onClick={handleSubmit}
                                    disabled={localHaystack.length === 0 || localNeedle.length === 0}
                                >
                                    submit
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Box>
                </Card>
            </Paper>
        </Container>
    );
}
