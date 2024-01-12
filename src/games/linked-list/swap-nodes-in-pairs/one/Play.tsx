import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button, ButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../../data-structures/_commons/utils';
import { State } from '../AlgoState';
import { Action } from './algo';
import { duration, skinDefaultColor, skinEnabledColor } from '../styles';
import Position from "../../../../data-structures/_commons/params/position.interface";
import Code from './Code';
import { LinkedListNode } from '../../../../data-structures/list/linked-list/node.three';
import MouseIcon from '@mui/icons-material/Mouse';

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const resetColor = (node: LinkedListNode<number> | undefined) => {
    if (node) {
        node.nodeSkin.color = skinDefaultColor;
        resetColor(node.next);
    }
}

const enableColor = (node: LinkedListNode<number> | undefined) => {
    if (node) {
        node.nodeSkin.color = skinEnabledColor;
    }
}

const clonePosition = (node: LinkedListNode<number>): Position => {
    const { x, y, z } = node;
    return { x, y, z };
}

const swap = (a: LinkedListNode<number>, b: LinkedListNode<number>) => {
    const positionA = clonePosition(a);
    const positionB = clonePosition(b);

    if (a.next && a.linkToNext) {
        a.linkToNext.target = a.next;
    }

    if (b.next && b.linkToNext) {
        b.linkToNext.target = b.next;
    }

    const moveA = a.move(positionB, duration, () => a.linkToNext?.refresh());
    const moveB = b.move(positionA, duration, () => b.linkToNext?.refresh());

    return Promise.all([moveA, moveB]);
}

const safeRun = async (run: () => Promise<any>, animate: () => void, cancelAnimate: () => void) => {
    try {
        animate();
        await run();
    } catch (error) {
        console.log(error);
    } finally {
        cancelAnimate();
    }
}

const Play = () => {
    const { animate, cancelAnimate, state, setState, index, steps, setIndex, displayCode, listHead } = useAlgoContext();

    const push = async () => {
        const step = steps[index];
        if (!step) return;

        setState(State.Typing);

        const { head, next, action } = step;
        resetColor(listHead);
        enableColor(head);
        enableColor(next);

        if (action === Action.Swap && head && next) {
            if (head && next) {
                await safeRun(() => swap(head, next), animate, cancelAnimate);
            }
        }

        await safeRun(() => wait(0.1), animate, cancelAnimate);

        setIndex(i => i + 1);
        if (index === steps.length - 1) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }
    }

    return (
        <>
            <MainPosition>
                <ButtonGroup >
                    <Button
                        sx={{ zIndex: 3 }}
                        size='large'
                        onClick={push} startIcon={state === State.Finished ? <CheckIcon /> : <MouseIcon />}
                        disabled={state !== State.Playing}
                        color='success'
                        variant='outlined'
                    >
                        next
                    </Button>
                </ButtonGroup>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;
