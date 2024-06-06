import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NumbersIcon from '@mui/icons-material/Numbers';
import { Button, Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import React from 'react';

const formula = `function insertionSortList(head: ListNode | null): ListNode | null {
    const dummyHead = new ListNode();
    dummyHead.next = head;

    let curr = head;
    while (curr && curr.next) {
        if (curr.val <= curr.next.val) {
            curr = curr.next;
        } else {
            let temp = curr.next;
            curr.next = curr.next.next;

            let prev = dummyHead;
            while (prev.next.val <= temp.val) {
                prev = prev.next;
            }

            temp.next = prev.next;
            prev.next = temp;
        }
    }

    return dummyHead.next;
};`

const Head = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index];

    const DisplayLeft: React.FC<{ left: number }> = ({ left }) => (
        <Button size='small' variant='outlined' startIcon={<ArrowBackIosIcon />} color='success'>left: {left}</Button>
    );

    const DisplayRight: React.FC<{ right: number }> = ({ right }) => (
        <Button size='small' variant='outlined' endIcon={<ArrowForwardIosIcon />} color='success'>right: {right}</Button>
    );

    const DisplayN: React.FC<{ num: number }> = ({ num }) => (
        <Chip icon={<NumbersIcon />} label={"n: " + num} variant="outlined" color='success' />
    );

    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton disabled>
                <EmojiObjectsOutlinedIcon />
            </IconButton>
            <Stack sx={{ flexGrow: 1, alignItems: "center" }} spacing={2} direction="row">
                <Typography>Solution</Typography>
                {step && step.left && <DisplayLeft left={step.left} />}
                {step && step.right && <DisplayRight right={step.right} />}
                {step && step.n && <DisplayN num={step.n} />}
            </Stack>
            <IconButton color='info'>
                <DragIndicatorIcon fontSize='medium' />
            </IconButton>
        </Toolbar>
    );
}

const Body = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index];
    const linesToHighlight = step?.linesToHighlight || [];

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
