import { styled } from '@mui/system';
import LoopIcon from '@mui/icons-material/Loop';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import ReorderIcon from '@mui/icons-material/Reorder';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { Action } from './stepsBuilder';

const formula1 = `function removeElements(head: ListNode | null, val: number): ListNode | null {
    if (head === null) {
        return head;
    }
    head.next = removeElements(head.next, val);
    return head.val === val ? head.next : head;
};`;

const formula2 = `function removeElements(head: ListNode | null, val: number): ListNode | null {
    if (head === null) {
        return head;
    }
    const next = removeElements(head.next, val);
    head.next = next;
    if (head.val === val) {
        return head.next;
    } else {
        return head;
    }
};`;

const Code1 = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index - 1];
    const linesToHighlight: number[] = step ? step.linesToHighlight1 : [];
    return (
        <CodeBlock
            code={formula1}
            language={languages.Typescript}
            showLineNumbers={true}
            linesToHighlight={linesToHighlight}
            wrapLines={true}
        />
    );
}

const Code2 = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index - 1];
    const linesToHighlight: number[] = step ? step.linesToHighlight2 : [];
    return (
        <CodeBlock
            code={formula2}
            language={languages.Typescript}
            showLineNumbers={true}
            linesToHighlight={linesToHighlight}
            wrapLines={true}
        />
    );
}

const Head = () => (
    <Toolbar variant='dense' sx={{ display: "flex" }}>
        <IconButton disabled>
            <LoopIcon />
        </IconButton>
        <Typography component="div" sx={{ flexGrow: 1 }}>
            Recursive Solution
        </Typography>
        <div>
            <IconButton color='info'>
                <DragIndicatorIcon />
            </IconButton>
        </div>
    </Toolbar>
);

const CallStack = () => {
    const nbsp = "\u00A0";
    const { index, steps } = useAlgoContext();

    const callStack: string[][] = [];
    for (let i = 0; i < index; i++) {
        const step = steps[i];
        if (step) {
            const { action, num, head } = step;
            const headVal = (head === undefined) ? "null" : head.data + "";
            if (action === Action.recursive) {
                const spaces = Array(callStack.length).fill(nbsp + nbsp).join("");
                callStack.push([spaces, `removeElements(${headVal}, ${num})`]);
            } else {
                if (action === Action.return_null || action === Action.return_head || action === Action.return_head_next) {
                    callStack.pop();
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
    position: 'fixed', bottom: 200, right: 60, minWidth: 1000
});

const Main = () => (
    <MainPosition>
        <Draggable>
            <Paper elevation={8} sx={{ cursor: 'pointer' }}>
                <Stack spacing={0}>
                    <Head />
                    <Divider variant='middle' />
                    <Grid container spacing={0}>
                        <Grid container xs={7} direction="column" overflow="auto">
                            <Grid item>
                                <Code1 />
                            </Grid>
                            <Divider variant='middle' />
                            <Grid item>
                                <Code2 />
                            </Grid>
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
    </MainPosition>
);

export default Main;
