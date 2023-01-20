import { useAlgoContext } from "./AlgoContext";
import { Button } from '@mui/material';
import { normalSphereColor, enabledSphereColor, buildTreeNode } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";
import StackItemBuilder from './stackItemBuilder';
import Stack from '../../../data-structures/stack';

const resetColor = (stack: TreeNode<string>[]) => {
    stack.forEach(node => {
        node.sphereColor = normalSphereColor;
    })
}

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

const pushToStack = async (
    stack: Stack<string>,
    treeNodeStack: TreeNode<string>[],
    treeNode: TreeNode<string>,
    scene: THREE.Scene
): Promise<number> => {
    treeNodeStack.push(treeNode);
    return stack.push(new StackItemBuilder(treeNode.val.value, scene, true).build());
}

const Main = () => {

    const { animate, cancelAnimate, state, setState, stack, scene, root, index, steps, setIndex, treeNodeStack } = useAlgoContext();

    const handleNextClick = async () => {
        setState(State.Computing);
        animate();

        try {
            const step = steps[index];
            if (step) {
                await doClick(step.node);
                await wait(0.1);
            }
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

    const doClick = async (node: TreeNode<string>) => {
        if (!stack) {
            return;
        }
        resetColor(treeNodeStack);
        updateTreeColor(root, node);

        await pushToStack(stack, treeNodeStack, node, scene);

        while (
            treeNodeStack.length >= 3 &&
            treeNodeStack[treeNodeStack.length - 1].val.value === "#" &&
            treeNodeStack[treeNodeStack.length - 2].val.value === "#" &&
            treeNodeStack[treeNodeStack.length - 3].val.value !== "#"
        ) {
            const item1 = await stack.pop();
            item1?.hide();
            const node1 = treeNodeStack.pop();
            node1?.hide();

            const item2 = await stack.pop();
            item2?.hide();
            const node2 = treeNodeStack.pop();
            node2?.hide();

            const item3 = await stack.pop();
            item3?.hide();
            const node3 = treeNodeStack.pop();
            if (node3) {
                const { x, y, z } = node3.val.center
                const newNode = buildTreeNode("#", scene, { x, y, z });
                newNode.sphereColor = enabledSphereColor;
                newNode.show();
                node3.hide();
                await pushToStack(stack, treeNodeStack, newNode, scene);
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
                onClick={handleNextClick}
                sx={{ color: "#FFF", zIndex: 1 }}
                disabled={state !== State.Playing}
                color="info"
            >
                next
            </Button>
        </div>
    );
}

export default Main;
