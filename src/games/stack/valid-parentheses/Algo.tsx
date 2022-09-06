import * as React from 'react';
import * as THREE from 'three';
import { Button, ButtonGroup } from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Queue from '../../../data-structures/queue';
import Stack from '../../../data-structures/stack';
import { wait } from '../../../data-structures/_commons/utils';
import { TextCube } from '../../../data-structures/_commons/three/text-cube';
import { clearScene, font, registerOrbitControls } from '../../../commons/three';
import { buildStackNodeParams, buildStackShellParams, buildQueueNodeParams, buildQueueShellParams } from './styles';

const queueNodeParams = buildQueueNodeParams(font);
const stackNodeParams = buildStackNodeParams(font);

interface Props {
    queue?: Queue<string>;
    stack?: Stack<string>;
    scene: THREE.Scene;
    animate: () => void;
    cancelAnimate: () => void;
}

const pairs = new Map([
    // [')', '('],
    // [']', '['],
    // ['}', '{'],
    ['(', ')'],
    ['[', ']'],
    ['{', '}']
]);

const calculateTextX = (x: number, nodeWidth: number,): number => {
    const factor = 0.22;
    return x - nodeWidth / 2.7 + factor;
}

const calculateTextY = (y: number, nodeHeight: number): number => {
    const factor = 0.2;
    return y - nodeHeight / 2 + factor;
}

const calculateTextZ = (z: number, nodeDepth: number): number => {
    return z;
}

const Main = ({ animate, cancelAnimate, queue, stack, scene }: Props) => {

    const [disabled, setDisabled] = React.useState(false);

    const enQueue = async (value: string) => {
        if (!queue) {
            return;
        }

        setDisabled(true);
        animate();

        const item = new TextCube<string>(
            value,
            queueNodeParams.textMaterial,
            queueNodeParams.textGeometryParameters,
            queueNodeParams.material,
            new THREE.BoxGeometry(queueNodeParams.width, queueNodeParams.height, queueNodeParams.depth),
            scene
        );

        item.show();

        await queue.enqueue(item);
        setDisabled(false);
        cancelAnimate();
    }

    const deQueue = async () => {
        if (!queue) {
            return;
        }

        setDisabled(true);
        animate();
        await queue.dequeue();
        setDisabled(false);
        cancelAnimate();
    }

    const createStack = async () => {
        if (!queue || !stack) {
            return;
        }

        setDisabled(true);
        animate();

        while (!(await queue.isEmpty())) {
            const item = await queue.dequeue();
            if (!item) {
                break;
            }

            const value = item.value;

            if (pairs.has(value)) {
                const stackItem = await stack.pop();
                if (!stackItem) {
                    break;
                }
                if (pairs.get(value) !== stackItem.value) {
                    break;
                }
            } else {
                await stack.push(item);
            }

        }

        setDisabled(false);
        await wait(1);
        cancelAnimate();
    }

    return (
        <div style={{ width: "100%", textAlign: "center", position: "fixed", bottom: "100px" }}>

            <ButtonGroup variant="outlined" aria-label="valid parentheses input" size="large" disabled={disabled}>
                <Button onClick={() => enQueue("(")}>(</Button>
                <Button onClick={() => enQueue(")")}>)</Button>
                <Button onClick={() => enQueue("[")}>[</Button>
                <Button onClick={() => enQueue("]")}>]</Button>
                <Button onClick={() => enQueue("{")}>{"{"}</Button>
                <Button onClick={() => enQueue("}")}>{"}"}</Button>

                <Button endIcon={<BackspaceIcon />} onClick={deQueue}>Delete</Button>
            </ButtonGroup>

            <div style={{ margin: "20px" }}></div>

            <Button variant='outlined' disabled={disabled} onClick={createStack}>
                Play
            </Button>
        </div>

    )
}

export default Main;
