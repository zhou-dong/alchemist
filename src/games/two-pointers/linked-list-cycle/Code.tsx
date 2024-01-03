import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import InputIcon from '@mui/icons-material/Input';
import { Action } from './algo';

export const skinFastColor = "lightgreen";
export const skinSlowColor = "green";
export const skinDummyColor = "lightgray";

const formula = `function hasCycle(head: ListNode | null): boolean {
    let fast = head
    let slow = head;

    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) {
            return true;
        }
    }

    return false;
};`

const getLinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.Ready: return [1];
        case Action.New_Dummy: return [3];
        case Action.Link_Dummy_Head: return [4];
        case Action.Define_Fast: return [6];
        case Action.Define_Slow: return [7];
        case Action.Fast_Forward: return [10];
        case Action.Both_Forward: return [14, 15];
        case Action.Remove_Next: return [18];
        case Action.Return_Head: return [20];
    }
}

const Head = () => {
    const { list } = useAlgoContext();
    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton disabled>
                <ArrowRightAltIcon />
                <ArrowRightAltIcon />
            </IconButton>
            <Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: "center" }}>
                <Typography>
                    Two Pointers Solution
                </Typography>

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <Chip icon={<InputIcon fontSize='small' />} label={list} variant="outlined" />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Chip
                    sx={{ backgroundColor: `${skinSlowColor}`, color: "#fff" }}
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
}

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
