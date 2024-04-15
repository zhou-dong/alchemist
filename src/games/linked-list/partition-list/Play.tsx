import { styled } from '@mui/system';
import { Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import { wait } from '../../../data-structures/_commons/utils';
import { duration, skinDefaultColor, skinDummyColor, skinEnabledColor, linkLength } from './styles';
import Code from './Code';
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Action, Step } from './stepsBuilder';
import { buildLink } from './nodeBuilder';

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const resetColors = (dummy: LinkedListNode<number> | undefined) => {
    if (dummy) {
        dummy.nodeSkin.color = skinDummyColor;
        resetColor(dummy.next);
    }
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
    const { scene, state, setState, animate, cancelAnimate, displayCode, steps, index, setIndex, current, smallDummy, largeDummy, small, large, head, setCurrent, setSmall, setLarge } = useAlgoContext();

    const execute = async ({ action, }: Step) => {
        resetColors(smallDummy);
        resetColors(largeDummy);

        switch (action) {
            case Action.New_Small_Dummy: {
                smallDummy?.show();
                break;
            }
            case Action.New_Large_Dummy: {
                largeDummy?.show();
                break;
            }
            case Action.Define_Small: {
                setSmall(smallDummy);
                enableColor(smallDummy);
                break;
            }
            case Action.Define_Large: {
                setLarge(largeDummy);
                enableColor(largeDummy);
                break;
            }
            case Action.Define_Head: {
                setCurrent(head);
                enableColor(head);
                break;
            }
            case Action.Append_Small: {
                enableColor(small);
                enableColor(current);
                if (small) {
                    const { x, y, z } = small;
                    small.next = current;
                    if (!small.linkToNext) {
                        if (current) {
                            small.linkToNext = buildLink(scene, small, current);
                            small.linkToNext.show();
                        }
                    } else {
                        if (current) {
                            small.linkToNext.target = current;
                        }
                    }
                    await current?.move({ x: x + linkLength, y, z }, duration, () => {
                        small.linkToNext?.refresh();
                        large?.linkToNext?.refresh();
                        current.linkToNext?.refresh();
                    });
                }
                break;
            }
            case Action.Small_Forward: {
                enableColor(small?.next);
                setSmall(small?.next);
                break;
            }
            case Action.Append_Large: {
                enableColor(large);
                enableColor(current);
                if (large) {
                    const { x, y, z } = large;
                    large.next = current;
                    if (!large.linkToNext) {
                        if (current) {
                            large.linkToNext = buildLink(scene, large, current);
                            large.linkToNext.show();
                        }
                    } else {
                        if (current) {
                            large.linkToNext.target = current;
                        }
                    }
                    await current?.move({ x: x + linkLength, y, z }, duration, () => {
                        large.linkToNext?.refresh();
                        small?.linkToNext?.refresh();
                        current.linkToNext?.refresh();
                    });
                }
                break;
            }
            case Action.Large_Forward: {
                enableColor(large?.next);
                setLarge(large?.next);
                break;
            }
            case Action.Current_Forward: {
                enableColor(current?.next);
                setCurrent(current?.next);
                break;
            }
            case Action.Remove_Large_Next: {
                if (large) {
                    enableColor(large);
                    large.next = undefined;
                    large.linkToNext?.hide();
                }
                break;
            }
            case Action.Connect_Small_Large: {
                enableColor(small);
                enableColor(largeDummy?.next);
                if (small) {
                    const next = largeDummy?.next;
                    small.next = next;
                    if (!small.linkToNext) {
                        if (next) {
                            small.linkToNext = buildLink(scene, small, next);
                            small.linkToNext.show();
                        }
                    } else {
                        if (next) {
                            small.linkToNext.target = next;
                        }
                    }
                    small?.linkToNext?.refresh();
                }
                break;
            }
            case Action.Return_Small_Dummy_Next: {
                smallDummy?.linkToNext?.hide();
                smallDummy?.hide();
                largeDummy?.linkToNext?.hide();
                largeDummy?.hide();
                enableColor(smallDummy?.next);
                break;
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
