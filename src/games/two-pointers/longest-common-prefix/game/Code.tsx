import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useAlgoContext } from '../AlgoContext';
import React from 'react';
import { BinarySearchSolution, DivideAndConquerSolution, HorizontalScanningSolution, Solution, VerticalScanningSolution } from './solution';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

const Head: React.FC<{
    lock: boolean,
    setLock: React.Dispatch<React.SetStateAction<boolean>>,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ lock, setLock, setDisplayCode }) => {
    const { solution } = useAlgoContext();
    const title = solution + " Solution (Typescript)";
    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton color='primary' disabled={lock}>
                <DragIndicatorIcon fontSize='medium' />
            </IconButton>
            <IconButton onClick={() => setLock(open => !open)}>
                {lock ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
            </IconButton>

            <Stack sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }} spacing={0} direction="row">
                <EmojiObjectsOutlinedIcon color='primary' />
                <Typography>{title}</Typography>
            </Stack>

            <IconButton onClick={() => setDisplayCode(false)}>
                <CloseIcon fontSize='medium' color='warning' />
            </IconButton>
        </Toolbar>
    );
};

const getCodeSolution = (solution: Solution): string => {
    switch (solution) {
        case Solution.HorizontalScanning: return HorizontalScanningSolution;
        case Solution.VerticalScanning: return VerticalScanningSolution;
        case Solution.DivideAndConquer: return DivideAndConquerSolution;
        case Solution.BinarySearch: return BinarySearchSolution;
    }
};

const Body = () => {
    const { index, solution, horizontalScanningSteps, verticalScanningSteps, divideAndConquerSteps, binarySearchSteps } = useAlgoContext();

    const getLinesToHighlights = () => {
        switch (solution) {
            case Solution.HorizontalScanning: return horizontalScanningSteps.map(step => step.linesToHighlight);
            case Solution.VerticalScanning: return verticalScanningSteps.map(step => step.linesToHighlight);
            case Solution.DivideAndConquer: return divideAndConquerSteps.map(step => step.linesToHighlight);
            case Solution.BinarySearch: return binarySearchSteps.map(step => step.linesToHighlight);
        }
    }

    const linesToHighlights: number[][] = getLinesToHighlights();
    const codeSolution = getCodeSolution(solution);
    const linesToHighlight = linesToHighlights[index - 1] || [];
    return (
        <CodeBlock
            code={codeSolution}
            language={languages.Typescript}
            showLineNumbers={true}
            linesToHighlight={linesToHighlight}
            wrapLines={true}
        />
    );
};

interface Props {
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = ({ setDisplayCode }: Props) => {
    const [lock, setLock] = React.useState(false);
    return (
        <Draggable disabled={lock}>
            <Paper elevation={8} sx={{ cursor: 'pointer', }}>
                <Stack spacing={0}>
                    <Head
                        lock={lock}
                        setLock={setLock}
                        setDisplayCode={setDisplayCode}
                    />
                    <Divider variant='middle' />
                    <Body />
                </Stack>
            </Paper>
        </Draggable>
    );
};

export default Main;
