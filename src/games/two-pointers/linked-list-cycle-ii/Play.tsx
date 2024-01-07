import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { skinDefaultColor } from './styles';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Action } from './algo';
import { skinFastColor, skinSlowColor } from './Code';
import Code from "./Code";
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

const resetListColor = (head: LinkedListNode<number> | undefined) => {
    const set: Set<LinkedListNode<number>> = new Set();
    let current: LinkedListNode<number> | undefined = head;
    while (current && !set.has(current)) {
        set.add(current);
        current.nodeSkin.color = skinDefaultColor;
        current = current.next
    }
}

const Play = () => {
    const { animate, cancelAnimate, state, setState, index, items, setIndex, displayCode, head } = useAlgoContext();

    const push = async () => {
        setState(State.Typing);

        const item = items[index + 1];

        if (!item) {
            setState(State.Finished);
            return;
        }

        const { action, fast, slow } = item;

        resetListColor(head);

        if (fast) {
            fast.nodeSkin.color = skinFastColor;
        }

        if (slow) {
            slow.nodeSkin.color = skinSlowColor;
        }

        if (action === Action.Define_Fast) {
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

        try {
            animate();
            await wait(0.2);
        } catch (error) {
            console.log(error);
        } finally {
            cancelAnimate();
        }

        const last = items[items.length - 1];
        if (item === last) {
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
