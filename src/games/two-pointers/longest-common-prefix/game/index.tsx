import * as React from 'react';
import { Container, IconButton, Paper, styled, ToggleButton, Toolbar } from '@mui/material';
import { useAlgoContext } from '../AlgoContext';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Draggable from 'react-draggable';
import CodeIcon from '@mui/icons-material/Code';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { State } from '../AlgoState';
import Toolbox from '../toolbox';
import CodeSolution from './Code';
import { Solution } from './solution';
import HorizontalScanning from './horizontal-scanning';
import VerticalScanning from './vertical-scanning';
import DivideAndConquer from './divide-and-conquer';
import BinarySearch from './binary-search';

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

const Location = styled(Container)(({ }) => (({
    position: "fixed",
    top: '50%',
    left: "50%",
    transform: "translate(-50%,-50%)",
})));

const getGame = (solution: Solution) => {
    switch (solution) {
        case Solution.HorizontalScanning: return <HorizontalScanning />;
        case Solution.VerticalScanning: return <VerticalScanning />;
        case Solution.DivideAndConquer: return <DivideAndConquer />;
        case Solution.BinarySearch: return <BinarySearch />;
    }
}

const Main = () => {
    const [displayCode, setDisplayCode] = React.useState(false);
    const { solution } = useAlgoContext();
    const [lock, setLock] = React.useState(false);

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
                            {getGame(solution)}
                        </Paper>
                    </Draggable>
                </Container>
            </Location>
            {displayCode && <CodeSolution setDisplayCode={setDisplayCode} />}
        </>
    );
}

export default Main;
