import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { skinDefaultColor } from './styles';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Step } from './stepsBuilder';
import Code from "./Code";
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';

const pAColor = "orange";
const pBColor = "blue";

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 150,
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

const enableColor = (node: LinkedListNode<number | string> | undefined, color: string) => {
    if (node) {
        node.nodeSkin.color = color;
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
    } = useAlgoContext();

    const execute = async (step: Step) => {
        const { headA, headB, pA, pB } = step;
        resetListColor(headA);
        resetListColor(headB);

        enableColor(pA, pAColor);
        enableColor(pB, pBColor);
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
