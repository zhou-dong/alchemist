import gsap from 'gsap';
import { useAlgoContext } from "./AlgoContext";
import { Button } from '@mui/material';
import { normalSphereColor, enabledSphereColor, nextSphereColor, lineMaterial } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";
import { Action, Step } from './algo';
import Position from "../../../data-structures/_commons/params/position";

const duration = 0.8;

const updateTreeColor = (root?: TreeNode<string>, current?: TreeNode<string>, next?: TreeNode<string>) => {
    if (root === undefined || current === undefined) {
        return;
    }

    if (root === current) {
        root.sphereColor = enabledSphereColor;
    } else if (root === next) {
        root.sphereColor = nextSphereColor;
    } else {
        root.sphereColor = normalSphereColor;
    }

    updateTreeColor(root.left, current, next);
    updateTreeColor(root.right, current, next);
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

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root, treeNodeMap, scene } = useAlgoContext();

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
        const { node, action, next } = step;
        const treeNode = treeNodeMap.get(node.index);
        const nextTreeNode = next ? treeNodeMap.get(next.index) : undefined;

        updateTreeColor(root, treeNode, nextTreeNode);

        if (action !== Action.Flatten) {
            return;
        }

        if (!treeNode) {
            return;
        }

        const left = treeNode.left;
        if (!treeNode || !left || !nextTreeNode) {
            return;
        }

        const right = treeNode.right;
        // next.right = node.right;
        if (right) {
            const start = clonePosition(nextTreeNode);
            const end = clonePosition(nextTreeNode);
            const dest = clonePosition(right);
            if (start && end && dest) {
                nextTreeNode.setRight(right, right.val.center, lineMaterial, 0, scene);
                if (nextTreeNode.rightLine) {
                    nextTreeNode.rightLine.end = end;
                    const onUpdate = () => {
                        nextTreeNode.rightLine!.end = end;
                    }
                    gsap.to(end, { ...dest, duration, onUpdate });
                    await wait(duration);
                }
            }
        }

        if (treeNode.leftLine) {
            treeNode.leftLine.hide();
        }

        // node.right = node.left
        const start = clonePosition(treeNode.right);
        if (treeNode.rightLine && start) {
            const dest = clonePosition(left);
            if (dest) {
                const onUpdate = () => {
                    if (treeNode.rightLine) {
                        treeNode.rightLine.end = start;
                    }
                }
                gsap.to(start, { ...dest, duration, onUpdate });
                await wait(duration);
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
