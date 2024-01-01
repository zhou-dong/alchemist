import { styled } from '@mui/system';
import { Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import NumbersIcon from '@mui/icons-material/Numbers';
import DataArrayIcon from '@mui/icons-material/DataArray';

const formula = `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {

    const dummy = new ListNode();
    dummy.next = head;
    let current = dummy;

    const stack: ListNode[] = [];
    while (current) {
        stack.push(current);
        current = current.next;
    }

    for (let i = 0; i < n; i++) {
        stack.pop();
    }

    const prev = stack.pop();
    prev.next = prev.next.next;

    return dummy.next;
};`;

const Head = () => {
    const { n, list } = useAlgoContext();
    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton disabled>
                <TableRowsOutlinedIcon />
            </IconButton>

            <Stack direction="row" sx={{ flexGrow: 1, alignItems: "center" }} spacing={2}>
                <Typography>
                    Stack Solution
                </Typography>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Chip icon={<DataArrayIcon fontSize='small' />} label={list} />
                <Chip icon={<NumbersIcon fontSize='small' />} label={n || ""} />
            </Stack>

            <IconButton color='info'>
                <DragIndicatorIcon />
            </IconButton>
        </Toolbar>
    );
}

const Code = () => {
    const { index, items } = useAlgoContext();
    const item = items[index];
    const linesToHighlight = item ? item.linesToHighlight : [];

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
    position: 'fixed', bottom: 200, right: 60,
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
    </MainPosition>
);

export default Main;
