import * as React from 'react';
import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
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
import Position from "../../../../data-structures/_commons/params/position.interface";

const formula = `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {

    const dummy = new ListNode();
    dummy.next = head;

    let fast = dummy;
    let slow = dummy;

    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return dummy.next;
};`

const nbsp = "\u00A0";

const CodeDisplay = () => {
    // const { linesToHighlight } = useAlgoContext();
    const linesToHighlight = [1];

    return (
        <div style={{ position: 'fixed', top: 330, left: 40 }}>
            <Draggable>
                <Paper elevation={8} sx={{ cursor: 'pointer' }}>
                    <Stack spacing={0}>
                        <Toolbar variant='dense' sx={{ display: "flex" }}>
                            <IconButton disabled>
                                <VerticalAlignBottomIcon />
                            </IconButton>
                            <div style={{ flexGrow: 1 }}>
                                <Typography>
                                    Iterative Solution
                                </Typography>
                            </div>
                            <IconButton color='info'>
                                <DragIndicatorIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider variant='middle' />
                        <CodeBlock
                            code={formula}
                            language={languages.Typescript}
                            showLineNumbers={true}
                            linesToHighlight={linesToHighlight}
                            wrapLines={true}
                        />
                    </Stack>
                </Paper>
            </Draggable>
        </div>
    );
}

const MainPosition = styled("div")({
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

                    const adjustSource = ({ x, y, z }: Position): Position => {
                        const width = node1.width;
                        return { x: x + width / 2, y, z };
                    }

                    const adjustTarget = ({ x, y, z }: Position): Position => {
                        const width = node1.next?.width || 0;
                        return { x: x - width / 2, y, z };
                    }

                    node1.linkToNext = new SimpleLink(node1, adjustSource, node1.next, adjustTarget, scene, linkColor);
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
                    const adjustSource = ({ x, y, z }: Position): Position => {
                        const width = node2.width;
                        return { x: x + width / 2, y, z };
                    }

                    const adjustTarget = ({ x, y, z }: Position): Position => {
                        const width = node2.next?.width || 0;
                        return { x: x - width / 2, y, z };
                    }
                    node2.linkToNext = new SimpleLink(node2, adjustSource, node2.next, adjustTarget, scene, linkColor);
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
            <MainPosition>
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
            </MainPosition>
            {displayCode && <CodeDisplay />}
        </>
    );
}

export default Play;
