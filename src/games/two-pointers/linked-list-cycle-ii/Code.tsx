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

const formula = `function detectCycle(head: ListNode | null): ListNode | null {
    let fast = head;
    let slow = head;

    while (true) {
        if (fast === null || fast.next === null) return null;
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) break;
    }

    fast = head;
    while (fast !== slow) {
        fast = fast.next;
        slow = slow.next;
    }

    return fast;
};`

const getLinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.Ready: return [1];
        case Action.Define_Fast: return [2];
        case Action.Define_Slow: return [3];
        case Action.Detected_No_Cycle: return [6];
        case Action.Two_Steps_Forward: return [7, 8];
        case Action.Detected_Cycle: return [9];
        case Action.Reset_Head: return [12];
        case Action.One_Step_Forward: return [14, 15];
        case Action.Return_Cycle_Begin_Node: return [18];
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
                sx={{ backgroundColor: skinSlowColor, color: "#000" }}
                label="slow"
            />
            <Chip
                sx={{ backgroundColor: skinFastColor, color: "#000" }}
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
