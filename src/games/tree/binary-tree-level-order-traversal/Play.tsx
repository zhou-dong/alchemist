import { useAlgoContext } from "./AlgoContext";
import { Button } from '@mui/material';
import { enabledSphereColor, normalSphereColor, getNodeColor, minShellSize } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";
import { Action, Step } from './algo';
import QueueItemBuilder from "./queueItemBuilder";
import Queue from "../../../data-structures/queue";
import QueueShellBuilder from "./queueShellBuilder";

const increaseShells = (queue: Queue<string>, scene: THREE.Scene, size: number) => {
    const increaseSize = size - queue.shellsLength;
    for (let i = 0; i < increaseSize; i++) {
        const shell = new QueueShellBuilder(scene, true).build();
        queue.increaseShells(shell);
    }
    if (size === queue.shellsLength) {
        const shell = new QueueShellBuilder(scene, true).build();
        queue.increaseShells(shell);
    }
}

const decreaseShells = (queue: Queue<string>, minShellSize: number, size: number) => {
    let isDifferent = queue.shellsLength > size;
    while (queue.shellsLength > minShellSize && isDifferent) {
        const shell = queue.decreaseShells();
        if (shell) {
            shell.hide();
        }
        isDifferent = queue.shellsLength > size;
    }
}

const updateTreeColor = (level: number, root?: TreeNode<string>, current?: TreeNode<string>) => {
    if (root === undefined || current === undefined) {
        return;
    }

    if (root === current) {
        root.sphereColor = enabledSphereColor;
    } else {
        root.sphereColor = normalSphereColor;
    }

    updateTreeColor(level + 1, root.left, current);
    updateTreeColor(level + 1, root.right, current);
}


const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root, scene, queue } = useAlgoContext();

    const handleOnClick = async () => {
        setState(State.Computing);
        animate();

        try {
            await doClick(steps[index]);
            await wait(0.1);
        } finally {
            cancelAnimate();
        }

        if (index >= steps.length - 1) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }
        setIndex(i => i + 1);
    }

    const doClick = async (step: Step) => {
        if (!queue) {
            return;
        }
        const { node, action, level } = step;
        updateTreeColor(0, root, node);

        const size = await queue.size();
        if (action === Action.Push) {
            increaseShells(queue, scene, size);
            const color = getNodeColor(level);
            const item = new QueueItemBuilder<string>(node.val.value, scene, true, color).build();
            await queue.enqueue(item);
        } else if (action === Action.Pop) {
            decreaseShells(queue, minShellSize, size);
            const item = await queue.dequeue();
            if (item) {
                item.hide();
            }
        }
    }

    return (
        <div style={{
            position: "fixed",
            bottom: "150px",
            left: "50%",
            transform: "translate(-50%)",
        }}
        >
            <Button
                variant="contained"
                size="large"
                onClick={handleOnClick}
                sx={{ color: "#FFF", zIndex: 1 }}
                disabled={state !== State.Playing}
                color="primary"
            >
                next
            </Button>
        </div>
    );
}

export default Main;
