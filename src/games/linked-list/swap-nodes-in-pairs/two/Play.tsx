import { styled } from '@mui/system';
import { Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from "./AlgoContext";
import { State } from "../AlgoState";
import { wait } from '../../../../data-structures/_commons/utils';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { duration, linkColor, skinDefaultColor, skinDummyColor, skinEnabledColor } from '../styles';
import Position from '../../../../data-structures/_commons/params/position.interface';
import Code from './Code';
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../../commons/utils';
import { Action, Step } from './algo';
import { LinkedListNode } from '../../../../data-structures/list/linked-list/node.three';
import { LinkedListNodeText } from '../../../../data-structures/list/list-node-base';

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const resetLink = (node: LinkedListNode<number>, scene: THREE.Scene) => {
    if (node.next) {
        if (node.linkToNext === undefined) {
            node.linkToNext = buildLink(node, node.next, scene);
            node.linkToNext.show();
        }
    } else {
        node.linkToNext?.hide();
    }
}

const buildLink = (source: LinkedListNode<number>, target: LinkedListNode<number>, scene: THREE.Scene) => {
    const adjustSource = ({ x, y, z }: Position): Position => {
        const width = source.width;
        return { x: x + width / 2, y, z };
    }
    const adjustTarget = ({ x, y, z }: Position): Position => {
        const width = target.width || 0;
        return { x: x - width / 2, y, z };
    }
    return new SimpleLink(source, adjustSource, target, adjustTarget, scene, linkColor);
}

const swap = (a: LinkedListNode<number>, b: LinkedListNode<number>, scene: THREE.Scene, update: () => any) => {
    const positionA = clonePosition(a);
    const positionB = clonePosition(b);

    resetLink(a, scene);
    resetLink(b, scene);

    const moveA = a.move(positionB, duration, () => {
        update();
        a.linkToNext?.refresh()
    });
    const moveB = b.move(positionA, duration, () => {
        b.linkToNext?.refresh()
    });

    return Promise.all([moveA, moveB]);
}

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

const clonePosition = (node: LinkedListNode<number>): Position => {
    const { x, y, z } = node;
    return { x, y, z };
}


const refreshLink = (node?: LinkedListNode<number>, next?: LinkedListNode<number>) => {
    const link = node?.linkToNext;
    if (link && next) {
        link.target = next;
        link.refresh();
        link.show();
    }
}

const displayIndicator = (node?: LinkedListNode<number>, indicator?: LinkedListNodeText) => {
    if (node && indicator) {
        indicator.x = node.x - 0.2;
        indicator.y = node.y + 1.5;
        indicator.z = node.nodeText.z;
        indicator.show();
    }
}

const Main = () => {
    const { scene, state, setState, animate, cancelAnimate, displayCode, index, steps, setIndex, currentText, aText, bText } = useAlgoContext();

    const goNext = async (step: Step) => {
        const { action, dummy, current, a, b, temp } = step;
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
                displayIndicator(current, currentText);
                break;
            }
            case Action.Define_A: {
                resetColors(dummy);
                enableColor(a);
                displayIndicator(a, aText);
                displayIndicator(current, currentText);
                bText?.hide();
                break;
            }
            case Action.Define_B: {
                resetColors(dummy);
                enableColor(b);
                displayIndicator(b, bText);
                break;
            }
            case Action.Assign_Current_Next_To_B: {
                resetColors(dummy);
                enableColor(current);
                enableColor(current?.next);
                refreshLink(current, current?.next);
                break;
            }
            case Action.Assign_A_Next_To_B_Next: {
                resetColors(dummy);
                enableColor(a);
                enableColor(temp);
                refreshLink(a, temp);
                break;
            }
            case Action.Assign_B_Next_To_A: {
                resetColors(dummy);
                enableColor(b);
                enableColor(b?.next);
                refreshLink(b, b?.next);
                refreshLink(a, temp);
                await wait(0.5);
                if (a && b) {
                    const update = () => current?.linkToNext?.refresh();
                    await safeRun(() => swap(a, b, scene, update), animate, cancelAnimate);
                    displayIndicator(a, aText);
                    displayIndicator(b, bText);
                }
                break;
            }
            case Action.Assign_Current_To_A: {
                resetColors(dummy);
                enableColor(current);
                displayIndicator(current, currentText);
                refreshLink(current, temp);
                aText?.hide();
                bText?.hide();
                break;
            }
            case Action.Return_Dummy_Next: {
                resetColors(dummy);
                currentText?.hide();
                aText?.hide();
                bText?.hide();
                break;
            }
        }
    }

    const doNext = async () => {
        const step = steps[index];
        if (!step) return;

        setState(State.Typing);

        await goNext(step);
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
