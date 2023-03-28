import gsap from 'gsap';
import { useAlgoContext } from "./AlgoContext";
import { Button } from '@mui/material';
import { normalSphereColor, enabledSphereColor } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/nodes/v1/node";
import { Step } from './algo';
import Position from "../../../data-structures/_commons/params/position";

const duration = 0.8;

const updateTreeColor = (root?: TreeNode<string>, current?: TreeNode<string>) => {
    if (root === undefined || current === undefined) {
        return;
    }

    if (root === current) {
        root.sphereColor = enabledSphereColor;
    } else {
        root.sphereColor = normalSphereColor;
    }

    updateTreeColor(root.left, current);
    updateTreeColor(root.right, current);
}

const clonePosition = (treeNode?: TreeNode<string>): Position | undefined => {
    if (!treeNode) {
        return undefined;
    }

    const x = treeNode.val.center.x;
    const y = treeNode.val.center.y;
    const z = treeNode.val.center.z;
    return { x, y, z };
}

const move = (root: TreeNode<string> | undefined, distance: Position, duration: number) => {
    if (!root) {
        return;
    }
    root.move(distance, duration);
    move(root.left, distance, duration);
    move(root.right, distance, duration);
}

const getLeftPosition = (node?: TreeNode<string>): Position | undefined => {
    if (!node) {
        return undefined;
    }
    if (node.left) {
        return clonePosition(node.left);
    }
    if (node.right) {
        const rightPosition = clonePosition(node.right);
        if (rightPosition) {
            const distance = rightPosition.x - node.val.center.x;
            const x = rightPosition.x - distance - distance;
            return { ...rightPosition, x };
        }
    }
    return undefined;
}

const getRightPosition = (node?: TreeNode<string>): Position | undefined => {
    if (!node) {
        return undefined;
    }
    if (node.right) {
        return clonePosition(node.right);
    }
    if (node.left) {
        const leftPosition = clonePosition(node.left);
        if (leftPosition) {
            const distance = node.val.center.x - leftPosition.x;
            const x = leftPosition.x + distance + distance;
            return { ...leftPosition, x };
        }
    }
    return undefined;
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root, treeNodeMap } = useAlgoContext();

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
        const { node } = step;
        const treeNode = treeNodeMap.get(node.index);
        if (!treeNode) {
            return;
        }
        updateTreeColor(root, treeNode);

        const left = treeNode.left;
        const right = treeNode.right;
        if (!left && !right) {
            return;
        }
        const leftPosition = getLeftPosition(treeNode);
        const rightPosition = getRightPosition(treeNode);

        if (right && leftPosition) {
            const rightLine = treeNode.rightLine;
            if (rightLine) {
                const position = rightLine.end;
                const onUpdate = () => {
                    rightLine.end = position;
                }
                gsap.to(position, { ...leftPosition, duration, onUpdate });
            }
            const x = leftPosition.x - right.val.center.x;
            const y = leftPosition.y - right.val.center.y;
            const z = leftPosition.z - right.val.center.z;
            move(right, { x, y, z }, duration);
        }

        if (left && rightPosition) {
            const leftLine = treeNode.leftLine;
            if (leftLine) {
                const position = leftLine.end;
                const onUpdate = () => {
                    leftLine.end = position;
                }
                gsap.to(position, { ...rightPosition, duration, onUpdate });
            }
            const x = rightPosition.x - left.val.center.x;
            const y = rightPosition.y - left.val.center.y;
            const z = rightPosition.z - left.val.center.z;
            move(left, { x, y, z }, duration);
        }

        await wait(duration + 0.1);
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
