import React from "react";
import SendIcon from '@mui/icons-material/Send';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useAlgoContext } from "./AlgoContext";
import ISegmentTree from "../../../data-structures/tree/segment-tree/segment-tree.interface";
import SegmentTree from "../../../data-structures/tree/segment-tree/segment-tree.class";
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { State } from "./AlgoState";
import { enabledSphereColor, lineMaterial, normalSphereColor, rangeGeometryParameters, rangeMaterial, sphereGeometry, sphereMaterial, textGeometryParameters, textMaterial } from "./styles";
import { wait } from "../../../data-structures/_commons/utils";

const duration = 1;

const BuildSegmentTree: React.FC<{ setSegmentTree: React.Dispatch<React.SetStateAction<ISegmentTree | undefined>> }> = ({ setSegmentTree }) => {

    const { nums, state, scene, animate, cancelAnimate, setState } = useAlgoContext();

    const disabled = state !== State.Standby || nums.length === 0;

    const position = { x: 0, y: -5, z: 0 };
    const initPosition = { x: 0, y: 0, z: 0 };
    const nodeDistance = { x: 2, y: 3, z: 0 };

    const handleOnClick = async () => {
        if (nums.length === 0) {
            return;
        }
        setState(State.Playing);

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
            rangeMaterial,
            rangeGeometryParameters,
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

        setState(State.Ready);
    }

    return (
        <Button
            variant="contained"
            size="large"
            disabled={disabled}
            onClick={handleOnClick}
            endIcon={<ConstructionIcon />}
            color="success"
        >
            Build Segment-Tree
        </Button>
    );
}

const IndexSelector: React.FC<{
    label: string,
    labelId: string,
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>,
    segmentTree: ISegmentTree | undefined
}> = ({ label, labelId, setValue, segmentTree }) => {
    const { nums } = useAlgoContext();
    const indices = Array.from(Array(nums.length).keys());
    type SelectType = number | undefined;
    const disabled = nums.length === 0 || segmentTree === undefined;

    const handleChange = (event: SelectChangeEvent<SelectType>) => {
        const { target: { value } } = event;
        if (value !== undefined && typeof value === "number") {
            setValue(value);
        }
    };

    return (
        <FormControl
            sx={{
                width: 80
            }}
        >
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                disabled={disabled}
                labelId={labelId}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
            >
                {
                    indices.map(index =>
                        <MenuItem key={index} value={index}>
                            {index}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    );
}

const Update: React.FC<{ segmentTree: ISegmentTree | undefined }> = ({ segmentTree }) => {

    const { state, animate, cancelAnimate, setState } = useAlgoContext();

    const [index, setIndex] = React.useState<number>();
    const [value, setValue] = React.useState<number>();

    const disabled = state !== State.Ready || index === undefined || value === undefined || segmentTree === undefined;

    const handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = event.target.value;
        if (targetValue !== undefined) {
            try {
                setValue(+targetValue);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleUpdate = async () => {
        if (disabled) {
            return;
        }
        setState(State.Playing);
        animate();
        try {
            await segmentTree.update(index, value, duration);
            await wait(0.1);
        } catch (error) {
            console.log(error);
        }
        cancelAnimate();
        setState(State.Ready);
    };

    return (
        <Stack
            direction="row"
            spacing={0.5}
            sx={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <IndexSelector label="index" labelId="index-selector" setValue={setIndex} segmentTree={segmentTree} />
            <TextField label="value" type="number" disabled={state !== State.Ready} onChange={handleValueChanged} sx={{ width: 80 }} />
            <Button onClick={handleUpdate} disabled={disabled} variant="contained" endIcon={<SendIcon />} color="success">
                update
            </Button>
        </Stack>
    );
}

const Query: React.FC<{ segmentTree: ISegmentTree | undefined }> = ({ segmentTree }) => {

    const { state, animate, cancelAnimate, setState } = useAlgoContext();
    const [left, setLeft] = React.useState<number>();
    const [right, setRight] = React.useState<number>();
    const disabled = state !== State.Ready || left === undefined || right === undefined || segmentTree === undefined;

    const handleQuery = async () => {
        if (disabled) {
            return;
        }
        setState(State.Playing);
        animate();
        try {
            const value = await segmentTree.query(left, right, duration);
            console.log(value); // todo 
            await wait(0.1);
        } catch (error) {
            console.log(error);
        }
        cancelAnimate();
        setState(State.Ready);
    };

    return (
        <Stack
            direction="row"
            spacing={0.5}
            sx={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <IndexSelector label="left" labelId="left-range" setValue={setLeft} segmentTree={segmentTree} />
            <IndexSelector label="right" labelId="right-range" setValue={setRight} segmentTree={segmentTree} />
            <Button onClick={handleQuery} disabled={disabled} variant="contained" endIcon={<SendIcon />} color="success">
                sum_Range
            </Button>
        </Stack>
    );
}

const Main = () => {
    const [segmentTree, setSegmentTree] = React.useState<ISegmentTree>();

    return (
        <div style={{
            position: "fixed",
            bottom: "20%",
            left: "50%",
            transform: "translate(-50%)",
        }}
        >
            <Stack direction="row" spacing={2}>
                <BuildSegmentTree setSegmentTree={setSegmentTree} />
                <Update segmentTree={segmentTree} />
                <Query segmentTree={segmentTree} />
            </Stack>
        </div>
    );
};

export default Main;
