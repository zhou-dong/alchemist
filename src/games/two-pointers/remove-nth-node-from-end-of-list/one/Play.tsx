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
import Code from "./Code";

const skinFastColor = "lightgreen";
const skinSlowColor = "green";
const skinDummyColor = "lightgray";

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
            {displayCode && <Code />}
        </>
    );
}

export default Play;
