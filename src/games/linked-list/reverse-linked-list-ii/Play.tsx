import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { linkColor, skinDefaultColor, skinEnabledColor, radius, linkLength, duration } from './styles';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Action, Step } from './stepsBuilder';
import Code from "./Code";
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';
import Position from '../../../data-structures/_commons/params/position.interface';
import { SimpleLink } from '../../../data-structures/list/link.three';

export const buildLink = (scene: THREE.Scene, node: LinkedListNode<number>, next: LinkedListNode<number>): SimpleLink => {

    const adjustSource = ({ x, y, z }: Position): Position => {
        const width = node.width;
        return { x: x + width / 2, y, z };
    }

    const adjustTarget = ({ x, y, z }: Position): Position => {
        const width = next.width;
        return { x: x - width / 2, y, z };
    }

    return new SimpleLink(node, adjustSource, next, adjustTarget, scene, linkColor);
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
    const { animate, cancelAnimate, state, setState, index, steps, setIndex, displayCode, scene, head } = useAlgoContext();

    const execute = async (step: Step) => {
        const { action, current, successor, last } = step;
        resetListColor(head);
        enableColor(current);

        switch (action) {
            case Action.assign_next_next_to_this: {
                const next = current.next;
                if (next) {
                    if (!next.linkToNext) {
                        next.linkToNext = buildLink(scene, next, current);
                    }
                    if (next.linkToNext) {
                        next.linkToNext.source = next;
                        next.linkToNext.target = current;

                        next.linkToNext.setColor("lightblue");

                        next.linkToNext.adjustSource = (p) => {
                            const { x, y, z } = p;
                            return { x: x - radius, y, z };
                        }

                        next.linkToNext.adjustTarget = (p) => {
                            const { x, y, z } = p;
                            return { x: x + radius, y, z };
                        }
                    }
                    next.linkToNext?.show();
                    next.linkToNext?.refresh();
                    enableColor(current);
                    enableColor(next);

                    next.next = current;
                }
                break;
            }
            case Action.assign_next_to_successor: {
                if (successor) {
                    if (!current.linkToNext) {
                        current.linkToNext = buildLink(scene, current, successor);
                    }
                    if (current.linkToNext) {
                        current.linkToNext.source = current;
                        current.linkToNext.target = successor;
                        current.linkToNext.setColor("lightblue");
                    }
                    current.linkToNext?.show();
                    current.linkToNext?.refresh();
                    enableColor(current);
                    enableColor(successor);

                    current.next = successor;
                }
                break;
            }
            case Action.assign_last_reverse_n: {
                enableColor(current);
                current.linkToNext?.hide();
                break;
            }
            case Action.assign_successor: {
                enableColor(current.next);
                enableColor(successor);
                break;
            }
            case Action.return_last: {
                if (last) {
                    let i = 0;
                    const { x, y, z } = current;
                    let node: LinkedListNode<number> | undefined = last;
                    const moves = [];
                    while (node && node !== successor) {
                        const temp = node;
                        const link = temp.linkToNext
                        const mv = node.move({ x: x + i * linkLength, y, z }, duration, () => {
                            if (link) {
                                link.adjustSource = (p) => {
                                    const { x, y, z } = p;
                                    return { x: x + radius, y, z };
                                }

                                link.adjustTarget = (p) => {
                                    const { x, y, z } = p;
                                    return { x: x - radius, y, z };
                                }
                                temp.linkToNext?.refresh();
                            }
                        })
                        moves.push(mv);
                        node = node.next;
                        i++;
                    }
                    await Promise.all(moves);
                }
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
