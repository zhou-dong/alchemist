import { styled } from '@mui/system';
import { Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import NumbersIcon from '@mui/icons-material/Numbers';
import DataArrayIcon from '@mui/icons-material/DataArray';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';

const formula = `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {

    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }

    const dummy = new ListNode();
    dummy.next = head;
    current = dummy;

    for (let i = 0; i < length - n; i++) {
        current = current.next;
    }

    current.next = current.next.next;

    return dummy.next;
};`;

const Head = () => {
    const { n, list } = useAlgoContext();
    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton disabled>
                <FunctionsOutlinedIcon />
            </IconButton>

            <Stack direction="row" sx={{ flexGrow: 1, alignItems: "center" }} spacing={2}>
                <Typography>
                    Count List Length Solution
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
