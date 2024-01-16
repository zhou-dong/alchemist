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

    const execute = async ({ action, dummy, current, after, before, next }: Step) => {
        resetColors(dummy);

        switch (action) {
            case Action.New_Dummy: {
                dummy.show();
                break;
            }
            case Action.Assign_Dummy_Next_To_Head: {
                dummy.linkToNext?.show();
                break;
            }
            case Action.Define_Current: {
                enableColor(current);
                break;
            }
            case Action.Get_Duplicated_Value: {
                enableColor(current);
                enableColor(next);
                break;
            }
            case Action.Delete_Next: {
                enableColor(current);
                enableColor(after);
                enableColor(before);
                if (before) {
                    const { x, y, z } = before;
                    await before.move({ x, y: y - 2, z }, duration, () => {
                        current?.linkToNext?.refresh();
                        before.linkToNext?.refresh();
                    });
                    before.linkToNext?.hide();
                    before.hide();
                    const link = current?.linkToNext;
                    if (link) {
                        if (after) {
                            link.target = after;
                            link.refresh();
                        } else {
                            link.hide();
                        }
                    }
                }
                break;
            }
            case Action.Go_Next: {
                enableColor(next);
                break;
            }
            case Action.Return_Dummy_Next: {
                enableColor(dummy.next);
            }
        }
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
