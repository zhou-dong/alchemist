import { useAlgoContext } from "./AlgoContext";
import { Button } from '@mui/material';
import { normalSphereColor, enabledSphereColor, falseSphereColor } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/node";

const updateTreeColor = (falseNodes: TreeNode<any>[], root?: TreeNode<any>, targetNode?: TreeNode<any>) => {
    if (root === undefined || targetNode === undefined) {
        return;
    }

    if (!falseNodes.includes(root)) {
        if (root === targetNode) {
            root.sphereColor = enabledSphereColor;
        } else {
            root.sphereColor = normalSphereColor;
        }
    }

    updateTreeColor(falseNodes, root.left, targetNode);
    updateTreeColor(falseNodes, root.right, targetNode);
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, falseNodes, setFalseNodes } = useAlgoContext();

    const handleOnClick = async () => {

        const step = steps[index];
        if (!step) {
            return;
        }

        const { p, q, isSame } = step;
        setState(State.Computing);

        animate();
        updateTreeColor(falseNodes, steps[0]?.p, p);
        updateTreeColor(falseNodes, steps[0]?.q, q);

        if (isSame === false) {
            if (p) {
                p.sphereColor = falseSphereColor;
            }
            if (q) {
                q.sphereColor = falseSphereColor;
            }

            setFalseNodes(nodes => {
                if (p) {
                    nodes.push(p);
                }
                if (q) {
                    nodes.push(q);
                }
                return nodes;
            })
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
            bottom: "150px",
            position: "fixed",
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
