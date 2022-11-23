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
    const { expression, index, setIndex, state, stack, animate, cancelAnimate, scene, setState, setSign, setResult, result, sign, minShellSize } = useAlgoContext();

    const handleClick = async () => {
        if (index >= expression.length) {
            setState(State.Finished);
            return;
        }

        let next = index;

        const character = expression.charAt(index);

        if (character === "+") {
            setSign(1);
        } else if (character === "-") {
            setSign(-1);
        } else if (character === "(") {
            if (stack) {
                await increaseShells(stack, scene);
                setState(State.Computing);
                animate();
                await stack.push(new StackItemBuilder<number>(result, scene, true).build());
                await stack.push(new StackItemBuilder<number>(sign, scene, true).build());
                await wait(0.05);
                cancelAnimate();
                setResult(0);
                setSign(1);
                setState(State.Playing);
            }
        } else if (character === ")") {
            if (stack) {
                setState(State.Computing);
                animate();
                const previousSign = await stack.pop();
                if (previousSign) {
                    previousSign.hide();
                }
                const previousResult = await stack.pop();
                if (previousResult) {
                    previousResult.hide();
                }
                let res = 0;
                if (previousSign && previousResult) {
                    res = previousSign.value * result + previousResult.value;
                }
                await decreaseShells(stack, minShellSize);
                await wait(0.05);
                cancelAnimate();
                setResult(res);
                setState(State.Playing);
            }
        } else if (isNumeric(character)) {
            let current: number = +character;
            let i = index;
            while (i + 1 < expression.length && isNumeric(expression.charAt(i + 1))) {
                current = current * 10 + (+expression.charAt(i + 1));
                i++;
            }
            const res = result + current * sign;
            setResult(res);
            next = i;
        }
        setIndex(next + 1);
    }

    return (
        <Button
            size="small"
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
