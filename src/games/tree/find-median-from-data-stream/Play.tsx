import { useAlgoContext } from "./AlgoContext";
import { Button, Divider, IconButton, InputBase, Paper, Stack, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from "react";
import { clearScene } from '../../../commons/three';
import { buildGreater, buildSmaller, smallerHeapColor, greaterHeapColor } from "./styles";
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

const Main = () => {

    const [median, setMedian] = React.useState<number>();
    const [num, setNum] = React.useState<number>(1);

    const { smaller, greater, animate, cancelAnimate, state, setState, scene, setSmaller, setGreater } = useAlgoContext();

    const handleClear = async () => {
        setState(State.Clearing);
        animate();
        try {
            clearScene(scene);
            setSmaller(buildSmaller(scene));
            setGreater(buildGreater(scene));
            await wait(0.1);
        } catch (error) {
            console.error(error);
        }
        cancelAnimate();
        setMedian(undefined);
        setState(State.Ready);
    }

    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (value !== undefined && value !== null) {
            setNum(+value);
        }
    }

    const handleAddNum = async () => {
        setMedian(undefined);
        if (num === undefined || !smaller || !greater) {
            return;
        }
        setState(State.Inserting);
        animate();
        try {
            const smallerTop = await smaller.peek();
            if (smallerTop === undefined || num <= smallerTop) {
                await smaller.insert(num);
                if ((await smaller.size()) > (await greater.size() + 1)) {
                    await greater.insert((await smaller.pop())!);
                }
            } else {
                await greater.insert(num);
                if ((await greater.size()) > (await smaller.size())) {
                    await smaller.insert((await greater.pop())!);
                }
            }
        } catch (error) {
            console.error(error);
        }
        await wait(0.1);
        cancelAnimate();
        setState(State.Ready);
    }

    const handleFindMedian = async () => {
        if (!smaller || !greater) {
            return;
        }
        const smallerSize = await smaller.size();
        if (smallerSize === 0) {
            return;
        }
        const greaterSize = await greater.size();
        const smallerHead = await smaller.peek();
        if (smallerSize === greaterSize) {
            const greaterHead = await greater.peek();
            setMedian(((smallerHead || 0) + (greaterHead || 0)) / 2);
        } else {
            setMedian(smallerHead || 0);
        }
    }

    const DisplayMedian = () => (
        <Button sx={{ width: 64, height: 64, borderRadius: "50%" }} variant="contained" color="success">
            <Typography variant="h5">
                {median}
            </Typography>
        </Button>
    )

    const DisplayTips = () => (
        <Stack spacing={1}>
            <Paper
                variant="elevation"
                elevation={8}
                sx={{
                    backgroundColor: smallerHeapColor,
                    padding: 2
                }}
            >
                <Stack direction="row" spacing={1}>
                    <TipsAndUpdatesOutlinedIcon sx={{ color: "#fff" }} />
                    <Typography>
                        {"MaxHeap with (nums <= median)"}
                    </Typography>
                </Stack>
            </Paper>
            <Paper
                variant="elevation"
                elevation={8}
                sx={{
                    backgroundColor: greaterHeapColor,
                    padding: 2
                }}
            >
                <Stack direction="row" spacing={1}>
                    <TipsAndUpdatesOutlinedIcon sx={{ color: "#fff" }} />
                    <Typography sx={{ color: "#fff" }}>
                        {"MinHeap with (nums > median)"}
                    </Typography>
                </Stack>
            </Paper>
        </Stack>
    );

    return (
        <>
            <div style={{
                position: "fixed",
                top: "15%",
                right: "5%",
            }}>
                <DisplayTips />
            </div>
            <div style={{
                position: "fixed",
                bottom: "220px",
                left: "50%",
                transform: "translate(-50%)",
            }}>
                {median && <DisplayMedian />}
            </div>

            <div style={{
                position: "fixed",
                bottom: "150px",
                left: "50%",
                transform: "translate(-50%)",
            }}
            >
                <Stack direction="row" spacing={2}>
                    <Paper
                        variant="elevation"
                        elevation={8}
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            width: 150,
                            alignItems: "center"
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1, }}
                            placeholder='number'
                            type="number"
                            value={num}
                            onChange={handleNumChange}
                        />
                        <Divider sx={{ height: 28, m: 0.5, borderColor: "gray" }} orientation="vertical" />
                        <IconButton
                            type="button"
                            sx={{ p: '10px' }}
                            disabled={state !== State.Ready}
                            onClick={handleAddNum}
                            color="success"
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Paper>
                    <Button
                        color="success"
                        startIcon={<SearchIcon />}
                        onClick={handleFindMedian}
                        variant='contained'
                        disabled={state !== State.Ready}
                    >
                        Find Median
                    </Button>
                    <Button
                        color="success"
                        startIcon={<RefreshIcon />}
                        onClick={handleClear}
                        variant='contained'
                        disabled={state !== State.Ready}
                    >
                        Clear
                    </Button>
                </Stack>
            </div>
        </>
    );
}

export default Main;
