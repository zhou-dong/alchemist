import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { BottomNavigation, BottomNavigationAction, Divider, IconButton, InputBase, List, ListItem, Paper, Stack } from '@mui/material';
import { useAlgoContext } from '../AlgoContext';

import testCases1 from "./test-cases-1.json";
import testCases2 from "./test-cases-2.json";
import { State } from '../AlgoState';

import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';

import OutputIcon from '@mui/icons-material/Output';
import ClearIcon from '@mui/icons-material/Clear';
import InputIcon from '@mui/icons-material/Input';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

import { getRandomeSolution, Solution } from '../game/solution';
import { buildSteps as buildHorizontalScanningSteps } from '../game/horizontal-scanning/algo';
import { buildSteps as buildVerticalScanningSteps } from '../game/vertical-scanning/algo';
import { buildSteps as buildDivideAndConquerSteps } from '../game/divide-and-conquer/algo';
import { buildSteps as buildBinarySearchSteps } from '../game/binary-search/algo';

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
    const testCases = [...testCases1, ...testCases2];
    const max = testCases.length;
    const index = Math.floor(Math.random() * max);
    return testCases[index];
}

const Card = styled(MuiCard)(({ theme }) => ({
    padding: theme.spacing(3),
    border: 0,
}));

const SelectSolution: React.FC<{
    localSolution: Solution | undefined,
    setLocalSolution: React.Dispatch<React.SetStateAction<Solution>>,
}> = ({
    localSolution,
    setLocalSolution,
}) => {
        const handleChange = (event: React.SyntheticEvent, newValue: any) => {
            if (Object.values(Solution).includes(newValue as Solution)) {
                const newSolution = newValue as Solution;
                setLocalSolution(newSolution);
            }
        };
        return (
            <FormControl>
                <FormLabel htmlFor="needle">Solution</FormLabel>
                <Paper variant='outlined' sx={{ padding: "15px 0" }}>
                    <BottomNavigation
                        showLabels
                        value={localSolution}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction
                            label={Solution.HorizontalScanning}
                            value={Solution.HorizontalScanning}
                            icon={<LooksOneOutlinedIcon />}
                        />
                        <BottomNavigationAction
                            label={Solution.VerticalScanning}
                            value={Solution.VerticalScanning}
                            icon={<LooksTwoOutlinedIcon />}
                        />
                        <BottomNavigationAction
                            label={Solution.DivideAndConquer}
                            value={Solution.DivideAndConquer}
                            icon={<Looks3OutlinedIcon />}
                        />
                        <BottomNavigationAction
                            label={Solution.BinarySearch}
                            value={Solution.BinarySearch}
                            icon={<Looks4OutlinedIcon />}
                        />
                    </BottomNavigation>
                </Paper>
            </FormControl>
        );
    }

const AddString: React.FC<{ setLocalStrings: React.Dispatch<React.SetStateAction<string[]>> }> = ({
    setLocalStrings
}) => {

    const [value, setValue] = React.useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const handleSubmit = () => {
        setLocalStrings(current => [...current, value]);
        setValue("");
    }

    const handleAutoFill = () => {
        const { input } = getRandomTestCase();
        setLocalStrings(input);
    }

    return (
        <Paper
            variant="outlined"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: "center",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
            }}
        >
            <IconButton
                onClick={handleAutoFill}
                color='primary'
            >
                <AutoFixHighIcon />
            </IconButton>

            <Divider sx={{ height: 28, m: 0.5, marginRight: 2 }} orientation="vertical" />

            <InputIcon sx={{ color: "gray" }} />

            <InputBase
                sx={{ ml: 1, flex: 1, }}
                placeholder='input string'
                value={value}
                onChange={handleChange}
            />

            <Divider sx={{ height: 28, m: 0.5, marginRight: 2 }} orientation="vertical" />

            <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="clear"
                disabled={!value.length}
                onClick={() => setValue("")}
            >
                <ClearIcon />
            </IconButton>

            <IconButton
                sx={{ p: '10px' }}
                aria-label="add string"
                disabled={!value.length}
                onClick={handleSubmit}
            >
                <DownloadIcon />
            </IconButton>
        </Paper>
    );
};

export default function Main() {

    const [localSolution, setLocalSolution] = React.useState<Solution>(getRandomeSolution());
    const [localStrings, setLocalStrings] = React.useState<string[]>(getRandomTestCase().input);

    const {
        setState,
        setSolution,
        setIndex,
        setHorizontalScanningSteps,
        setVerticalScanningSteps,
        setDivideAndConquerSteps,
        setBinarySearchSteps,
        setInput,
    } = useAlgoContext();

    const handleDeleteItem = (i: number) => {
        localStrings.splice(i, 1);
        setLocalStrings([...localStrings]);
    }

    const handleSubmit = () => {
        setIndex(0);
        setSolution(localSolution);

        switch (localSolution) {
            case Solution.HorizontalScanning:
                setHorizontalScanningSteps(buildHorizontalScanningSteps(localStrings));
                break;
            case Solution.VerticalScanning:
                setVerticalScanningSteps(buildVerticalScanningSteps(localStrings));
                break;
            case Solution.DivideAndConquer:
                setDivideAndConquerSteps(buildDivideAndConquerSteps(localStrings));
                break;
            case Solution.BinarySearch:
                setBinarySearchSteps(buildBinarySearchSteps(localStrings))
                break;
        }

        setInput(localStrings);
        setState(State.Playing);
        handleClear();
    };

    const handleClear = () => {
        setLocalStrings([]);
    };

    return (
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
                        <FormLabel htmlFor="needle">Strings</FormLabel>

                        <Paper variant='outlined' sx={{ padding: "10px" }}>
                            <AddString setLocalStrings={setLocalStrings} />
                            <List dense={false}>
                                {
                                    localStrings.map((localString, i) =>
                                        <ListItem
                                            key={i}
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => handleDeleteItem(i)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            {localString}
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Paper>
                    </FormControl>

                    <SelectSolution localSolution={localSolution} setLocalSolution={setLocalSolution} />

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
                            disabled={!localSolution || localStrings.length === 0}
                            onClick={handleSubmit}
                        >
                            <OutputIcon />
                        </StyledButton>
                    </Stack>
                </Box>
            </Card>
        </Paper>
    );
}
