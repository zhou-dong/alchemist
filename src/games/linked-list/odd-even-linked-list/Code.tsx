import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';


const formula = `function oddEvenList(head: ListNode | null): ListNode | null {
    if (head === null) {
        return null;
    }
    const evenHead = head.next;
    let even = evenHead;
    let odd = head;
    while (even !== null && even.next !== null) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
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
                <Typography>Solution</Typography>
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
