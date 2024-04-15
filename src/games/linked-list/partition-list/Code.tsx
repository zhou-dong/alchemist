import { styled } from '@mui/system';
import { Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const formula = `function partition(
    head: ListNode | null, 
    x: number
): ListNode | null {

    const smallDummy = new ListNode();
    const largeDummy = new ListNode();
    let small = smallDummy;
    let large = largeDummy;

    let current = head;
    while (current) {
        if (current.val < x) {
            small.next = current;
            small = small.next;
        } else {
            large.next = current;
            large = large.next;
        }
        current = current.next;
    }

    large.next = null;
    small.next = largeDummy.next;

    return smallDummy.next;
};`;

const MainPosition = styled("div")({
    position: 'fixed', bottom: 330, right: 60
});

const Head = () => {
    const { x } = useAlgoContext();
    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton disabled>
                <EmojiObjectsOutlinedIcon />
            </IconButton>
            <Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: "center" }}>
                <Typography>
                    Solution
                </Typography>
                {x && <Chip icon={<HighlightOffIcon fontSize='small' />} label={x} variant='outlined' />}
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
