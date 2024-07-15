import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { skinDefaultColor } from './styles';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Action, Step } from './stepsBuilder';
import Code from "./Code";
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';

const skinSlowColor = "orange";
const skinFastColor = "blue";

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
    const { animate, cancelAnimate, state, setState, index, steps, setIndex, displayCode } = useAlgoContext();

    const execute = async (step: Step) => {
        const { action, head, slow, fast } = step;
        resetColor(head);
        enableColor(slow, skinSlowColor);
        enableColor(fast, skinFastColor);

        switch (action) {
            case Action.define_slow: {
                enableColor(slow, skinSlowColor);
                break;
            }
            case Action.define_fast: {
                enableColor(fast, skinFastColor);
                break;
            }
            case Action.update_slow: {
                enableColor(slow, skinSlowColor);
                break;
            }
            case Action.update_fast: {
                enableColor(fast, skinFastColor);
                break;
            }
            case Action.return_slow: {
                enableColor(slow, skinSlowColor);
                break;
            }
        }
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
