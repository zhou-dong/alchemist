import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Action } from './algo';

export const skinFastColor = "lightblue";
export const skinSlowColor = "lightgreen";
export const skinDummyColor = "lightgray";

const formula = `function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || !k) return head;

    let length = 1;
    let current = head;
    while (current.next) {
        length++;
        current = current.next;
    }

    const newK = k % length;
    if (!newK) {
        return head;
    }

    const steps = length - newK;
    current.next = head;

    for (let i = 0; i < steps; i++) {
        current = current.next;
    }

    const newHead = current.next;
    current.next = null;
    return newHead;
};`;

const getLinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.Ready: return [1];
        case Action.Define_Fast: return [2];
        case Action.Define_Slow: return [3];
        case Action.Forward: return [6, 7];
        case Action.Return_True: return [9];
        case Action.Return_False: return [13];
    }
}

const Head = () => (
    <Toolbar variant='dense' sx={{ display: "flex" }}>
        <IconButton disabled>
            <ArrowRightAltIcon />
            <ArrowRightAltIcon />
        </IconButton>
        <Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: "center" }}>
            <Typography>
                Two Pointers Solution
            </Typography>
            <Chip
                sx={{ backgroundColor: `${skinSlowColor}`, color: "#000" }}
                label="slow"
            />
            <Chip
                sx={{ backgroundColor: `${skinFastColor}`, color: "#000" }}
                label="fast"
            />
        </Stack>
        <IconButton color='info'>
            <DragIndicatorIcon fontSize='medium' />
        </IconButton>
    </Toolbar>
);

const Body = () => {
    const { index, items } = useAlgoContext();
    const item = items[index];
    const linesToHighlight = item ? getLinesToHighlight(item.action) : [];

    return (
        <CodeBlock
            code={formula}
            language={languages.Typescript}
            showLineNumbers={true}
            linesToHighlight={linesToHighlight}
            wrapLines={true}
        />
    );
}

const MainPosition = styled("div")({
    position: 'fixed', bottom: 200, right: 60
});

const Main = () => (
    <MainPosition>
        <Draggable>
            <Paper elevation={8} sx={{ cursor: 'pointer' }}>
                <Stack spacing={0}>
                    <Head />
                    <Divider variant='middle' />
                    <Body />
                </Stack>
            </Paper>
        </Draggable>
    </MainPosition >
);

export default Main;
