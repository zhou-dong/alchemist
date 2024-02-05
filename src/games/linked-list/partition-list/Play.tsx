import { styled } from '@mui/system';
import { Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import { wait } from '../../../data-structures/_commons/utils';
import { duration, skinDefaultColor, skinDummyColor, skinEnabledColor } from './styles';
import Code from './Code';
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Action, Step } from './algo';

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const resetColors = (dummy: LinkedListNode<number>) => {
    dummy.nodeSkin.color = skinDummyColor;
    resetColor(dummy.next);
}

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

const Main = () => {
    const { state, setState, animate, cancelAnimate, displayCode, steps, index, setIndex } = useAlgoContext();

    const execute = async ({ action, current }: Step) => {
        // resetColors(dummy);

        // switch (action) {
        //     case Action.New_Small_Dummy: {
        //         dummy.show();
        //         break;
        //     }
        //     case Action.New_Large_Dummy: {
        //         dummy.linkToNext?.show();
        //         break;
        //     }
        // }
    }

    const doNext = async () => {
        const step = steps[index];
        if (!step) return;
        setState(State.Typing);
        await safeRun(() => execute(step), animate, cancelAnimate);
        await safeRun(() => wait(0.1), animate, cancelAnimate);
        if (index === steps.length - 1) {
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
