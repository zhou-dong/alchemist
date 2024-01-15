import { styled } from '@mui/system';
import { Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import { wait } from '../../../data-structures/_commons/utils';
import { duration, skinDefaultColor, skinEnabledColor } from './styles';
import Position from '../../../data-structures/_commons/params/position.interface';
import Code from './Code';
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';

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

const Main = () => {
    const { state, setState, animate, cancelAnimate, displayCode, head, current, setLinesToHighlight, setCurrent } = useAlgoContext();

    const goNext = async (curr: LinkedListNode<number>, next: LinkedListNode<number>) => {
        if (curr.data === next.data) {
            enableColor(curr);
            enableColor(next);

            setLinesToHighlight([5]);
            const { x, y, z } = clonePosition(next);
            await next.move({ x, y: y - 2, z }, duration, () => {
                curr.linkToNext?.refresh();
                next.linkToNext?.refresh();
            });
            next.hide();
            next.linkToNext?.hide();
            if (next.next) {
                const link = curr.linkToNext;
                if (link) {
                    link.target = next.next;
                    link.refresh();
                }
            } else {
                curr.linkToNext?.hide();
            }
            curr.next = next.next;
        } else {
            enableColor(next);
            setLinesToHighlight([7]);
            setCurrent(next);
        }
    }

    const doNext = async () => {
        setState(State.Typing);
        resetColor(head);
        const next = current?.next;
        if (current && next) {
            await safeRun(() => goNext(current, next), animate, cancelAnimate);
            setState(State.Playing);
        } else {
            setLinesToHighlight([10]);
            setState(State.Finished);
        }
        await safeRun(() => wait(0.1), animate, cancelAnimate);
    }

    return (
        <>
            <MainPosition>
                <Button
                    onClick={doNext}
                    startIcon={state === State.Finished ? <CheckIcon /> : <MouseIcon />}
                    disabled={state !== State.Playing}
                    size='large'
                    sx={{ zIndex: 1 }}
                    variant='outlined'
                >
                    next
                </Button>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Main;
