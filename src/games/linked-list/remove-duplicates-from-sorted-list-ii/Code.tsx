import { styled } from '@mui/system';
import { Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import { useAlgoContext } from "./AlgoContext";
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const formula = `function deleteDuplicates(head: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    dummy.next = head;

    let current = dummy;
    while (current.next && current.next.next) {
        if (current.next.val === current.next.next.val) {
            const value = current.next.val;
            while (current.next && current.next.val === value) {
                current.next = current.next.next;
            }
        } else {
            current = current.next;
        }
    }

    return dummy.next;
};`

const MainPosition = styled("div")({
    position: 'fixed', bottom: 330, right: 60
});

const Head = () => {
    const { index, steps } = useAlgoContext();
    const action = steps[index - 1];
    const value = action?.value ? action.value + "" : "";
    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton disabled>
                <VerticalAlignBottomIcon />
            </IconButton>
            <Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: "center" }}>
                <Typography>
                    Iterative Solution
                </Typography>
                {value && <Chip label={value} sx={{ fontSize: 15, backgroundColor: "green", color: "#fff" }} />}
            </Stack>
            <IconButton color='info'>
                <DragIndicatorIcon />
            </IconButton>
        </Toolbar>
    );
}

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
