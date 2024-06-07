import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { skinDefaultColor, skinEnabledColor, radius, duration, skinDummyColor, linkLength } from './styles';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Action, Step } from './stepsBuilder';
import Code from "./Code";
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';
import { buildLink } from './AlgoInput';

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const resetListColor = (head: LinkedListNode<number | string> | undefined) => {
    const set: Set<LinkedListNode<number | string>> = new Set();
    let current: LinkedListNode<number | string> | undefined = head;
    while (current && !set.has(current)) {
        set.add(current);
        current.nodeSkin.color = skinDefaultColor;
        current = current.next
    }
}

const enableColor = (node: LinkedListNode<number | string> | undefined) => {
    if (node) {
        node.nodeSkin.color = skinEnabledColor;
    }
}

const enableDummyColor = (node: LinkedListNode<number | string> | undefined) => {
    if (node) {
        node.nodeSkin.color = skinDummyColor;
    }
}

const resetDummy = (node: LinkedListNode<number | string> | undefined) => {
    if (node) {
        node.nodeSkin.color = skinDummyColor;
    }
}

const Play = () => {
    const {
        animate,
        cancelAnimate,
        state,
        setState,
        index,
        steps,
        setIndex,
        displayCode,
        scene,
        head,
        current,
        dummyHead,
        temp,
        setTemp,
        setCurrent,
        prev,
        setPrev,
        nextNext,
        setNextNext
    } = useAlgoContext();

    const execute = async (step: Step) => {
        const { action } = step;
        resetListColor(dummyHead);
        resetDummy(dummyHead);

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
                setCurrent(head);
                enableColor(head);
                break;
            }
            case Action.current_to_current_next: {
                enableColor(current?.next);
                setCurrent(current?.next);
                break;
            }
            case Action.define_temp: {
                setTemp(current?.next);
                enableColor(current?.next);
                const next = current?.next;
                if (next) {
                    const { x, y, z } = next;
                    await next.move({ x, y: y + radius * 2, z }, duration, () => {
                        current.linkToNext?.refresh();
                        next.linkToNext?.refresh();
                    })
                }
                break;
            }
            case Action.current_next_to_current_next_next: {
                enableDummyColor(temp);
                enableColor(current);
                enableColor(current?.next?.next);
                const nextNext = current?.next?.next;
                setNextNext(nextNext);

                if (current) {
                    current.next = nextNext;
                }

                if (current && !nextNext) {
                    current.linkToNext?.hide();
                    current.linkToNext = undefined;
                }

                if (current && nextNext) {
                    if (!current.linkToNext) {
                        current.linkToNext = buildLink(scene, current, nextNext);
                    }
                    current.linkToNext!.target = nextNext;
                    current.linkToNext.refresh();
                    current.linkToNext.show();
                }
                break;
            }
            case Action.define_prev: {
                enableDummyColor(temp);
                enableDummyColor(current);
                enableColor(dummyHead);
                setPrev(dummyHead);
                break;
            }
            case Action.prev_to_prev_next: {
                enableDummyColor(temp);
                enableDummyColor(current);
                enableColor(prev?.next);
                setPrev(prev?.next);
                break;
            }
            case Action.temp_next_to_prev_next: {
                if (temp) {
                    temp.next = prev?.next;

                    if (prev?.next) {
                        if (!temp.linkToNext) {
                            temp.linkToNext = buildLink(scene, temp, prev.next);
                        }
                        temp.linkToNext!.target = prev.next;
                        temp.linkToNext.refresh();
                        temp.linkToNext.show();
                    }
                }
                break;
            }
            case Action.prev_next_to_temp: {
                if (prev && temp) {

                    const next = prev.next;

                    prev.next = temp;

                    if (!prev.linkToNext) {
                        prev.linkToNext = buildLink(scene, prev, temp);
                    }
                    prev.linkToNext!.target = temp;
                    prev.linkToNext.refresh();
                    prev.linkToNext.show();

                    const nodes = [];
                    let start = temp.next;
                    while (start && start !== nextNext) {
                        nodes.push(start);
                        start = start?.next
                    }

                    const moves = nodes.map(node => {
                        const { x, y, z } = node;
                        node.move({ x: x + linkLength, y, z }, duration, () => {
                            node.linkToNext?.refresh();
                        })
                    })

                    if (next) {
                        const { x, y, z } = next;
                        const move = temp.move({ x, y, z }, duration, () => {
                            prev.linkToNext?.refresh();
                            temp.linkToNext?.refresh();
                        });

                        await Promise.all([...moves, move]).then(() => { });
                    }
                }
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
