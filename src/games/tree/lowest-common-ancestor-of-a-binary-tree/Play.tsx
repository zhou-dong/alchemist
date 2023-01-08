import { useAlgoContext } from "./AlgoContext";
import { Button, } from '@mui/material';
import { normalSphereColor, enabledSphereColor, commonAncestorColor } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";
import { Step } from "./algo";

const updateTreeColor = (commonAncestors: TreeNode<number>[], current?: TreeNode<any>, step?: Step) => {
    if (current === undefined || step === undefined) {
        return;
    }

    if (!commonAncestors.includes(current)) {
        const { node } = step;
        if (current === node) {
            current.sphereColor = enabledSphereColor;
        } else {
            current.sphereColor = normalSphereColor;
        }
    }

    updateTreeColor(commonAncestors, current.left, step);
    updateTreeColor(commonAncestors, current.right, step);
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, root, commonAncestors, setCommonAncestors } = useAlgoContext();

    const handleOnClick = async () => {
        setState(State.Computing);

        animate();
        const step = steps[index];
        updateTreeColor(commonAncestors, root, step);

        if (step) {
            const { node, islowestCommonAncestor, p, q } = step;
            if (node && islowestCommonAncestor) {
                const value = node.val.value;
                if (value !== p && value !== q) {
                    node.sphereColor = commonAncestorColor;
                    setCommonAncestors(nodes => {
                        nodes.push(node);
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
