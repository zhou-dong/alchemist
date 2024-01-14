import * as THREE from "three";
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button, ButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../../data-structures/_commons/utils';
import { State } from '../AlgoState';
import { Action } from './algo';
import { duration, linkColor, skinDefaultColor, skinEnabledColor } from '../styles';
import Position from "../../../../data-structures/_commons/params/position.interface";
import Code from './Code';
import { LinkedListNode } from '../../../../data-structures/list/linked-list/node.three';
import MouseIcon from '@mui/icons-material/Mouse';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { safeRun } from "../../../commons/utils";

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

const resetLink = (node: LinkedListNode<number>, scene: THREE.Scene) => {
    if (node.next) {
        if (node.linkToNext) {
            node.linkToNext.target = node.next;
        } else {
            node.linkToNext = buildLink(node, node.next, scene);
            node.linkToNext.show();
        }
    } else {
        node.linkToNext?.hide();
    }
}

const swap = (a: LinkedListNode<number>, b: LinkedListNode<number>, scene: THREE.Scene) => {
    const positionA = clonePosition(a);
    const positionB = clonePosition(b);

    resetLink(a, scene);
    resetLink(b, scene);

    const moveA = a.move(positionB, duration, () => a.linkToNext?.refresh());
    const moveB = b.move(positionA, duration, () => b.linkToNext?.refresh());

    return Promise.all([moveA, moveB]);
}

const Play = () => {
    const { animate, cancelAnimate, state, setState, index, steps, setIndex, displayCode, listHead, scene } = useAlgoContext();

    const doNext = async () => {
        const step = steps[index];
        if (!step) return;

        setState(State.Typing);

        const { head, next, action } = step;
        resetColor(listHead);
        enableColor(head);
        enableColor(next);

        if (action === Action.Swap && head && next) {
            if (head && next) {
                await safeRun(() => swap(head, next, scene), animate, cancelAnimate);
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
                        onClick={doNext} startIcon={state === State.Finished ? <CheckIcon /> : <MouseIcon />}
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
