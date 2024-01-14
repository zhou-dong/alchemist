import { styled } from '@mui/system';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import { useAlgoContext } from "./AlgoContext";
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const formula = `function deleteDuplicates(head: ListNode | null): ListNode | null {
    let current = head;
    while (current && current.next) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    return head;
};`;

const MainPosition = styled("div")({
    position: 'fixed', bottom: 330, right: 60
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
