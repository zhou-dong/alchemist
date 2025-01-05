import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import ClearIcon from '@mui/icons-material/Clear';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import OutputIcon from '@mui/icons-material/Output';
import { IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { useAlgoContext } from '../AlgoContext';

import testCases from "./test-cases.json";

import { State } from '../AlgoState';
import { createButtons, createButtonsStyles, createComparedTable, createTableMatrix, createTableStyles, startPoint } from '../init';

const bases = 'ACGT';
const random = (max: number) => Math.floor(Math.random() * max);

const createRandom = (): string => {
    return Array(5).fill(bases.length).map(random).map(i => bases[i]).join('');
}

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
    if (Math.random() > 0.5) {
        const max = testCases.length;
        const index = Math.floor(Math.random() * max);
        return testCases[index].input;
    } else {
        const str1 = createRandom();
        const str2 = createRandom();
        return { str1, str2 };
    }
}

export default function Main() {

    const [localString1, setLocalString1] = React.useState("");
    const [localString2, setLocalString2] = React.useState("");
    const {
        setString1,
        setString2,
        setTable,
        setTableStyle,
        setSuccess,
        setState,
        setButtons,
        setButtonsStyles,
        setComparedTable,
        setCurrent,
        setSteps,
        setErrors,
    } = useAlgoContext();

    const [haystackError, setHaystackError] = React.useState(false);
    const [haystackErrorMessage, setHaystackErrorMessage] = React.useState('');
    const [needleError, setNeedleError] = React.useState(false);
    const [needleErrorMessage, setNeedleErrorMessage] = React.useState('');

    const handleAutoFill = () => {
        handleClear();
        const { str1, str2 } = getRandomTestCase();

        setLocalString1(str1);
        setLocalString2(str2);
    }

    React.useEffect(() => {
        handleClear();
        const { str1, str2 } = getRandomTestCase();

        setLocalString1(str1);
        setLocalString2(str2);
    }, [])

    const handleSubmit = () => {
        if (localString1.trim().length === 0) {
            setHaystackError(true)
            setHaystackErrorMessage("str1 can not be empty");
            return;
        }
        if (localString2.trim().length === 0) {
            setNeedleError(true);
            setNeedleErrorMessage("str2 can not be empty");
            return;
        }

        const table = createTableMatrix(localString1, localString2);
        const tableStyles = createTableStyles(localString1, localString2);
        const buttons = createButtons(localString1, localString2);
        const buttonsStyles = createButtonsStyles(localString1, localString2);
        const comparedTable = createComparedTable(localString1, localString2);

        setTable(table);
        setTableStyle(tableStyles);
        setButtons(buttons);
        setButtonsStyles(buttonsStyles);
        setComparedTable(comparedTable);

        setCurrent(startPoint);

        setSuccess(false);
        setSteps(0);
        setErrors(0);

        setState(State.Playing);

        setString1(localString1);
        setString2(localString2);

        handleClear();
    };

    const handleString1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (haystackError) {
            setHaystackError(false);
            setHaystackErrorMessage("");
        }
        setLocalString1(e.currentTarget.value);
    };

    const handleString2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (needleError) {
            setNeedleError(false);
            setNeedleErrorMessage("");
        }
        setLocalString2(e.currentTarget.value);
    };

    const handleClear = () => {
        setLocalString1("");
        setHaystackError(false);
        setHaystackErrorMessage("");
        setLocalString2("");
        setNeedleError(false);
        setNeedleErrorMessage("");
    }

    return (
        <Paper elevation={4} sx={{ padding: "25px", width: "400px" }}>
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
                    <FormLabel htmlFor="haystack">String1</FormLabel>
                    <TextField
                        onChange={handleString1Change}
                        error={haystackError}
                        helperText={haystackErrorMessage}
                        type="s"
                        name="haystack"
                        placeholder="larger string"
                        value={localString1}
                        autoFocus
                        required
                        fullWidth
                        color={haystackError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="needle">String2</FormLabel>
                    <TextField
                        onChange={handleString2Change}
                        error={needleError}
                        helperText={needleErrorMessage}
                        name="needle"
                        placeholder="substring"
                        value={localString2}
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
                        disabled={localString1.length === 0 || localString2.length === 0}
                    >
                        <OutputIcon />
                    </StyledButton>
                </Stack>
            </Box>
        </Paper>
    );
}
