import * as React from 'react';
import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import CheckIcon from '@mui/icons-material/Check';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import NumbersIcon from '@mui/icons-material/Numbers';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { Button, ButtonGroup, Chip, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../../data-structures/_commons/utils';
import { State } from '../AlgoState';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { linkColor, skinDefaultColor } from '../styles';
import CodeIcon from '@mui/icons-material/Code';
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import Position from "../../../../data-structures/_commons/params/position.interface";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { LinkedListNode } from '../../../../data-structures/list/linked-list/node.three';
import { Action } from './algo';

const skinFastColor = "lightgreen";
const skinSlowColor = "green";
const skinDummyColor = "lightgray";

const formula = `function removeNthFromEnd(head: ListNode | undefined, n: number): ListNode | undefined {

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

const getLinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.Ready: return [1];
        case Action.New_Dummy: return [3];
        case Action.Link_Dummy_Head: return [4];
        case Action.Define_Fast: return [6];
        case Action.Define_Slow: return [7];
        case Action.Fast_Forward: return [10];
        case Action.Both_Forward: return [14, 15];
        case Action.Remove_Next: return [18];
        case Action.Return_Head: return [20];
    }
}

const CodeDisplay = () => {
    const { index, items, n, list } = useAlgoContext();
    const item = items[index];
    const linesToHighlight = item ? getLinesToHighlight(item.action) : [];

    return (
        <div style={{ position: 'fixed', top: 345, right: 40 }}>
            <Draggable>
                <Paper elevation={8} sx={{ cursor: 'pointer' }}>
                    <Stack spacing={0}>
                        <Toolbar variant='dense' sx={{ display: "flex" }}>
                            <IconButton disabled>
                                <ArrowRightAltIcon />
                                <ArrowRightAltIcon />
                            </IconButton>
                            <IconButton disabled>
                            </IconButton>
                            <Stack direction="row" spacing={2} sx={{ flexGrow: 1, alignItems: "center" }}>
                                <Typography>
                                    Two Pointers Solution
                                </Typography>
                                <Chip icon={<DataArrayIcon />} label={list} />
                                <Chip icon={<NumbersIcon />} label={n || ""} />

                            </Stack>
                            <IconButton color='info'>
                                <DragIndicatorIcon fontSize='medium' />
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
                        <Divider variant='middle' />

                        <Toolbar variant='dense'>
                            <Stack direction="row" spacing={2}
                                sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
                            >
                                <Chip
                                    sx={{ backgroundColor: `${skinDummyColor}`, color: "#000" }}
                                    label="dummy node"
                                />
                                <Chip
                                    sx={{ backgroundColor: `${skinDefaultColor}`, color: "#000" }}
                                    label="default node"
                                />
                                <Chip
                                    sx={{ backgroundColor: `${skinSlowColor}`, color: "#fff" }}
                                    label="slow node"
                                />
                                <Chip
                                    sx={{ backgroundColor: `${skinFastColor}`, color: "#000" }}
                                    label="fast node"
                                />
                            </Stack>
                        </Toolbar>
                    </Stack>
                </Paper>
            </Draggable>
        </div >
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

const resetListColor = (head: LinkedListNode<number>) => {
    let current: LinkedListNode<number> | undefined = head;
    while (current) {
        current.nodeSkin.color = skinDefaultColor;
        current = current.next
    }
}

const Play = () => {
    const { animate, cancelAnimate, state, setState, index, items, setIndex, scene } = useAlgoContext();

    const push = async () => {
        setState(State.Typing);

        const item = items[index + 1];

        if (!item) {
            setState(State.Finished);
            return;
        }

        const { dummy, action, fast, slow } = item;

        if (dummy) {
            dummy.show();
            dummy.nodeSkin.color = "lightgray";
        }

        if (action === Action.Link_Dummy_Head && dummy && dummy.next) {
            const adjustSource = ({ x, y, z }: Position): Position => {
                const width = dummy.width;
                return { x: x + width / 2, y, z };
            }
            const adjustTarget = ({ x, y, z }: Position): Position => {
                const width = dummy.next?.width || 0;
                return { x: x - width / 2, y, z };
            }
            dummy.linkToNext = new SimpleLink(dummy, adjustSource, dummy.next, adjustTarget, scene, linkColor);
            dummy.linkToNext.show();
        }

        if (dummy?.next) {
            resetListColor(dummy.next);
        }

        if (fast) {
            fast.nodeSkin.color = skinFastColor;
        }

        if (slow) {
            slow.nodeSkin.color = skinSlowColor;
        }

        if (action === Action.Remove_Next) {
            if (slow && slow.next) {

                try {
                    const duration = 1.5;
                    const { x, y, z } = slow.next
                    animate();

                    slow.next.nodeSkin.color = "lightgray";
                    slow.next.nodeText.color = "#000";
                    await slow.next.move({ x, y: y - 2, z }, duration, () => {
                        slow.linkToNext?.refresh();
                        slow.next?.linkToNext?.refresh()
                    })

                    slow.next.linkToNext?.hide();
                    slow.next.hide();
                } catch (error) {
                    console.log(error);
                } finally {
                    cancelAnimate();
                }

                if (slow.next.next) {
                    slow.linkToNext!.target = slow.next.next;
                    slow.linkToNext?.refresh();
                } else {
                    slow.linkToNext?.hide();
                    slow.next.linkToNext?.hide();
                }
            }

            if (slow) {
                slow.next = slow.next?.next;
            }
        }

        if (action === Action.Return_Head) {
            dummy?.hide();
            dummy?.linkToNext?.hide();
        }

        try {
            animate();
            await wait(0.2);
        } catch (error) {
            console.log(error);
        } finally {
            cancelAnimate();
        }

        setIndex(i => i + 1);
        setState(State.Playing);
    }

    const disabled: boolean = state !== State.Playing

    const [displayCode, setDisplayCode] = React.useState(true);

    const handleCodeDisplayToggle = () => {
        setDisplayCode(isOpen => !isOpen);
    }

    return (
        <>
            <MainPosition>
                <ButtonGroup sx={{ zIndex: 3 }}>
                    <Button onClick={push} startIcon={state === State.Finished ? <CheckIcon /> : <MergeIcon />} disabled={disabled}>
                        Next
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
