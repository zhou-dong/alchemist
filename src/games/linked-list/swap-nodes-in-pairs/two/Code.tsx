import { styled } from '@mui/system';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import { useAlgoContext } from "./AlgoContext";
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const formula = `function swapPairs(head: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    dummy.next = head;

    let current = dummy;
    while (current.next && current.next.next) {
        const a = current.next;
        const b = current.next.next;

        current.next = b;
        a.next = b.next;
        b.next = a;
        current = a;
    }

    return dummy.next;
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
    const { linesToHighlight } = useAlgoContext();
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
