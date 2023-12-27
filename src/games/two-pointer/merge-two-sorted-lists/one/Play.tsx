import * as React from 'react';
import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, ButtonGroup, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../../data-structures/_commons/utils';
import { State } from '../AlgoState';
import { Connection, Order } from './code';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { linkColor, skinPostOrderColor, skinPreOrderColor } from '../styles';
import CodeIcon from '@mui/icons-material/Code';
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import ReorderIcon from '@mui/icons-material/Reorder';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const formula = `function mergeTwoLists(list1, list2) {
    if (!list1) {
        return list2;
    }

    if (!list2) {
        return list1;
    }

    if (list1.val < list2.val) {
        const next = mergeTwoLists(list1.next, list2);
        list1.next = next;
        return list1;
    }

    const next = mergeTwoLists(list1, list2.next);
    list2.next = next;
    return list2;
};`;
let nbsp = "\u00A0"
const CodeDisplay = () => {
    const { index, actions } = useAlgoContext();
    const action = actions[index - 1];
    const linesToHighlight: number[] = action ? action.linesToHighlight : [];

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
        <div style={{ position: 'fixed', top: 330, left: 40, minWidth: 1000 }}>
            <Draggable>
                <Paper elevation={8} sx={{ cursor: 'pointer' }}>
                    <Stack spacing={0}>
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
                        <Divider variant='middle' />
                        <Grid container spacing={0}>
                            <Grid item xs={7}>
                                <CodeBlock
                                    code={formula}
                                    language={languages.Typescript}
                                    showLineNumbers={true}
                                    linesToHighlight={linesToHighlight}
                                    wrapLines={true}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Divider orientation='vertical' />
                            </Grid>
                            <Grid item xs={4}>
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
                                                    <SubdirectoryArrowRightIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={m[1]} />
                                            </ListItem>
                                        )
                                    }
                                </List>
                            </Grid>
                        </Grid>
                    </Stack>
                </Paper>
            </Draggable>
        </div>
    );
}

const Position = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const Play = () => {
    const { animate, cancelAnimate, state, setState, index, actions, setIndex, scene } = useAlgoContext();

    const push = async () => {

        const action = actions[index];

        if (!action) {
            return;
        }

        const { node1, node2, connection, order } = action;

        const connect1 = () => {
            if (node1 && node1.next) {
                if (node1.linkToNext) {
                    node1.linkToNext.target = node1.next;
                } else {
                    node1.linkToNext = new SimpleLink(node1, node1.next, scene, linkColor);
                    node1.linkToNext.show();
                }
                node1.linkToNext.refresh();
            }
        }

        const connect2 = () => {
            if (node2 && node2.next) {
                if (node2.linkToNext) {
                    node2.linkToNext.target = node2.next;
                } else {
                    node2.linkToNext = new SimpleLink(node2, node2.next, scene, linkColor);
                    node2.linkToNext.show();
                }
                node2.linkToNext.refresh();
            }
        }

        if (order === Order.PreOrder) {
            if (node1) {
                node1.nodeSkin.color = skinPreOrderColor;
            }
            if (node2) {
                node2.nodeSkin.color = skinPreOrderColor;
            }
        } else {
            if (node1) {
                node1.nodeSkin.color = skinPostOrderColor;
            }
            if (node2) {
                node2.nodeSkin.color = skinPostOrderColor;
            }
            switch (connection) {
                case Connection.None:
                    connect1();
                    connect2();
                    break;
                case Connection.One:
                    connect1();
                    break;
                case Connection.Two:
                    connect2();
                    break;
            }
        }

        try {
            animate();
            await wait(0.1);
        } catch (error) {
            console.log(error);
        } finally {
            cancelAnimate();
        }

        if (index === actions.length - 1) {
            setState(State.Finished);
        } else {
            setIndex(i => i + 1);
        }
    }

    const disabled: boolean = state !== State.Playing

    const [displayCode, setDisplayCode] = React.useState(false);

    const handleCodeDisplayToggle = () => {
        setDisplayCode(isOpen => !isOpen);
    }

    return (
        <>
            <Position>
                <ButtonGroup sx={{ zIndex: 3 }}>
                    <Button onClick={push} startIcon={state === State.Finished ? <CheckIcon /> : <MergeIcon />} disabled={disabled}>
                        merge
                    </Button>
                    <Button
                        onClick={handleCodeDisplayToggle}
                        endIcon={<CodeIcon />}
                        color={displayCode ? "info" : "inherit"}
                    >
                        code
                    </Button>
                </ButtonGroup>
            </Position>
            {displayCode && <CodeDisplay />}
        </>
    );
}

export default Play;
