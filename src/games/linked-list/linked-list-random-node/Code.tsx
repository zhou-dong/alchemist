import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import ReorderIcon from '@mui/icons-material/Reorder';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { Action } from './stepsBuilder';

const formula = `class Solution {

    private readonly head: ListNode | null;

    constructor(head: ListNode | null) {
        this.head = head;
    }

    getRandom(): number {
        let result = 0;
        let index = 1;
        for (let node = this.head; node !== null; node = node.next) {
            if (Math.floor(Math.random() * index) === 0) {
                result = node.val;
            }
            index++;
        }
        return result;
    }
}`

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
                <Typography>Recursive Solution</Typography>
            </Stack>
            <IconButton color='info'>
                <DragIndicatorIcon fontSize='medium' />
            </IconButton>
        </Toolbar>
    );
}

const CallStack = () => {
    const nbsp = "\u00A0";
    const { index, steps } = useAlgoContext();

    const callStack: string[][] = [];

    for (let i = 0; i < index; i++) {
        const step = steps[i];
        if (step) {
            const { action, current } = step;
            switch (action) {
                case Action.recursively_check_start: {
                    const spaces = Array(callStack.length).fill(nbsp + nbsp).join("");
                    callStack.push([spaces, `swapPairs(${current?.data})`]);
                    break;
                }
                case Action.node_null_return_true: {
                    callStack.pop();
                    break;
                }
                case Action.recursively_non_eq_front_pointer_val: {
                    callStack.pop();
                    break;
                }
                case Action.update_front_pointer: {
                    callStack.pop();
                    break;
                }
                case Action.recursively_check_false: {
                    callStack.pop();
                    break;
                }
            }
        }
    }

    return (
        <List>
            <ListItem sx={{ paddingTop: 0, paddingBottom: 0, marginTop: "-7px" }}>
                <ListItemIcon>
                    <ReorderIcon />
                </ListItemIcon>
                <ListItemText primary="Call Stack" />
            </ListItem>
            <Divider variant='middle' sx={{ marginBottom: 1 }} />
            {
                callStack.map((m, i) =>
                    <ListItem key={i} sx={{ paddingTop: 0, paddingBottom: 0 }}>
                        {m[0]}
                        <ListItemIcon sx={{ minWidth: 0 }}>
                            <SubdirectoryArrowRightIcon color={(i + 1) === callStack.length ? "success" : "disabled"} />
                        </ListItemIcon>
                        <ListItemText primary={m[1]} />
                    </ListItem>
                )
            }
        </List>
    );
};

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
                    <Grid container spacing={0}>
                        <Grid item xs={7}>
                            <Code />
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation='vertical' />
                        </Grid>
                        <Grid item xs={4}>
                            <CallStack />
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>
        </Draggable>
    </MainPosition >
);

export default Main;
