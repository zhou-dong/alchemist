import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import SortIcon from '@mui/icons-material/Sort';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const formula = `function merge(head1: ListNode | null, head2: ListNode | null) {
    const dummyHead = new ListNode();
    let temp = dummyHead, temp1 = head1, temp2 = head2;
    while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
            temp.next = temp1;
            temp1 = temp1.next;
        } else {
            temp.next = temp2;
            temp2 = temp2.next;
        }
        temp = temp.next;
    }
    if (temp1 !== null) {
        temp.next = temp1;
    } else if (temp2 !== null) {
        temp.next = temp2;
    }
    return dummyHead.next;
}

function sort(head: ListNode | null, tail: ListNode | null) {
    if (head === null) {
        return head;
    }
    if (head.next == tail) {
        head.next = null;
        return head;
    }
    let slow = head, fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }
    const list1 = sort(head, slow);
    const list2 = sort(slow, tail);
    return merge(list1, list2);
}

function sortList(head: ListNode | null): ListNode | null {
    return sort(head, null);
};`

const Code = () => {
    const { index, steps } = useAlgoContext();
    const action = steps[index - 1];
    const linesToHighlight: number[] = action ? action.linesToHighlight : [];

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

const Head = () => {
    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton disabled>
                <EmojiObjectsOutlinedIcon />
            </IconButton>
            <Stack sx={{ flexGrow: 1, alignItems: "center" }} spacing={2} direction="row">
                <Typography>Solution : </Typography>
                <Chip icon={<SortIcon />} label="Sort" variant="outlined" />
                <Typography>{">"} </Typography>
                <Chip icon={<SwapVertIcon />} label="Merge Sort" variant="outlined" />
            </Stack>
            <IconButton color='info'>
                <DragIndicatorIcon fontSize='medium' />
            </IconButton>
        </Toolbar>
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
                    <Code />
                </Stack>
            </Paper>
        </Draggable>
    </MainPosition >
);

export default Main;
