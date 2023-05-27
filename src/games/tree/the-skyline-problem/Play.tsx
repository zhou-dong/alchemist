import React from "react";
import { Action, useAlgoContext } from "./AlgoContext";
import { styled } from '@mui/system';
import { Button, ButtonGroup, Paper, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SxProps } from '@mui/system';
import { buildDefaultStyles, dummyBuilding } from "./AlgoInput";


const DisplayTops = () => {
    const { prevHeight, heapRoot } = useAlgoContext();

    const Item: React.FC<{ value: number }> = ({ value }) => (
        <Paper
            variant="outlined"
            sx={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography variant="h5">
                {value}
            </Typography>
        </Paper>
    )

    return (
        <Stack direction="row" spacing={3} sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Item value={prevHeight} />
            <Item value={heapRoot} />
        </Stack>
    );
};

const DisplayBuildings = () => {
    const { buildings, buildingsStyles, steps, index } = useAlgoContext();

    const rows = buildings.reduce((a, b) => (a.height > b.height) ? a : b, dummyBuilding).height;
    const cols = buildings.reduce((a, b) => (a.right > b.right) ? a : b, dummyBuilding).right + 1;
    const step = steps[index];

    return (
        <Table>
            <TableBody>
                {
                    Array.from(Array(rows)).map((_, i) =>
                        <TableRow key={i}>
                            {
                                Array.from(Array(cols)).map((_, j) => {
                                    let style: SxProps = buildingsStyles[i][j];
                                    if (step) {
                                        const { height, x, action } = step;
                                        if (x === j && rows - height <= i) {
                                            if (action === Action.PushToHeap) {
                                                style = { ...style, borderLeft: "10px solid green" };
                                            } else if (action === Action.DeleteFromHeap) {
                                                style = { ...style, borderLeft: "10px solid red" };
                                            } else {
                                                style = { ...style, borderLeft: "10px solid gold" };
                                            }
                                        }
                                    }
                                    return <TableCell key={j} padding="none" sx={style} />
                                })
                            }
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
}

const DisplaySkyline = () => {

    const { buildings, skyline } = useAlgoContext();

    const rows = buildings.reduce((a, b) => (a.height > b.height) ? a : b, dummyBuilding).height;
    const cols = buildings.reduce((a, b) => (a.right > b.right) ? a : b, dummyBuilding).right + 1;

    const styles: SxProps[][] = buildDefaultStyles(rows, cols);

    buildings.forEach(building => {
        const { left, right, height, } = building;
        for (let i = 0; i < height; i++) {
            const row = rows - 1 - i;
            for (let col = left; col < right; col++) {
                const style: SxProps = styles[row][col];
                styles[row][col] = { ...style, backgroundColor: "#F0EDF0", borderLeft: "1px solid #F0EDF0" };
            }
        }
    });

    skyline.forEach(line => {
        const { x, height } = line;
        for (let i = 0; i < height; i++) {
            const row = rows - 1 - i;
            const style: SxProps = styles[row][x];
            styles[row][x] = { ...style, borderLeft: "1px solid black", };
        }
    })

    return (
        <Table>
            <TableBody>
                {
                    Array.from(Array(rows)).map((_, i) =>
                        <TableRow key={i}>
                            {
                                Array.from(Array(cols)).map((_, j) =>
                                    <TableCell key={j} padding="none" sx={styles[i][j]} />
                                )
                            }
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
}


const PlayActions = () => {

    const { animate, cancelAnimate, state, setState, index, steps, setIndex, maxHeap, skyline, setPrevHeight, setHeapRoot } = useAlgoContext();

    const updateState = () => {
        if (index === steps.length - 1) {
            setState(State.Finished);
        } else {
            setIndex(i => i + 1);
            setState(State.Ready);
        }
    }

    const run = async (func: () => Promise<any>) => {
        setState(State.running);
        animate();
        try {
            await func();
            await wait(0.1);
        } catch (error) {
            console.error(error);
        }
        cancelAnimate();
        updateState();
    }

    const step = steps[index];

    const handlePushToHeap = async () => {
        if (step === undefined || maxHeap === undefined) {
            return;
        }
        const { action, height, prevHeight } = step;
        if (action !== Action.PushToHeap) {
            return;
        }
        setPrevHeight(prevHeight);
        const func = async () => {
            await maxHeap.push(height);
            const root = await maxHeap.peek();
            if (root) {
                setHeapRoot(root);
            }
        }
        await run(func);
    }

    const handleDeleteFromHeap = async () => {
        if (step === undefined || maxHeap === undefined) {
            return;
        }
        const { action, height, prevHeight } = step;
        if (action !== Action.DeleteFromHeap) {
            return;
        }
        setPrevHeight(prevHeight);
        const func = async () => {
            await maxHeap.delete(height);
            const root = await maxHeap.peek() || 0;
            setHeapRoot(root);
        }
        await run(func);
    }

    const handlePushToSkyline = async () => {
        if (step === undefined) {
            return;
        }
        const { action, x, height, prevHeight } = step;
        if (action !== Action.PushToSkyline) {
            return;
        }
        skyline.push({ x: x || 0, height });
        setPrevHeight(prevHeight);
        updateState();
    }

    const ActionsPosition = styled('div')({
        position: "fixed",
        bottom: "10%",
        left: "50%",
        transform: "translate(-50%)",
    });

    return (
        <ActionsPosition>
            <ButtonGroup size='large' variant='contained' color="success">
                <Button
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handlePushToHeap}
                    disabled={state !== State.Ready || step === undefined || step.action !== Action.PushToHeap}
                >
                    push to heap
                </Button>
                <Button
                    startIcon={<RemoveCircleOutlineIcon />}
                    onClick={handleDeleteFromHeap}
                    disabled={state !== State.Ready || step === undefined || step.action !== Action.DeleteFromHeap}
                >
                    delete from heap
                </Button>
                <Button
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handlePushToSkyline}
                    disabled={state !== State.Ready || step === undefined || step.action !== Action.PushToSkyline}
                >
                    push to skyline
                </Button>
            </ButtonGroup>
        </ActionsPosition>
    );
}

const Main = () => {
    const { state } = useAlgoContext();

    const BuildingsPosition = styled('div')({
        position: "fixed",
        top: "18%",
        left: "20%",
    });

    return (
        <>
            <BuildingsPosition>
                <Stack spacing={4}>
                    <DisplayTops />
                    <DisplayBuildings />
                    <DisplaySkyline />
                </Stack>
            </BuildingsPosition>
            {state !== State.Typing && <PlayActions />}
        </>
    );
}

export default Main;
