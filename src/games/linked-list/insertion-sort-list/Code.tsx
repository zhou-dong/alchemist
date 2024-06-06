import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

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
    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton disabled>
                <EmojiObjectsOutlinedIcon />
            </IconButton>
            <Stack sx={{ flexGrow: 1, alignItems: "center" }} spacing={2} direction="row">
                <Typography>Solution</Typography>
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
