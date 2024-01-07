import { styled } from '@mui/system';
import LoopIcon from '@mui/icons-material/Loop';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { Order } from './algo';
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import ReorderIcon from '@mui/icons-material/Reorder';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const formula = `function swapPairs(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head;
    }
    const temp = head.next;
    head.next = swapPairs(temp.next);
    temp.next = head;
    return temp;
};`;

const Code = () => {
    const { index, actions } = useAlgoContext();
    const action = actions[index - 1];
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
    const { index, actions } = useAlgoContext();

    const callStack: string[][] = [];
    for (let i = 0; i < index; i++) {
        const act = actions[i];
        if (act) {
            const { order, node1, node2 } = act;
            if (order === Order.PreOrder) {
                const spaces = Array(callStack.length).fill(nbsp + nbsp).join("");
                callStack.push([spaces, `mergeTwoLists(${node1?.data}, ${node2?.data})`]);
            } else {
                callStack.pop();
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
    </MainPosition>
);

export default Main;
