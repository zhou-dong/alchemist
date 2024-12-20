import * as React from 'react';
import { title } from "../description/Title";
import { Container, IconButton, Paper, Stack, styled, ToggleButton, Toolbar, Typography, useTheme } from '@mui/material';
import Table from '../../../dp/_components/Table';
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from '../AlgoContext';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Draggable from 'react-draggable';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CodeIcon from '@mui/icons-material/Code';
import MouseIcon from '@mui/icons-material/Mouse';
import { createHelperStyle } from './algo';
import { State } from '../AlgoState';
import Toolbox from '../toolbox';
import CodeSolution from './CodeSolution';

const Header: React.FC<{
    lock: boolean,
    setLock: React.Dispatch<React.SetStateAction<boolean>>,
    displayCode: boolean,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>,
}> = ({ lock, setLock, displayCode, setDisplayCode }) => (
    <Toolbar variant='dense' sx={{ display: "flex" }}>
        <IconButton color='primary' disabled={lock}>
            <DragIndicatorIcon fontSize='medium' />
        </IconButton>
        <IconButton onClick={() => setLock(open => !open)}>
            {lock ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
        </IconButton>
        <ToggleButton
            value={displayCode}
            selected={displayCode}
            onClick={() => setDisplayCode(open => !open)}
            size='small'
            sx={{
                border: "none",
                borderRadius: "50%",
            }}
        >
            <CodeIcon />
        </ToggleButton>
        <div style={{ flexGrow: 1 }} />
    </Toolbar>
);

const Location = styled(Container)(({ theme }) => (({
    position: "fixed",
    top: '40%',
    left: "50%",
    transform: "translate(-50%,-50%)",
})));

const Main = () => {
    const [displayCode, setDisplayCode] = React.useState(false);

    const theme = useTheme();
    const { table, setTable, tableStyle, steps, index, setIndex, setTableStyle, haystack, needle, state, setState } = useAlgoContext();

    const [lock, setLock] = React.useState(true);

    const handleClick = () => {
        if (state === State.Finished) {
            return;
        }
        const step = steps[index];
        const { row, col } = step;
        table[row + 2][col + 2] = "-";
        setTable(table);

        const style = createHelperStyle(haystack, needle, step);
        setTableStyle(style);

        if (index === steps.length - 1) {
            setState(State.Finished);
        }

        setIndex(index + 1);
    }

    const Body = () => (
        <Stack
            direction="column"
            spacing={5}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography
                variant='h5'
                display="inline-flex"
                sx={{
                    verticalAlign: 'middle',
                    fontWeight: 300,
                }}
            >
                {title}
            </Typography>

            <Table
                table={table}
                tableStyles={tableStyle}
            />

            <IconButton
                disabled={state !== State.Playing}
                onClick={handleClick}
                size='large'
                color='primary'
                sx={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: theme.palette.primary.light,
                    color: "#fff",
                    '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff",
                    },
                    '&&.Mui-selected': {
                        backgroundColor: theme.palette.primary.dark,
                        color: "#fff",
                    },
                    '&&.Mui-disabled': {
                        backgroundColor: "lightgray",
                        color: "#fff",
                    },
                }}
            >
                {state === State.Finished ? <CheckIcon /> : <MouseIcon />}
            </IconButton>
        </Stack>
    );

    return (
        <>
            <Toolbox current={State.Playing} />
            <Location>
                <Container maxWidth="lg">
                    <Draggable disabled={lock}>
                        <Paper
                            elevation={4}
                            sx={{
                                padding: "10px 0",
                                paddingBottom: "30px",
                                borderRadius: " 15px",
                            }}
                        >
                            <Header
                                lock={lock}
                                setLock={setLock}
                                displayCode={displayCode}
                                setDisplayCode={setDisplayCode}
                            />
                            <Body />
                        </Paper>
                    </Draggable>
                </Container>
            </Location>
            {displayCode && <CodeSolution setDisplayCode={setDisplayCode} />}
        </>
    );
}

export default Main;
