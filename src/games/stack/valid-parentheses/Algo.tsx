import * as React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Queue from '../../../data-structures/queue';
import Stack from '../../../data-structures/stack';
import { wait } from '../../../data-structures/_commons/utils';
interface Props {
    queue?: Queue<string>;
    stack?: Stack<string>;
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


const Main = ({ animate, cancelAnimate, queue, stack }: Props) => {

    const [disabled, setDisabled] = React.useState(false);

    const enQueue = async (value: string) => {
        if (!queue) {
            return;
        }

        setDisabled(true);
        animate();
        await queue.enqueue(value);
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

            if (pairs.has(item)) {
                const stackItem = await stack.pop();
                if (!stackItem) {
                    break;
                }
                if (pairs.get(item) !== stackItem) {
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
