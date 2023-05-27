import { Action, Building, useAlgoContext } from "./AlgoContext";
import { styled } from '@mui/system';
import { Button, ButtonGroup, Stack, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SxProps } from '@mui/system';

const dummyBuilding: Building = { left: 0, right: 0, height: 0, color: "" };

const buildDefaultStyles = (rows: number, cols: number): SxProps[][] => {
    const defaultStyle: SxProps = {
        border: "none",
        minWidth: "10px",
        minHeight: "10px",
        width: "15px",
        height: "15px"
    }

    const styles: SxProps[][] = [];
    for (let i = 0; i < rows; i++) {
        const row: SxProps[] = [];
        for (let j = 0; j < cols; j++) {
            row.push(defaultStyle);
        }
        styles.push(row);
    }

    return styles;
}

const DisplayBuildings = () => {
    const { buildings } = useAlgoContext();

    const rows = buildings.reduce((a, b) => (a.height > b.height) ? a : b, dummyBuilding).height;
    const cols = buildings.reduce((a, b) => (a.right > b.right) ? a : b, dummyBuilding).right + 1;

    const styles: SxProps[][] = buildDefaultStyles(rows, cols);

    buildings.forEach(building => {
        const { left, right, height, color } = building;
        for (let i = 0; i < height; i++) {
            const row = rows - 1 - i;
            for (let col = left; col < right; col++) {
                const style: SxProps = styles[row][col];
                styles[row][col] = { ...style, backgroundColor: color };
            }
        }
    });

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

const DisplaySkyline = () => {

    const { buildings, skyline } = useAlgoContext();

    const rows = buildings.reduce((a, b) => (a.height > b.height) ? a : b, dummyBuilding).height;
    const cols = buildings.reduce((a, b) => (a.right > b.right) ? a : b, dummyBuilding).right + 1;

    const styles: SxProps[][] = buildDefaultStyles(rows, cols);

    buildings.forEach(building => {
        const { left, right, height, color } = building;
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

    const { animate, cancelAnimate, state, setState, index, steps, setIndex, maxHeap, skyline } = useAlgoContext();

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
        const { action, height } = step;
        if (action !== Action.PushToHeap) {
            return;
        }
        await run(() => maxHeap.push(height));
    }

    const handleDeleteFromHeap = async () => {
        if (step === undefined || maxHeap === undefined) {
            return;
        }
        const { action, height } = step;
        if (action !== Action.DeleteFromHeap) {
            return;
        }
        await run(() => maxHeap.pop());
    }

    const handlePushToSkyline = async () => {
        if (step === undefined) {
            return;
        }
        const { action, x, height } = step;
        if (action !== Action.PushToSkyline) {
            return;
        }
        skyline.push({ x: x || 0, height });
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

const BuildingsPosition = styled('div')({
    position: "fixed",
    top: "18%",
    left: "20%",
});

const Main = () => {
    const { state } = useAlgoContext();

    return (
        <>
            <BuildingsPosition>
                <Stack spacing={4}>
                    <DisplayBuildings />
                    <DisplaySkyline />
                </Stack>
            </BuildingsPosition>
            {state !== State.Typing && <PlayActions />}
        </>
    );
}

export default Main;
