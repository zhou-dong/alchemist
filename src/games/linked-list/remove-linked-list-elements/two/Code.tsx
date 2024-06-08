import { styled } from '@mui/system';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import { useAlgoContext } from "./AlgoContext";
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const formula = `function removeElements(head: ListNode | null, val: number): ListNode | null {
    const dummyHead = new ListNode();
    dummyHead.next = head;

    let current = dummyHead;
    while (current.next) {
        if (current.next.val === val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }

    return dummyHead.next;
};`;

const MainPosition = styled("div")({
    position: 'fixed', bottom: 200, right: 60
});

const Head = () => (
    <Toolbar variant='dense' sx={{ display: "flex" }}>
        <IconButton disabled>
            <VerticalAlignBottomIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }}>
            <Typography>
                Iterative Solution
            </Typography>
        </div>
        <IconButton color='info'>
            <DragIndicatorIcon />
        </IconButton>
    </Toolbar>
);

const Body = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index];
    const linesToHighlight = step ? step.linesToHighlight : [];
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
    </MainPosition>
);

export default Main;
