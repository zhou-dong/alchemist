import * as React from 'react';
import * as THREE from 'three';
import { Button, ButtonGroup } from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Queue from '../../../data-structures/queue';
import Stack from '../../../data-structures/stack';
import { wait } from '../../../data-structures/_commons/utils';
import { TextCube } from '../../../data-structures/_commons/three/text-cube';
import { nodeParams } from './styles';

interface Props {
    queue?: Queue<string>;
    stack?: Stack<string>;
    scene: THREE.Scene;
    animate: () => void;
    cancelAnimate: () => void;
}

const pairs = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}']
]);

const createItem = (value: string, scene: THREE.Scene): TextCube<string> => {
    const { textMaterial, textGeometryParameters, cubeMaterial, cubeGeometry, initPosition } = nodeParams;

    const item = new TextCube<string>(value, textMaterial, textGeometryParameters, cubeMaterial, cubeGeometry, scene);

    item.x = initPosition.x;
    item.y = initPosition.y;
    item.z = initPosition.z;

    item.textX = item.x - 0.1;
    item.textY = item.y - 0.26;
    item.textZ = initPosition.z;

    return item;
}

const Main = ({ animate, cancelAnimate, queue, stack, scene }: Props) => {

    const [disabled, setDisabled] = React.useState(false);

    const enQueue = async (value: string) => {
        if (!queue) {
            return;
        }

        setDisabled(true);
        animate();

        const item = createItem(value, scene);

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
        const item = await queue.dequeue();
        if (item) {
            item.hide();
        }
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
                item.hide();
                stackItem.hide();
                await wait(1);
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

            <ButtonGroup variant="contained" aria-label="valid parentheses input" size="medium" disabled={disabled}>
                <Button onClick={() => enQueue("(")}>(</Button>
                <Button onClick={() => enQueue(")")}>)</Button>
                <Button onClick={() => enQueue("[")}>[</Button>
                <Button onClick={() => enQueue("]")}>]</Button>
                <Button onClick={() => enQueue("{")}>{"{"}</Button>
                <Button onClick={() => enQueue("}")}>{"}"}</Button>

                <Button endIcon={<BackspaceIcon />} onClick={deQueue}></Button>
            </ButtonGroup>

            <div style={{ margin: "20px" }}></div>

            <Button variant='contained' disabled={disabled} onClick={createStack} size="small">
                Play
            </Button>
        </div>

    )
}

export default Main;
