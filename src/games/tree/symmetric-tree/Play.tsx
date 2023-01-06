import { useAlgoContext } from "./AlgoContext";
import { Button } from '@mui/material';
import { normalSphereColor, enabledSphereColor, falseSphereColor } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";
import { Step } from "./algo";

const updateTreeColor = (falseNodes: TreeNode<string>[], node?: TreeNode<any>, step?: Step) => {
    if (node === undefined || step === undefined) {
        return;
    }

    if (!falseNodes.includes(node)) {
        const { left, right } = step;
        if (node === left || node === right) {
            node.sphereColor = enabledSphereColor;
        } else {
            node.sphereColor = normalSphereColor;
        }
    }

    updateTreeColor(falseNodes, node.left, step);
    updateTreeColor(falseNodes, node.right, step);
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root, falseNodes, setFalseNodes } = useAlgoContext();

    const handleOnClick = async () => {
        setState(State.Computing);

        animate();
        const step = steps[index];
        updateTreeColor(falseNodes, root, step);

        if (step) {
            const { left, right, symmetric } = step;
            if (symmetric === false) {
                if (left) {
                    left.sphereColor = falseSphereColor;
                    setFalseNodes(nodes => {
                        nodes.push(left);
                        return nodes;
                    });
                }
                if (right) {
                    right.sphereColor = falseSphereColor;
                    setFalseNodes(nodes => {
                        nodes.push(right);
                        return nodes;
                    })
                }
            }
        }

        await wait(0.2);
        cancelAnimate();

        if (index >= steps.length - 1) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }

        setIndex(i => i + 1);
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
