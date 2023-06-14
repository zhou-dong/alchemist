import React from "react";
import SendIcon from '@mui/icons-material/Send';
import { useAlgoContext } from "./AlgoContext";
import ISegmentTree from "../../../data-structures/tree/segment-tree/segment-tree.interface";
import SegmentTree from "../../../data-structures/tree/segment-tree/segment-tree.class";
import { Button, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
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
            disabled={disabled}
            onClick={handleOnClick}
        >
            Build Segment-Tree
        </Button>
    );
}

const IndexSelector: React.FC<{
    label: string,
    labelId: string,
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>
}> = ({ label, labelId, setValue }) => {
    const { nums } = useAlgoContext();
    const indices = Array.from(Array(nums.length).keys());
    type SelectType = number | undefined;

    const handleChange = (event: SelectChangeEvent<SelectType>) => {
        const { target: { value } } = event;
        if (value !== undefined && typeof value === "number") {
            setValue(value);
        }
    };

    return (
        <FormControl sx={{
            width: 85
        }}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
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
        setIndex(undefined);
        setValue(undefined);
        setState(State.Ready);
    };

    return (
        <>
            <IndexSelector label="index" labelId="index-selector" setValue={setIndex} />
            <TextField label="value" variant="standard" type="number" disabled={state !== State.Ready} onChange={handleValueChanged} />
            <IconButton onClick={handleUpdate} disabled={disabled} sx={{ width: "55px", height: "55px" }}>
                <SendIcon />
            </IconButton>
        </>
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
        setLeft(undefined);
        setRight(undefined);
        setState(State.Ready);
    };

    return (
        <Paper>
            <Stack direction="row" spacing={2}>
                <IndexSelector label="left" labelId="left-range" setValue={setLeft} />
                <IndexSelector label="right" labelId="right-range" setValue={setRight} />
                <IconButton onClick={handleQuery} disabled={disabled} sx={{ width: "55px", height: "55px" }}>
                    <SendIcon />
                </IconButton>
            </Stack>
        </Paper>
    );
}

const Main = () => {
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
            <Update segmentTree={segmentTree} />
            <Query segmentTree={segmentTree} />
        </div>
    );
};

export default Main;
