import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { center, linkColor, skinDefaultColor, skinEnabledColor } from './styles';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Action, Step } from './algo';
import Code from "./Code";
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';
import Position from '../../../data-structures/_commons/params/position.interface';
import { SimpleLink } from '../../../data-structures/list/link.three';
import { circleToLine, updatePositions } from './circle';

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const resetListColor = (head: LinkedListNode<number> | undefined) => {
    const set: Set<LinkedListNode<number>> = new Set();
    let current: LinkedListNode<number> | undefined = head;
    while (current && !set.has(current)) {
        set.add(current);
        current.nodeSkin.color = skinDefaultColor;
        current = current.next
    }
}

const enableColor = (node: LinkedListNode<number> | undefined) => {
    if (node) {
        node.nodeSkin.color = skinEnabledColor;
    }
}

const Play = () => {
    const { animate, cancelAnimate, state, setState, index, steps, setIndex, displayCode, scene, } = useAlgoContext();

    const execute = async (step: Step) => {
        const { action, head, current, newHead } = step;
        resetListColor(head);

        switch (action) {
            case Action.Define_Current: {
                enableColor(current);
                break;
            }
            case Action.Find_Tail: {
                enableColor(current);
                break;
            }
            case Action.Tail_Connect_Head: {
                enableColor(current);
                if (head && current) {
                    const adjustSource = (position: Position): Position => position;
                    const adjustTarget = (position: Position): Position => position;
                    // current.next = head;
                    current.linkToNext = new SimpleLink(current, adjustSource, head, adjustTarget, scene, linkColor);
                    current.linkToNext.show();
                    await updatePositions(head);
                    await wait(0.1);
                }
                break;
            }
            case Action.Cut_Circle: {
                if (current) {
                    enableColor(newHead);
                    const newH = current.next;
                    current.next = undefined;
                    current.linkToNext?.hide();
                    if (newH) {
                        await circleToLine(newH);
                        await center(newH);
                    }
                }
                break;
            }
            case Action.Found_New_Head: {
                enableColor(newHead);
                break;
            }
            case Action.Return_New_Head: {
                enableColor(newHead);
                break;
            }
            case Action.Go_Next: {
                enableColor(current);
                break;
            }
        }
    }

    const push = async () => {
        setState(State.Typing);

        const step = steps[index];

        if (!step) return;

        await safeRun(() => execute(step), animate, cancelAnimate);
        await safeRun(() => wait(0.1), animate, cancelAnimate);

        const last = steps[steps.length - 1];
        if (step === last) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }

        setIndex(i => i + 1);
    }

    return (
        <>
            <MainPosition>
                <Button
                    sx={{ zIndex: 3 }}
                    onClick={push}
                    startIcon={state === State.Finished ? <CheckIcon /> : <MouseIcon />}
                    disabled={state !== State.Playing}
                    size="large"
                    variant='outlined'
                    color='success'
                >
                    Next
                </Button>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;
