import * as THREE from 'three';
import { useAlgoContext } from "./AlgoContext";
import { Button, } from '@mui/material';
import { normalSphereColor, enabledSphereColor, arrowColor, arrowHeadLength, arrowHeadWidth } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/nodes/v1/node";
import Arrow from "../../../data-structures/_commons/three/arrow";
import Position from '../../../data-structures/_commons/params/position';
import { Step } from './algo';

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

const buildThreePosition = ({ x, y, z }: Position): THREE.Vector3 => {
    return new THREE.Vector3(x, y, z);
}

const connect = async (
    a: TreeNode<string>,
    b: TreeNode<string>,
    scene: THREE.Scene,
    setNextMap: React.Dispatch<React.SetStateAction<Map<TreeNode<string>, TreeNode<string>>>>
) => {
    const origin = buildThreePosition(a.val.center);
    const dest = buildThreePosition(b.val.center);
    dest.x = dest.x - 0.3;
    const arrow = new Arrow(origin, dest, arrowColor, arrowHeadLength, arrowHeadWidth);
    scene.add(arrow);

    setNextMap(map => {
        map.set(a, b);
        return map;
    });
}

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, setState, scene, nextMap, setNextMap } = useAlgoContext();

    const handleOnClick = async () => {
        setState(State.Computing);
        animate();

        try {
            doClick(steps[index]);
            await wait(0.2);
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

    const doClick = (step: Step) => {
        const node = step.node;
        if (!node) {
            return;
        }
        updateTreeColor(steps[0]?.node, node);
        const left = node.left;
        const right = node.right;
        const next = nextMap.get(node);

        if (left && right) {
            connect(left, right, scene, setNextMap);
        };

        if (right && next) {
            if (next.left) {
                connect(right, next.left, scene, setNextMap);
            } else if (next.right) {
                connect(right, next.right, scene, setNextMap);
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
