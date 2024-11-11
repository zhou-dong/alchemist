import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import ClearIcon from '@mui/icons-material/Clear';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import OutputIcon from '@mui/icons-material/Output';
import { Container, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { useAlgoContext } from '../AlgoContext';

import testCases1 from "./test-cases.json";
import testCases2 from "./test-cases2.json"

import { buildSteps, createTable, createTableStyle } from '../game/algo';
import { State } from '../AlgoState';

const StyledButton = styled(IconButton)(({ theme }) => ({
    width: 60,
    height: 60,
    border: "1px solid lightgray",
    color: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: "#fff",
    },
    '&.Mui-disabled': {
        backgroundColor: 'lightgray',
        color: 'gray',
    },
}));

const getRandomTestCase = () => {
    const testCases = testCases1.concat(testCases2);
    const max = testCases.length;
    const index = Math.floor(Math.random() * max);
    return testCases[index];
}

export default function Main() {

    const [localHaystack, setLocalHaystack] = React.useState("");
    const [localNeedle, setLocalNeedle] = React.useState("");
    const { setHaystack, setNeedle, setTable, setTableStyle, setIndex, setSteps, setState } = useAlgoContext();

    const [haystackError, setHaystackError] = React.useState(false);
    const [haystackErrorMessage, setHaystackErrorMessage] = React.useState('');
    const [needleError, setNeedleError] = React.useState(false);
    const [needleErrorMessage, setNeedleErrorMessage] = React.useState('');

    const handleAutoFill = () => {
        handleClear();
        const { input } = getRandomTestCase();
        const { haystack, needle } = input;

        setLocalHaystack(haystack)
        setLocalNeedle(needle);
    }

    React.useEffect(() => {
        handleClear();
        const { input } = getRandomTestCase();
        const { haystack, needle } = input;

        setLocalHaystack(haystack)
        setLocalNeedle(needle);
    }, [])

    const handleSubmit = () => {
        if (localHaystack.trim().length === 0) {
            setHaystackError(true)
            setHaystackErrorMessage("Haystack can not be empty");
            return;
        }
        if (localNeedle.trim().length === 0) {
            setNeedleError(true);
            setNeedleErrorMessage("Needle can not be empty");
            return;
        }
        if (localNeedle.length > localHaystack.length) {
            setHaystackError(true)
            setHaystackErrorMessage("Haystack should longer than needle");
            setNeedleError(true);
            setNeedleErrorMessage("Haystack should longer than needle");
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
    };

    const handleHaystackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (haystackError) {
            setHaystackError(false);
            setHaystackErrorMessage("");
        }
        setLocalHaystack(e.currentTarget.value);
    };

    const handleNeedleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (needleError) {
            setNeedleError(false);
            setNeedleErrorMessage("");
        }
        setLocalNeedle(e.currentTarget.value);
    };

    const handleClear = () => {
        setLocalHaystack("");
        setHaystackError(false);
        setHaystackErrorMessage("");
        setLocalNeedle("");
        setNeedleError(false);
        setNeedleErrorMessage("");
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={4} sx={{ padding: "25px" }}>
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
                    <Typography variant='h5'>Input</Typography>
                    <FormControl>
                        <FormLabel htmlFor="haystack">Haystack</FormLabel>
                        <TextField
                            onChange={handleHaystackChange}
                            error={haystackError}
                            helperText={haystackErrorMessage}
                            type="s"
                            name="haystack"
                            placeholder="larger string"
                            value={localHaystack}
                            autoFocus
                            required
                            fullWidth
                            color={haystackError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="needle">Needle</FormLabel>
                        <TextField
                            onChange={handleNeedleChange}
                            error={needleError}
                            helperText={needleErrorMessage}
                            name="needle"
                            placeholder="substring"
                            value={localNeedle}
                            type="s"
                            required
                            fullWidth
                            color={needleError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <StyledButton
                            onClick={handleAutoFill}
                        >
                            <AutoFixHighIcon />
                        </StyledButton>

                        <StyledButton
                            onClick={handleClear}
                        >
                            <ClearIcon />
                        </StyledButton>

                        <StyledButton
                            onClick={handleSubmit}
                            disabled={localHaystack.length === 0 || localNeedle.length === 0}
                        >
                            <OutputIcon />
                        </StyledButton>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}
