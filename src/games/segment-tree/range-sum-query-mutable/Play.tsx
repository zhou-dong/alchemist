import React from "react";
import { useAlgoContext } from "./AlgoContext";
import ISegmentTree from "../../../data-structures/tree/segment-tree/segment-tree.interface";
import SegmentTree from "../../../data-structures/tree/segment-tree/segment-tree.class";
import { Button } from "@mui/material";
import { State } from "./AlgoState";
import { enabledSphereColor, lineMaterial, normalSphereColor, sphereGeometry, sphereMaterial, textGeometryParameters, textMaterial } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";

const duration = 1;

const BuildSegmentTree: React.FC<{ setSegmentTree: React.Dispatch<React.SetStateAction<ISegmentTree | undefined>> }> = ({ setSegmentTree }) => {

    const { nums, state, scene, animate, cancelAnimate, setState } = useAlgoContext();
    const [buildingTree, setBuildingTree] = React.useState<boolean>(false);

    const disabled = state !== State.Standby || nums.length === 0 || buildingTree;

    const position = { x: 0, y: -5, z: 0 };
    const initPosition = { x: 0, y: 0, z: 0 };
    const nodeDistance = { x: 2, y: 3, z: 0 };

    const handleOnClick = async () => {
        if (nums.length === 0) {
            return;
        }
        setBuildingTree(true);

        const size = 2 * nums.length;
        const depth = Math.floor(Math.log2(size)) + 1;

        const segmentTree = new SegmentTree(
            scene,
            normalSphereColor,
            enabledSphereColor,
            sphereGeometry,
            sphereMaterial,
            textMaterial,
            textGeometryParameters,
            lineMaterial,
            position,
            depth,
            nodeDistance,
            initPosition
        );

        animate();
        try {
            await segmentTree.build(nums, duration);
            await wait(0.1);
            setSegmentTree(segmentTree);
        } catch (error) {
            console.log(error);
        }
        cancelAnimate();

        setBuildingTree(false);
        setState(State.Ready);
    }

    return (
        <Button
            disabled={disabled}
            onClick={handleOnClick}
        >
            Build Segment-Tree
        </Button>
    );
}

const Main = () => {
    const { nums } = useAlgoContext();

    const [segmentTree, setSegmentTree] = React.useState<ISegmentTree>();

    return (
        <div style={{
            position: "fixed",
            bottom: "150px",
            left: "50%",
            transform: "translate(-50%)",
        }}
        >
            <BuildSegmentTree setSegmentTree={setSegmentTree} />
        </div>
    );
};

export default Main;
