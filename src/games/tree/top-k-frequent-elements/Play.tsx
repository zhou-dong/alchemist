import { HeapItem, useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import MouseIcon from '@mui/icons-material/Mouse';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Main = () => {

    const { animate, cancelAnimate, state, setState, heap, map, nums, index, setIndex, setMapIndex, setFrequents, frequents, mapIndex, k, result, setResult } = useAlgoContext();

    const handleCount = () => {
        const num = nums[index + 1];
        if (num === undefined || !map) {
            return;
        }

        const count = map.get(num) || 0;
        map.set(num, count + 1);

        if (index + 2 === nums.length) {
            setState(State.AddToHeap);
            setMapIndex(0);
            setFrequents(Array.from(map).map(([key, value]) => (new HeapItem(key, value))));
        }

        setIndex(index + 1);
    }

    const handleAddToHeap = async () => {
        setState(State.Computing);

        if (!heap) {
            return;
        }

        const item = frequents[mapIndex];
        if (!item) {
            return;
        }

        animate();

        try {
            if (await heap.size() === k) {
                const top = await heap.peek();
                if (top) {
                    if (top.count < item.count) {
                        await heap.pop();
                        await heap.insert(item);
                    }
                }
            } else {
                await heap.insert(item);
            }

            if (mapIndex + 1 === frequents.length) {
                setResult(() => heap.items().map(item => item.num));
            }
            setMapIndex(i => i + 1);
            await wait(0.5);
        } catch (error) {
            console.error(error);
        }

        setState(State.AddToHeap);
        cancelAnimate();
    }

    const DisplayInput = () => (
        <ButtonGroup>
            {nums.map((num, i) =>
                <Button
                    key={i}
                    color="success"
                    sx={{ borderColor: "lightgray" }}
                    size="large"
                    variant={(i === index) ? "contained" : "outlined"}
                >
                    {num}
                </Button>
            )}
        </ButtonGroup>
    );

    const getMapStyle = (num: number) => {
        if (num === frequents[mapIndex]?.num) {
            return { backgroundColor: "green", color: "#FFF" };
        } else {
            return {};
        }
    }

    const DisplayMap = () => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Num</TableCell>
                    <TableCell>Count</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    map && Array.from(map).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell sx={getMapStyle(key)}>{key}</TableCell>
                            <TableCell sx={getMapStyle(key)}>{value}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );

    const DisplayResult = () => (
        <ButtonGroup size="large" color="success">
            {result.length > 0 && <Button variant="contained">Top K Elements</Button>}
            {
                result.map((value, i) => <Button key={i}>{value}</Button>)
            }
        </ButtonGroup>
    );

    const Dashboard = () => (
        <Stack spacing={2} direction="column" alignItems="flex-start">
            <DisplayInput />
            <DisplayMap />
            <DisplayResult />
        </Stack >
    );

    return (
        <>
            <div style={{
                position: "fixed",
                top: "150px",
                left: "10%"
            }}>
                {state !== State.Typing && <Dashboard />}
            </div>

            <div style={{
                position: "fixed",
                bottom: "150px",
                left: "50%",
                transform: "translate(-50%)",
            }}
            >
                <ButtonGroup size='large' variant='outlined'>
                    <Button
                        color="success"
                        startIcon={<MouseIcon />}
                        onClick={handleCount}
                        disabled={state !== State.Count || index + 1 === nums.length}
                    >
                        count
                    </Button>
                    <Button
                        color="success"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleAddToHeap}
                        disabled={state !== State.AddToHeap || mapIndex === frequents.length}
                    >
                        Add to Heap
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Main;
