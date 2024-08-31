import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { duration, skinDefaultColor } from './styles';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Action, Step } from './stepsBuilder';
import Code from "./Code";
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';
import { buildLink } from './AlgoInput';

const skinEnabledColor = "blue";

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const enableColor = (node: LinkedListNode<number | string> | undefined, color: string) => {
    if (node) {
        node.nodeSkin.color = color;
    }
}

const resetColor = (node: LinkedListNode<number | string> | undefined) => {
    if (node) {
        node.nodeSkin.color = skinDefaultColor;
        resetColor(node.next);
    }
}

const Play = () => {
    const { animate, cancelAnimate, state, setState, index, steps, setIndex, displayCode, scene } = useAlgoContext();

    const execute = async (step: Step) => {
        const { action, evenHead, even, odd } = step;

        resetColor(evenHead);
        resetColor(even);
        resetColor(odd);

        // switch (action) {
        //     case Action.define_odd: {
        //         enableColor(odd, skinEnabledColor);
        //         if (odd) {
        //             const { x, y, z } = odd;
        //             await odd.move({ x, y: y - 2, z }, duration, () => {
        //                 odd.linkToNext?.refresh();
        //             });
        //         }
        //         break;
        //     }
        //     case Action.define_even_head: {
        //         enableColor(evenHead, skinEnabledColor);
        //         break;
        //     }
        //     case Action.define_even: {
        //         enableColor(even, skinEnabledColor);
        //         if (even) {
        //             const { x, y, z } = even;
        //             await even.move({ x, y: y - 6, z }, duration, () => {
        //                 even.linkToNext?.refresh();
        //                 odd?.linkToNext?.refresh();
        //             });
        //         }
        //         break;
        //     }
        //     case Action.odd_next_to_even_next: {
        //         const next = even?.next;
        //         if (odd && next) {
        //             enableColor(next, skinEnabledColor);
        //             odd.next = next;
        //             if (!odd.linkToNext) {
        //                 odd.linkToNext = buildLink(scene, odd, next);
        //             }
        //             odd.linkToNext!.target = next;
        //             odd.linkToNext?.refresh();

        //             const { x, y, z } = next;
        //             await next.move({ x, y: y - 2, z }, duration, () => {
        //                 next.linkToNext?.refresh();
        //                 odd.linkToNext?.refresh();
        //                 even.linkToNext?.refresh();
        //             });
        //         }
        //         break;
        //     }
        //     case Action.odd_to_odd_next: {
        //         enableColor(odd, skinEnabledColor);
        //         break;
        //     }
        //     case Action.even_next_to_odd_next: {
        //         const next = odd?.next;
        //         if (!next) {
        //             even?.linkToNext?.hide();
        //         }
        //         if (even && next) {
        //             enableColor(next, skinEnabledColor);
        //             even.next = next;
        //             even.linkToNext!.target = next;
        //             const { x, y, z } = next;
        //             await next.move({ x, y: y - 6, z }, duration, () => {
        //                 next.linkToNext?.refresh();
        //                 odd.linkToNext?.refresh();
        //                 even.linkToNext?.refresh();
        //             });
        //         }
        //         break;
        //     }
        //     case Action.even_to_even_next: {
        //         enableColor(even, skinEnabledColor);
        //         break;
        //     }
        //     case Action.odd_next_to_even_head: {
        //         enableColor(evenHead, skinEnabledColor);
        //         if (odd && evenHead) {
        //             odd.next = evenHead;
        //             if (!odd.linkToNext) {
        //                 odd.linkToNext = buildLink(scene, odd, evenHead);
        //                 odd.linkToNext?.show();
        //             }
        //             odd.linkToNext!.target = evenHead;
        //             odd.linkToNext?.refresh();
        //         }
        //         break;
        //     }
        //     case Action.return_head: {
        //         break;
        //     }
        // }
    }

    const push = async () => {
        setState(State.Typing);
        console.log(index);

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
