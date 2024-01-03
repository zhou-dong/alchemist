import { styled } from '@mui/system';
import { Avatar, Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
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
    const { n, list, index, items } = useAlgoContext();
    const item = items[index];
    const length: number | undefined = item?.length;

    const Len = () => {
        if (length !== undefined) {
            return (<Avatar sx={{ bgcolor: "green" }}>{length}</Avatar>);
        } else {
            return (<></>);
        }
    }

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
                <Chip icon={<DataArrayIcon fontSize='small' />} label={list} variant="outlined" />
                <Chip icon={<NumbersIcon fontSize='small' />} label={n || ""} variant="outlined" />
                <Len />
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
