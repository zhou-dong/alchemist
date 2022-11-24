import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Button } from '@mui/material';
import { useAlgoContext } from './AlgoContext';
import { State } from './AlgoState';
import StackItemBuilder from "./stackItemBuilder";
import { wait } from '../../../data-structures/_commons/utils';
import Stack from "../../../data-structures/stack";
import StackShellBuilder from "./stackShellBuilder";

const increaseShells = async (stack: Stack<number>, scene: THREE.Scene) => {
    const size = await stack.size();
    const increaseSize = size - stack.shellsLength;
    for (let i = 0; i < increaseSize; i++) {
        const shell = new StackShellBuilder(scene, true).build();
        stack.increaseShells(shell);
    }
    if (size === stack.shellsLength) {
        const shell = new StackShellBuilder(scene, true).build();
        stack.increaseShells(shell);
        stack.increaseShells(shell);
    }
}

const decreaseShells = async (stack: Stack<number>, minShellSize: number) => {
    const size = await stack.size();
    let isDifferent = stack.shellsLength > size;
    while (stack.shellsLength > minShellSize && isDifferent) {
        const shell = stack.decreaseShells();
        if (shell) {
            shell.hide();
        }
        isDifferent = stack.shellsLength > size;
    }
}

function isNumeric(n: string) {
    const value = parseInt(n);
    return !isNaN(value) && isFinite(value);
}

const Main = () => {
    const { expression, index, setIndex, state, stack, animate, cancelAnimate, scene, setState, setPrevSign, setResult, prevSign, minShellSize } = useAlgoContext();

    const handleClick = async () => {
        if (!stack) {
            return;
        }

        if (index > expression.length) {
            setState(State.Finished);
            return;
        }

        if (index === expression.length) {
            setState(State.Computing);
            animate();
            let result = 0;
            let item = await stack.pop();
            while (item) {
                result += item.value;
                item.hide();
                item = await stack.pop();
            }
            await wait(0.5);
            cancelAnimate();
            setResult(result);
            setState(State.Finished);
            return;
        }

        let next = index;
        const character = expression.charAt(index);
        if (isNumeric(character)) {
            let current: number = +character;
            while (next + 1 < expression.length && isNumeric(expression.charAt(next + 1))) {
                current = current * 10 + (+expression.charAt(next + 1));
                next++;
            }

            setState(State.Computing);
            animate();

            if (prevSign === "+") {
                const value: number = current;
                await increaseShells(stack, scene);
                await stack.push(new StackItemBuilder<number>(value, scene, true).build());
            } else if (prevSign === "-") {
                const value: number = current * -1;
                await increaseShells(stack, scene);
                await stack.push(new StackItemBuilder<number>(value, scene, true).build());
            } else if (prevSign === "*") {
                const previous = await stack.pop();
                await decreaseShells(stack, minShellSize);
                if (previous) {
                    const value: number = previous.value * current;
                    await increaseShells(stack, scene);
                    await stack.push(new StackItemBuilder<number>(value, scene, true).build());
                    previous.hide();
                }
            } else if (prevSign === "/") {
                const previous = await stack.pop();
                await decreaseShells(stack, minShellSize);
                if (previous) {
                    const value: number = previous.value / current | 0;
                    await increaseShells(stack, scene);
                    await stack.push(new StackItemBuilder<number>(value, scene, true).build());
                    previous.hide();
                }
            }
            await wait(0.5);
            cancelAnimate();
            setState(State.Playing);
        } else if ("+-*/".indexOf(character) >= 0) {
            setPrevSign(character)
        }

        setIndex(next + 1);
    }

    return (
        <Button
            size="medium"
            onClick={handleClick}
            disabled={state !== State.Playing}
            variant="contained"
            endIcon={<ArrowForwardOutlinedIcon />}
            sx={{ color: "#FFF", borderRadius: 10 }}
        >
            next
        </Button>
    );
};


export default Main;
