import { useAlgoContext } from "./AlgoContext";
import { Button } from '@mui/material';
import { normalSphereColor, enabledSphereColor, stackItemSphereColor } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/nodes/v1/node";
import StackItemBuilder from './stackItemBuilder';
import Stack from '../../../data-structures/stack';

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

const pushToStack = async (stack: Stack<string>, treeNodeStack: TreeNode<string>[], node: TreeNode<string>, scene: THREE.Scene) => {
    node.sphereColor = stackItemSphereColor;
    treeNodeStack.push(node);
    const stackItem = new StackItemBuilder(node.val.value, scene, true).build();
    await stack.push(stackItem);
    if (node.left) {
        await pushToStack(stack, treeNodeStack, node.left, scene);
    }
}

const Main = () => {

    const { animate, cancelAnimate, state, setState, stack, treeNodeStack, scene, root } = useAlgoContext();

    const handleNextClick = async () => {
        setState(State.Computing);
        animate();

        try {
            const treeNode = treeNodeStack.pop();
            if (treeNode) {
                await doNext(treeNode);
                await wait(0.1);
            }
        } finally {
            cancelAnimate();
        }

        if (!stack || treeNodeStack.length === 0) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }
    }

    const doNext = async (treeNode: TreeNode<string>) => {
        updateTreeColor(root, treeNode)
        if (!stack || !treeNode) {
            return;
        }
        const node = await stack.pop();
        if (node) {
            node.hide();
        }
        if (treeNode.right) {
            await pushToStack(stack, treeNodeStack, treeNode.right, scene);
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
