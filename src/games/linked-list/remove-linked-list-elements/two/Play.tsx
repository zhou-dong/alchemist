import { styled } from '@mui/system';
import { Button } from "@mui/material";
import MouseIcon from '@mui/icons-material/Mouse';
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from "./AlgoContext";
import { State } from "../AlgoState";
import { wait } from '../../../../data-structures/_commons/utils';
import { duration, radius, skinDefaultColor, skinDisabledColor, skinDummyColor, skinEnabledColor } from '../styles';
import Code from './Code';
import { safeRun } from '../../../commons/utils';
import { Action, Step } from './stepsBuilder';
import { LinkedListNode } from '../../../../data-structures/list/linked-list/node.three';

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

const enableDummyColor = (node: LinkedListNode<number> | undefined) => {
    if (node) {
        node.nodeSkin.color = skinDummyColor;
    }
}

const Play = () => {
    const { state, setState, animate, cancelAnimate, displayCode, index, steps, setIndex, dummyHead, current, setCurrent } = useAlgoContext();

    const disabled: boolean = state !== State.Playing;

    const execute = async ({ action }: Step) => {
        resetListColor(dummyHead?.next);
        enableDummyColor(dummyHead);

        switch (action) {
            case Action.create_dummy_head: {
                dummyHead?.show();
                break;
            }
            case Action.dummy_head_next_to_head: {
                dummyHead?.linkToNext?.show();
                break;
            }
            case Action.define_current: {
                enableColor(dummyHead);
                setCurrent(dummyHead);
                break;
            }
            case Action.current_next_to_current_next_next: {
                const next = current?.next;
                const nextNext = current?.next?.next;
                enableColor(current);
                enableColor(next);
                enableColor(nextNext);

                if (next) {
                    const { x, y, z } = next;
                    await next.move({ x, y: y - 2 * radius, z }, duration, () => {
                        current.linkToNext?.refresh();
                        next.linkToNext?.refresh();
                    })
                }

                next?.nodeSkin.setColor(skinDisabledColor);
                next?.linkToNext?.hide();

                if (!nextNext) {
                    current?.linkToNext?.hide();
                } else {
                    if (current.linkToNext) {
                        current.linkToNext.target = nextNext;
                        current.linkToNext.refresh();
                    }
                }

                if (current) {
                    current.next = nextNext;
                }
                break;
            }
            case Action.current_to_current_next: {
                enableColor(current?.next);
                setCurrent(current?.next);
                break;
            }
            case Action.return_dummy_head_next: {
                enableColor(dummyHead?.next);
                dummyHead?.linkToNext?.hide();
                dummyHead?.hide();
                break;
            }
        }
    }

    const handleNextClick = async () => {
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
                    onClick={handleNextClick}
                    startIcon={state === State.Finished ? <CheckIcon /> : <MouseIcon />}
                    disabled={disabled}
                    size='large'
                    sx={{ zIndex: 1 }}
                >
                    Next
                </Button>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;
