import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import ClearIcon from '@mui/icons-material/Clear';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import OutputIcon from '@mui/icons-material/Output';
import { ButtonGroup, Container, Paper } from '@mui/material';
import { useAlgoContext } from '../AlgoContext';

import testCases from "../toolbox/test-cases.json";
import { buildSteps, createTable, createTableStyle } from '../game/algo';
import { State } from '../AlgoState';

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
    const [needleError, setNeedleError] = React.useState(false);
    const [needleErrorMessage, setNeedleErrorMessage] = React.useState('');

    const [lock, setLock] = React.useState(false);

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

    const handleNeedleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (needleError) {
            setNeedleError(false);
            setNeedleErrorMessage("");
        }
        setLocalNeedle(e.currentTarget.value);
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
        setNeedleError(false);
        setNeedleErrorMessage("");
    }

    return (
        <Container maxWidth="sm">
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
                                color={haystackError ? 'error' : 'info'}
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
                                color={needleError ? 'error' : 'info'}
                            />
                        </FormControl>

                        <div style={{ textAlign: "center" }}>
                            <ButtonGroup variant='contained' size='large' color='info'>
                                <Button
                                    startIcon={<AutoFixHighIcon />}
                                    onClick={handleAutoFill}
                                >
                                    auto
                                </Button>

                                <Button
                                    startIcon={<ClearIcon />}
                                    onClick={handleClear}
                                >
                                    clear
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