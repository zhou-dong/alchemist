import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

const formula = `function rotateRight(
    head: ListNode | null,
    k: number
): ListNode | null {
    if (!head || !k) return head;

    let length = 1;
    let current = head;
    while (current.next) {
        length++;
        current = current.next;
    }

    const newK = k % length;
    if (!newK) {
        return head;
    }

    const steps = length - newK;
    current.next = head;
    for (let i = 0; i < steps; i++) {
        current = current.next;
    }

    const newHead = current.next;
    current.next = null;
    return newHead;
};`;

const Head = () => {
    const { k, list } = useAlgoContext();

    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton disabled>
                <EmojiObjectsOutlinedIcon />
            </IconButton>

            <Stack sx={{ flexGrow: 1, alignItems: "center" }} spacing={2} direction="row">
                <Typography>
                    Solution
                </Typography>
                <Chip icon={<DataArrayIcon fontSize='small' />} label={list.join(",")} variant="outlined" />
                <Chip icon={<RotateRightIcon />} label={k || ""} variant="outlined" />
            </Stack>

            <IconButton color='info'>
                <DragIndicatorIcon fontSize='medium' />
            </IconButton>
        </Toolbar>
    );
};

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
