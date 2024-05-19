import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

const formula = `let successor: ListNode | null = null;
function reverseN(node: ListNode | null, n: number) {
    if (n === 1) {
        successor = node.next;
        return node;
    }
    const last = reverseN(node.next, n - 1);
    node.next.next = node;
    node.next = successor;
    return last;
}

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (left === 1) {
        return reverseN(head, right);
    }
    head.next = reverseBetween(head.next, left - 1, right - 1);
    return head;
};`;

const Head = () => (
    <Toolbar variant='dense' sx={{ display: "flex" }}>
        <IconButton disabled>
            <EmojiObjectsOutlinedIcon />
        </IconButton>
        <Stack sx={{ flexGrow: 1, alignItems: "center" }} spacing={2} direction="row">
            <Typography>
                Solution
            </Typography>
        </Stack>
        <IconButton color='info'>
            <DragIndicatorIcon fontSize='medium' />
        </IconButton>
    </Toolbar>
);

const Body = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index - 1];
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
